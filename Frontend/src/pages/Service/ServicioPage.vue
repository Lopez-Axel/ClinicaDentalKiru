<template>
  <div class="service-page-container">
    <!-- Header Section -->
    <div class="service-page-header">
      <div class="service-header-background">
        <div class="service-header-shape service-header-shape-1"></div>
        <div class="service-header-shape service-header-shape-2"></div>
      </div>
      <div class="service-header-content">
        <div class="service-title-section">
          <div class="service-icon-wrapper">
            <i class="fa-solid fa-tooth service-header-icon"></i>
          </div>
          <div>
            <h1 class="service-page-title">Gestión de Servicios</h1>
            <p class="service-page-subtitle">Administra los servicios de tu clínica dental</p>
          </div>
        </div>
        <q-btn
          class="service-primary-btn"
          color="primary"
          icon="fa-solid fa-plus"
          label="Nuevo Servicio"
          @click="servicioStore.openNewDialog()"
          unelevated
          no-caps
          size="md"
        />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="service-stats-section">
      <div class="service-stat-card">
        <div class="service-stat-icon-container active">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <div class="service-stat-content">
          <div class="service-stat-value">{{ servicioStore.serviciosActivos.length }}</div>
          <div class="service-stat-label">Servicios Activos</div>
        </div>
        <div class="service-stat-glow active"></div>
      </div>
      
      <div class="service-stat-card">
        <div class="service-stat-icon-container inactive">
          <i class="fa-solid fa-circle-xmark"></i>
        </div>
        <div class="service-stat-content">
          <div class="service-stat-value">{{ servicioStore.serviciosInactivos.length }}</div>
          <div class="service-stat-label">Servicios Inactivos</div>
        </div>
        <div class="service-stat-glow inactive"></div>
      </div>
      
      <div class="service-stat-card">
        <div class="service-stat-icon-container admin">
          <i class="fa-solid fa-tags"></i>
        </div>
        <div class="service-stat-content">
          <div class="service-stat-value">{{ servicioStore.categoriasUnicas.length }}</div>
          <div class="service-stat-label">Categorías</div>
        </div>
        <div class="service-stat-glow admin"></div>
      </div>
      
      <div class="service-stat-card">
        <div class="service-stat-icon-container total">
          <i class="fa-solid fa-tooth"></i>
        </div>
        <div class="service-stat-content">
          <div class="service-stat-value">{{ servicioStore.servicios.length }}</div>
          <div class="service-stat-label">Total de Servicios</div>
        </div>
        <div class="service-stat-glow total"></div>
      </div>
    </div>

    <!-- Search Section -->
    <div class="service-search-section">
      <div class="service-search-container">
        <q-input
          v-model="servicioStore.search"
          class="service-search-input"
          outlined
          type="search"
          placeholder="Buscar por título, descripción o categoría..."
          @update:model-value="servicioStore.setSearch"
          clearable
        >
          <template v-slot:prepend>
            <i class="fa-solid fa-search service-search-icon"></i>
          </template>
        </q-input>
      </div>
    </div>

    <!-- Table Section -->
    <div class="service-table-container">
      <q-table
        class="service-data-table"
        flat
        :rows="servicioStore.filteredServicios"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[5, 10, 15, 20, 0]"
        :pagination="{ rowsPerPage: 10 }"
        separator="cell"
      >
        <template v-slot:body-cell-imagen="props">
          <q-td :props="props">
            <div class="service-image-container">
              <q-img
                v-if="props.row.imagen"
                :src="servicioStore.getImagePath(props.row.imagen)"
                :alt="props.row.titulo"
                class="service-table-image"
                @error="servicioStore.handleImageError"
              />
              <div v-else class="service-no-image-placeholder">
                <i class="fa-solid fa-image"></i>
                <span>Sin imagen</span>
              </div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              dense
              round
              icon="fa-solid fa-eye"
              @click="servicioStore.openDetailDialog(props.row)"
              color="grey-8"
            />
            <q-btn
              flat
              dense
              round
              icon="fa-solid fa-edit"
              @click="servicioStore.openEditDialog(props.row)"
              color="primary"
            />
            <q-btn
              flat
              dense
              round
              icon="fa-solid fa-trash"
              @click="servicioStore.confirmDeleteServicio(props.row)"
              color="negative"
            />
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Dialogs -->
    <DetailServicioDialog
      v-model="servicioStore.showDetailDialog"
      :servicio-data="servicioStore.selectedServicio"
      @edit-servicio="servicioStore.openEditDialog"
    />

    <EditServicioDialog
      v-model="servicioStore.showEditDialog"
      :servicio-data="servicioStore.selectedServicio"
      @servicio-updated="servicioStore.actualizar"
    />

    <NewServicioDialog
      v-model="servicioStore.showNewDialog"
    />

    <!-- Delete Dialog -->
    <q-dialog v-model="servicioStore.showDeleteDialog" persistent>
      <q-card>
        <q-card-section>
          <h3>Confirmar Eliminación</h3>
          <p>¿Desea eliminar el servicio <strong>{{ servicioStore.selectedServicio?.titulo }}</strong>?</p>
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Cancelar" @click="servicioStore.closeDeleteDialog" />
          <q-btn unelevated label="Eliminar" color="negative" :loading="deleting" @click="handleDeleteServicio" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useServicioStore } from 'src/stores/servicioStore'
import DetailServicioDialog from './DetailServicioDialog.vue'
import EditServicioDialog from './EditServicioDialog.vue'
import NewServicioDialog from './NewServicioDialog.vue'

const servicioStore = useServicioStore()
const deleting = ref(false)

const columns = [
  { name: 'imagen', label: 'Imagen', align: 'center', field: 'imagen', sortable: false, style: 'width: 120px' },
  { name: 'titulo', label: 'Título', align: 'left', field: 'titulo', sortable: true },
  { name: 'categoria', label: 'Categoría', align: 'center', field: 'categoria', sortable: true },
  { name: 'estado', label: 'Estado', align: 'center', field: 'estado', sortable: true },
  { name: 'actions', label: 'Acciones', align: 'center', field: 'actions', sortable: false }
]

const handleDeleteServicio = async () => {
  if (!servicioStore.selectedServicio?.id) return
  deleting.value = true
  try {
    await servicioStore.eliminar(servicioStore.selectedServicio.id)
    servicioStore.closeDeleteDialog()
  } finally {
    deleting.value = false
  }
}

onMounted(() => {
  servicioStore.listar()
})
</script>

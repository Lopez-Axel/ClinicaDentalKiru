<template>
  <div class="announcement-page-container">
    <!-- Header Section -->
    <div class="announcement-page-header">
      <div class="announcement-header-background">
        <div class="announcement-header-shape announcement-header-shape-1"></div>
        <div class="announcement-header-shape announcement-header-shape-2"></div>
      </div>
      <div class="announcement-header-content">
        <div class="announcement-title-section">
          <div class="announcement-icon-wrapper">
            <i class="fa-solid fa-bullhorn announcement-header-icon"></i>
          </div>
          <div>
            <h1 class="announcement-page-title">Gestión de Anuncios</h1>
            <p class="announcement-page-subtitle">Administra las promociones y eventos de tu clínica</p>
          </div>
        </div>
        <q-btn
          class="announcement-primary-btn"
          color="primary"
          icon="fa-solid fa-plus"
          label="Nuevo Anuncio"
          @click="anuncioStore.openNewDialog()"
          unelevated
          no-caps
          size="md"
        />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="announcement-stats-section">
      <div class="announcement-stat-card">
        <div class="announcement-stat-icon-container active">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <div class="announcement-stat-content">
          <div class="announcement-stat-value">{{ anuncioStore.activeAnunciosCount }}</div>
          <div class="announcement-stat-label">Anuncios Activos</div>
        </div>
        <div class="announcement-stat-glow active"></div>
      </div>
      
      <div class="announcement-stat-card">
        <div class="announcement-stat-icon-container inactive">
          <i class="fa-solid fa-circle-xmark"></i>
        </div>
        <div class="announcement-stat-content">
          <div class="announcement-stat-value">{{ anuncioStore.inactiveAnunciosCount }}</div>
          <div class="announcement-stat-label">Anuncios Inactivos</div>
        </div>
        <div class="announcement-stat-glow inactive"></div>
      </div>
      
      <div class="announcement-stat-card">
        <div class="announcement-stat-icon-container admin">
          <i class="fa-solid fa-tags"></i>
        </div>
        <div class="announcement-stat-content">
          <div class="announcement-stat-value">{{ anuncioStore.uniqueCategories.length }}</div>
          <div class="announcement-stat-label">Categorías</div>
        </div>
        <div class="announcement-stat-glow admin"></div>
      </div>
      
      <div class="announcement-stat-card">
        <div class="announcement-stat-icon-container total">
          <i class="fa-solid fa-bullhorn"></i>
        </div>
        <div class="announcement-stat-content">
          <div class="announcement-stat-value">{{ anuncioStore.totalAnuncios }}</div>
          <div class="announcement-stat-label">Total de Anuncios</div>
        </div>
        <div class="announcement-stat-glow total"></div>
      </div>
    </div>

    <!-- Search Section -->
    <div class="announcement-search-section">
      <div class="announcement-search-container">
        <q-input
          v-model="anuncioStore.search"
          class="announcement-search-input"
          outlined
          type="search"
          placeholder="Buscar por título, descripción o categoría..."
          @update:model-value="anuncioStore.applySearch" 
          clearable
        >
          <template v-slot:prepend>
            <i class="fa-solid fa-search announcement-search-icon"></i>
          </template>
          <template v-slot:append>
            <q-icon 
              v-if="anuncioStore.search" 
              name="fa-solid fa-filter" 
              class="text-primary"
            />
          </template>
        </q-input>
      </div>
    </div>

    <!-- Table Section -->
    <div class="announcement-table-container">
      <div class="announcement-table-header">
        <div class="announcement-table-title-section">
          <h3 class="announcement-table-title">Lista de Anuncios</h3>
          <div class="announcement-table-underline"></div>
        </div>
        <div class="announcement-results-count">
          <span class="announcement-count-badge">
            <i class="fa-solid fa-list-check"></i>
            {{ displayedRows.length }} anuncio{{ displayedRows.length !== 1 ? 's' : '' }}
          </span>
        </div>
      </div>

      <q-table
        class="announcement-data-table"
        flat
        :rows="displayedRows"
        :columns="columns"
        row-key="id"
        :rows-per-page-options="[5, 10, 15, 20, 0]"
        :pagination="{ rowsPerPage: 10 }"
        separator="cell"
      >
        <template v-slot:no-data>
          <div class="announcement-no-data-container">
            <div class="announcement-no-data-illustration">
              <i class="fa-solid fa-bullhorn announcement-no-data-icon"></i>
              <div class="announcement-no-data-circle announcement-no-data-circle-1"></div>
              <div class="announcement-no-data-circle announcement-no-data-circle-2"></div>
            </div>
            <p class="announcement-no-data-text">No se encontraron anuncios</p>
            <p class="announcement-no-data-subtext">Intenta ajustar los filtros de búsqueda o agrega un nuevo anuncio</p>
          </div>
        </template>

        <template v-slot:body-cell-imagen="props">
          <q-td :props="props">
            <div class="announcement-image-container">
              <q-img
                v-if="props.row.imagen"
                :src="props.row.imagen"
                :alt="props.row.titulo"
                class="announcement-table-image"
                @error="anuncioStore.handleImageError"
              />
              <div v-else class="announcement-no-image-placeholder">
                <i class="fa-solid fa-image"></i>
                <span>Sin imagen</span>
              </div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-titulo="props">
          <q-td :props="props">
            <div class="announcement-title-content">
              <span class="announcement-title-text">{{ props.row.titulo }}</span>
              <div class="announcement-categoria-badge">
                <i class="fa-solid fa-tag"></i>
                {{ props.row.categoria }}
              </div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-fechas="props">
          <q-td :props="props">
            <div class="announcement-fechas-info">
              <div class="announcement-fecha-item">
                <div class="announcement-fecha-icon">
                  <i class="fa-solid fa-calendar-plus"></i>
                </div>
                <div class="announcement-fecha-content">
                  <div class="announcement-fecha-label">Publicación</div>
                  <div class="announcement-fecha-value">{{ anuncioStore.formatDate(props.row.fecha_publicacion) }}</div>
                </div>
              </div>
              <div class="announcement-fecha-item">
                <div class="announcement-fecha-icon">
                  <i class="fa-solid fa-calendar-minus"></i>
                </div>
                <div class="announcement-fecha-content">
                  <div class="announcement-fecha-label">Expiración</div>
                  <div class="announcement-fecha-value">{{ anuncioStore.formatDate(props.row.fecha_expiracion) }}</div>
                </div>
              </div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-estado="props">
          <q-td :props="props">
            <q-badge
              :class="['announcement-state-badge', anuncioStore.getStateClass(props.row.estado)]"
              :label="anuncioStore.formatState(props.row.estado)"
            />
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <div class="announcement-action-buttons">
              <q-btn
                class="announcement-action-btn announcement-view-btn"
                flat
                dense
                round
                icon="fa-solid fa-eye"
                size="sm"
                @click="anuncioStore.openDetailDialog(props.row)"
                color="grey-8"
              >
                <q-tooltip>Ver detalles</q-tooltip>
              </q-btn>
              
              <q-btn
                class="announcement-action-btn announcement-edit-btn"
                flat
                dense
                round
                icon="fa-solid fa-edit"
                size="sm"
                @click="anuncioStore.openEditDialog(props.row)"
                color="primary"
              >
                <q-tooltip>Editar anuncio</q-tooltip>
              </q-btn>
              
              <q-btn
                class="announcement-action-btn announcement-delete-btn"
                flat
                dense
                round
                icon="fa-solid fa-trash"
                size="sm"
                @click="anuncioStore.confirmDeleteAnuncio(props.row)"
                color="negative"
              >
                <q-tooltip>Eliminar anuncio</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- Dialogs -->
    <DetailAnuncioDialog
      v-model="anuncioStore.showDetailDialog"
      :anuncio-data="anuncioStore.selectedAnuncio"
      @edit-anuncio="anuncioStore.openEditDialog"
    />

    <EditAnuncioDialog
      v-model="anuncioStore.showEditDialog"
      :anuncio-data="anuncioStore.selectedAnuncio"
      @anuncio-updated="anuncioStore.actualizarAnuncio"
    />

    <NewAnuncioDialog
      v-model="anuncioStore.showNewDialog"
      @anuncio-created="anuncioStore.agregarAnuncio"
    />

    <!-- Delete Confirmation Dialog -->
    <q-dialog v-model="anuncioStore.showDeleteDialog" persistent>
      <q-card class="announcement-confirm-dialog">
        <q-card-section class="announcement-dialog-header">
          <div class="announcement-dialog-icon-container">
            <i class="fa-solid fa-exclamation-triangle announcement-dialog-icon"></i>
          </div>
          <h3 class="announcement-dialog-title">Confirmar Eliminación</h3>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p class="announcement-dialog-text">
            ¿Está seguro que desea eliminar el anuncio <strong>{{ anuncioStore.selectedAnuncio?.titulo }}</strong>?
          </p>
          <p class="announcement-dialog-subtext">
            Esta acción no se puede deshacer y el anuncio dejará de ser visible.
          </p>
        </q-card-section>

        <q-card-actions class="announcement-dialog-actions">
          <q-btn 
            flat 
            label="Cancelar" 
            color="grey-7" 
            @click="anuncioStore.closeDeleteDialog" 
            no-caps
            class="announcement-dialog-btn"
          />
          <q-btn 
            unelevated
            label="Eliminar Anuncio" 
            color="negative" 
            @click="handleDeleteAnuncio"
            no-caps
            class="announcement-dialog-btn announcement-dialog-delete-btn"
            :loading="deleting"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue'
import { useAnuncioStore } from 'src/stores/anuncioStore'

import DetailAnuncioDialog from './DetailAnnouncementDialog.vue'
import EditAnuncioDialog from './EditAnnouncementDialog.vue'
import NewAnuncioDialog from './NewAnnouncementDialog.vue'

const columns = [
  {
    name: 'imagen',
    required: true,
    label: 'Imagen',
    align: 'center',
    field: 'imagen',
    sortable: false,
    style: 'width: 120px'
  },
  {
    name: 'titulo',
    required: true,
    label: 'Título',
    align: 'left',
    field: 'titulo',
    sortable: true
  },
  {
    name: 'categoria',
    label: 'Categoría',
    field: 'categoria',
    sortable: true,
    align: 'center',
    style: 'width: 140px'
  },
  {
    name: 'fechas',
    label: 'Fechas',
    field: 'fechas',
    sortable: false,
    align: 'left',
    style: 'width: 200px'
  },
  {
    name: 'estado',
    label: 'Estado',
    field: 'estado',
    sortable: true,
    align: 'center',
    style: 'width: 120px'
  },
  {
    name: 'actions',
    label: 'Acciones',
    field: 'actions',
    align: 'center',
    sortable: false,
    style: 'width: 150px'
  }
]

export default {
  name: 'AnunciosPage',

  components: {
    DetailAnuncioDialog,
    EditAnuncioDialog,
    NewAnuncioDialog
  },

  setup() {
    const anuncioStore = useAnuncioStore()
    const deleting = ref(false)

    const displayedRows = computed(() => anuncioStore.searchResults)

    const handleDeleteAnuncio = async () => {
      deleting.value = true
      try {
        await anuncioStore.eliminarAnuncio()
      } catch (error) {
        console.error('Error deleting anuncio:', error)
        // Aquí podrías agregar una notificación de error
      } finally {
        deleting.value = false
      }
    }

    onMounted(() => {
      anuncioStore.initialize()
    })

    return {
      anuncioStore,
      columns,
      displayedRows,
      deleting,
      handleDeleteAnuncio
    }
  }
}
</script>

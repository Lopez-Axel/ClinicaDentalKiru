<template>
  <div class="branch-page-container">
    <!-- Header Section -->
    <div class="branch-page-header">
      <div class="branch-header-background">
        <div class="branch-header-shape branch-header-shape-1"></div>
        <div class="branch-header-shape branch-header-shape-2"></div>
      </div>
      <div class="branch-header-content">
        <div class="branch-title-section">
          <div class="branch-icon-wrapper">
            <i class="fa-solid fa-building branch-header-icon"></i>
          </div>
          <div>
            <h1 class="branch-page-title">Gestión de Sucursales</h1>
            <p class="branch-page-subtitle">Administra las ubicaciones de tu empresa</p>
          </div>
        </div>
        <q-btn
          class="branch-primary-btn"
          color="primary"
          icon="fa-solid fa-plus"
          label="Nueva Sucursal"
          @click="sucursalStore.openNewDialog()"
          unelevated
          no-caps
          size="md"
        />
      </div>
    </div>

    <!-- Stats Section -->
    <div class="branch-stats-section">
      <div class="branch-stat-card">
        <div class="branch-stat-icon-container total">
          <i class="fa-solid fa-store"></i>
        </div>
        <div class="branch-stat-content">
          <div class="branch-stat-value">{{ sucursalStore.totalSucursales }}</div>
          <div class="branch-stat-label">Total Sucursales</div>
        </div>
        <div class="branch-stat-glow total"></div>
      </div>

      <div class="branch-stat-card">
        <div class="branch-stat-icon-container cities">
          <i class="fa-solid fa-map-location-dot"></i>
        </div>
        <div class="branch-stat-content">
          <div class="branch-stat-value">{{ sucursalStore.ciudadesUnicas.length }}</div>
          <div class="branch-stat-label">Ciudades</div>
        </div>
        <div class="branch-stat-glow cities"></div>
      </div>

      <div class="branch-stat-card">
        <div class="branch-stat-icon-container active">
          <i class="fa-solid fa-check-circle"></i>
        </div>
        <div class="branch-stat-content">
          <div class="branch-stat-value">{{ activeBranchesCount }}</div>
          <div class="branch-stat-label">Sucursales Activas</div>
        </div>
        <div class="branch-stat-glow active"></div>
      </div>

      <div class="branch-stat-card">
        <div class="branch-stat-icon-container inactive">
          <i class="fa-solid fa-pause-circle"></i>
        </div>
        <div class="branch-stat-content">
          <div class="branch-stat-value">{{ inactiveBranchesCount }}</div>
          <div class="branch-stat-label">Sucursales Inactivas</div>
        </div>
        <div class="branch-stat-glow inactive"></div>
      </div>
    </div>

    <!-- Search Section -->
    <div class="branch-search-section">
      <div class="branch-search-container">
        <q-input
          v-model="sucursalStore.search"
          class="branch-search-input"
          outlined
          type="search"
          placeholder="Buscar por nombre, ubicación o dirección..."
          @update:model-value="sucursalStore.filterBranches"
          clearable
        >
          <template v-slot:prepend>
            <i class="fa-solid fa-search branch-search-icon"></i>
          </template>
          <template v-slot:append>
            <q-icon 
              v-if="sucursalStore.search" 
              name="fa-solid fa-filter" 
              class="text-primary"
            />
          </template>
        </q-input>
      </div>
    </div>

    <!-- Branches Grid -->
    <div class="branch-content-section">
      <div class="branch-section-header">
        <div class="branch-section-title-wrapper">
          <h3 class="branch-section-title">Lista de Sucursales</h3>
          <div class="branch-title-underline"></div>
        </div>
        <div class="branch-results-count">
          <span class="branch-count-badge">
            <i class="fa-solid fa-list-check"></i>
            {{ sucursalStore.filteredBranches.length }} sucursal{{ sucursalStore.filteredBranches.length !== 1 ? 'es' : '' }}
          </span>
        </div>
      </div>

      <div class="branch-cards-container">
        <div v-if="sucursalStore.filteredBranches.length === 0" class="branch-no-data-container">
          <div class="branch-no-data-illustration">
            <i class="fa-solid fa-store-slash branch-no-data-icon"></i>
            <div class="branch-no-data-circle branch-no-data-circle-1"></div>
            <div class="branch-no-data-circle branch-no-data-circle-2"></div>
          </div>
          <p class="branch-no-data-text">No se encontraron sucursales</p>
          <p class="branch-no-data-subtext">Intenta ajustar los filtros de búsqueda o agrega una nueva sucursal</p>
        </div>

        <transition-group v-else name="branch-card-fade" tag="div" class="branch-cards-grid">
          <q-card
            v-for="branch in sucursalStore.filteredBranches"
            :key="branch.id"
            class="branch-speciality-card"
          >
            <!-- Image Section -->
            <div class="branch-card-image-container">
              <img
                v-if="branch.imagen"
                :src="`http://localhost:5050${branch.imagen}`"
                :alt="branch.nombre"
                class="branch-card-image"
                @error="sucursalStore.handleImageError"
              />
              <div v-else class="branch-card-image-placeholder">
                <i class="fa-solid fa-building"></i>
              </div>
              <div class="branch-image-overlay"></div>
              
              <!-- Location Badge -->
              <div class="branch-card-location-badge">
                <i class="fa-solid fa-location-dot"></i>
                {{ branch.ubicacion }}
              </div>

              <!-- Status Badge -->
              <div class="branch-card-status-badge" :class="branch.activo ? 'active' : 'inactive'">
                <i class="fa-solid" :class="branch.activo ? 'fa-check' : 'fa-pause'"></i>
                {{ branch.activo ? 'Activa' : 'Inactiva' }}
              </div>
            </div>

            <!-- Content Section -->
            <q-card-section class="branch-card-content">
              <h4 class="branch-card-title">{{ branch.nombre }}</h4>
              
              <div class="branch-info-grid">
                <div class="branch-info-item">
                  <div class="branch-info-icon">
                    <i class="fa-solid fa-map-marker-alt"></i>
                  </div>
                  <div class="branch-info-content">
                    <div class="branch-info-label">Dirección</div>
                    <div class="branch-info-value">{{ branch.direccion }}</div>
                  </div>
                </div>

                <div class="branch-info-item">
                  <div class="branch-info-icon">
                    <i class="fa-solid fa-circle-info"></i>
                  </div>
                  <div class="branch-info-content">
                    <div class="branch-info-label">Descripción</div>
                    <div class="branch-info-value">{{ truncateText(branch.descripcion, 60) }}</div>
                  </div>
                </div>
              </div>
            </q-card-section>

            <!-- Actions Section -->
            <q-separator />
            <q-card-actions class="branch-card-actions">
              <q-btn
                flat
                dense
                icon="fa-solid fa-eye"
                label="Ver"
                @click="sucursalStore.openDetailDialog(branch)"
                class="branch-action-btn branch-view-btn"
                no-caps
                size="sm"
              />
              <q-btn
                flat
                dense
                icon="fa-solid fa-edit"
                label="Editar"
                @click="sucursalStore.openEditDialog(branch)"
                class="branch-action-btn branch-edit-btn"
                no-caps
                size="sm"
              />
              <q-btn
                flat
                dense
                icon="fa-solid fa-trash"
                label="Eliminar"
                @click="sucursalStore.confirmDeleteBranch(branch)"
                class="branch-action-btn branch-delete-btn"
                no-caps
                size="sm"
              />
            </q-card-actions>
          </q-card>
        </transition-group>
      </div>
    </div>

    <!-- Dialogs -->
    <DetailBranchDialog
      v-model="sucursalStore.showDetailDialog"
      :branch-data="sucursalStore.selectedBranch"
      @edit-branch="sucursalStore.openEditDialog"
      @close="sucursalStore.closeDetailDialog"
    />

    <EditBranchDialog
      v-model="sucursalStore.showEditDialog"
      :branch-data="sucursalStore.selectedBranch"
      @branch-updated="async ({ id, data, file }) => {
        const updated = await sucursalStore.actualizar(id, data, file)
        sucursalStore.closeEditDialog()          // cerrar el diálogo
        sucursalStore.setSelectedBranch(updated) // opcional, mantener la sucursal seleccionada
      }"
      @close="sucursalStore.closeEditDialog"
    />


    <NewBranchDialog
      v-model="sucursalStore.showNewDialog"
      @branch-created="({ data, file }) => sucursalStore.crear(data, file)"
      @close="sucursalStore.closeNewDialog"
    />

    <!-- Delete Confirmation Dialog -->
    <q-dialog v-model="sucursalStore.showDeleteDialog" persistent>
      <q-card class="branch-confirm-dialog">
        <q-card-section class="branch-dialog-header">
          <div class="branch-dialog-icon-container">
            <i class="fa-solid fa-exclamation-triangle branch-dialog-icon"></i>
          </div>
          <h3 class="branch-dialog-title">Confirmar Eliminación</h3>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p class="branch-dialog-text">
            ¿Está seguro que desea eliminar la sucursal <strong>{{ sucursalStore.selectedBranch?.nombre }}</strong>?
          </p>
          <p class="branch-dialog-subtext">
            Esta acción no se puede deshacer y la sucursal será removida del sistema.
          </p>
        </q-card-section>

        <q-card-actions class="branch-dialog-actions">
          <q-btn 
            flat 
            label="Cancelar" 
            color="grey-7" 
            @click="sucursalStore.closeDeleteDialog" 
            no-caps
            class="branch-dialog-btn"
          />
          <q-btn 
            unelevated
            label="Eliminar Sucursal" 
            color="negative" 
            @click="sucursalStore.eliminar(sucursalStore.selectedBranch.id)"
            no-caps
            class="branch-dialog-btn branch-dialog-delete-btn"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useSucursalStore } from 'src/stores/sucursalStore'
import DetailBranchDialog from './DetailBranchDialog.vue'
import EditBranchDialog from './EditBranchDialog.vue'
import NewBranchDialog from './NewBranchDialog.vue'

// Inicializamos el store
const sucursalStore = useSucursalStore()

// Contadores activos e inactivos usando computed
const activeBranchesCount = computed(() => sucursalStore.sucursalesActivas.length)
const inactiveBranchesCount = computed(() => sucursalStore.sucursalesInactivas.length)

// Función de truncar texto (para las cards)
const truncateText = (text, maxLength) => {
  if (!text) return ''
  return text.length <= maxLength ? text : text.substring(0, maxLength) + '...'
}

// Cargar las sucursales al montar la página
onMounted(() => {
  sucursalStore.listar()
})
</script>
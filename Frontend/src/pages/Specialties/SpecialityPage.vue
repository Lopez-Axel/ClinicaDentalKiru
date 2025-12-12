<template>
  <div class="specialty-page-container">
    <!-- Header Section -->
    <div class="specialty-page-header">
      <div class="specialty-header-background">
        <div class="specialty-header-shape specialty-header-shape-1"></div>
        <div class="specialty-header-shape specialty-header-shape-2"></div>
      </div>
      <div class="specialty-header-content">
        <div class="specialty-title-section">
          <div class="specialty-icon-wrapper">
            <i class="fa-solid fa-tooth specialty-header-icon"></i>
          </div>
          <div>
            <h1 class="specialty-page-title">Gestión de Especialidades</h1>
            <p class="specialty-page-subtitle">Configure y administre los servicios odontológicos de su clínica</p>
          </div>
        </div>
        <q-btn
          class="specialty-primary-btn"
          color="primary"
          icon="fa-solid fa-plus"
          label="Agregar Especialidad"
          @click="openNewSpecialityDialog"
          unelevated
          no-caps
          size="md"
        />
      </div>
    </div>

    <!-- Search Section -->
    <div class="specialty-search-section">
      <div class="specialty-search-container">
        <q-input
          v-model="store.search"
          class="specialty-search-input"
          outlined
          type="search"
          placeholder="Buscar especialidades por nombre o descripción..."
          @update:model-value="store.applySearch"
          clearable
        >
          <template v-slot:prepend>
            <i class="fa-solid fa-search specialty-search-icon"></i>
          </template>
        </q-input>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="specialty-content-layout">
      <!-- Left Side - Info and Stats -->
      <div class="specialty-info-section">
        <div class="specialty-info-card">
          <div class="specialty-info-header">
            <div class="specialty-info-icon-container">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <h2 class="specialty-info-title">Panel de Especialidades</h2>
          </div>
          <div class="specialty-info-content">
            <p class="specialty-info-description">
              Administre el catálogo completo de especialidades odontológicas disponibles 
              en su clínica. Cada especialidad puede ser editada, visualizada o eliminada 
              según las necesidades de su práctica dental.
            </p>
            
            <div class="specialty-stats-grid">
              <div class="specialty-stat-item">
                <div class="specialty-stat-icon">
                  <i class="fa-solid fa-clipboard-list"></i>
                </div>
                <div class="specialty-stat-content">
                  <div class="specialty-stat-value">{{ store.searchResults.length }}</div>
                  <div class="specialty-stat-label">Especialidades Registradas</div>
                </div>
              </div>
              <div class="specialty-stat-item">
                <div class="specialty-stat-icon">
                  <i class="fa-solid fa-file-invoice"></i>
                </div>
                <div class="specialty-stat-content">
                  <div class="specialty-stat-value">{{ store.totalPaginas }}</div>
                  <div class="specialty-stat-label">Páginas Disponibles</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Branding Circle -->
        <div class="specialty-branding-card">
          <div class="specialty-branding-circle">
            <div class="specialty-branding-glow"></div>
            <q-img
              src="/KiruIMG/speciality.png"
              spinner-color="primary"
              fit="contain"
              class="specialty-brand-image"
            />
          </div>
          <p class="specialty-branding-text">Sistema de Gestión Dental</p>
          <div class="specialty-branding-badge">
            <i class="fa-solid fa-shield-heart"></i>
            <span>Profesional</span>
          </div>
        </div>
      </div>

      <!-- Right Side - Specialities Grid -->
      <div class="specialty-specialities-section">
        <div class="specialty-section-header">
          <div class="specialty-section-title-wrapper">
            <h3 class="specialty-section-title">Catálogo de Especialidades</h3>
            <div class="specialty-title-underline"></div>
          </div>
          <div class="specialty-results-count">
            <span class="specialty-count-badge">
              <i class="fa-solid fa-list-check"></i>
              {{ store.searchResults.length }} especialidad{{ store.searchResults.length !== 1 ? 'es' : '' }}
            </span>
          </div>
        </div>

        <div class="specialty-cards-container">
          <div v-if="store.especialidadesPaginaActual.length === 0" class="specialty-no-data-container">
            <div class="specialty-no-data-illustration">
              <i class="fa-solid fa-tooth specialty-no-data-icon"></i>
              <div class="specialty-no-data-circle specialty-no-data-circle-1"></div>
              <div class="specialty-no-data-circle specialty-no-data-circle-2"></div>
            </div>
            <p class="specialty-no-data-text">No se encontraron especialidades</p>
            <p class="specialty-no-data-subtext">Intenta ajustar los filtros de búsqueda o agrega una nueva especialidad</p>
          </div>
          
          <transition-group v-else name="specialty-card-fade" tag="div" class="specialty-cards-grid">
            <div 
              v-for="speciality in store.especialidadesPaginaActual" 
              :key="speciality.id"
              class="specialty-speciality-card"
            >
              <div class="specialty-card-image-container">
                <q-img 
                  :src="speciality.image || 'https://i.pinimg.com/originals/ea/d5/5a/ead55a380087931b94a3968f54d8fbda.jpg'"
                  :ratio="4/3"
                  spinner-color="primary"
                  @error="handleImageError"
                  class="specialty-card-image"
                >
                  <div class="specialty-image-overlay"></div>
                </q-img>
                <div class="specialty-card-badge">
                  <i class="fa-solid fa-star"></i>
                </div>
              </div>
              
              <div class="specialty-card-content">
                <h4 class="specialty-card-title">{{ speciality.nombre }}</h4>
                <p class="specialty-card-description">{{ truncateText(speciality.descripcion, 80) }}</p>
                
                <div class="specialty-card-actions">
                  <q-btn 
                    flat 
                    dense
                    icon="fa-solid fa-eye"
                    label="Ver"
                    @click="viewSpeciality(speciality)"
                    class="specialty-action-btn specialty-view-btn"
                    no-caps
                  />
                  <q-btn 
                    flat 
                    dense
                    icon="fa-solid fa-edit"
                    label="Editar"
                    color="primary"
                    @click="editSpeciality(speciality)"
                    class="specialty-action-btn specialty-edit-btn"
                    no-caps
                  />
                  <q-btn 
                    flat 
                    dense
                    icon="fa-solid fa-trash"
                    label="Eliminar"
                    color="negative"
                    @click="confirmDeleteSpeciality(speciality)"
                    class="specialty-action-btn specialty-delete-btn"
                    no-caps
                  />
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <!-- Pagination Controls -->
        <div class="specialty-pagination-section" v-if="store.totalPaginas > 1">
          <div class="specialty-pagination-controls">
            <q-btn
              flat
              round
              dense
              icon="fa-solid fa-chevron-left"
              :disable="store.paginaActual === 0"
              @click="store.paginaAnterior"
              class="specialty-pagination-btn"
              color="primary"
            />
            
            <div class="specialty-pagination-pages">
              <q-btn
                v-for="page in store.paginasVisibles"
                :key="page"
                flat
                dense
                :label="page === '...' ? '...' : page + 1"
                @click="() => page !== '...' && store.irAPagina(page)"
                :class="['specialty-page-btn', { 'specialty-active': store.paginaActual === page }]"
                :color="store.paginaActual === page ? 'primary' : 'grey-7'"
                :disabled="page === '...'"
              />
            </div>
            
            <q-btn
              flat
              round
              dense
              icon="fa-solid fa-chevron-right"
              :disable="store.paginaActual === store.totalPaginas - 1"
              @click="store.siguientePagina"
              class="specialty-pagination-btn"
              color="primary"
            />
          </div>
          
          <div class="specialty-pagination-info">
            <i class="fa-solid fa-info-circle"></i>
            Página {{ store.paginaActual + 1 }} de {{ store.totalPaginas }} • Mostrando {{ store.especialidadesPaginaActual.length }} de {{ store.searchResults.length }}
          </div>
        </div>
      </div>
    </div>

    <!-- Dialogs -->
    <DetailSpecialityDialog
      v-model="showDetailDialog"
      :speciality-data="selectedSpeciality"
      @edit-speciality="editSpeciality"
    />

    <EditSpecialityDialog
      v-model="showEditDialog"
      :speciality-data="selectedSpeciality"
      @speciality-updated="handleSpecialityUpdate"
    />

    <NewSpecialityDialog
      v-model="showNewDialog"
      @speciality-created="handleSpecialityCreate"
    />

    <!-- Delete Confirmation Dialog -->
    <q-dialog v-model="showDeleteDialog" persistent>
      <q-card class="specialty-confirm-dialog">
        <q-card-section class="specialty-dialog-header">
          <div class="specialty-dialog-icon-container">
            <i class="fa-solid fa-exclamation-triangle specialty-dialog-icon"></i>
          </div>
          <h3 class="specialty-dialog-title">Confirmar Eliminación</h3>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p class="specialty-dialog-text">
            ¿Está seguro que desea eliminar la especialidad <strong>{{ selectedSpeciality?.nombre }}</strong>?
          </p>
          <p class="specialty-dialog-subtext">
            Esta acción no se puede deshacer y la especialidad dejará de estar disponible en el sistema.
          </p>
        </q-card-section>

        <q-card-actions class="specialty-dialog-actions">
          <q-btn 
            flat 
            label="Cancelar" 
            color="grey-7" 
            v-close-popup 
            no-caps
            class="specialty-dialog-btn"
          />
          <q-btn 
            unelevated
            label="Eliminar Especialidad" 
            color="negative" 
            @click="deleteSpeciality"      
            v-close-popup 
            no-caps
            class="specialty-dialog-btn specialty-dialog-delete-btn"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useEspecialidadStore } from 'src/stores/especialidadStore'
import DetailSpecialityDialog from './DetailSpecialityDialog.vue'
import EditSpecialityDialog from './EditSpecialityDialog.vue'
import NewSpecialityDialog from './NewSpecialityDialog.vue'

export default {
  name: 'SpecialityPage',
  components: {
    DetailSpecialityDialog,
    EditSpecialityDialog,
    NewSpecialityDialog
  },
  setup() {
    const store = useEspecialidadStore()

    const showDetailDialog = ref(false)
    const showEditDialog = ref(false)
    const showNewDialog = ref(false)
    const showDeleteDialog = ref(false)
    const selectedSpeciality = ref(null)

    const truncateText = (text, maxLength) => {
      if (!text) return ''
      return text.length <= maxLength ? text : text.substring(0, maxLength) + '...'
    }

    const handleImageError = (event) => {
      event.target.src = 'https://cdn.quasar.dev/img/parallax2.jpg'
    }

    const viewSpeciality = (speciality) => {
      selectedSpeciality.value = { ...speciality }
      showDetailDialog.value = true
    }

    const editSpeciality = (speciality) => {
      selectedSpeciality.value = { ...speciality }
      showEditDialog.value = true
      showDetailDialog.value = false
    }

    const openNewSpecialityDialog = () => {
      showNewDialog.value = true
    }

    const confirmDeleteSpeciality = (speciality) => {
      selectedSpeciality.value = { ...speciality }
      showDeleteDialog.value = true
    }

    const deleteSpeciality = async () => {
      if (selectedSpeciality.value) {
        await store.eliminarEspecialidad(selectedSpeciality.value.id)
        // No necesitas recargar porque el store ya actualiza el estado
      }
    }

    const handleSpecialityUpdate = async (updatedSpeciality) => {
      await store.actualizarEspecialidad(updatedSpeciality)
      showEditDialog.value = false
    }

    const handleSpecialityCreate = async (newSpeciality) => {
      await store.crearEspecialidad(newSpeciality)
      showNewDialog.value = false
    }

    onMounted(() => {
      store.cargarEspecialidades()
    })

    return {
      store,
      selectedSpeciality,
      showDetailDialog,
      showEditDialog,
      showNewDialog,
      showDeleteDialog,
      truncateText,
      handleImageError,
      viewSpeciality,
      editSpeciality,
      openNewSpecialityDialog,
      confirmDeleteSpeciality,
      deleteSpeciality,
      handleSpecialityUpdate,
      handleSpecialityCreate
    }
  }
}
</script>
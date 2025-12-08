<template>
  <q-dialog v-model="showDialog" maximized transition-show="slide-up" transition-hide="slide-down">
    <q-card class="detail-dialog">
      <!-- Header -->
      <q-card-section class="dialog-header bg-primary text-white">
        <div class="row items-center">
          <div class="col">
            <div class="text-h6">Detalles del Anuncio</div>
          </div>
          <div class="col-auto">
            <q-btn icon="close" flat round dense @click="closeDialog" color="white" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="dialog-content q-pt-lg">
        <div v-if="anuncioData" class="row q-col-gutter-xl">
          <!-- Columna Imagen -->
          <div class="col-12 col-md-5">
            <div class="image-section">
              <q-img
                v-if="anuncioData.imagen"
                :src="anuncioData.imagen"
                :alt="anuncioData.titulo"
                class="detail-image"
                ratio="1"
                @error="anuncioStore.handleImageError"
              />
              <div v-else class="no-image-placeholder large">
                <i class="fa-solid fa-image"></i>
                <span>Sin imagen</span>
              </div>
            </div>

            <!-- Información rápida -->
            <div class="quick-info q-mt-md">
              <q-list bordered class="rounded-borders">
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="category" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Categoría</q-item-label>
                    <q-item-label class="text-weight-bold">{{ anuncioData.categoria }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="person" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Autor</q-item-label>
                    <q-item-label class="text-weight-bold">{{ getUserName(anuncioData.userId) }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="info" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Estado</q-item-label>
                    <q-item-label>
                      <q-badge 
                        :class="anuncioStore.getStateClass(anuncioData.estado)" 
                        :label="anuncioStore.formatState(anuncioData.estado)" 
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>

          <!-- Columna Información -->
          <div class="col-12 col-md-7">
            <div class="info-section">
              <h2 class="text-h4 text-weight-bold q-mb-md">{{ anuncioData.titulo }}</h2>
              
              <!-- Fechas -->
              <div class="dates-section q-mb-lg">
                <div class="date-item">
                  <q-icon name="event_available" color="green" class="q-mr-sm" />
                  <span class="text-weight-bold">Publicación:</span>
                  <span class="q-ml-sm">{{ anuncioStore.formatDate(anuncioData.fecha_publicacion) }}</span>
                </div>
                <div class="date-item">
                  <q-icon name="event_busy" color="red" class="q-mr-sm" />
                  <span class="text-weight-bold">Expiración:</span>
                  <span class="q-ml-sm">{{ anuncioStore.formatDate(anuncioData.fecha_expiracion) }}</span>
                </div>
              </div>

              <!-- Descripción -->
              <div class="description-section q-mb-lg">
                <h5 class="text-h6 text-weight-bold q-mb-sm">Descripción</h5>
                <p class="text-body1 description-text">{{ anuncioData.descripcion }}</p>
              </div>

              <!-- Acciones -->
              <div class="actions-section">
                <q-btn
                  color="primary"
                  icon="edit"
                  label="Editar Anuncio"
                  @click="anuncioStore.openEditDialog(anuncioData)"
                  unelevated
                  no-caps
                  class="q-mr-sm"
                />
                <q-btn
                  color="secondary"
                  icon="share"
                  label="Compartir"
                  outline
                  no-caps
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { computed } from 'vue'
import { useAnuncioStore } from 'src/stores/anuncioStore'

export default {
  name: 'DetailAnuncioDialog',
  
  props: {
    modelValue: { type: Boolean, required: true },
    anuncioData: { type: Object, default: () => ({}) }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const anuncioStore = useAnuncioStore()

    const showDialog = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    const closeDialog = () => {
      showDialog.value = false
    }

    // Helper function to get user name (fallback if not in store)
    const getUserName = (userId) => {
      // Si el store tiene un método getUserName, úsalo
      if (anuncioStore.getUserName) {
        return anuncioStore.getUserName(userId)
      }
      // Si no, retorna un valor por defecto
      return `Usuario ${userId}`
    }

    return { 
      showDialog, 
      anuncioStore, 
      closeDialog,
      getUserName
    }
  }
}
</script>

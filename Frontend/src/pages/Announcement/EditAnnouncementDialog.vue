<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card class="edit-dialog" style="min-width: 600px; max-width: 800px;">
      <q-card-section class="dialog-header bg-primary text-white">
        <div class="row items-center">
          <div class="col">
            <div class="text-h6">Editar Anuncio</div>
          </div>
          <div class="col-auto">
            <q-btn icon="close" flat round dense @click="closeDialog" color="white" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-lg">
        <q-form @submit.prevent="updateAnuncio" class="q-gutter-md">
          <q-input
            v-model="formData.titulo"
            label="Título del anuncio *"
            outlined
            dense
            :rules="[val => !!val || 'El título es requerido']"
          />

          <q-select
            v-model="formData.categoria"
            :options="categorias"
            label="Categoría *"
            outlined
            dense
            :rules="[val => !!val || 'La categoría es requerida']"
          />

          <q-input
            v-model="formData.descripcion"
            label="Descripción *"
            type="textarea"
            rows="3"
            outlined
            dense
            :rules="[val => !!val || 'La descripción es requerida']"
          />

          <div class="row q-col-gutter-md">
            <div class="col-6">
              <q-input
                v-model="formData.fecha_publicacion"
                label="Fecha de publicación"
                type="date"
                outlined
                dense
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="formData.fecha_expiracion"
                label="Fecha de expiración"
                type="date"
                outlined
                dense
              />
            </div>
          </div>

          <q-input
            v-model="formData.imagen"
            label="URL de la imagen"
            outlined
            dense
            placeholder="https://ejemplo.com/imagen.jpg"
          />

          <q-option-group
            v-model="formData.estado"
            :options="estadoOptions"
            color="primary"
            inline
            label="Estado del anuncio"
          />

          <div v-if="formData.imagen" class="image-preview q-mt-md">
            <div class="text-caption text-weight-bold q-mb-xs">Vista previa:</div>
            <q-img
              :src="formData.imagen"
              style="max-height: 200px; max-width: 300px;"
              class="rounded-borders"
              @error="anuncioStore.handleImageError"
            />
          </div>

          <q-card-actions align="right" class="q-pt-md">
            <q-btn label="Cancelar" color="grey" @click="closeDialog" no-caps />
            <q-btn 
              label="Guardar Cambios" 
              type="submit" 
              color="primary" 
              unelevated 
              no-caps
              :disable="!isFormValid || loading"
              :loading="loading"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useAnuncioStore } from 'src/stores/anuncioStore'

export default {
  name: 'EditAnuncioDialog',

  props: {
    modelValue: { type: Boolean, required: true },
    anuncioData: { type: Object, default: () => ({}) }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const anuncioStore = useAnuncioStore()
    const loading = ref(false)

    const showDialog = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    const formData = ref({})

    const categorias = ['Promoción', 'Evento', 'Aviso', 'Noticia']
    const estadoOptions = [
      { label: 'Activo', value: 'activo' },
      { label: 'Inactivo', value: 'inactivo' }
    ]

    const isFormValid = computed(() =>
      formData.value.titulo && formData.value.descripcion && formData.value.categoria
    )

    const loadAnuncioData = () => {
      if (props.anuncioData && Object.keys(props.anuncioData).length > 0) {
        formData.value = {
          ...props.anuncioData,
          fecha_publicacion: props.anuncioData.fecha_publicacion 
            ? (props.anuncioData.fecha_publicacion.split('T')[0] || props.anuncioData.fecha_publicacion)
            : '',
          fecha_expiracion: props.anuncioData.fecha_expiracion 
            ? (props.anuncioData.fecha_expiracion.split('T')[0] || props.anuncioData.fecha_expiracion)
            : ''
        }
      }
    }

    const closeDialog = () => {
      showDialog.value = false
    }

    const updateAnuncio = async () => {
      if (!isFormValid.value) return
      
      loading.value = true
      try {
        await anuncioStore.actualizarAnuncio(formData.value)
        closeDialog()
      } catch (error) {
        console.error('Error updating anuncio:', error)
        // Aquí podrías agregar una notificación de error si tienes un sistema de notificaciones
      } finally {
        loading.value = false
      }
    }

    // Load data when dialog opens
    watch(() => props.modelValue, (val) => {
      if (val) {
        loadAnuncioData()
      }
    }, { immediate: true })

    return {
      showDialog,
      formData,
      categorias,
      estadoOptions,
      anuncioStore,
      isFormValid,
      updateAnuncio,
      closeDialog,
      loading
    }
  }
}
</script>

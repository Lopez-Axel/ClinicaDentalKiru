<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card class="new-dialog" style="min-width: 600px; max-width: 800px;">
      <q-card-section class="dialog-header bg-primary text-white">
        <div class="row items-center">
          <div class="col">
            <div class="text-h6">Nuevo Anuncio</div>
          </div>
          <div class="col-auto">
            <q-btn icon="close" flat round dense @click="closeDialog" color="white" />
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-lg">
        <q-form @submit.prevent="createAnuncio" class="q-gutter-md">
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
              label="Crear Anuncio" 
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
  name: 'NewAnuncioDialog',

  props: {
    modelValue: { type: Boolean, required: true }
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const anuncioStore = useAnuncioStore()
    const loading = ref(false)

    const showDialog = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    const formData = ref({
      titulo: '',
      descripcion: '',
      categoria: 'Promoción',
      fecha_publicacion: new Date().toISOString().split('T')[0],
      fecha_expiracion: '',
      imagen: '',
      estado: 'activo',
      userId: 1
    })

    const categorias = ['Promoción', 'Evento', 'Aviso', 'Noticia']
    const estadoOptions = [
      { label: 'Activo', value: 'activo' },
      { label: 'Inactivo', value: 'inactivo' }
    ]

    const isFormValid = computed(() =>
      formData.value.titulo && formData.value.descripcion && formData.value.categoria
    )

    const resetForm = () => {
      formData.value = {
        titulo: '',
        descripcion: '',
        categoria: 'Promoción',
        fecha_publicacion: new Date().toISOString().split('T')[0],
        fecha_expiracion: '',
        imagen: '',
        estado: 'activo',
        userId: 1
      }
    }

    const closeDialog = () => {
      showDialog.value = false
      resetForm()
    }

    const createAnuncio = async () => {
      if (!isFormValid.value) return

      loading.value = true
      try {
        const payload = {
          titulo: formData.value.titulo,
          descripcion: formData.value.descripcion || null,
          categoria: formData.value.categoria || null,
          fecha_publicacion: formData.value.fecha_publicacion, // solo "YYYY-MM-DD"
          fecha_expiracion: formData.value.fecha_expiracion || null, // "YYYY-MM-DD" o null
          imagen: formData.value.imagen || null, // si no tienes URL, envía null
          estado: formData.value.estado,
          userId: Number(formData.value.userId)
        }

        console.log('CREAR ANUNCIO - payload:', payload)
        await anuncioStore.agregarAnuncio(payload)
        closeDialog()
      } catch (error) {
        console.error('Error creando anuncio:', error)
      } finally {
        loading.value = false
      }
    }

    // Watch for dialog opening to reset form
    watch(() => props.modelValue, (val) => {
      if (val) {
        resetForm()
      }
    })

    return {
      showDialog,
      formData,
      categorias,
      estadoOptions,
      anuncioStore,
      isFormValid,
      createAnuncio,
      closeDialog,
      loading
    }
  }
}
</script>

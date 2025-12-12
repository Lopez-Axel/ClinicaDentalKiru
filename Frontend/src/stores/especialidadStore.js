import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Fuse from 'fuse.js'
import { especialidadService } from 'src/services/especialidadService'

export const useEspecialidadStore = defineStore('especialidad', () => {
  const especialidades = ref([])
  const search = ref('')
  const searchResults = ref([])
  const fuse = ref(null)
  const paginaActual = ref(0)
  const itemsPorPagina = 4

  const fuseOptions = {
    keys: ['nombre', 'descripcion'],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 1
  }

  // -----------------------------
  // Computed
  // -----------------------------
  const totalPaginas = computed(() => Math.ceil(searchResults.value.length / itemsPorPagina))
  const especialidadesPaginaActual = computed(() => {
    const inicio = paginaActual.value * itemsPorPagina
    return searchResults.value.slice(inicio, inicio + itemsPorPagina)
  })

  const paginasVisibles = computed(() => {
    const total = totalPaginas.value
    const actual = paginaActual.value
    const paginas = []

    if (total <= 7) {
      for (let i = 0; i < total; i++) paginas.push(i)
    } else {
      if (actual <= 3) {
        for (let i = 0; i < 5; i++) paginas.push(i)
        paginas.push('...')
        paginas.push(total - 1)
      } else if (actual >= total - 4) {
        paginas.push(0)
        paginas.push('...')
        for (let i = total - 5; i < total; i++) paginas.push(i)
      } else {
        paginas.push(0)
        paginas.push('...')
        for (let i = actual - 1; i <= actual + 1; i++) paginas.push(i)
        paginas.push('...')
        paginas.push(total - 1)
      }
    }

    return paginas
  })

  // -----------------------------
  // CRUD
  // -----------------------------
  const cargarEspecialidades = async () => {
    try {
      const { data } = await especialidadService.getAll()
      especialidades.value = data || []
      rebuildFuse()
    } catch (error) {
      console.error('Error cargando especialidades:', error)
    }
  }

  const crearEspecialidad = async (nuevaEspecialidad) => {
    try {
      const { data } = await especialidadService.create(nuevaEspecialidad)
      especialidades.value.push(data)
      rebuildFuse()
    } catch (error) {
      console.error('Error creando especialidad:', error)
    }
  }

  const actualizarEspecialidad = async (especialidadActualizada) => {
    try {
      await especialidadService.update(especialidadActualizada.id, especialidadActualizada)
      const index = especialidades.value.findIndex(e => e.id === especialidadActualizada.id)
      if (index > -1) especialidades.value[index] = { ...especialidadActualizada }
      rebuildFuse()
    } catch (error) {
      console.error('Error actualizando especialidad:', error)
    }
  }

  const eliminarEspecialidad = async (id) => {
    try {
      await especialidadService.delete(id)
      const index = especialidades.value.findIndex(e => e.id === id)
      if (index > -1) especialidades.value[index].estado = 'inactivo'
      rebuildFuse()
    } catch (error) {
      console.error('Error eliminando especialidad:', error)
    }
  }

  // -----------------------------
  // Fuse.js
  // -----------------------------
  const rebuildFuse = () => {
    const activos = especialidades.value.filter(e => e.estado !== 'inactivo')
    fuse.value = new Fuse(activos, fuseOptions)
    applySearch()
  }

  const applySearch = () => {
    const activos = especialidades.value.filter(e => e.estado !== 'inactivo')
    if (!search.value || search.value.trim() === '') {
      searchResults.value = activos
    } else if (fuse.value) {
      searchResults.value = fuse.value.search(search.value.trim()).map(r => r.item)
    } else {
      searchResults.value = activos
    }
    paginaActual.value = 0
  }

  // -----------------------------
  // Paginación
  // -----------------------------
  const siguientePagina = () => { if (paginaActual.value < totalPaginas.value - 1) paginaActual.value++ }
  const paginaAnterior = () => { if (paginaActual.value > 0) paginaActual.value-- }
  const irAPagina = (pagina) => { if (pagina !== '...' && pagina >= 0 && pagina < totalPaginas.value) paginaActual.value = pagina }

  return {
    especialidades,
    search,
    searchResults,
    fuse,
    paginaActual,
    totalPaginas,
    especialidadesPaginaActual,
    paginasVisibles,
    cargarEspecialidades,
    crearEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad,
    rebuildFuse,
    applySearch,
    siguientePagina,
    paginaAnterior,
    irAPagina
  }
})

// src/stores/sucursalStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Fuse from 'fuse.js'
import { sucursalService } from '../services/sucursalService' // Axios + backend

const FUSE_OPTIONS = {
  keys: ['nombre', 'ubicacion', 'direccion', 'descripcion'],
  threshold: 0.3
}

export const useSucursalStore = defineStore('sucursal', () => {
  // Estados
  const sucursales = ref([])
  const filteredBranches = ref([])
  const search = ref('')
  const selectedBranch = ref(null)
  const loading = ref(false)
  const fuse = ref(null)

  // Diálogos
  const showDetailDialog = ref(false)
  const showEditDialog = ref(false)
  const showNewDialog = ref(false)
  const showDeleteDialog = ref(false)

  // ================= CRUD =================
  const listar = async () => {
    loading.value = true
    try {
      const res = await sucursalService.getAll()
      sucursales.value = res.data
      filteredBranches.value = [...sucursales.value]
      rebuildFuse()
    } catch (err) {
      console.error('Error al listar sucursales:', err)
    } finally {
      loading.value = false
    }
  }

  const obtenerPorId = async (id) => {
    try {
      const res = await sucursalService.getById(id)
      return res.data
    } catch (err) {
      console.error('Error al obtener sucursal:', err)
    }
  }

  const crear = async (data, file) => {
    try {
      const res = await sucursalService.create(data, file)
      sucursales.value.push(res.data)
      filteredBranches.value.push(res.data)
      rebuildFuse()
      return res.data
    } catch (err) {
      console.error('Error al crear sucursal:', err)
    }
  }

  const actualizar = async (id, data, file) => {
    try {
      const res = await sucursalService.update(id, data, file)
      const index = sucursales.value.findIndex(s => s.id === id)
      if (index !== -1) sucursales.value[index] = res.data
      rebuildFuse()
      filterBranches()
      return res.data
    } catch (err) {
      console.error('Error al actualizar sucursal:', err)
    }
  }

  const eliminar = async (id) => {
    try {
      await sucursalService.delete(id)
      sucursales.value = sucursales.value.filter(s => s.id !== id)
      filteredBranches.value = filteredBranches.value.filter(s => s.id !== id)
    } catch (err) {
      console.error('Error al eliminar sucursal:', err)
    }
  }

  // ================ Filtro Fuse =================
  const rebuildFuse = () => {
    fuse.value = new Fuse(sucursales.value, FUSE_OPTIONS)
  }

  const filterBranches = () => {
    if (!search.value.trim()) {
      filteredBranches.value = [...sucursales.value]
      return
    }
    const results = fuse.value.search(search.value.trim())
    filteredBranches.value = results.map(r => r.item)
  }

  const setSearch = (value) => {
    search.value = value
    filterBranches()
  }

  // ================ Diálogos =================
  const setSelectedBranch = (branch) => selectedBranch.value = branch ? { ...branch } : null

  const openDetailDialog = (branch) => { setSelectedBranch(branch); showDetailDialog.value = true }
  const closeDetailDialog = () => { showDetailDialog.value = false; setSelectedBranch(null) }

  const openEditDialog = (branch) => { setSelectedBranch(branch); showEditDialog.value = true }
  const closeEditDialog = () => { showEditDialog.value = false; setSelectedBranch(null) }

  const openNewDialog = () => showNewDialog.value = true
  const closeNewDialog = () => showNewDialog.value = false

  const confirmDeleteBranch = (branch) => { setSelectedBranch(branch); showDeleteDialog.value = true }
  const closeDeleteDialog = () => { showDeleteDialog.value = false; setSelectedBranch(null) }

  const closeAllDialogs = () => {
    showDetailDialog.value = false
    showEditDialog.value = false
    showNewDialog.value = false
    showDeleteDialog.value = false
    setSelectedBranch(null)
  }

  // ================ Utilidades =================
  const getImagePath = (imagePath) => {
    if (!imagePath) return null
    // Si ya es URL completa, úsala tal cual
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) return `http://localhost:5050${imagePath}`
    // Sino, construye la ruta completa
    return `http://localhost:5050/${imagePath}`
  }

  const handleImageError = (event) => { event.target.style.display = 'none' }

  // ================= Computed =================
  const totalSucursales = computed(() => sucursales.value.length)
  const sucursalesActivas = computed(() => sucursales.value.filter(s => s.activo))
  const sucursalesInactivas = computed(() => sucursales.value.filter(s => !s.activo))
  const ciudadesUnicas = computed(() => [...new Set(sucursales.value.map(s => s.ubicacion))])
  const isAnyDialogOpen = computed(() => showDetailDialog.value || showEditDialog.value || showNewDialog.value || showDeleteDialog.value)

  return {
    sucursales,
    filteredBranches,
    search,
    selectedBranch,
    loading,
    fuse,
    showDetailDialog,
    showEditDialog,
    showNewDialog,
    showDeleteDialog,
    totalSucursales,
    sucursalesActivas,
    sucursalesInactivas,
    ciudadesUnicas,
    isAnyDialogOpen,

    listar,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    filterBranches,
    setSearch,
    setSelectedBranch,
    openDetailDialog,
    closeDetailDialog,
    openEditDialog,
    closeEditDialog,
    openNewDialog,
    closeNewDialog,
    confirmDeleteBranch,
    closeDeleteDialog,
    closeAllDialogs,
    getImagePath,
    handleImageError
  }
})

// src/stores/anuncioStore.js
import { defineStore } from 'pinia'
import Fuse from 'fuse.js'
import { anuncioService } from 'src/services/anuncioService'

export const useAnuncioStore = defineStore('anuncioStore', {
  state: () => ({
    anuncios: [],
    search: '',
    searchResults: [],
    fuse: null,
    selectedAnuncio: null,

    // diálogos
    showNewDialog: false,
    showEditDialog: false,
    showDetailDialog: false,
    showDeleteDialog: false,
  }),

  getters: {
    totalAnuncios: (state) => state.anuncios.length,

    activeAnunciosCount: (state) =>
      state.anuncios.filter(a => a.estado === 'activo').length,

    inactiveAnunciosCount: (state) =>
      state.anuncios.filter(a => a.estado === 'inactivo').length,

    uniqueCategories: (state) =>
      [...new Set(state.anuncios.map(a => a.categoria))],
  },

  actions: {
    // ---------- INIT ----------
    async initialize() {
      await this.fetchAnuncios()
      this.rebuildFuse()
    },

    // ---------- CRUD ----------
    async fetchAnuncios() {
      try {
        const { data } = await anuncioService.getAll()
        this.anuncios = data || []
        this.applySearch()
      } catch (error) {
        console.error('Error fetching anuncios:', error)
        this.anuncios = []
        this.applySearch()
        throw error
      }
    },

    async agregarAnuncio(anuncio) {
      try {
        const { data } = await anuncioService.create(anuncio)
        this.anuncios.push(data)
        this.rebuildFuse()
        this.closeDialogs()
        return data
      } catch (error) {
        console.error('Error creating anuncio:', error)
        throw error
      }
    },

    async actualizarAnuncio(anuncio) {
      try {
        if (!anuncio || !anuncio.id) {
          throw new Error('Anuncio ID is required')
        }
        const { data } = await anuncioService.update(anuncio.id, anuncio)
        const idx = this.anuncios.findIndex(a => a.id === anuncio.id)
        if (idx !== -1) {
          this.anuncios[idx] = data
        } else {
          this.anuncios.push(data)
        }
        this.rebuildFuse()
        this.closeDialogs()
        return data
      } catch (error) {
        console.error('Error updating anuncio:', error)
        throw error
      }
    },

    async eliminarAnuncio() {
      try {
        if (!this.selectedAnuncio || !this.selectedAnuncio.id) {
          throw new Error('No anuncio selected for deletion')
        }
        await anuncioService.delete(this.selectedAnuncio.id)
        this.anuncios = this.anuncios.filter(a => a.id !== this.selectedAnuncio.id)
        this.rebuildFuse()
        this.closeDialogs()
        this.selectedAnuncio = null
      } catch (error) {
        console.error('Error deleting anuncio:', error)
        throw error
      }
    },

    // ---------- Search ----------
    rebuildFuse() {
      this.fuse = new Fuse(this.anuncios, {
        keys: ['titulo', 'descripcion', 'categoria'],
        threshold: 0.3
      })

      this.applySearch()
    },

    applySearch() {
      if (!this.search) {
        this.searchResults = [...this.anuncios]
      } else {
        if (this.fuse) {
          this.searchResults = this.fuse.search(this.search).map(r => r.item)
        } else {
          this.searchResults = [...this.anuncios]
        }
      }
    },

    // ---------- Dialogs ----------
    openNewDialog() { this.showNewDialog = true },
    openEditDialog(anuncio) { 
      this.selectedAnuncio = anuncio
      this.showEditDialog = true 
    },
    openDetailDialog(anuncio) { 
      this.selectedAnuncio = anuncio
      this.showDetailDialog = true 
    },
    confirmDeleteAnuncio(anuncio) {
      this.selectedAnuncio = anuncio
      this.showDeleteDialog = true
    },

    closeDialogs() {
      this.showNewDialog = false
      this.showEditDialog = false
      this.showDetailDialog = false
      this.showDeleteDialog = false
    },

    closeDeleteDialog() { this.showDeleteDialog = false },

    // ---------- Utils ----------
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },

    formatState(state) {
      return state === 'activo' ? 'Activo' : 'Inactivo'
    },

    getStateClass(state) {
      return state === 'activo' ? 'active' : 'inactive'
    },

    handleImageError(e) {
      e.target.src = '/default-image.png'
    }
  }
})

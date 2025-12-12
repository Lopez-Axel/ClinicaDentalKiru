<template>
  <q-page class="home-index-page">
    <!-- Hero Section -->
    <section class="home-hero-section">
      <div class="home-hero-background">
        <div class="home-hero-shape home-hero-shape-1"></div>
        <div class="home-hero-shape home-hero-shape-2"></div>
        <div class="home-hero-shape home-hero-shape-3"></div>
      </div>
      
      <q-container class="q-pa-xl">
        <div class="row items-center q-col-gutter-xl">
          <div class="col-12 col-md-6">
            <div class="home-hero-badge animated fadeInDown">
              <q-icon name="verified" size="20px" />
              <span>Profesionales certificados</span>
            </div>
            
            <h1 class="home-hero-title animated fadeInLeft">
              Tu sonrisa es nuestra 
              <span class="home-hero-highlight">prioridad</span>
            </h1>
            
            <p class="home-hero-subtitle animated fadeInLeft" style="animation-delay: 0.2s">
              En KIRU Odontología ofrecemos tratamientos de calidad con tecnología de vanguardia. 
              Nuestro equipo de profesionales está comprometido con tu salud dental y tu bienestar.
            </p>
            
            <div class="home-hero-features animated fadeInUp" style="animation-delay: 0.3s">
              <div class="home-feature-item">
                <q-icon name="check_circle" color="primary" size="24px" />
                <span>Tecnología avanzada</span>
              </div>
              <div class="home-feature-item">
                <q-icon name="check_circle" color="primary" size="24px" />
                <span>Atención personalizada</span>
              </div>
              <div class="home-feature-item">
                <q-icon name="check_circle" color="primary" size="24px" />
                <span>Resultados garantizados</span>
              </div>
            </div>
            
            <div class="home-hero-actions animated fadeInUp" style="animation-delay: 0.4s">
              <q-btn 
                color="primary" 
                size="lg" 
                label="Agendar Cita" 
                icon="calendar_today"
                @click="openAppointmentDialog"
                unelevated
                no-caps
                class="home-primary-btn"
              />
              <q-btn 
                flat
                color="primary" 
                size="lg" 
                label="Ver Servicios"
                to="/services"
                no-caps
                class="home-secondary-btn"
              >
                <q-icon name="arrow_forward" size="20px" class="q-ml-sm" />
              </q-btn>
            </div>
          </div>
          
          <div class="col-12 col-md-6">
            <div class="home-hero-image-wrapper animated zoomIn" style="animation-delay: 0.3s">
              <div class="home-hero-glow"></div>
              <div class="home-hero-image-container">
                <q-img
                  src="/KiruIMG/inicio.png"
                  alt="Sonrisa perfecta"
                  class="home-hero-image"
                  fit="contain"
                />
              </div>
              
              <div class="home-floating-elements">
                <div class="home-floating-card home-floating-card-1">
                  <q-icon name="favorite" color="red" size="24px" />
                  <div class="home-floating-text">
                    <strong>500+</strong>
                    <span>Pacientes felices</span>
                  </div>
                </div>
                
                <div class="home-floating-card home-floating-card-2">
                  <q-icon name="star" color="amber" size="24px" />
                  <div class="home-floating-text">
                    <strong>4.9</strong>
                    <span>Calificación</span>
                  </div>
                </div>
                
                <div class="home-floating-card home-floating-card-3">
                  <q-icon name="verified" color="primary" size="24px" />
                  <div class="home-floating-text">
                    <strong>15+</strong>
                    <span>Años exp.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-container>
    </section>

    <!-- Stats Section -->
    <section class="home-stats-section">
      <q-container>
        <div class="row q-col-gutter-lg">
          <div class="col-6 col-sm-3">
            <div class="home-stat-card animated fadeInUp">
              <q-icon name="people" class="home-stat-icon" />
              <div class="home-stat-number">1000+</div>
              <div class="home-stat-label">Pacientes</div>
            </div>
          </div>
          <div class="col-6 col-sm-3">
            <div class="home-stat-card animated fadeInUp" style="animation-delay: 0.1s">
              <q-icon name="local_hospital" class="home-stat-icon" />
              <div class="home-stat-number">15+</div>
              <div class="home-stat-label">Años</div>
            </div>
          </div>
          <div class="col-6 col-sm-3">
            <div class="home-stat-card animated fadeInUp" style="animation-delay: 0.2s">
              <q-icon name="emoji_events" class="home-stat-icon" />
              <div class="home-stat-number">98%</div>
              <div class="home-stat-label">Satisfacción</div>
            </div>
          </div>
          <div class="col-6 col-sm-3">
            <div class="home-stat-card animated fadeInUp" style="animation-delay: 0.3s">
              <q-icon name="medical_services" class="home-stat-icon" />
              <div class="home-stat-number">20+</div>
              <div class="home-stat-label">Servicios</div>
            </div>
          </div>
        </div>
      </q-container>
    </section>

    <!-- Sección de Anuncios -->
    <section class="home-anuncios-section">
      <div class="home-anuncios-background">
        <div class="home-wave home-wave-top"></div>
      </div>
      
      <q-container>
        <div class="home-section-header animated fadeIn">
          <div class="home-section-badge">
            <q-icon name="local_offer" size="20px" />
            <span>Promociones Especiales</span>
          </div>
          <h2 class="home-section-title">Anuncios y Promociones</h2>
          <p class="home-section-subtitle">Descubre nuestras ofertas especiales y eventos exclusivos</p>
          <div class="home-title-decoration">
            <div class="home-title-line"></div>
            <q-icon name="spa" color="primary" size="32px" />
            <div class="home-title-line"></div>
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-if="loading" class="home-empty-state">
          <div class="home-empty-illustration">
            <q-spinner-gears color="primary" size="80px" />
          </div>
          <div class="home-empty-title">Cargando anuncios...</div>
        </div>
        
        <!-- Empty State -->
        <div v-else-if="anunciosActivos.length === 0" class="home-empty-state">
          <div class="home-empty-illustration">
            <q-icon name="campaign" size="80px" />
            <div class="home-empty-circle home-empty-circle-1"></div>
            <div class="home-empty-circle home-empty-circle-2"></div>
          </div>
          <div class="home-empty-title">No hay anuncios activos disponibles</div>
          <p class="home-empty-text">Próximamente tendremos nuevas promociones para ti.</p>
        </div>
        
        <!-- Anuncios Grid -->
        <div v-else class="row q-col-gutter-lg">
          <div 
            v-for="(anuncio, index) in anunciosActivos" 
            :key="anuncio.id"
            class="col-12 col-sm-6 col-md-4 animated fadeInUp"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <q-card class="home-anuncio-card" @click="openAnuncioDetail(anuncio)">
              <div class="home-anuncio-image-wrapper">
                <div class="home-anuncio-gradient"></div>
                <q-img 
                  :src="anuncioStore.getImagePath(anuncio.imagen) || '/default-ad.jpg'" 
                  :alt="anuncio.titulo" 
                  class="home-anuncio-image"
                  @error="anuncioStore.handleImageError"
                  ratio="1"
                >
                  <template v-slot:loading>
                    <div class="absolute-full flex flex-center bg-grey-2">
                      <q-spinner-gears color="primary" size="30px" />
                    </div>
                  </template>
                </q-img>
                <div class="home-anuncio-overlay">
                  <div class="home-anuncio-overlay-content">
                    <div class="home-overlay-icon-wrapper">
                      <q-icon name="visibility" color="white" size="32px" />
                    </div>
                    <p class="home-overlay-text">Ver detalles completos</p>
                  </div>
                </div>
                <div class="home-anuncio-badge">
                  <q-chip 
                    color="primary" 
                    text-color="white" 
                    size="md"
                    icon="local_offer"
                    class="home-category-chip"
                  >
                    {{ anuncio.categoria }}
                  </q-chip>
                </div>
              </div>
              
              <q-card-section class="home-anuncio-content">
                <div class="home-anuncio-title">
                  {{ anuncio.titulo }}
                </div>
                
                <div class="home-anuncio-description">
                  <p>{{ truncateDescription(anuncio.descripcion) }}</p>
                </div>
                
                <div class="home-anuncio-footer">
                  <div class="home-anuncio-date">
                    <q-icon name="event" size="18px" />
                    <span v-if="anuncio.fecha_expiracion">
                      Válido hasta: {{ anuncioStore.formatDate(anuncio.fecha_expiracion) }}
                    </span>
                    <span v-else>
                      Sin fecha de expiración
                    </span>
                  </div>
                  
                  <q-btn
                    flat
                    round
                    icon="arrow_forward"
                    color="primary"
                    size="sm"
                    class="home-arrow-btn"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-container>
    </section>

    <!-- Call to Action Section -->
    <section class="home-cta-section">
      <div class="home-cta-background">
        <div class="home-cta-shape home-cta-shape-1"></div>
        <div class="home-cta-shape home-cta-shape-2"></div>
        <div class="home-cta-particles">
          <div class="home-particle" v-for="i in 20" :key="i"></div>
        </div>
      </div>
      
      <q-container>
        <div class="row items-center q-col-gutter-xl">
          <div class="col-12 col-md-6 animated fadeInLeft">
            <div class="home-cta-badge">
              <q-icon name="auto_awesome" size="18px" />
              <span>Agenda Ahora</span>
            </div>
            
            <h2 class="home-cta-title">
              Solicita tu primera <span class="home-cta-highlight">consulta</span>
            </h2>
            
            <p class="home-cta-text">
              Agenda una cita con nuestros especialistas y descubre cómo podemos ayudarte a tener la sonrisa que siempre has deseado.
            </p>
            
            <div class="home-cta-features">
              <div class="home-cta-feature">
                <q-icon name="schedule" size="20px" />
                <span>Horarios flexibles</span>
              </div>
              <div class="home-cta-feature">
                <q-icon name="support_agent" size="20px" />
                <span>Atención inmediata</span>
              </div>
              <div class="home-cta-feature">
                <q-icon name="verified_user" size="20px" />
                <span>100% seguro</span>
              </div>
            </div>
            
            <q-btn 
              color="white" 
              text-color="primary" 
              size="xl" 
              label="Agendar Cita"
              icon="calendar_today"
              @click="openAppointmentDialog"
              unelevated
              no-caps
              class="home-cta-btn"
            />
          </div>
          
          <div class="col-12 col-md-6 animated zoomIn">
            <div class="home-cta-image-wrapper">
              <div class="home-cta-glow"></div>
              <q-img
                src="/icons/prueba.jpeg"
                alt="Consulta dental"
                class="home-cta-image"
              />
              <div class="home-cta-decoration home-cta-decoration-1"></div>
              <div class="home-cta-decoration home-cta-decoration-2"></div>
            </div>
          </div>
        </div>
      </q-container>
    </section>

    <!-- Modal para Agendar Cita -->
    <AppointmentModal 
      v-model="appointmentDialog"
      @new-appointment="onNewAppointment"
      @history="onHistory"
      @cancel="onAppointmentCancel"
    />

    <!-- Dialog de detalle del anuncio -->
    <q-dialog v-model="anuncioDialog" maximized transition-show="slide-up" transition-hide="slide-down">
      <q-card v-if="selectedAnuncio" class="home-dialog-card">
        <q-card-section class="home-dialog-header bg-primary text-white">
          <div class="row items-center">
            <div class="col">
              <div class="home-dialog-title">{{ selectedAnuncio.titulo }}</div>
              <div class="home-dialog-category">
                <q-icon name="local_offer" size="16px" />
                {{ selectedAnuncio.categoria }}
              </div>
            </div>
            <div class="col-auto">
              <q-btn icon="close" flat round dense @click="anuncioDialog = false" color="white" size="md" />
            </div>
          </div>
        </q-card-section>
        
        <q-card-section class="home-dialog-content">
          <div class="row q-col-gutter-xl">
            <div class="col-12 col-md-6">
              <div class="home-dialog-image-wrapper">
                <q-img
                  :src="anuncioStore.getImagePath(selectedAnuncio.imagen) || '/default-ad.jpg'"
                  :alt="selectedAnuncio.titulo"
                  class="home-dialog-image"
                  @error="anuncioStore.handleImageError"
                >
                  <template v-slot:loading>
                    <div class="absolute-full flex flex-center bg-grey-2">
                      <q-spinner-gears color="primary" size="50px" />
                    </div>
                  </template>
                </q-img>
              </div>
              
              <!-- Información adicional -->
              <div class="home-dialog-meta">
                <q-list bordered class="rounded-borders">
                  <q-item class="home-meta-item">
                    <q-item-section avatar>
                      <q-avatar color="green-1" text-color="green" icon="event_available" size="48px" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="home-meta-label">Publicado</q-item-label>
                      <q-item-label class="home-meta-value">{{ anuncioStore.formatDate(selectedAnuncio.fecha_publicacion) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  
                  <q-separator />
                  
                  <q-item class="home-meta-item">
                    <q-item-section avatar>
                      <q-avatar color="red-1" text-color="red" icon="event_busy" size="48px" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="home-meta-label">Válido hasta</q-item-label>
                      <q-item-label class="home-meta-value">
                        {{ selectedAnuncio.fecha_expiracion ? anuncioStore.formatDate(selectedAnuncio.fecha_expiracion) : 'Sin fecha' }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  
                  <q-separator />
                  
                  <q-item class="home-meta-item">
                    <q-item-section avatar>
                      <q-avatar color="blue-1" text-color="blue" icon="info" size="48px" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption class="home-meta-label">Estado</q-item-label>
                      <q-item-label class="home-meta-value">
                        <q-badge :color="selectedAnuncio.estado === 'activo' ? 'positive' : 'negative'">
                          {{ anuncioStore.formatState(selectedAnuncio.estado) }}
                        </q-badge>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
            
            <div class="col-12 col-md-6">
              <div class="home-dialog-text-content">
                <h3 class="home-detail-title">
                  {{ selectedAnuncio.titulo }}
                </h3>
                
                <div class="home-detail-badge">
                  <q-chip color="primary" text-color="white" icon="local_offer" size="lg">
                    {{ selectedAnuncio.categoria }}
                  </q-chip>
                </div>
                
                <div class="home-detail-description">
                  <h5 class="home-description-label">
                    <q-icon name="description" size="20px" />
                    Descripción Completa
                  </h5>
                  <p class="home-description-text">{{ selectedAnuncio.descripcion }}</p>
                </div>
                
                <div class="home-detail-actions">
                  <q-btn 
                    color="primary" 
                    label="Agendar Cita" 
                    size="lg"
                    icon="calendar_today"
                    @click="openAppointmentDialogFromDetail"
                    unelevated
                    no-caps
                    class="home-action-btn-primary"
                  />
                  <q-btn 
                    color="secondary" 
                    label="Compartir" 
                    size="lg"
                    icon="share"
                    outline
                    no-caps
                    class="home-action-btn-secondary"
                    @click="shareAnuncio"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useAnuncioStore } from 'src/stores/anuncioStore'
import AppointmentModal from 'components/AppointmentModal.vue'

const $q = useQuasar()
const anuncioStore = useAnuncioStore()

// Datos reactivos
const appointmentDialog = ref(false)
const anuncioDialog = ref(false)
const selectedAnuncio = ref(null)
const loading = ref(true)

// Computed properties - Solo anuncios activos que no han expirado
const anunciosActivos = computed(() => {
  const anuncios = anuncioStore.filteredAnuncios || []
  const hoy = new Date()
  
  return anuncios.filter(anuncio => {
    // Verificar que el anuncio esté activo
    if (anuncio.estado !== 'activo') return false
    
    // Verificar si la fecha de expiración ha pasado
    if (anuncio.fecha_expiracion) {
      const fechaExpiracion = new Date(anuncio.fecha_expiracion)
      // Si la fecha de expiración es en el pasado, no mostrar
      if (fechaExpiracion < hoy) return false
    }
    
    return true
  })
})

onMounted(async () => {
  loading.value = true
  try {
    // Cargar anuncios desde el store
    await anuncioStore.listar()
  } catch (error) {
    console.error('Error cargando anuncios:', error)
    $q.notify({
      type: 'negative',
      message: 'Error al cargar los anuncios',
      position: 'top-right'
    })
  } finally {
    loading.value = false
  }
})

const openAppointmentDialog = () => {
  appointmentDialog.value = true
}

const openAnuncioDetail = (anuncio) => {
  selectedAnuncio.value = anuncio
  anuncioDialog.value = true
}

const openAppointmentDialogFromDetail = () => {
  anuncioDialog.value = false
  appointmentDialog.value = true
}

const shareAnuncio = () => {
  if (navigator.share && selectedAnuncio.value) {
    navigator.share({
      title: selectedAnuncio.value.titulo,
      text: selectedAnuncio.value.descripcion,
      url: window.location.href
    })
  } else {
    // Fallback: copiar al portapapeles
    navigator.clipboard.writeText(
      `${selectedAnuncio.value.titulo}\n${selectedAnuncio.value.descripcion}\n${window.location.href}`
    )
    $q.notify({
      type: 'info',
      message: 'Enlace copiado al portapapeles',
      position: 'top-right'
    })
  }
}

const truncateDescription = (description) => {
  if (!description) return ''
  return description.length > 100 
    ? description.substring(0, 100) + '...' 
    : description
}

const onNewAppointment = () => {
  $q.notify({
    type: 'info',
    message: 'Abriendo formulario de nueva cita...',
    icon: 'calendar_today'
  })
}

const onHistory = () => {
  $q.notify({
    type: 'info',
    message: 'Abriendo historial de citas...',
    icon: 'history'
  })
}

const onAppointmentCancel = () => {
  console.log('Cancelar modal de citas')
}
</script>
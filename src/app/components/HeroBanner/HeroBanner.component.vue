<template>
  <div class="hero-banner">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      :rewind="true"
      :speed="1200"
      :autoplay="{ delay: 9000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :navigation="true"
      @swiper="onSwiper"
      class="hero-swiper"
    >
      <!-- First slide: text + action on the left, 3D element on the right -->
      <swiper-slide>
        <div class="hero-content hero-content--glow" ref="slideHero">
          <canvas ref="glowCanvas" class="glow-canvas" aria-hidden="true"></canvas>
          <section class="section-left">
            <span class="color-white">
              <h1 class="color-white bold">CONECTA TUS <b class="featured">SENTIDOS</b></h1>
            </span>
            <p>
              <b>NHEXA Interface</b> es un espacio de <b>colaboración interdisciplinar</b> para el desarrollo autónomo de proyectos de
              <b>medios interactivos</b>, en retroalimentación abierta con las <b>comunidades</b> a las que estos estén dirigidos.
            </p>
            <a class="hero-cta" href="/#manifesto">Saber más...</a>
          </section>
          <!-- swiper-no-swiping: lets the drag rotate the 3D model instead of swiping the slide -->
          <section class="section-right swiper-no-swiping" ref="container">
            <SpinnerLoaderComponent v-if="loading" />
          </section>
        </div>
      </swiper-slide>

      <!-- App slides (Spectra, Spellcast): logo over the title on the left, background image only -->
      <swiper-slide v-for="(slide, i) in imageSlides" :key="i">
        <div class="hero-content hero-content--bg">
          <div class="hero-bg" aria-hidden="true">
            <img :src="slide.background" alt="" loading="lazy" />
          </div>
          <section class="section-left">
            <span class="hero-logo">
              <img :src="slide.logo" :alt="slide.title" />
            </span>
            <span class="color-white">
              <h1 class="color-white bold">{{ slide.title }}</h1>
            </span>
            <p>{{ slide.text }}</p>
            <a class="hero-cta" :href="slide.ctaHref" target="_blank" rel="noopener">{{ slide.ctaLabel }}</a>
          </section>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { defineComponent, markRaw } from 'vue';
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SpinnerLoaderComponent from '../Loaders/SpinnerLoader.component.vue';
import { HERO_APPS } from '../../../middlewares/misc/apps.data';

const logoUrl = "https://streamby.s3.sa-east-1.amazonaws.com/be4dce92-de7c-4820-8f93-b3ea3335575d/3d-models/74fad9f9-ff8f-4ac1-ada3-3476b8dc82cd.glb";

export default defineComponent({
  name: 'HeroBannerComponent',
  components: { Swiper, SwiperSlide, SpinnerLoaderComponent },
  data() {
    return {
      loading: true,
      modules: markRaw([Navigation, Pagination, Autoplay]),
      // Hero slides: only Spectra and Spellcast. Each shows the app logo over the
      // title on the left, and a placeholder background image (no foreground media).
      // TODO(streamby): replace background images with media served by the API.
      imageSlides: HERO_APPS.map((app) => ({
        title: app.name,
        text: app.tagline,
        ctaLabel: `Explorar ${app.name}`,
        ctaHref: app.url,
        logo: app.logo,
        background: app.heroBg ?? app.gallery[0]?.src,
      })),
      // Swiper instance, kept non-reactive (assigned via the @swiper event).
      swiperInstance: null as any,
    };
  },
  methods: {
    onSwiper(swiper: any) {
      this.swiperInstance = swiper;
    },
  },
  mounted() {
    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      model: THREE.Group,
      mouseLight: THREE.PointLight;

    const container = this.$refs.container as HTMLElement;

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    container.appendChild(renderer.domElement);

    // Model
    const loader = new GLTFLoader();
    loader.load(
      logoUrl,
      (gltf) => {
        model = gltf.scene;
        model.rotation.x = 0;
        model.rotation.y = 0;

        // Center model and fit camera to its bounding box
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        camera.position.z = (maxDim / 2) / Math.tan(fov / 2) * 1.4;
        camera.updateProjectionMatrix();

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            materials.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.roughness = 0.3;
                mat.metalness = 0.2;
                mat.needsUpdate = true;
              }
            });
          }
        });

        scene.add(model);
        this.loading = false;
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        this.loading = false;
      }
    );

    // Base lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 0.3);
    frontLight.position.set(0, 0, 5);
    scene.add(frontLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.1);
    fillLight.position.set(-5, -3, 2);
    scene.add(fillLight);

    // Mouse-following accent light
    mouseLight = new THREE.PointLight(0xffffff, 8, 15);
    mouseLight.position.set(0, 0, 3);
    scene.add(mouseLight);

    // Particles
    const PARTICLE_COUNT = 60;
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleVelocities: THREE.Vector3[] = [];

    const spawnParticle = (i: number) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 1.5;
      particlePositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      particleVelocities[i] = new THREE.Vector3(
        -particlePositions[i * 3],
        -particlePositions[i * 3 + 1],
        -particlePositions[i * 3 + 2]
      ).normalize().multiplyScalar(0.004 + Math.random() * 0.003);
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) spawnParticle(i);

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.04,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Animation
    let isDragging = false;

    const animate = () => {
      requestAnimationFrame(animate);

      // Slow idle rotation when not dragging
      if (!isDragging && model) {
        model.rotation.y += 0.002;
      }

      // Update particle positions
      const pos = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3]     += particleVelocities[i].x;
        pos[i * 3 + 1] += particleVelocities[i].y;
        pos[i * 3 + 2] += particleVelocities[i].z;
        const dist = Math.sqrt(pos[i * 3] ** 2 + pos[i * 3 + 1] ** 2 + pos[i * 3 + 2] ** 2);
        if (dist < 0.25) spawnParticle(i);
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;
      prevMouseX = event.clientX;
      prevMouseY = event.clientY;
      container.style.cursor = 'grabbing';
      // Pause the slider while the user interacts with the 3D model.
      this.swiperInstance?.autoplay?.stop();
    };

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      // Light always follows mouse
      mouseLight.position.x = mouseX * 3;
      mouseLight.position.y = mouseY * 3;

      // Rotate model only while dragging
      if (isDragging && model) {
        const deltaX = event.clientX - prevMouseX;
        const deltaY = event.clientY - prevMouseY;
        model.rotation.y += deltaX * 0.01;
        model.rotation.x += deltaY * 0.01;
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      container.style.cursor = 'grab';
      // Resume the slider once the interaction ends.
      this.swiperInstance?.autoplay?.start();
    };

    const onMouseLeave = () => {
      isDragging = false;
      container.style.cursor = 'grab';
      mouseLight.position.set(0, 0, 3);
      this.swiperInstance?.autoplay?.start();
    };

    container.style.cursor = 'grab';
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mouseleave', onMouseLeave);

    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Pause autoplay when the banner scrolls out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.swiperInstance?.autoplay?.start();
        } else {
          this.swiperInstance?.autoplay?.stop();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(this.$el);

    // ── Smoke-trail cursor effect ─────────────────────────────────────────────
    const glowCanvas = this.$refs.glowCanvas as HTMLCanvasElement;
    const ctx = glowCanvas.getContext('2d')!;
    const slideHero = this.$refs.slideHero as HTMLElement;

    const resizeCanvas = () => {
      glowCanvas.width  = slideHero.clientWidth;
      glowCanvas.height = slideHero.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      life: number;   // 1 → 0
      size: number;
    }

    const particles: Particle[] = [];
    let cursorX = -9999;
    let cursorY = -9999;
    let insideHero = false;

    const spawnSmoke = (x: number, y: number) => {
      for (let i = 0; i < 4; i++) {
        const angle  = Math.random() * Math.PI * 2;
        const speed  = 0.3 + Math.random() * 0.6;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed * 0.4 + (Math.random() - 0.5) * 0.2,
          vy: -speed * 0.9 - Math.random() * 0.4, // rises like smoke
          life: 0.75 + Math.random() * 0.25,
          size: 1.5 + Math.random() * 2,
        });
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, glowCanvas.width, glowCanvas.height);

      // Update and draw smoke particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x    += p.vx;
        p.y    += p.vy;
        p.vx   *= 0.98;          // slight drag
        p.vy   *= 0.98;
        p.life -= 0.018;
        p.size += 0.18;          // expands as it disperses

        if (p.life <= 0) { particles.splice(i, 1); continue; }

        const alpha = p.life * 0.45;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.shadowBlur  = 14 * p.life;
        ctx.shadowColor = `rgba(150, 210, 255, ${alpha * 0.7})`;
        ctx.fillStyle   = `rgba(190, 225, 255, ${alpha})`;
        ctx.fill();
        ctx.shadowBlur  = 0;
      }

      // Bright orb at cursor
      if (insideHero) {
        const grad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, 22);
        grad.addColorStop(0, 'rgba(210, 245, 255, 0.55)');
        grad.addColorStop(1, 'rgba(100, 180, 255, 0)');
        ctx.beginPath();
        ctx.arc(cursorX, cursorY, 22, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cursorX, cursorY, 2.5, 0, Math.PI * 2);
        ctx.shadowBlur  = 28;
        ctx.shadowColor = 'rgba(180, 230, 255, 1)';
        ctx.fillStyle   = 'rgba(240, 255, 255, 0.95)';
        ctx.fill();
        ctx.shadowBlur  = 0;
      }

      requestAnimationFrame(drawFrame);
    };
    requestAnimationFrame(drawFrame);

    slideHero.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = slideHero.getBoundingClientRect();
      cursorX    = e.clientX - rect.left;
      cursorY    = e.clientY - rect.top;
      insideHero = true;
      spawnSmoke(cursorX, cursorY);
    });
    slideHero.addEventListener('mouseleave', () => { insideHero = false; });
  },
});
</script>

<style lang="scss" scoped>
@import './HeroBanner.component.scss';
</style>

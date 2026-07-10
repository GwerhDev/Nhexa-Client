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

    // ── Ethereal white smoke trail (2D canvas) ───────────────────────────────
    const glowCanvas = this.$refs.glowCanvas as HTMLCanvasElement;
    const ctx = glowCanvas.getContext('2d')!;
    const slideHero = this.$refs.slideHero as HTMLElement;

    const resizeCanvas = () => {
      glowCanvas.width  = slideHero.clientWidth;
      glowCanvas.height = slideHero.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Pre-render a soft cool-white smoke sprite once (radial falloff + faint
    // noise). Drawing many rotated/scaled copies reads as wispy volumetric smoke.
    const smokeTex = document.createElement('canvas');
    smokeTex.width = smokeTex.height = 128;
    {
      const g = smokeTex.getContext('2d')!;
      const base = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      base.addColorStop(0,   'rgba(210, 226, 245, 0.9)');
      base.addColorStop(0.4, 'rgba(200, 218, 240, 0.35)');
      base.addColorStop(1,   'rgba(200, 218, 240, 0)');
      g.fillStyle = base;
      g.fillRect(0, 0, 128, 128);
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * 128, y = Math.random() * 128, r = 6 + Math.random() * 30;
        const ng = g.createRadialGradient(x, y, 0, x, y, r);
        ng.addColorStop(0, `rgba(220, 232, 250, ${Math.random() * 0.06})`);
        ng.addColorStop(1, 'rgba(220, 232, 250, 0)');
        g.fillStyle = ng;
        g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
      }
    }

    const LIFE = 2000;         // ms a puff lives (lingers and disperses)
    const POOL = 320;          // reused puff slots (ring buffer)

    interface Puff {
      born: number; active: boolean;
      x: number; y: number; seed: number; dx: number; swirl: number; rot: number; spin: number; base: number;
    }

    const pool: Puff[] = [];
    for (let i = 0; i < POOL; i++) {
      pool.push({ born: 0, active: false, x: 0, y: 0, seed: 0, dx: 0, swirl: 0, rot: 0, spin: 0, base: 0 });
    }
    let ring = 0;

    const spawnPuff = (px: number, py: number, now: number) => {
      const p = pool[ring];
      ring = (ring + 1) % POOL;             // recycle oldest slot
      p.active = true;
      p.born = now;
      p.x = px + (Math.random() - 0.5) * 12;
      p.y = py + (Math.random() - 0.5) * 12;
      p.seed = Math.random() * Math.PI * 2;
      p.dx = (Math.random() - 0.5) * 1.2;
      p.swirl = (Math.random() - 0.5) * 5;  // orbit speed → curling wisps
      p.rot = Math.random() * Math.PI * 2;
      p.spin = (Math.random() - 0.5) * 0.8;
      p.base = 70 + Math.random() * 90;     // px size
    };

    const renderSmoke = (now: number) => {
      ctx.clearRect(0, 0, glowCanvas.width, glowCanvas.height);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const p of pool) {
        if (!p.active) continue;
        const age = (now - p.born) / LIFE;
        if (age >= 1) { p.active = false; continue; }
        const fresh = 1 - age;
        // Curling motion: orbit the spawn point while rising, so wisps spiral.
        const ang = p.seed + age * p.swirl;
        const rad = age * 40;
        const x = p.x + Math.cos(ang) * rad + p.dx * age * 46;
        const y = p.y - age * age * 90 + Math.sin(ang) * rad * 0.6;
        const size = p.base * (0.5 + age * 2.2);           // billows outward
        const fadeIn = Math.min(1, age * 7);
        const alpha = fadeIn * fresh * fresh * 0.35;
        p.rot += p.spin * 0.012;

        ctx.globalAlpha = alpha;
        ctx.setTransform(1, 0, 0, 1, x, y);
        ctx.rotate(p.rot);
        ctx.drawImage(smokeTex, -size / 2, -size / 2, size, size);
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1;
      ctx.restore();
      requestAnimationFrame(renderSmoke);
    };
    requestAnimationFrame(renderSmoke);

    // Spawn puffs evenly ALONG the travelled path so fast movement never leaves
    // gaps — a continuous stream of overlapping smoke.
    const SPAWN_STEP = 8;      // px between puffs along the path
    let lastX: number | null = null;
    let lastY: number | null = null;

    slideHero.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = slideHero.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const now = performance.now();

      if (lastX === null) { spawnPuff(mx, my, now); lastX = mx; lastY = my; return; }
      const dx = mx - lastX;
      const dy = my - (lastY as number);
      const steps = Math.max(1, Math.round(Math.hypot(dx, dy) / SPAWN_STEP));
      for (let s = 1; s <= steps; s++) {
        const f = s / steps;
        spawnPuff(lastX + dx * f, (lastY as number) + dy * f, now);
      }
      lastX = mx;
      lastY = my;
    });
    // Reset the anchor so re-entering doesn't streak a line across the slide.
    slideHero.addEventListener('mouseleave', () => { lastX = null; lastY = null; });
  },
});
</script>

<style lang="scss" scoped>
@import './HeroBanner.component.scss';
</style>

<template>
  <div class="hero-banner" id="home">
    <div class="hero-content">
      <section class="section-left">
        <span class="color-white">
          <h1 class="color-white bold">CONECTA TUS <b class="featured">SENTIDOS</b></h1>
        </span>
        <p>
          <b>NHEXA Interface</b> es un espacio de <b>colaboración interdisciplinar</b> para el desarrollo autónomo de proyectos de
          <b>medios interactivos</b>, en retroalimentación abierta con las <b>comunidades</b> a las que estos estén dirigidos.</p>
        <button>Saber más...</button>
      </section>
      <section class="section-right" ref="container">
        
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import logoUrl from "../../../assets/logo.glb";

export default defineComponent({
  name: 'HeroBannerComponent',
  mounted() {
    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      model: THREE.Group;

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
    camera.position.z = 4;

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Model
    const loader = new GLTFLoader();
    loader.load(
      logoUrl,
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-5, -5, -5);
    scene.add(pointLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Mouse move event
    const onMouseMove = (event: MouseEvent) => {
      if (model) {
        const rect = container.getBoundingClientRect();
        const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

        model.rotation.y = mouseX * 0.5;
        model.rotation.x = mouseY * 0.5;
      }
    };

    const onMouseLeave = () => {
      if (model) {
        model.rotation.y = 0;
        model.rotation.x = 0;
      }
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    // Handle window resize
    window.addEventListener("resize", () => {
      if (container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    });
  },
});
</script>

<style lang="scss" scoped>
@import './HeroBanner.component.scss';
</style>

import { onMounted, onUnmounted, type Ref } from 'vue';

export function useReveal(target: Ref<HTMLElement | null>, options?: IntersectionObserverInit) {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (!target.value) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer?.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(target.value);
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
}

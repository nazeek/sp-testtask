import { onUnmounted, watch, type Ref } from 'vue';

export function useScrollDetector(
  elementRef: Ref<HTMLElement | undefined>,
  callback: () => void,
  threshold = 100
) {
  let observer: IntersectionObserver | null = null;

  const setupObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (!elementRef.value) return;

    observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          callback();
        }
      },
      {
        rootMargin: `${threshold}px`,
      }
    );

    observer.observe(elementRef.value);
  };

  watch(elementRef, () => {
    setupObserver();
  }, { immediate: true });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });
}


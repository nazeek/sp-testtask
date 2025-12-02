<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" :class="['modal-overlay', `modal-overlay--${position}`]" @click.self="handleClose">
        <Transition :name="position === 'left' ? 'slide-left' : position === 'right' ? 'slide-right' : 'fade'">
          <div v-if="isOpen" :class="['modal', `modal--${position}`]">
            <div class="modal-header">
              <slot name="header">
                <h2 class="modal-title">{{ title }}</h2>
              </slot>
            </div>
            <div class="modal-body">
              <slot />
            </div>
            <div v-if="$slots.footer" class="modal-footer">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

interface Props {
  isOpen: boolean;
  title?: string;
  position?: 'center' | 'right' | 'left';
  closeOnEscape?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  position: 'center',
  closeOnEscape: true,
});

const emit = defineEmits<{
  close: [];
}>();

const handleClose = () => {
  emit('close');
};

const handleEscape = (e: KeyboardEvent) => {
  if (props.closeOnEscape && e.key === 'Escape' && props.isOpen) {
    handleClose();
  }
};

onMounted(() => {
  if (props.closeOnEscape) {
    document.addEventListener('keydown', handleEscape);
  }
});

onUnmounted(() => {
  if (props.closeOnEscape) {
    document.removeEventListener('keydown', handleEscape);
  }
});
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $z-modal;
  display: flex;
  align-items: center;

  &--center {
    justify-content: center;
  }

  &--right {
    justify-content: flex-end;
  }

  &--left {
    justify-content: flex-start;
  }
}

.modal {
  background: $bg-primary;
  border-radius: $border-radius-lg 0 0 $border-radius-lg;
  max-width: 500px;
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: $shadow-lg;


  &--center {
    border-radius: $border-radius-lg;
    margin: auto;
    max-height: 90vh;
  }

  &--right {
    margin: 92px 12px 0 0;
    align-self: flex-start;
    max-height: calc(100vh - 92px - $spacing-sm);
  }

  &--left {
    margin: 92px 0 0 12px;
    align-self: flex-start;
    border-radius: 0 $border-radius-lg $border-radius-lg 0;
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-lg;
  border-bottom: 1px solid $border-color;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  color: $text-secondary;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $border-radius;

  &:hover {
    background: $bg-tertiary;
  }
}

.modal-body {
  flex: 1;
  padding: $spacing-lg;
  overflow-y: auto;
}

.modal-footer {
  padding: $spacing-lg;
  border-top: 1px solid $border-color;
  display: flex;
  gap: $spacing-md;
  justify-content: flex-end;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-base;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active {
  animation: slide-in-right $transition-base ease-out;
}

.slide-right-leave-active {
  animation: slide-in-right $transition-base ease-out reverse;
}

.slide-left-enter-active {
  animation: slide-in-left $transition-base ease-out;
}

.slide-left-leave-active {
  animation: slide-in-left $transition-base ease-out reverse;
}

@keyframes slide-in-left {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>


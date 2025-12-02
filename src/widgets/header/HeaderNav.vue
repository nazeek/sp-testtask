<template>
  <nav class="header-nav">
    <div class="header-nav__desktop">
      <NuxtLink
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        :class="['header-nav__link', { 'header-nav__link--active': isActive(link.path) }]"
      >
        {{ link.label }}
      </NuxtLink>
    </div>

    <button class="header-nav__burger" @click="openModal">
      <BurgerIcon />
    </button>

    <Modal :is-open="isModalOpen" position="left" @close="closeModal">
      <div class="header-nav-modal__content">
        <NuxtLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          :class="['header-nav-modal__link', { 'header-nav-modal__link--active': isActive(link.path) }]"
          @click="handleLinkClick"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </Modal>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '~/shared/ui/Modal/Modal.vue';
import BurgerIcon from '~/shared/icons/Burger.vue';

const route = useRoute();

const links = [
  { path: '/', label: 'Маркет' },
  { path: '/items', label: 'Предметы' },
  { path: '/sell', label: 'Продажа' },
  { path: '/r', label: 'R$' },
  { path: '/help', label: 'Помощь' },
];

const isModalOpen = ref(false);

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(path);
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleLinkClick = () => {
  closeModal();
};
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.header-nav {
  display: flex;
  gap: $spacing-lg;
  position: relative;
  align-items: center;
  height: 100%;
}

.header-nav__desktop {
  display: flex;
  gap: $spacing-lg;
  align-items: center;
  height: 100%;

  @media (max-width: #{$breakpoint-desktop - 1px}) {
    display: none;
  }
}

.header-nav__burger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: $spacing-xs;
  color: $text-secondary;
  transition: color $transition-fast;
  align-items: center;
  justify-content: center;

  @media (max-width: #{$breakpoint-desktop - 1px}) {
    display: flex;
  }

  &:hover {
    color: $text-primary;
  }
}

.header-nav__link {
  color: $text-secondary;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color $transition-fast;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  &:hover {
    color: $text-primary;
  }

  &--active {
    color: $text-primary;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      width: 60%;
      border-radius: 3px 3px 0 0;
      background: $button-primary;
      margin: 0 auto;
    }
  }
}

.header-nav-modal__content {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.header-nav-modal__link {
  color: $text-secondary;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color $transition-fast;
  padding: $spacing-md;
  border-radius: $border-radius;

  &:hover {
    color: $text-primary;
    background: $bg-secondary;
  }

  &--active {
    color: $text-primary;
    background: $bg-secondary;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: $button-primary;
      border-radius: 0 $border-radius $border-radius 0;
    }
  }
}
</style>


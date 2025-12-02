<template>
  <div :class="['item-rarity', rarityClass]" />
</template>

<script setup lang="ts">
import { Rarity } from '~/shared/config/enums';

interface Props {
  rare: Rarity;
}

const props = defineProps<Props>();

const rarityClass = computed(() => {
  const rarityType = props.rare.replaceAll('_', '-');
  return `rarity-${rarityType}-color`;
});
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.item-rarity {
  width: 60px;
  height: 4px;
  border-radius: 0 0 5px 5px;

  &.rarity-common-color {
    background-color: $rarity-common;
  }

  &.rarity-uncommon-color {
    background-color: $rarity-uncommon;
  }

  &.rarity-rare-color {
    background-color: $rarity-rare;
  }

  &.rarity-ultra-rare-color {
    background-color: $rarity-ultra-rare;
  }

  &.rarity-legendary-color {
    background-color: $rarity-legendary;
  }
}
</style>


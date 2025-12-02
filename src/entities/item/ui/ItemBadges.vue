<template>
  <div v-if="badges.length > 0" class="item-badges">
    <span
      v-for="badge in badges"
      :key="badge"
      :class="['item-badge', `item-badge--${badge}`]"
    >
      {{ badgeLabels[badge] }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Property } from '~/shared/config/enums';

interface Props {
  properties: string[];
}

const props = defineProps<Props>();

const badgeLabels: Record<string, string> = {
  [Property.MEGA_NEON]: 'M',
  [Property.FLYABLE]: 'F',
  [Property.NEON]: 'N',
  [Property.RIDEABLE]: 'R',
};

const badges = computed(() => {
  return props.properties.filter((p) => Object.keys(badgeLabels).includes(p));
});
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.item-badges {
  display: flex;
  gap: $spacing-xs;
  flex-wrap: wrap;
}

.item-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 0.625rem;
  font-weight: 600;
  color: white;
  background: $color-primary;
}
</style>


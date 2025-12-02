<template>
  <input
    :type="type"
    :value="displayValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="['input',
    { 'input--disabled': disabled },
    { 'input--no-border': variant === 'no-border' }]"
    :name="name"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string | number | null;
  variant?: 'default' | 'no-border';
  name?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  type: 'text',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null];
}>();

const displayValue = computed(() => {
  if (props.modelValue === null || props.modelValue === undefined) {
    return '';
  }
  return props.modelValue;
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  
  if (value === '') {
    emit('update:modelValue', null);
  } else if (props.type === 'number') {
    const numValue = parseFloat(value);
    emit('update:modelValue', isNaN(numValue) ? null : numValue);
  } else {
    emit('update:modelValue', value);
  }
};
</script>

<style scoped lang="scss">
@use '@/app/styles/variables' as *;

.input {
  width: 100%;
  padding: $spacing-sm $spacing-md;
  border: 1px solid $border-color;
  background: $bg-primary;
  border-radius: $border-radius;
  font-size: 1rem;
  transition: all $transition-fast;
  

  &:focus {
    outline: none;
  }

  &--no-border {
    background: $bg-semivisible;
    border: none;
  }

  &--disabled {
    background: $bg-tertiary;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: $text-tertiary;
  }
}
</style>


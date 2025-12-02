<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { useUser } from '~/features/load-user/useUser';

await useUser();
</script>

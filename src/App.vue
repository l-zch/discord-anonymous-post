<template>
  <div class="h-screen w-screen bg-[#34495E] flex">
    <RouterView :key="route.fullPath"></RouterView>
  </div>
</template>

<script setup>
import { useRoute} from "vue-router";
const route = useRoute()

</script>

<style></style>

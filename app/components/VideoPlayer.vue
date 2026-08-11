<script setup lang="ts">
defineProps<{
  videoId: number
}>()
</script>

<template>
  <div class="aspect-video w-full overflow-hidden rounded-lg bg-black">
    <iframe
      :src="`https://player.vimeo.com/video/${videoId}`"
      class="h-full w-full"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

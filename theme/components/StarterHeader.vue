<script lang="ts" setup>
import { useSiteConfig } from 'valaxy'

const siteConfig = useSiteConfig()
</script>

<template>
  <div class="pb-8 pt-6 space-y-2 md:space-y-5">
    <h1
      class="st-text text-3xl font-extrabold leading-9 tracking-tight md:text-6xl sm:text-4xl md:leading-14 sm:leading-10"
    >
      {{ siteConfig.title }}
    </h1>
    <p class="text-lg text-gray-500 leading-7">
      {{ siteConfig.subtitle }}
    </p>
  </div>
</template>

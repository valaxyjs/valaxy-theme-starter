<script lang="ts" setup>
import type { Post } from 'valaxy'

defineProps<{
  post: Post
}>()
</script>

<template>
  <article class="xl:grid xl:grid-cols-4 xl:items-baseline space-y-2 xl:space-y-0">
    <StarterDate :date="post.date" />
    <div class="xl:col-span-3 space-y-5">
      <div class="space-y-6">
        <h2 class="text-2xl font-bold leading-8 tracking-tight">
          <RouterLink class="st-text" :to="post.path || ''">
            {{ post.title }}
          </RouterLink>
        </h2>
        <div
          v-if="post.excerpt"
          class="max-w-none text-gray-500 prose"
          v-html="post.excerpt"
        />
      </div>
      <div class="text-base font-medium leading-6">
        <RouterLink class="link" aria-label="read more" :to="post.path || ''">
          Read more →
        </RouterLink>
      </div>
    </div>
  </article>
</template>

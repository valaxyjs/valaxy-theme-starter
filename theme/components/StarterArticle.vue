<script setup lang="ts">
import { useFrontmatter, usePostList } from 'valaxy'
import { computed } from 'vue'

import { useRoute } from 'vue-router'

const frontmatter = useFrontmatter()

const route = useRoute()
const posts = usePostList()

function findCurrentIndex() {
  return posts.value.findIndex(p => p.path === route.path)
}

const nextPost = computed(() => posts.value[findCurrentIndex() - 1])
const prevPost = computed(() => posts.value[findCurrentIndex() + 1])
</script>

<template>
  <article class="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
    <header class="pt-6 text-center space-y-1 xl:pb-10">
      <StarterDate :date="frontmatter.date" />
      <h1
        class="st-text text-3xl font-extrabold leading-9 tracking-tight md:text-5xl sm:text-4xl md:leading-14 sm:leading-10"
      >
        {{ frontmatter.title }}
      </h1>
    </header>

    <div
      class="pb-16 xl:grid xl:grid-cols-4 xl:gap-x-10 divide-y divide-gray-200 xl:pb-20 xl:divide-y-0 dark:divide-gray-700"
      style="grid-template-rows: auto 1fr"
    >
      <StarterAuthor v-if="frontmatter.author" :frontmatter="frontmatter" />
      <div class="xl:col-span-3 xl:row-span-2 divide-y divide-gray-200 xl:pb-0 dark:divide-gray-700">
        <slot />
      </div>

      <footer
        class="text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2 divide-y divide-gray-200 dark:divide-gray-700"
      >
        <div v-if="nextPost && nextPost.path" class="py-8">
          <h2 class="text-xs text-gray-500 tracking-wide uppercase">
            Next Article
          </h2>
          <div class="link">
            <RouterLink :to="nextPost.path">
              {{ nextPost.title }}
            </RouterLink>
          </div>
        </div>
        <div v-if="prevPost && prevPost.path" class="py-8">
          <h2 class="text-xs text-gray-500 tracking-wide uppercase">
            Previous Article
          </h2>
          <div class="link">
            <RouterLink :to="prevPost.path">
              {{ prevPost.title }}
            </RouterLink>
          </div>
        </div>
        <div class="pt-8">
          <RouterLink class="link" to="/">
            ← Back to the blog
          </RouterLink>
        </div>
      </footer>
    </div>
  </article>
</template>

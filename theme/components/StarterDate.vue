<script lang="ts" setup>
import { formatDate } from 'valaxy'
import { computed } from 'vue'

const props = defineProps<{
  date?: Date | number | string
}>()

const datetime = computed(() => formatDate(props.date || ''))
</script>

<template>
  <dl>
    <dt class="sr-only">
      Published on
    </dt>
    <dd class="text-base text-gray-500 font-medium leading-6">
      <time :datetime="datetime">{{ datetime }}</time>
    </dd>
  </dl>
</template>

<template>
  <Layout>
    <div class="divide-y divide-gray-200">
      <StarterHeader />

      <slot>
        <router-view />
      </slot>
    </div>
  </Layout>
</template>

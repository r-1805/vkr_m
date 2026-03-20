<script setup>
defineProps({
  title: {
    type: String,
    default: ""
  },
  subtitle: {
    type: String,
    default: ""
  },
  closeTo: {
    type: [String, Object],
    required: true
  },
  hideHeader: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="modal-wrap">
    <div class="modal-backdrop"></div>
    <div class="modal-card">
      <RouterLink v-if="hideHeader" class="modal-close-floating" :to="closeTo">Закрыть</RouterLink>

      <div v-if="!hideHeader" class="modal-head">
        <div>
          <p class="footer-title">{{ title }}</p>
          <p v-if="subtitle" class="lead small">{{ subtitle }}</p>
        </div>
        <RouterLink class="ghost-btn" :to="closeTo">Закрыть</RouterLink>
      </div>

      <slot />
    </div>
  </div>
</template>

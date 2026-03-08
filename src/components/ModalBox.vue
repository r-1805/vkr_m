<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ""
  },
  closeTo: {
    type: [String, Object],
    required: true
  }
});
</script>

<template>
  <div class="modal-wrap">
    <div class="modal-backdrop"></div>
    <div class="modal-card">
      <div class="modal-head">
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

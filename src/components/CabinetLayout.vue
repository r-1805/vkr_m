<script setup>
import { RouterLink } from "vue-router";
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";

defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ""
  },
  tabs: {
    type: Array,
    default: () => []
  },
  tone: {
    type: String,
    default: "green"
  }
});
</script>

<template>
  <div class="cabinet-shell" :class="`tone-${tone}`">
    <SiteHeader />

    <div class="cabinet-grid">
      <aside class="side">
        <p class="badge">{{ title }}</p>
        <h1>{{ title }}</h1>
        <p class="lead small">{{ subtitle }}</p>

        <nav class="side-nav">
          <RouterLink
            v-for="tab in tabs"
            :key="tab.label"
            class="side-link"
            :to="tab.to"
          >
            {{ tab.label }}
          </RouterLink>
        </nav>
      </aside>

      <section class="board">
        <slot />
      </section>
    </div>

    <SiteFooter />
  </div>
</template>

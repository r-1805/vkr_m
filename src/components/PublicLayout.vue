<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";

const route = useRoute();
const isAuthRoute = computed(() => ["login", "register"].includes(String(route.name)));

const themeClass = computed(() => {
  if (
    ["login", "register", "cabinet-profile", "cabinet-events", "cabinet-event-detail", "cabinet-draft", "cabinet-archive"].includes(
      String(route.name)
    )
  ) {
    return "theme-account";
  }

  if (["events", "events-apply", "events-detail"].includes(String(route.name))) {
    return "theme-events";
  }

  if (["archive", "archive-photos"].includes(String(route.name))) {
    return "theme-archive";
  }

  return "theme-home";
});
</script>

<template>
  <div class="app-shell" :class="themeClass">
    <SiteHeader />

    <main class="page-body" :class="{ 'auth-body': isAuthRoute }">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

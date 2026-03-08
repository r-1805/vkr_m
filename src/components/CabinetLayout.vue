<script setup>
import { RouterLink, useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";

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

const router = useRouter();
const { state, logout } = useAuth();

const handleLogout = async () => {
  logout();
  await router.push({ name: "home" });
};
</script>

<template>
  <div class="cabinet-shell" :class="`tone-${tone}`">
    <header class="cabinet-topbar">
      <RouterLink class="brand" :to="{ name: 'home' }">
        <span class="brand-mark">СГУГиТ</span>
        <span class="brand-text">Конференционный портал</span>
      </RouterLink>

      <div class="cabinet-user">
        <div>
          <p class="footer-title">{{ state.role }}</p>
          <strong>{{ state.name || "Пользователь" }}</strong>
        </div>
        <button class="ghost-btn" type="button" @click="handleLogout">Выйти</button>
      </div>
    </header>

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
  </div>
</template>

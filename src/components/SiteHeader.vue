<script setup>
import { computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import headerLogo from "@/img/header_logo.png";

const route = useRoute();
const router = useRouter();
const { state, isAuthenticated, logout, defaultRouteForRole } = useAuth();

const navItems = [
  { label: "Главная", to: { name: "home" }, match: ["home"] },
  { label: "Текущие мероприятия", to: { name: "events" }, match: ["events", "events-apply", "events-detail"] },
  { label: "Архив мероприятий", to: { name: "archive" }, match: ["archive", "archive-photos"] }
];

const currentRouteName = computed(() => String(route.name ?? ""));

const accountLabel = computed(() => {
  if (state.role === "organizer") {
    return "Кабинет преподавателя";
  }

  if (state.role === "admin") {
    return "Панель администратора";
  }

  return "Личный кабинет";
});

const accountRoute = computed(() => defaultRouteForRole(state.role));
const loginActive = computed(() => ["login", "register"].includes(currentRouteName.value));
const accountActive = computed(() =>
  ["cabinet-", "organizer-", "admin-"].some((prefix) => currentRouteName.value.startsWith(prefix))
);

const isActive = (item) => item.match.includes(currentRouteName.value);

const handleLogout = async () => {
  logout();
  await router.push({ name: "home" });
};
</script>

<template>
  <header class="site-topbar">
    <RouterLink class="brand" :to="{ name: 'home' }">
      <img class="brand-logo" :src="headerLogo" alt="Логотип СГУГиТ">
    </RouterLink>

    <nav class="nav" aria-label="Основное меню">
      <RouterLink
        v-for="item in navItems"
        :key="item.label"
        class="nav-link"
        :class="{ active: isActive(item) }"
        :to="item.to"
      >
        {{ item.label }}
      </RouterLink>

      <RouterLink
        v-if="!isAuthenticated"
        class="nav-link"
        :class="{ active: loginActive }"
        :to="{ name: 'login' }"
      >
        Войти
      </RouterLink>

      <RouterLink
        v-else
        class="nav-link"
        :class="{ active: accountActive }"
        :to="accountRoute"
      >
        {{ accountLabel }}
      </RouterLink>

      <button
        v-if="isAuthenticated"
        class="nav-link nav-link-button"
        type="button"
        @click="handleLogout"
      >
        Выйти
      </button>
    </nav>
  </header>
</template>

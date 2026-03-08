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

const isActive = (item) => item.match.includes(String(route.name));

const handleLogout = async () => {
  logout();
  await router.push({ name: "home" });
};
</script>

<template>
  <div class="app-shell" :class="themeClass">
    <header class="topbar">
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

        <RouterLink v-if="!isAuthenticated" class="nav-link" :class="{ active: route.name === 'login' || route.name === 'register' }" :to="{ name: 'login' }">
          Войти
        </RouterLink>

        <RouterLink v-else class="nav-link accent" :to="accountRoute">
          {{ accountLabel }}
        </RouterLink>
      </nav>
    </header>

    <main class="page-body" :class="{ 'auth-body': isAuthRoute }">
      <slot />
    </main>

    <footer class="footer" :class="{ 'auth-footer': isAuthRoute }">
      <div>
        <p class="footer-title">Адрес</p>
        <p>630108, г. Новосибирск, ул. Плахотного, 10</p>
      </div>
      <div>
        <p class="footer-title">Почта</p>
        <p>sgga@gmail.com</p>
      </div>
      <div>
        <p class="footer-title">Телефон</p>
        <p>+7 (955) 111-00-33</p>
      </div>
      <button v-if="isAuthenticated" class="ghost-btn" type="button" @click="handleLogout">
        Выйти
      </button>
    </footer>
  </div>
</template>

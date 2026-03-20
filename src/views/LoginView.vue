<script setup>
import { reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import PublicLayout from "@/components/PublicLayout.vue";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { login, defaultRouteForRole } = useAuth();

const form = reactive({
  loginValue: "",
  password: ""
});

const resolveRole = (value) => {
  const normalized = String(value || "").trim().toLowerCase();

  if (normalized.includes("admin")) {
    return "admin";
  }

  if (normalized.includes("organizer") || normalized.includes("teacher")) {
    return "organizer";
  }

  return "user";
};

const handleLogin = async () => {
  const role = resolveRole(form.loginValue);
  const name = role === "admin"
    ? "Администратор"
    : role === "organizer"
      ? "Преподаватель"
      : "Иванов Иван Иванович";
  const email = form.loginValue || "user@example.com";

  login({ role, name, email });
  await router.push(defaultRouteForRole(role));
};
</script>

<template>
  <PublicLayout>
    <section class="auth-wrap login-screen">
      <article class="auth-card login-card">
        <h1>ВХОД</h1>

        <form class="login-form" @submit.prevent="handleLogin">
          <input
            v-model="form.loginValue"
            class="login-input"
            type="text"
            placeholder="Логин"
            autocomplete="username"
          >

          <input
            v-model="form.password"
            class="login-input"
            type="password"
            placeholder="Пароль"
            autocomplete="current-password"
          >

          <button class="login-submit" type="submit">Войти</button>
        </form>

        <p class="login-switch">
          Нет аккаунта?
          <RouterLink :to="{ name: 'register', params: { step: 'start' } }">
            Зарегистрироваться
          </RouterLink>
        </p>
      </article>
    </section>
  </PublicLayout>
</template>

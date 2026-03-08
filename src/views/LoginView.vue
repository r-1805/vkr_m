<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import PublicLayout from "@/components/PublicLayout.vue";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { login, defaultRouteForRole } = useAuth();

const form = reactive({
  name: "Иванов Иван Иванович",
  email: "user@example.com",
  password: "",
  role: "user"
});

const handleLogin = async () => {
  login({
    role: form.role,
    name: form.name,
    email: form.email
  });

  await router.push(defaultRouteForRole(form.role));
};
</script>

<template>
  <PublicLayout>
    <section class="auth-wrap login-screen">
      <article class="auth-card login-card">
        <p class="badge violet">Вход</p>
        <h1>Личный кабинет</h1>
        <p class="lead dark">
          Для проверки логики роль выбирается прямо в форме. Так можно открыть кабинет участника,
          преподавателя или администратора.
        </p>

        <form class="form-grid" @submit.prevent="handleLogin">
          <label>
            <span>ФИО</span>
            <input v-model="form.name" type="text" placeholder="Введите ФИО">
          </label>
          <label>
            <span>E-mail</span>
            <input v-model="form.email" type="email" placeholder="Введите e-mail">
          </label>
          <label>
            <span>Пароль</span>
            <input v-model="form.password" type="password" placeholder="Введите пароль">
          </label>
          <label>
            <span>Роль</span>
            <select v-model="form.role">
              <option value="user">Участник</option>
              <option value="organizer">Преподаватель</option>
              <option value="admin">Администратор</option>
            </select>
          </label>
          <button class="btn full" type="submit">Войти</button>
        </form>

        <p class="switch-link">
          Нет аккаунта?
          <RouterLink :to="{ name: 'register', params: { step: 'start' } }">
            зарегистрироваться
          </RouterLink>
        </p>
      </article>
    </section>
  </PublicLayout>
</template>

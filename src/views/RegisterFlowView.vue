<script setup>
import { computed, reactive } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import PublicLayout from "@/components/PublicLayout.vue";
import { registerSteps } from "@/data/appData";

const route = useRoute();
const router = useRouter();

const form = reactive({
  name: "Иванов Иван Иванович",
  email: "user@example.com",
  role: "user",
  code: "",
  password: "",
  passwordRepeat: ""
});

const step = computed(() => route.params.step);
const currentStep = computed(() => registerSteps.find((item) => item.id === step.value));

const goNext = async () => {
  if (step.value === "start") {
    await router.push({ name: "register", params: { step: "code" } });
    return;
  }

  if (step.value === "code") {
    await router.push({ name: "register", params: { step: "password" } });
    return;
  }

  if (step.value === "password") {
    await router.push({ name: "register", params: { step: "done" } });
    return;
  }

  await router.push({ name: "login" });
};
</script>

<template>
  <PublicLayout>
    <section class="auth-wrap register-screen">
      <article class="auth-card register-card">
        <p class="badge blue">{{ currentStep?.title }}</p>
        <h1>{{ currentStep?.caption }}</h1>

        <div class="step-row">
          <span
            v-for="item in registerSteps"
            :key="item.id"
            class="step-pill"
            :class="{ active: item.id === step }"
          >
            {{ item.title }}
          </span>
        </div>

        <form class="form-grid" @submit.prevent="goNext">
          <template v-if="step === 'start'">
            <label>
              <span>ФИО</span>
              <input v-model="form.name" type="text">
            </label>
            <label>
              <span>E-mail</span>
              <input v-model="form.email" type="email">
            </label>
            <label>
              <span>Роль</span>
              <select v-model="form.role">
                <option value="user">Участник</option>
                <option value="organizer">Преподаватель</option>
              </select>
            </label>
            <button class="btn full" type="submit">Получить код</button>
          </template>

          <template v-else-if="step === 'code'">
            <label>
              <span>Код из сообщения</span>
              <input v-model="form.code" type="text" maxlength="4" placeholder="1234">
            </label>
            <button class="btn full" type="submit">Далее</button>
          </template>

          <template v-else-if="step === 'password'">
            <label>
              <span>Пароль</span>
              <input v-model="form.password" type="password">
            </label>
            <label>
              <span>Повторите пароль</span>
              <input v-model="form.passwordRepeat" type="password">
            </label>
            <button class="btn full" type="submit">Далее</button>
          </template>

          <template v-else>
            <div class="success-box">
              <h3>Аккаунт создан</h3>
              <p>Регистрация завершена. Для входа используй форму авторизации.</p>
            </div>
            <button class="btn full" type="submit">Перейти ко входу</button>
          </template>
        </form>

        <p class="switch-link">
          Уже есть аккаунт?
          <RouterLink :to="{ name: 'login' }">войти</RouterLink>
        </p>
      </article>
    </section>
  </PublicLayout>
</template>

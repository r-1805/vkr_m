<script setup>
import { computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import PublicLayout from "@/components/PublicLayout.vue";

const route = useRoute();
const router = useRouter();

const form = reactive({
  email: "",
  code: "",
  phone: "",
  password: "",
  isRobotChecked: false
});

const step = computed(() => String(route.params.step || "start"));

const stepMeta = computed(() => {
  if (step.value === "code") {
    return {
      title: "РЕГИСТРАЦИЯ",
      placeholder: "Введите код",
      button: "Далее"
    };
  }

  if (step.value === "password") {
    return {
      title: "РЕГИСТРАЦИЯ",
      phonePlaceholder: "Телефон",
      passwordPlaceholder: "Пароль",
      button: "Далее"
    };
  }

  if (step.value === "done") {
    return {
      title: "РЕГИСТРАЦИЯ",
      button: "Перейти ко входу"
    };
  }

  return {
    title: "РЕГИСТРАЦИЯ",
    placeholder: "Укажите почту",
    button: "Получить код"
  };
});

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
        <h1>{{ stepMeta.title }}</h1>

        <form class="register-form" @submit.prevent="goNext">
          <template v-if="step === 'start'">
            <input
              v-model="form.email"
              class="register-input"
              type="email"
              :placeholder="stepMeta.placeholder"
              autocomplete="email"
            >

            <label class="register-check">
              <input v-model="form.isRobotChecked" type="checkbox">
              <span>Я не робот</span>
            </label>

            <button class="register-submit" type="submit">{{ stepMeta.button }}</button>
          </template>

          <template v-else-if="step === 'code'">
            <input
              v-model="form.code"
              class="register-input"
              type="text"
              maxlength="4"
              :placeholder="stepMeta.placeholder"
              inputmode="numeric"
            >

            <button class="register-submit" type="submit">{{ stepMeta.button }}</button>
          </template>

          <template v-else-if="step === 'password'">
            <input
              v-model="form.phone"
              class="register-input"
              type="text"
              :placeholder="stepMeta.phonePlaceholder"
              autocomplete="tel"
            >

            <input
              v-model="form.password"
              class="register-input"
              type="password"
              :placeholder="stepMeta.passwordPlaceholder"
              autocomplete="new-password"
            >

            <button class="register-submit" type="submit">{{ stepMeta.button }}</button>
          </template>

          <template v-else>
            <p class="register-note">Аккаунт создан. Теперь можно перейти ко входу.</p>
            <button class="register-submit" type="submit">{{ stepMeta.button }}</button>
          </template>
        </form>
      </article>
    </section>
  </PublicLayout>
</template>

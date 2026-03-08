<script setup>
import { RouterLink } from "vue-router";
import PublicLayout from "@/components/PublicLayout.vue";
</script>

<template>
  <PublicLayout>
    <section class="screen-home">
      <div class="home-hero">
        <h1>ИНВЕСТИРУЙТЕ В СВОЁ БУДУЩЕЕ!</h1>
        <p>Регистрация на конференцию — это первый шаг к профессиональному прорыву</p>
        <RouterLink class="cta-home" :to="{ name: 'events' }">
          Подать заявку на участие в конференции
        </RouterLink>
      </div>
    </section>
  </PublicLayout>
</template>

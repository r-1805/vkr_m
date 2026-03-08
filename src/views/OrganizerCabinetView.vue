<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import CabinetLayout from "@/components/CabinetLayout.vue";
import { organizerEvents, organizerProfile, organizerStats } from "@/data/appData";

const route = useRoute();
const section = computed(() => route.meta.section);

const tabs = [
  { label: "Профиль", to: { name: "organizer-profile" } },
  { label: "Панель организатора", to: { name: "organizer-panel" } },
  { label: "Статистика", to: { name: "organizer-stats" } }
];

const wizardStep = computed(() => {
  if (section.value === "add-sections") return 2;
  if (section.value === "add-secretaries") return 3;
  if (section.value === "add-saved") return 4;
  return 1;
});
</script>

<template>
  <CabinetLayout
    title="Кабинет преподавателя"
    subtitle="Организатор мероприятий, список секций, секретарей и статистика по заявкам."
    :tabs="tabs"
    tone="blue"
  >
    <template v-if="section === 'profile'">
      <section class="board-grid">
        <article class="card">
          <p class="card-label">Профиль</p>
          <h3>{{ organizerProfile.name }}</h3>
          <p>{{ organizerProfile.role }}</p>
          <div class="chips">
            <span v-for="item in organizerProfile.sections" :key="item">{{ item }}</span>
          </div>
        </article>
        <article class="card">
          <p class="card-label">Уведомления</p>
          <ul class="plain-list">
            <li v-for="item in organizerProfile.alerts" :key="item">{{ item }}</li>
          </ul>
        </article>
      </section>
    </template>

    <template v-else-if="section === 'panel'">
      <section class="stack">
        <article v-for="item in organizerEvents" :key="item.id" class="card wide">
          <div class="row between">
            <div>
              <p class="card-label">{{ item.status }}</p>
              <h3>{{ item.title }}</h3>
              <p>Участников: {{ item.participants }} • Секций: {{ item.sections }}</p>
            </div>
            <div class="row">
              <RouterLink class="btn btn-light" :to="{ name: 'organizer-add-info' }">Добавить мероприятие</RouterLink>
              <RouterLink class="btn" :to="{ name: 'organizer-stats' }">Статистика</RouterLink>
            </div>
          </div>
        </article>
      </section>
    </template>

    <template v-else-if="section === 'stats'">
      <section class="stat-grid">
        <article v-for="item in organizerStats" :key="item.label" class="stat-card">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <div class="bar"><span :style="{ width: `${item.value * 3}%` }"></span></div>
        </article>
      </section>
    </template>

    <template v-else>
      <article class="card wide">
        <p class="card-label">Добавить мероприятие</p>
        <div class="step-row">
          <span class="step-pill" :class="{ active: wizardStep === 1 }">Информация</span>
          <span class="step-pill" :class="{ active: wizardStep === 2 }">Секции</span>
          <span class="step-pill" :class="{ active: wizardStep === 3 }">Секретари</span>
          <span class="step-pill" :class="{ active: wizardStep === 4 }">Сохранено</span>
        </div>

        <form class="form-grid">
          <template v-if="section === 'add-info'">
            <label>
              <span>Название мероприятия</span>
              <input type="text" value="ИНТЕР ЭКСПО ГЕО-Сибирь 2026">
            </label>
            <label>
              <span>Период</span>
              <input type="text" value="15-18 мая 2026">
            </label>
            <div class="row">
              <RouterLink class="btn" :to="{ name: 'organizer-add-sections' }">Секции</RouterLink>
            </div>
          </template>

          <template v-else-if="section === 'add-sections'">
            <label class="full">
              <span>Список секций</span>
              <textarea rows="5">История
IT
Робототехника
Геоинформатика</textarea>
            </label>
            <div class="row">
              <RouterLink class="btn" :to="{ name: 'organizer-add-secretaries' }">Секретари</RouterLink>
            </div>
          </template>

          <template v-else-if="section === 'add-secretaries'">
            <label>
              <span>Ответственный секретарь</span>
              <input type="text" value="Петров П.П.">
            </label>
            <label>
              <span>Доп. секретарь</span>
              <input type="text" value="Сидорова А.А.">
            </label>
            <div class="row">
              <RouterLink class="btn" :to="{ name: 'organizer-add-saved' }">Сохранить</RouterLink>
            </div>
          </template>

          <template v-else>
            <div class="success-box">
              <h3>Мероприятие сохранено</h3>
              <p>Форма выглядит как состояние после нажатия на кнопку «Сохранить».</p>
            </div>
          </template>
        </form>
      </article>
    </template>
  </CabinetLayout>
</template>

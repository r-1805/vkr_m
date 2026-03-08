<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import PublicLayout from "@/components/PublicLayout.vue";
import { userArchive, userEvents, userProfile } from "@/data/appData";

const route = useRoute();

const section = computed(() => route.meta.section);
const currentEvent = computed(() => userEvents.find((item) => item.id === Number(route.params.id)));

const tabs = [
  { label: "Профиль", to: { name: "cabinet-profile" } },
  { label: "Мои мероприятия", to: { name: "cabinet-events" } },
  { label: "Архив", to: { name: "cabinet-archive" } }
];

const profileFields = [
  { label: "Фамилия", value: "Иванов" },
  { label: "Имя", value: "Иван" },
  { label: "Отчество", value: "Иванович" },
  { label: "Статус", value: "Студент" },
  { label: "Университет", value: userProfile.university },
  { label: "E-mail", value: userProfile.email },
  { label: "Город", value: userProfile.city },
  { label: "Группа", value: "БИ-41" }
];
</script>

<template>
  <PublicLayout>
    <section class="screen-user">
      <article class="user-panel">
        <div class="user-panel-head">
          <div class="user-tabs">
            <RouterLink
              v-for="tab in tabs"
              :key="tab.label"
              class="user-tab"
              :class="{ active: route.name === tab.to.name }"
              :to="tab.to"
            >
              {{ tab.label }}
            </RouterLink>
          </div>

          <RouterLink class="user-exit" :to="{ name: 'home' }">Выйти</RouterLink>
        </div>

        <h1 class="user-title">ЛИЧНЫЙ КАБИНЕТ</h1>

        <template v-if="section === 'profile'">
          <div class="user-fields">
            <div v-for="item in profileFields" :key="item.label" class="user-field">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
              <button class="user-edit" type="button">✎</button>
            </div>
          </div>
        </template>

        <template v-else-if="section === 'events'">
          <div class="user-records">
            <article class="user-record">
              <h2>{{ userEvents[0].title }}</h2>
              <RouterLink class="user-record-btn" :to="{ name: 'cabinet-event-detail', params: { id: userEvents[0].id } }">
                Открыть
              </RouterLink>
            </article>

            <div class="user-record-footer">
              <RouterLink class="user-ghost-btn" :to="{ name: 'cabinet-draft', params: { id: userEvents[1].id } }">
                Черновик
              </RouterLink>
            </div>
          </div>
        </template>

        <template v-else-if="section === 'archive'">
          <div class="user-records">
            <article class="user-record archive">
              <h2>{{ userArchive[0].title }}</h2>
              <div class="user-record-actions">
                <button class="user-ghost-btn" type="button">Сборник</button>
                <button class="user-record-btn" type="button">Получить сертификат</button>
              </div>
            </article>
          </div>
        </template>

        <template v-else-if="section === 'event-detail'">
          <div class="user-detail-box">
            <h2>{{ currentEvent?.title }}</h2>
            <p>{{ currentEvent?.theme }}</p>
            <div class="user-detail-meta">
              <span>{{ currentEvent?.section }}</span>
              <span>{{ currentEvent?.date }}</span>
              <span>{{ currentEvent?.status }}</span>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="user-detail-box">
            <h2>Черновик заявки</h2>
            <p>{{ currentEvent?.theme }}</p>
            <button class="user-record-btn wide" type="button">Сохранить</button>
          </div>
        </template>
      </article>
    </section>
  </PublicLayout>
</template>

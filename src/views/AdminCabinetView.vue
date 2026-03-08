<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import CabinetLayout from "@/components/CabinetLayout.vue";
import { adminEvents, adminModerators, adminOrganizers, adminUsers } from "@/data/appData";

const route = useRoute();
const section = computed(() => route.meta.section);
const selectedUser = computed(() => adminUsers.find((item) => item.id === Number(route.params.id)));

const tabs = [
  { label: "Профиль", to: { name: "admin-overview" } },
  { label: "Пользователи", to: { name: "admin-users" } },
  { label: "Организаторы", to: { name: "admin-organizers" } },
  { label: "Модераторы", to: { name: "admin-moderators" } },
  { label: "Мероприятия", to: { name: "admin-events" } }
];
</script>

<template>
  <CabinetLayout
    title="Панель администратора"
    subtitle="Управление пользователями, ролями модераторов и состоянием мероприятий."
    :tabs="tabs"
    tone="violet"
  >
    <template v-if="section === 'overview'">
      <section class="stat-grid">
        <article class="stat-card">
          <span>Пользователи</span>
          <strong>{{ adminUsers.length }}</strong>
        </article>
        <article class="stat-card">
          <span>Организаторы</span>
          <strong>{{ adminOrganizers.length }}</strong>
        </article>
        <article class="stat-card">
          <span>Модераторы</span>
          <strong>{{ adminModerators.length }}</strong>
        </article>
        <article class="stat-card">
          <span>Текущие мероприятия</span>
          <strong>{{ adminEvents.current.length }}</strong>
        </article>
      </section>
    </template>

    <template v-else-if="section === 'users'">
      <section class="stack">
        <article v-for="item in adminUsers" :key="item.id" class="card wide">
          <div class="row between">
            <div>
              <p class="card-label">{{ item.role }}</p>
              <h3>{{ item.name }}</h3>
              <p>{{ item.email }} • {{ item.status }}</p>
            </div>
            <RouterLink class="btn" :to="{ name: 'admin-user-detail', params: { id: item.id } }">
              Открыть
            </RouterLink>
          </div>
        </article>
      </section>
    </template>

    <template v-else-if="section === 'user-detail'">
      <article class="card wide">
        <p class="card-label">Пользователь</p>
        <h3>{{ selectedUser?.name }}</h3>
        <div class="info-list dark-list">
          <div><span>Роль</span><strong>{{ selectedUser?.role }}</strong></div>
          <div><span>E-mail</span><strong>{{ selectedUser?.email }}</strong></div>
          <div><span>Статус</span><strong>{{ selectedUser?.status }}</strong></div>
        </div>
      </article>
    </template>

    <template v-else-if="section === 'organizers'">
      <article class="card wide">
        <p class="card-label">Организаторы</p>
        <ul class="plain-list">
          <li v-for="item in adminOrganizers" :key="item">{{ item }}</li>
        </ul>
      </article>
    </template>

    <template v-else-if="section === 'moderators'">
      <article class="card wide">
        <p class="card-label">Модераторы</p>
        <ul class="plain-list">
          <li v-for="item in adminModerators" :key="item">{{ item }}</li>
        </ul>
      </article>
    </template>

    <template v-else>
      <section class="stack">
        <article class="card wide">
          <div class="row between">
            <div>
              <p class="card-label">Мероприятия</p>
              <h3>Все мероприятия</h3>
            </div>
            <div class="row">
              <RouterLink class="btn btn-light" :to="{ name: 'admin-events-current' }">Текущие</RouterLink>
              <RouterLink class="btn" :to="{ name: 'admin-events-archive' }">Архив</RouterLink>
            </div>
          </div>
        </article>

        <article
          v-for="item in section === 'events-archive' ? adminEvents.archive : adminEvents.current"
          :key="item.id"
          class="card wide"
        >
          <p class="card-label">{{ item.state }}</p>
          <h3>{{ item.title }}</h3>
          <p>Записей: {{ item.users }}</p>
        </article>
      </section>
    </template>
  </CabinetLayout>
</template>

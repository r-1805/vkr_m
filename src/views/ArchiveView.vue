<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import PublicLayout from "@/components/PublicLayout.vue";
import photo1 from "@/img/Desktop16.1.png";
import photo2 from "@/img/Desktop16.2.png";
import photo3 from "@/img/Desktop16.3.png";
import photo4 from "@/img/Desktop16.4.png";

const route = useRoute();

const archivedEvents = [
  {
    id: 101,
    title: "ИНТЕР ЭКСПО ГЕО-Сибирь 2022",
    description:
      "Прошёл XVII Международный конгресс и научный конгресс «Интерэкспо ГЕО-Сибирь» - крупнейший в России форум в области геопространственной деятельности.",
    image: photo1
  },
  {
    id: 102,
    title: "Цифровые технологии в геодезии 2023",
    description:
      "Студенческая конференция по итогам года с докладами, проектными работами и публикацией лучших материалов в архиве университета.",
    image: photo2
  }
];

const archivePhotos = [photo1, photo2, photo3, photo4, photo1, photo2, photo3, photo4, photo1, photo2, photo3, photo4];
const isPhotosRoute = computed(() => route.name === "archive-photos");
</script>

<template>
  <PublicLayout>
    <section v-if="!isPhotosRoute" class="screen-archive archive-list-screen">
      <article v-for="event in archivedEvents" :key="event.id" class="archive-event-card">
        <div class="archive-event-info">
          <RouterLink class="archive-title-link" :to="{ name: 'archive-photos' }">
            <h2>{{ event.title }}</h2>
          </RouterLink>
          <p>{{ event.description }}</p>

          <div class="archive-event-actions">
            <button class="archive-link" type="button">Какие-то документы</button>
            <RouterLink class="archive-link archive-link-primary" :to="{ name: 'archive-photos' }">
              Архив фотографий
            </RouterLink>
          </div>
        </div>

        <RouterLink class="archive-event-preview" :to="{ name: 'archive-photos' }">
          <img :src="event.image" :alt="event.title">
        </RouterLink>
      </article>
    </section>

    <section v-else class="screen-archive">
      <article class="archive-card archive-gallery-card">
        <h1>ИНТЕР ЭКСПО ГЕО-Сибирь 2022</h1>

        <div class="archive-grid">
          <div v-for="(photo, index) in archivePhotos" :key="`${photo}-${index}`" class="archive-photo">
            <img :src="photo" alt="Архив мероприятия">
          </div>
        </div>
      </article>
    </section>
  </PublicLayout>
</template>

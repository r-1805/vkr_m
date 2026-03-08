<script setup>
import PublicLayout from "@/components/PublicLayout.vue";
import photo1 from "@/img/Desktop16.1.png";
import photo2 from "@/img/Desktop16.2.png";
import photo3 from "@/img/Desktop16.3.png";
import photo4 from "@/img/Desktop16.4.png";

const archivePhotos = [photo1, photo2, photo3, photo4, photo1, photo2, photo3, photo4, photo1, photo2, photo3, photo4];
</script>

<template>
  <PublicLayout>
    <section class="screen-archive">
      <article class="archive-card">
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

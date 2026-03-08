<script setup>
import { computed, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import ModalBox from "@/components/ModalBox.vue";
import PublicLayout from "@/components/PublicLayout.vue";
import { useConferences } from "@/composables/useConferences";
import { formatDateRange } from "@/data/appData";
import eventImage1 from "@/img/Desktop3.1.jpg";
import eventImage2 from "@/img/Desktop3.2.jpg";
import detailImage from "@/img/Desktop17.jpg";

const route = useRoute();
const { conferences, error, loadConferences } = useConferences();

onMounted(loadConferences);

const list = computed(() =>
  conferences.value.map((item, index) => ({
    ...item,
    photo: index === 0 ? eventImage1 : eventImage2
  }))
);

const leadConference = computed(() => list.value[0]);
const secondConference = computed(() => list.value[1]);
const isApplyModalOpen = computed(() => route.name === "events-apply");
</script>

<template>
  <PublicLayout>
    <section v-if="route.name !== 'events-detail'" class="screen-events">
      <article v-if="leadConference" class="event-card">
        <div class="event-info">
          <h2>{{ leadConference.title }}</h2>
          <p>
            Пройдёт XVIII Международная выставка и научный конгресс «Интерэкспо ГЕО-Сибирь» –
            крупнейший в России форум в области геопространственной деятельности.
          </p>
          <strong>{{ formatDateRange(leadConference.start_date, leadConference.end_date) }}</strong>
          <RouterLink class="event-btn" :to="{ name: 'events-apply' }">Подать заявку</RouterLink>
        </div>

        <RouterLink class="event-preview" :to="{ name: 'events-detail' }">
          <img :src="leadConference.photo" alt="Текущее мероприятие">
        </RouterLink>
      </article>

      <article v-if="secondConference" class="event-card small">
        <div class="event-info">
          <h2>{{ secondConference.title }}</h2>
          <p>Студенческая конференция по итогам года и проектной деятельности.</p>
          <strong>{{ formatDateRange(secondConference.start_date, secondConference.end_date) }}</strong>
          <RouterLink class="event-btn" :to="{ name: 'events-apply' }">Подать заявку</RouterLink>
        </div>
        <div class="event-preview">
          <img :src="secondConference.photo" alt="Второе мероприятие">
        </div>
      </article>

      <p v-if="error" class="screen-note">{{ error }}</p>
    </section>

    <section v-else class="screen-detail">
      <article class="detail-card">
        <h1>ИНТЕР ЭКСПО ГЕО-Сибирь 2025</h1>
        <p class="detail-text">
          Пройдёт XVIII Международная выставка и научный конгресс ГЕО-Сибирь – крупнейший в России
          форум в области геопространственной деятельности. Пройдёт XVIII Международная выставка и
          научный конгресс «Интерэкспо ГЕО-Сибирь» – крупнейший в России форум в области
          геопространственной деятельности. Пройдёт XVIII Международная выставка и научный
          конгресс «Интерэкспо ГЕО-Сибирь» – крупнейший в России форум в области геопространственной
          деятельности.
        </p>

        <div class="detail-grid">
          <div class="detail-photo">
            <img :src="detailImage" alt="Детальная страница мероприятия">
          </div>

          <p class="detail-side">
            Пройдёт XVIII Международная выставка и научный конгресс «Интерэкспо ГЕО-Сибирь» –
            крупнейший в России форум в области геопространственной деятельности. Пройдёт XVIII
            Международная выставка и научный конгресс «Интерэкспо ГЕО-Сибирь» – крупнейший в России
            форум в области геопространственной деятельности.
          </p>
        </div>

        <div class="detail-actions">
          <button class="detail-link" type="button">Какие-то документы</button>
          <RouterLink class="event-btn" :to="{ name: 'events-apply' }">Подать заявку</RouterLink>
        </div>
      </article>
    </section>

    <ModalBox
      v-if="isApplyModalOpen"
      title="Подача заявки"
      subtitle="Заполните форму участия в конференции"
      :close-to="{ name: 'events' }"
    >
      <div class="apply-modal">
        <div class="apply-modal-grid">
          <label>
            <span>Мероприятие</span>
            <input type="text" :value="leadConference?.title || 'ИНТЕР ЭКСПО ГЕО-Сибирь 2025'">
          </label>
          <label>
            <span>Секция</span>
            <select>
              <option>Секция истории</option>
              <option>Секция IT</option>
              <option>Секция робототехники</option>
            </select>
          </label>
          <label class="full">
            <span>Тема доклада</span>
            <input type="text" value="Роль цифровых карт в исследовании городской среды">
          </label>
          <label class="full">
            <span>Описание</span>
            <textarea rows="4">Краткое описание работы и ключевые тезисы выступления.</textarea>
          </label>
        </div>

        <div class="apply-actions">
          <button class="detail-link" type="button">Сохранить как черновик</button>
          <RouterLink class="event-btn" :to="{ name: 'cabinet-events' }">Отправить</RouterLink>
        </div>
      </div>
    </ModalBox>
  </PublicLayout>
</template>

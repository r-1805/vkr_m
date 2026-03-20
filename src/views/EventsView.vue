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
          <RouterLink class="event-title-link" :to="{ name: 'events-detail' }">
            <h2>{{ leadConference.title }}</h2>
          </RouterLink>
          <p>
            Пройдёт XVIII Международная выставка и научный конгресс «Интерэкспо ГЕО-Сибирь» -
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
          <RouterLink class="event-title-link" :to="{ name: 'events-detail' }">
            <h2>{{ secondConference.title }}</h2>
          </RouterLink>
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
          Пройдёт XVIII Международная выставка и научный конгресс ГЕО-Сибирь - крупнейший в России
          форум в области геопространственной деятельности. Пройдёт XVIII Международная выставка и
          научный конгресс «Интерэкспо ГЕО-Сибирь» - крупнейший в России форум в области
          геопространственной деятельности. Пройдёт XVIII Международная выставка и научный
          конгресс «Интерэкспо ГЕО-Сибирь» - крупнейший в России форум в области
          геопространственной деятельности.
        </p>

        <div class="detail-grid">
          <div class="detail-photo">
            <img :src="detailImage" alt="Детальная страница мероприятия">
          </div>

          <p class="detail-side">
            Пройдёт XVIII Международная выставка и научный конгресс «Интерэкспо ГЕО-Сибирь» -
            крупнейший в России форум в области геопространственной деятельности. Пройдёт XVIII
            Международная выставка и научный конгресс «Интерэкспо ГЕО-Сибирь» - крупнейший в России
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
      hide-header
      :close-to="{ name: 'events' }"
    >
      <div class="apply-modal-shell">
        <div class="apply-modal">
          <h2 class="apply-modal-title">РЕГИСТРАЦИЯ НА КОНФЕРЕНЦИЮ</h2>

          <div class="apply-modal-grid apply-modal-grid-single">
            <label class="apply-field">
              <span>Выберите секцию</span>
              <select>
                <option>{{ leadConference?.title || "ИНТЕР ЭКСПО ГЕО-Сибирь 2025" }}</option>
                <option>Цифровые технологии в геодезии</option>
                <option>Прикладная картография</option>
              </select>
            </label>

            <label class="apply-field">
              <span>Выберите подсекцию</span>
              <select>
                <option>Выберите подсекцию</option>
                <option>Секция истории</option>
                <option>Секция IT</option>
                <option>Секция робототехники</option>
              </select>
            </label>

            <label class="apply-field">
              <span>Введите название доклада</span>
              <input type="text" value="Роль цифровых карт в исследовании городской среды">
            </label>

            <label class="apply-field">
              <span>Описание доклада</span>
              <input type="text" value="Краткое описание работы и ключевые тезисы выступления">
            </label>

            <label class="apply-field apply-file-field">
              <span>Прикрепить файл с отчётом о докладе</span>
              <input type="text" value="report_geo_siberia_2025.docx">
            </label>
          </div>

          <section class="apply-form-section">
            <h3 class="apply-form-title">АВТОР</h3>

            <div class="apply-modal-grid apply-modal-grid-double">
              <label class="apply-field">
                <span>Фамилия</span>
                <input type="text" value="Иванова">
              </label>
              <label class="apply-field">
                <span>Организация (полное наименование)</span>
                <select>
                  <option>Организация (полное наименование)</option>
                </select>
              </label>

              <label class="apply-field">
                <span>Имя</span>
                <input type="text" value="Мария">
              </label>
              <label class="apply-field">
                <span>Организация (краткое наименование)</span>
                <select>
                  <option>Организация (краткое наименование)</option>
                </select>
              </label>

              <label class="apply-field">
                <span>Отчество</span>
                <input type="text" value="Александровна">
              </label>
              <label class="apply-field">
                <span>Кафедра/отделение/лаборатория</span>
                <select>
                  <option>Кафедра/отделение/лаборатория</option>
                </select>
              </label>

              <label class="apply-field">
                <span>Телефон</span>
                <input type="text" value="+7 (999) 123-45-67">
              </label>
              <label class="apply-field">
                <span>Группа/направленность</span>
                <select>
                  <option>Группа/направленность</option>
                </select>
              </label>

              <label class="apply-field">
                <span>Email</span>
                <input type="email" value="student@example.com">
              </label>
              <label class="apply-field">
                <span>Статус</span>
                <select>
                  <option>Статус</option>
                  <option>Студент</option>
                  <option>Аспирант</option>
                  <option>Молодой исследователь</option>
                </select>
              </label>
            </div>

            <div class="apply-meta-row">
              <label class="apply-checkbox">
                <input type="checkbox">
                <span>Отправить сборнику материалов</span>
              </label>

              <button class="apply-inline-link" type="button">Добавить соавтора (Максимум 2)</button>
            </div>
          </section>

          <section class="apply-form-section">
            <h3 class="apply-form-title">НАУЧНЫЙ РУКОВОДИТЕЛЬ</h3>

            <div class="apply-modal-grid apply-modal-grid-double">
              <label class="apply-field">
                <span>Фамилия</span>
                <input type="text" value="Петров">
              </label>
              <label class="apply-field">
                <span>Организация (полное наименование)</span>
                <input type="text" value="СГУГиТ">
              </label>

              <label class="apply-field">
                <span>Имя</span>
                <input type="text" value="Игорь">
              </label>
              <label class="apply-field">
                <span>Должность</span>
                <input type="text" value="Доцент">
              </label>

              <label class="apply-field">
                <span>Отчество</span>
                <input type="text" value="Викторович">
              </label>
              <label class="apply-field">
                <span>Учёная степень</span>
                <input type="text" value="Кандидат технических наук">
              </label>

              <label class="apply-field">
                <span>Телефон</span>
                <input type="text" value="+7 (913) 555-00-12">
              </label>
              <label class="apply-field">
                <span>Учёное звание</span>
                <input type="text" value="Доцент">
              </label>

              <label class="apply-field">
                <span>Email</span>
                <input type="email" value="supervisor@example.com">
              </label>
              <div class="apply-field apply-field-ghost"></div>
            </div>

            <div class="apply-meta-row apply-meta-row-end">
              <button class="apply-inline-link" type="button">Добавить руководителя (Максимум 2)</button>
            </div>
          </section>

          <div class="apply-actions">
            <button class="apply-btn apply-btn-ghost" type="button">В черновик</button>
            <RouterLink class="apply-btn apply-btn-primary" :to="{ name: 'cabinet-events' }">Подать заявку</RouterLink>
          </div>
        </div>
      </div>
    </ModalBox>
  </PublicLayout>
</template>

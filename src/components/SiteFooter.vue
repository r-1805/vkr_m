<script setup>
import { siteContacts } from "@/data/siteContacts";
</script>

<template>
  <footer class="site-footer">
    <div
      v-for="item in siteContacts"
      :key="item.title"
      class="site-footer-item"
      :class="{ 'site-footer-item-wide': item.title === 'Адрес' }"
    >
      <p class="footer-title">{{ item.title }}</p>
      <a v-if="item.href" :href="item.href">{{ item.value }}</a>
      <p v-else>{{ item.value }}</p>
    </div>
  </footer>
</template>

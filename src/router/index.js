import { createRouter, createWebHistory } from "vue-router";
import { authState, defaultRouteForRole } from "@/composables/useAuth";
import HomeView from "@/views/HomeView.vue";
import EventsView from "@/views/EventsView.vue";
import ArchiveView from "@/views/ArchiveView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterFlowView from "@/views/RegisterFlowView.vue";
import UserCabinetView from "@/views/UserCabinetView.vue";
import OrganizerCabinetView from "@/views/OrganizerCabinetView.vue";
import AdminCabinetView from "@/views/AdminCabinetView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/events",
    name: "events",
    component: EventsView
  },
  {
    path: "/events/apply",
    name: "events-apply",
    component: EventsView,
    meta: { modal: "apply" }
  },
  {
    path: "/events/detail",
    name: "events-detail",
    component: EventsView,
    meta: { modal: "detail" }
  },
  {
    path: "/archive",
    name: "archive",
    component: ArchiveView
  },
  {
    path: "/archive/photos",
    name: "archive-photos",
    component: ArchiveView,
    meta: { modal: "photos" }
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/register/:step(start|code|password|done)",
    name: "register",
    component: RegisterFlowView,
    props: true
  },
  {
    path: "/cabinet/profile",
    name: "cabinet-profile",
    component: UserCabinetView,
    meta: { requiresAuth: true, role: "user", section: "profile" }
  },
  {
    path: "/cabinet/events",
    name: "cabinet-events",
    component: UserCabinetView,
    meta: { requiresAuth: true, role: "user", section: "events" }
  },
  {
    path: "/cabinet/events/:id",
    name: "cabinet-event-detail",
    component: UserCabinetView,
    meta: { requiresAuth: true, role: "user", section: "event-detail" }
  },
  {
    path: "/cabinet/drafts/:id",
    name: "cabinet-draft",
    component: UserCabinetView,
    meta: { requiresAuth: true, role: "user", section: "draft" }
  },
  {
    path: "/cabinet/archive",
    name: "cabinet-archive",
    component: UserCabinetView,
    meta: { requiresAuth: true, role: "user", section: "archive" }
  },
  {
    path: "/organizer/profile",
    name: "organizer-profile",
    component: OrganizerCabinetView,
    meta: { requiresAuth: true, role: "organizer", section: "profile" }
  },
  {
    path: "/organizer/panel",
    name: "organizer-panel",
    component: OrganizerCabinetView,
    meta: { requiresAuth: true, role: "organizer", section: "panel" }
  },
  {
    path: "/organizer/panel/add",
    name: "organizer-add-info",
    component: OrganizerCabinetView,
    meta: { requiresAuth: true, role: "organizer", section: "add-info" }
  },
  {
    path: "/organizer/panel/add/sections",
    name: "organizer-add-sections",
    component: OrganizerCabinetView,
    meta: { requiresAuth: true, role: "organizer", section: "add-sections" }
  },
  {
    path: "/organizer/panel/add/secretaries",
    name: "organizer-add-secretaries",
    component: OrganizerCabinetView,
    meta: { requiresAuth: true, role: "organizer", section: "add-secretaries" }
  },
  {
    path: "/organizer/panel/add/saved",
    name: "organizer-add-saved",
    component: OrganizerCabinetView,
    meta: { requiresAuth: true, role: "organizer", section: "add-saved" }
  },
  {
    path: "/organizer/panel/stats",
    name: "organizer-stats",
    component: OrganizerCabinetView,
    meta: { requiresAuth: true, role: "organizer", section: "stats" }
  },
  {
    path: "/admin",
    name: "admin-overview",
    component: AdminCabinetView,
    meta: { requiresAuth: true, role: "admin", section: "overview" }
  },
  {
    path: "/admin/users",
    name: "admin-users",
    component: AdminCabinetView,
    meta: { requiresAuth: true, role: "admin", section: "users" }
  },
  {
    path: "/admin/users/:id",
    name: "admin-user-detail",
    component: AdminCabinetView,
    meta: { requiresAuth: true, role: "admin", section: "user-detail" }
  },
  {
    path: "/admin/organizers",
    name: "admin-organizers",
    component: AdminCabinetView,
    meta: { requiresAuth: true, role: "admin", section: "organizers" }
  },
  {
    path: "/admin/moderators",
    name: "admin-moderators",
    component: AdminCabinetView,
    meta: { requiresAuth: true, role: "admin", section: "moderators" }
  },
  {
    path: "/admin/events",
    name: "admin-events",
    component: AdminCabinetView,
    meta: { requiresAuth: true, role: "admin", section: "events" }
  },
  {
    path: "/admin/events/current",
    name: "admin-events-current",
    component: AdminCabinetView,
    meta: { requiresAuth: true, role: "admin", section: "events-current" }
  },
  {
    path: "/admin/events/archive",
    name: "admin-events-archive",
    component: AdminCabinetView,
    meta: { requiresAuth: true, role: "admin", section: "events-archive" }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to) => {
  if (!to.meta.requiresAuth) {
    return true;
  }

  if (!authState.token) {
    return { name: "login" };
  }

  if (to.meta.role && authState.role !== to.meta.role) {
    return defaultRouteForRole(authState.role);
  }

  return true;
});

export default router;

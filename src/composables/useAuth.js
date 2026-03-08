import { computed, reactive } from "vue";

const authState = reactive({
  token: localStorage.getItem("access_token") || "",
  role: localStorage.getItem("user_role") || "guest",
  name: localStorage.getItem("user_name") || "",
  email: localStorage.getItem("user_email") || ""
});

export const defaultRouteForRole = (role = authState.role) => {
  if (role === "organizer") {
    return { name: "organizer-profile" };
  }

  if (role === "admin") {
    return { name: "admin-overview" };
  }

  return { name: "cabinet-profile" };
};

const login = ({ role = "user", name = "Иван Иванов", email = "user@example.com" } = {}) => {
  authState.token = "fake-token-123";
  authState.role = role;
  authState.name = name;
  authState.email = email;
  localStorage.setItem("access_token", authState.token);
  localStorage.setItem("user_role", authState.role);
  localStorage.setItem("user_name", authState.name);
  localStorage.setItem("user_email", authState.email);
};

const logout = () => {
  authState.token = "";
  authState.role = "guest";
  authState.name = "";
  authState.email = "";
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_role");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_email");
};

export const useAuth = () => ({
  state: authState,
  isAuthenticated: computed(() => Boolean(authState.token)),
  login,
  logout,
  defaultRouteForRole
});

export { authState };

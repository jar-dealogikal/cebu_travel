import { createApp } from "vue";
import App from "./App.vue";
import "./global.css";
import router from "./routes/PublicRoutes";

createApp(App).use(router).mount("#app");

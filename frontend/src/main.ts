import './tailwind.css';
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@core/plugins/router.ts";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createPinia } from "pinia";

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(pinia);

app.mount('#app')

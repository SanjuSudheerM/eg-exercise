import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router.ts";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiEnvelopePaper, BiPerson, BiShieldLock } from "oh-vue-icons/icons";

addIcons(BiEnvelopePaper, BiShieldLock, BiPerson);

const app = createApp(App);
app.use(router);
app.component("vue-icon", OhVueIcon);

app.mount("#app");

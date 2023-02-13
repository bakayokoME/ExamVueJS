import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSimpleAlert from "vue-simple-alert";


library.add(faPhone)
createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

library.add(faPhone);

const app = createApp(App)

app.use(router)
app.use(VueSimpleAlert);

app.mount('#app')

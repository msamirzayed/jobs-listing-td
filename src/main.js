import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../public/data.json'


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "./assets/styles/styles.scss"

createApp(App).use(router).mount('#app')

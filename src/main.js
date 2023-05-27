import VueLuckyCanvas from '@lucky-canvas/vue'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(VueLuckyCanvas)
app.mount('#app')

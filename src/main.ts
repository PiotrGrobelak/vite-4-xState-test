import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { inspect } from '@xstate/inspect';

inspect({
  iframe: false
});

createApp(App).mount('#app')

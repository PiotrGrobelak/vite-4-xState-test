<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <button @click="send('TOGGLE')">
    {{
  state.value === 'inactive'
    ? 'Click to activate'
    : 'Active! Click to deactivate'
    }}
  </button>
</template>


<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'


import { useMachine } from '@xstate/vue';
import { toggleMachine } from './machine';




const { state, send } = useMachine(toggleMachine, {
  devTools: true
});




</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

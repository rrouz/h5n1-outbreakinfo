<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
</script>

<style>
:root {
  --primary-color: #507192;
  --text-color: #333;
  --background-color: #f5f7fa;
  --section-bg-color: #ffffff;
  --border-color: #e0e0e0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'DM Sans', Avenir, Helvetica, Arial, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem;
  text-align: center;
}

/* Navigation styles removed */

main {
  flex: 1;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1, h2, h3 {
  margin-bottom: 1rem;
}

h2 {
  border-bottom: none;
}

select, button {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.dashboard-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--section-bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border: 1px solid var(--border-color);
}
</style>
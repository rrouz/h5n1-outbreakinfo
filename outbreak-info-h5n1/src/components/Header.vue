<!-- src/components/NavBar.vue -->
<template>
  <!--      TODO: Add outbreak.info logo -->
  <!--  TODO: Fix header background -->
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">Avian influenza</router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNav" aria-controls="navbarNav"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/"
                         :class="{ active: $route.path === '/' }">
              Release Date
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/isolation-source"
                         :class="{ active: $route.path === '/isolation-source' }">
              Isolation Source
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/host-source"
                         :class="{ active: $route.path === '/host-source' }">
              Host Source
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dms"
                         :class="{ active: $route.path === '/dms' }">
              DMS
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
// No additional script needed
</script>

<style scoped>
/* In your global CSS or component scoped CSS */
.navbar {
  background-color: rgb(44, 62, 80);
  position: relative;
  overflow: hidden; /* Ensure the SVG doesn't cause scrollbars */
}

.navbar-brand, .nav-link {
  color: white !important;
  position: relative;
  z-index: 2; /* Keep text above the background */
}

/* Container for the svg background at the left side */
.navbar::before {  /* Changed from after to before */
  content: '';
  position: absolute;
  left: 0;  /* Changed from right to left */
  top: 0;
  width: 40%; /* Adjust width as needed */
  height: 100%;
  background-image: url('../assets/navback-01.svg');
  background-repeat: no-repeat;
  background-position: left top; /* Changed to left top */
  background-size: cover;
  z-index: 0;
  pointer-events: none;
}

/* Ensure navbar content is above the SVG background */
.navbar .container,
.navbar-collapse,
.navbar-nav {
  position: relative;
  z-index: 1;
}

/* Make sure brand text is still visible over the SVG */
.navbar-brand {
  padding-left: 10px; /* Add some padding if needed */
}

/* Override Bootstrap's default navbar colors */
.bg-primary {
  background-color: rgb(44, 62, 80) !important;
}
</style>
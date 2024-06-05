<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark success">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="/"><i class="bi-house-fill"></i></a>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link my-focus" id="home" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link my-focus" id="about" to="/about">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link my-focus" id="modules" to="/diagnosis">diagnosis</RouterLink>
            </li>
          </ul>
          <div v-if="loggedIn == true" class="d-flex myFlex">
            <ul class="navbar-nav">
              <span class="welcome">{{ email }}</span>
              <li class="nav-item dropdown">
                <RouterLink to="/login" class="welcome change" title="Options" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <!--<img src="./assets/user.png" height="40" width="35" style="border-radius: 50%" />-->

                </RouterLink>
                <ul class="dropdown-menu dropdown-menu-lg-end mt-3">
                  <li>
                    <RouterLink class="dropdown-item" to="/logout"><i class="bi-row"></i>Log out</RouterLink>
                  </li>
                  <li>
                    <RouterLink class="dropdown-item" to="/login">Another account</RouterLink>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <RouterLink class="dropdown-item" to="#">Profile</RouterLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div v-else class="d-flex myFlex">
            <ul class="navbar-nav">
              <RouterLink to="/login"></RouterLink>
              <RouterLink class="navbar-brand" to="/login" type="button">
                <i class="bi-power"></i>Log in
              </RouterLink>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>
</template>
<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router';
//const route = useRoute()
let loggedIn = ref(false)
let email = ref('')
onMounted(async () => {
})
</script>

<style></style>

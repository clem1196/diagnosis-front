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
              <RouterLink to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/about">About</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/diagnosis">Diagnosis</RouterLink>
            </li>
          </ul>
          <div v-if="loggedIn == true" class="d-flex myFlex">
            <ul class="navbar-nav">
              <span class="welcome">{{ email }}</span>
              <li class="nav-item dropdown">
                <a href="/login" class="welcome change" title="Options" data-bs-toggle="dropdown" aria-expanded="false">
                  <!--<img src="./assets/user.png" height="40" width="35" style="border-radius: 50%" />-->

                </a>
                <ul class="dropdown-menu dropdown-menu-lg-end mt-3">
                  <li>
                    <a class="dropdown-item" href="/logout"><i class="bi-row"></i>Log out</a>
                  </li>
                  <li><a class="dropdown-item" href="/login">Another account</a></li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li><a class="dropdown-item" href="#">Profile</a></li>
                </ul>
              </li>
            </ul>
          </div>
          <div v-else class="d-flex myFlex">
            <ul class="navbar-nav">
              <a href="/login"></a>
              <a class="navbar-brand" href="/login" type="button">
                <i class="bi-power"></i>Log in
              </a>
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
//const route = useRoute()
let loggedIn = ref(false)
let email = ref('')
onMounted(async () => {
})
</script>

<style></style>

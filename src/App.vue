<script setup></script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-5">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  min-height: 100vh;
  align-items: center;
}
</style>

<template>
  <router-view/>
</template>

<script setup>
import {RouterView} from "vue-router";
</script>

<style>
*{
  margin: 0;
  padding: 0;
  border: 0;
}

body {
  width: 100vw;
  height: 100vh;
  min-width: 320px;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #020418;

  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  line-height: 24px;
  color: #000000;
}

input {
  background: none;
  border: none;
  outline: none;
}

</style>

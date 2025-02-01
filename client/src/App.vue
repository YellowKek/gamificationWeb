<template>
    <Header v-if="!$route.meta.hideHeader" />
    <InputForm v-if="!$route.meta.hideHeader" />
    <router-view />
</template>

<script setup>
import { RouterView } from "vue-router";

import Header from "./components/layout/Header.vue";
import InputForm from "./components/layout/InputForm.vue";
</script>

<style>
body {
    width: 100vw;
    height: 100vh;
    min-width: 320px;
    padding: 51px 0px;
    overflow-x: hidden;
    overflow-y: scroll;
    background: #020418;

    font-family: "Gilroy", sans-serif;
    font-weight: 400;
    font-style: normal;
    line-height: normal;
    color: #000000;
}
</style>

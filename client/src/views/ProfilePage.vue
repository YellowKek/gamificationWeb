<template>
    <main class="profile_page_container">
        <UserInfo />
    </main>
</template>

<script setup>
import UserInfo from "../components/profileComponents/UserInfo.vue";


</script>

<style>
.profile_page_container {
    width: 100vw;
    height: 100vh;
    padding: 0 120px 0 185px;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #1D2733;
}
</style>

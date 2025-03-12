<template>
    <header class="header_container">
        <nav>
            <div class="header_link_btn_container">
                <router-link class="header_btn" v-for="(link, index) in header_link" :key="index" :to="link.to">{{ link.label }}</router-link>
            </div>
            <div class="header_buttons">
                <button class="header_square_btn">
                    <img class="header_btn_icon" :src="notificationIcon" alt="notification icon" />
                </button>
                <router-link to="/Profile" class="header_square_btn">
                    <img class="header_btn_icon" :src="profileIcon" alt="profile icon" />
                </router-link>
            </div>
        </nav>
    </header>
</template>

<script setup>
import notificationIcon from "../../assets/img/svg/header-icon/notification-icon.svg";
import profileIcon from "../../assets/img/svg/header-icon/profile-icon.svg";

const header_link = [
    {
        to: "/Home",
        label: "Календарь",
    },
    {
        to: "/Clan",
        label: "Кланы",
    },
    {
        to: "/Home",
        label: "FAQ",
    },
];
</script>

<style>
.header_container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    nav {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
}

.header_link_btn_container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 45px;
}

.header_btn {
    font-size: 22px;
    font-weight: 500;
    color: #e9eaea;
}

.header_buttons {
    margin-right: 185px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 18px;
}

.header_square_btn {
    min-width: 47px;
    min-height: 44px;
    cursor: pointer;
    border-radius: 10px;
    background: #0440e4;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

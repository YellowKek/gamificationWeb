<template>
    <section class="user_info_container">
        <button class="user_image">
            <img class="user_icon" :src="userIcon" alt="user icon" />
        </button>
        <div class="user_personal_info_container">
            <p class="user_name">Иван Иванович Иванов</p>
            <div class="user_contact_container">
                <p class="user_title">
                    Контакты
                    <img class="mail_icon" :src="mailIcon" alt="mail icon" />
                </p>
                <p class="user_subtitle"></p>
            </div>
            <div class="user_role_container">
                <p class="user_title">Должность</p>
                <p class="user_subtitle"></p>
            </div>
        </div>
    </section>
</template>

<script setup>
import userIcon from "../../assets/img/svg/prodile-icon/user-icon.svg";
import mailIcon from "../../assets/img/svg/prodile-icon/mail-icon.svg";
</script>

<style>
.user_info_container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 90px;
}

.user_image {
    width: 174px;
    height: 174px;
    border-radius: 1000px;
    background: #d9d9d9;

    display: flex;
    justify-content: center;
    align-items: center;
}

.user_personal_info_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.user_name {
    margin-bottom: 44px;
    font-size: 32px;
    font-weight: 600;
    color: #ffffff;
}

.user_contact_container,
.user_role_container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 32px;
}
</style>

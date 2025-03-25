<template>
    <div class="clan_tournament_container">
        <p class="clan_tournament_label">Tribe Tournament</p>

        <div v-for="(clan, index) in sortedClans" :key="index" class="clan_tournament_position">
            <div :class="['vertical_divider']"></div>
            <img :class="['clan_icon']" :src="clan.image ? 'data:image/svg+xml;base64,' + clan.image : ''"
                 alt="clan icon">
            <div class="clan_info_home">
                <div class="info">
                    <p class="clan_label">{{ clan.name }}</p>
                    <p class="clan_members">{{ clan.members_count }} участников</p>
                </div>
                <div class="clan_points_container">
                    <img class="cup_icon" :src="cup" alt="cup icon">
                    <p class="clan_points">{{ clan.points_amount }} tribe points</p>
                </div>
            </div>
            <div class="best_member_container">
                <img class="best_member_icon" :src="user_icon" alt="user icon">
                <div class="best_member_data">
                    <p class="best_member_name">{{ clan.best_member_name }}</p>
                    <p class="best_member_email">{{ clan.best_member_email }}</p>
                </div>
            </div>
        </div>

        <div class="clan_card_container">
            <div class="clan_card1">
                <div class="clan_card_divider air"></div>
                <div class="circle">
                    <img :class="['clan_card_logo']" :src="clanInfo.image ? 'data:image/svg+xml;base64,' + clanInfo.image : ''" alt="clan icon">
                </div>
                <div class="clan_info">
                    <div class="clan_card1_container">
                        <div class="balance">
                            <span class="points">{{ userInfo.coins }}</span>
                            <span class="label">ЕВРОДОЛЛАРОВ</span>
                        </div>
                        <div>
                            <div style="display: flex; flex-direction: row">
                                <p style="font-size: 32px; color: #E9EAEA">Клан {{ clanInfo.name }} {{ clanInfo.place }}</p>
                                <div style="display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                        gap: -10px;
                                        margin-left: 10px;
                                        margin-top: 5px;">
                                    <img class="arrow_home" :src="arrow" alt="arrow icon">
                                    <img class="arrow_home" :src="arrow" alt="arrow icon">
                                </div>
                            </div>
                            <p style="color: #E9EAEA; font-size: 18px">{{ clanInfo.members_count }} участников</p>
                        </div>
                        <div class="tribe_points">
                            <div style="display: flex; flex-direction: row; align-items: center; gap: 10px;">
                                <img class="cup_icon_clan" :src="cup" alt="cup icon">
                                <p style="font-size: 64px; color: #E9EAEA">{{ clanInfo.points_amount }}</p>
                            </div>
                            <p style="font-size: 32px; color: #E9EAEA">TRIBE POINTS</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clan_card2">
                <div class="user_info">
                    <div class="avatar">
                        <img style="width: 47px; height: 60px" :src="user_icon" alt="user icon">
                    </div>
                    <div class="user_text">
                        <div class="user_name">{{ userInfo.name }} {{ userInfo.surname }}</div>
                        <div class="user_email">{{ userInfo.email }}</div>
                    </div>
                </div>
                <div class="user_tribe_points">
                    <img class="cup_icon" :src="cup" alt="cup icon">
                    <span>{{ userInfo.clan_points }}</span> TRIBE POINTS
                </div>
                <div class="user_rank">
                    <span class="rank_number">{{ userInfo.place }}</span>
                    <span class="rank_label">Рейтинг</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import cup from "../assets/img/svg/profile-icon/cup.svg";
import user_icon from "../assets/img/svg/profile-icon/user-icon.svg";
import arrow from "../assets/img/svg/profile-icon/arrow.svg";

import { ref, computed } from "vue";

const clans = ref([]); // Сюда будут записываться кланы
const userInfo = ref([]);
const clanInfo = ref([]);

const apiUrl = "http://localhost:8080/api";

const getToken = () => localStorage.getItem("JWT_TOKEN");

const fetchClans = async () => {
    try {
        const response = await fetch(`${apiUrl}/clan/tournament`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`, // Добавляем JWT токен в заголовки
            },
        });
        if (response.status === 200) {
            clans.value = await response.json(); // Обновляем список кланов
        } else {
            alert(response.status + " " + response.body);
            console.error("Ошибка при получении списка кланов");
        }
    } catch (error) {
        alert(error.message);
        console.error("Ошибка при отправке запроса", error);
    }
};

const fetchUserInfo = async () => {
    try {
        const response = await fetch(`${apiUrl}/users/${localStorage.getItem("userId")}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
        });
        if (response.status === 200) {
            userInfo.value = await response.json();
        } else {
            alert(response.status + " " + response.body);
        }
    } catch (error) {
        alert(error.message);
    }
}

const fetchUsersClan = async () => {
    try {
        await fetchUserInfo();
        const clanName = encodeURIComponent(userInfo.value.clan);
        const response = await fetch(`${apiUrl}/clan/${clanName}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`,
            },
            method: "GET",
        });
        if (response.status === 200) {
            clanInfo.value = await response.json();
        } else {
            alert(response.status + " " + response.body);
        }
    } catch (error) {
        alert(error);
    }
};

fetchClans();
fetchUserInfo();
fetchUsersClan();


// Функция для сортировки кланов по очкам
const sortedClans = computed(() => {
    return clans.value.sort((a, b) => b.points_amount - a.points_amount);
});
</script>

<style>
.clan_tournament_label {
    font-weight: 600;
    font-size: 32px;
    color: #E9EAEA;
}

.clan_tournament_container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
}

.clan_tournament_position {
    display: flex;
    align-items: center;
    width: 700px;
    height: 100px;
    background-color: #2D384B;
    border-radius: 10px;
    flex-direction: row;
}

.clan_icon {
    height: 70px;
    width: 70px;
    margin-right: 50px;
}

.clan_info_home {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.clan_label {
    color: #E9EFFF;
    font-weight: 600;
    font-size: 22px;
    margin: 0;
}

.clan_members, .clan_points {
    color: #E9EFFF;
    font-size: 14px;
    margin: 0;
    font-family: "Gilroy", sans-serif;
}

.clan_members {
    margin-left: 10px;
    margin-top: 8px;
}

.cup_icon {
    height: 15px;
    width: 15px;
}

.cup_icon_clan {
    width: 37px;
    height: 37px;
}

.info {
    display: flex;
    flex-direction: row;
}

.clan_points_container {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 10px
}

.best_member_container {
    margin-left: 150px;
    display: flex;
    flex-direction: row;
}

.best_member_icon {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
}

.best_member_name {
    font-weight: 500;
    font-size: 14px;
    color: #E9EAEA;
}

.best_member_email {
    font-family: "Gilroy", sans-serif;
    font-size: 10px;
    font-weight: 400;
    color: #E9EAEA;
}

.best_member_data {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
}

.vertical_divider {
    width: 15px;
    height: 100px;
    margin-left: 0; /* Сдвигаем полоску в начало */
    margin-right: 20px; /* Отступ справа от полоски */
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: #76C578;
}

.earth {
    background-color: #44B094;
}

.water {
    background-color: #009AC1;
}

.fire {
    background-color: #FEC16A;
}

.air {
    background-color: #81ADDB;
}

.clan_card_container {
    width: 1200px;
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    position: relative; /* Добавляем относительное позиционирование для контейнера */
}

.clan_card1 {
    width: 100%;
    height: 257px;
    background-color: #2D384B;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: relative; /* Добавляем относительное позиционирование для .clan_card1 */
}

.clan_card_divider {
    width: 100%;
    height: 21px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #81ADDB;
}

.circle {
    width: 183px;
    height: 183px;
    background: #4C597D;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute; /* Абсолютное позиционирование для круга */
    top: -30%; /* Сдвигаем круг на 50% выше полоски */
    left: 50%; /* Центрируем по горизонтали */
    transform: translateX(-50%); /* Корректируем горизонтальное выравнивание */
}

.clan_card_logo {
    height: 166px;
    width: 166px;
    border-radius: 50%;
}

.points {
    font-weight: 700;
    font-size: 64px;
    color: #E9EAEA;
}

.label {
    font-weight: 600;
    font-size: 32px;
    color: #E9EAEA;
}

.balance {
    display: flex;
    flex-direction: column;
    align-items: center; /* Центрируем текст внутри блока */
    text-align: center; /* Выравниваем текст по центру */
}

.clan_card1_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 80px 10px;
    gap: 20px; /* Добавляем равномерный отступ между элементами */
}

.tribe_points {
    display: flex;
    flex-direction: column;
    align-items: center; /* Центрируем текст и иконки */
    text-align: center;
}


.tribe_points p {
    margin: 0; /* Убираем лишние отступы */
}

.clan_card1_container > div {
    flex: 1; /* Делаем элементы равномерно распределёнными */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.arrow_home {
    width: 20px;
    height: 20px;
    transform: rotate(180deg);
    margin: -3px 0;
}

.clan_card2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #4A5674;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 20px 40px;
    width: 100%;
    box-sizing: border-box;
    color: white;
    font-family: Arial, sans-serif;
    margin-bottom: 120px;
}

.user_info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.avatar {
    width: 60px;
    height: 60px;
    background-color: #E0E0E0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.user_text {
    display: flex;
    flex-direction: column;
}

.user_name {
    font-size: 18px;
    font-weight: bold;
}

.user_email {
    font-size: 14px;
    color: #D0D0D0;
}

.user_tribe_points {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: bold;
}

.cup_icon {
    width: 20px;
    height: 20px;
}

.user_rank {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.rank_number {
    font-size: 24px;
    font-weight: bold;
}

.rank_label {
    font-size: 14px;
    color: #D0D0D0;
}


</style>
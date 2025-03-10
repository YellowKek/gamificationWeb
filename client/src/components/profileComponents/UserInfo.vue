<template>
    <div class="profile_container">
        <!-- Информация о клане -->
        <section class="user_info_section">
            <button class="user_image">
                <img class="user_icon" :src="userIcon" alt="user icon" />
            </button>
            <div class="user_personal_info_container">
                <p class="user_name">Иван Иванович Иванов</p>
                <div class="user_contact_container">
                    <p class="user_title">
                        Контакты:
                        <img class="mail_icon" :src="mailIcon" alt="mail icon" />
                    </p>
                    <p class="user_subtitle">ivanivanov@mail.ru</p>
                </div>
                <div class="user_role_container">
                    <p class="user_title">Должность</p>
                    <p class="user_subtitle">Участник</p>
                </div>
            </div>
        </section>

        <!-- Информация о пользователе -->
        <div class="clan_container">
            <div class="clan_line"></div>
            <div class="clan_info">
                <div class="clan_info_container">
                    <img class="clan_icon" src="../../assets/img/svg/clan-icons/Air2.svg" alt="clan icon">
                    <div class="clan_stats">
                        <p class="clan_stats_first"><strong>200</strong></p>
                        <p class="clan_stats_second">ЕВРОДОЛЛАРОВ</p>
                    </div>

                    <!-- Обновленный HTML код для отображения стрелок и уровня -->
                    <div class="clan_stats">
                        <div class="clan_text">
                            <p class="clan_stats_second">Клан воздуха</p>
                            <div class="clan_level_wrapper">
                                <p class="clan_level">4</p> <!-- Цифра уровня -->
                                <div class="arrows">
                                    <img class="arrow" :src="arrow" alt="arrow icon">
                                    <img class="arrow" :src="arrow" alt="arrow icon">
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="clan_stats">
                        <p class="clan_stats_first"><strong>50</strong></p>
                        <p class="clan_stats_second">ОЧКИ КЛАНА</p>
                    </div>
                </div>
            </div>

            <div class="stats_container">
                <!-- Карточка статистики -->
                <section class="stats_card">
                    <div class="stat_line">
                        <p class="stats_title">Статистика</p> <!-- Перемещаем текст внутрь полоски -->
                    </div>
                    <ul>
                        <li>
                            <img :src="book" alt="book icon"/>
                            10 посещенных лекций
                        </li>
                        <li>
                            <img :src="microphone" alt="microphone icon"/>
                            3 проведённых мероприятий
                        </li>
                    </ul>
                </section>
            </div>

        </div>


        <!-- Действия профиля -->
        <div class="profile-actions">
            <button class="btn blue">Сменить пароль</button>
            <button class="btn grey">Выйти из профиля</button>
        </div>
    </div>
</template>


<script setup>
import userIcon from "../../assets/img/svg/profile-icon/user-icon.svg";
import mailIcon from "../../assets/img/svg/profile-icon/mail-icon.svg";
import "../../styles/profile_user_info.css";
import "../../styles/profile_clan.css";
import arrow from "../../assets/img/svg/profile-icon/arrow.svg";
import book from "../../assets/img/svg/profile-icon/book.svg";
import microphone from "../../assets/img/svg/profile-icon/microphone.svg";
</script>

<style>
/* Общий контейнер профиля */
.profile_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    margin-top: 40px;
}

/* Кнопки профиля */

.profile-actions {
    display: flex;
    gap: 10px;
}

.btn {
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    border: none;
}

.btn.blue {
    background-color: #2563eb;
    color: white;
}

.btn.grey {
    background-color: #6b7280;
    color: white;
}

</style>

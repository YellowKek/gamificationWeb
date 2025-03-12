<template>
    <div class="profile_container">
        <!-- Информация о клане -->
        <section class="user_info_section">
            <button class="user_image_profile">
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
            <div class="clan_info_profile">
                <div class="clan_info_container">
                    <img class="clan_icon_profile" src="../../assets/img/svg/clan-icons/Air2.svg" alt="clan icon">
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


/* Информация о пользователе */
.user_info_section {
    display: flex;
    align-items: flex-start;
    gap: 40px;
    width: 100%;
    max-width: 800px;
}

.user_image_profile {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user_personal_info_container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.user_name {
    font-size: 24px;
    font-weight: bold;
    color: white;
}

.user_contact_container,
.user_role_container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.user_subtitle {
    color: white;
}

/* Контейнер информации о клане */
.clan_container {
    width: 1095px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
    position: relative;
}

.clan_line {
    width: 100%;
    height: 47px;
    background-color: #81ADDB;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

/* Карточка клана */

.clan_info_profile {
    width: 1035px;
    height: 291px;
    background: #2D384B;
    padding: 30px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.clan_icon_profile {
    height: 130px;
    width: 130px;
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    background: #4C597D;
    border-radius: 50%;
    padding: 10px;
    z-index: 2;
}

.clan_level {
    font-weight: 700;
    font-size: 32px;
    color: #E9EAEA;
    display: inline-flex;
    align-items: center;
    margin-top: 5px; /* Опустит цифру вниз */
}


.clan_stats {
    text-align: center;
    display: inline-block;
}

.clan_stats_first {
    font-weight: 700;
    font-size: 50px;
    color: #E9EAEA;
}

.clan_stats_second {
    font-weight: 600;
    font-size: 25px;
    color: #E9EAEA;
}

.clan_info_container {
    margin-left: 100px;
    display: flex;
    flex-direction: row;
    gap: 150px;
}

.arrows {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: -10px; /* Уменьшает расстояние между стрелками */
}

.arrow {
    width: 20px;
    height: 20px;
    transform: rotate(180deg);
    margin: -3px 0;
}

.clan_level_wrapper {
    display: flex;
    align-items: center; /* Выравнивание стрелок и цифры по вертикали */
    gap: 10px; /* Расстояние между цифрой и стрелками */
    justify-content: center; /* Центрирование элементов по горизонтали */
}

.clan_text {
    margin-top: 20px;
}


/* Карточка статистики */

.stats_card {
    width: 1055px;
    height: 200px;
    background: #2D384B;
    padding: 20px;
    border-radius: 10px;
    color: #E9EAEA;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.stat_line {
    width: 100%;
    height: 47px;
    background-color: #4C597D;
    position: absolute;
    top: 0;
    left: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.stats_title {
    font-weight: bold;
    color: #E9EAEA;
    margin: 0;
}

.stats_card ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 100px;
}

.stats_card ul li {
    font-size: 25px;
    display: flex; /* Добавляем flex для выравнивания иконки и текста */
    align-items: center; /* Выравниваем иконку и текст по вертикали */
    gap: 8px; /* Расстояние между иконкой и текстом */
}

.stats_card ul li img {
    width: 40px; /* Размер иконки */
    height: 40px;
}

</style>

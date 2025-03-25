<template>
    <div class="admin_container">
        <h1 style="color: #E0E0E0" class="admin_title">Админ-панель</h1>

        <!-- Создание пользователя -->
        <div class="user_form">
            <h2 style="color: #E0E0E0">Создать пользователя</h2>
            <input v-model="newUser.name" placeholder="Имя" class="input_field" />
            <input v-model="newUser.surname" placeholder="Фамилия" class="input_field" />
            <input v-model="newUser.patronymic" placeholder="Отчество" class="input_field" />
            <input v-model="newUser.email" placeholder="Email" class="input_field" />
            <button class="save_user_button" @click="addUser">Создать</button>
        </div>

        <!-- Список пользователей -->
        <div class="user_list">
            <h2 style="color: #E0E0E0">Пользователи</h2>
            <ul>
                <li v-for="user in users" :key="user.id">
                    {{ user.name }} {{ user.surname }} ({{ user.email }})
                    <button v-if="!user.isAdmin" @click="makeAdmin(user)">Сделать админом</button>
                </li>
            </ul>
        </div>

        <!-- Создание клана -->
        <div class="clan_form">
            <h2 style="color: #E0E0E0">Создать клан</h2>
            <input v-model="newClan.name" placeholder="Название клана" class="input_field" />
            <label for="file-upload" class="input_label">
                Загрузите файл в формате SVG
            </label>
            <input type="file" @change="handleImageUpload" class="input_field" accept=".svg" />
            <button class="save_clan_button" @click="addClan">Создать клан</button>
        </div>

        <!-- Список кланов -->
        <div class="clan_list">
            <h2 class="section_title">Кланы</h2>
            <div class="clan_card_container_admin">
                <div v-for="clan in clans" :key="clan.id" class="clan_card">
                    <h3 class="clan_name">{{ clan.name }}</h3>
                    <p class="clan_points">Очки: {{ clan.pointsAmount }}</p>
                    <p class="clan_members">Члены: {{ clan.membersCount }}</p>
                </div>
            </div>
        </div>

        <CreateEvent :isOpen="isEventFormOpen" :event="newEvent" @close="closeEventForm" @save="saveEvent" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import CreateEvent from "../components/event/CreateEvent.vue";
import { useStore } from "vuex";

const users = ref([]);
const clans = ref([]);  // Список кланов
const newUser = ref({ name: "", surname: "", patronymic: "", email: "", isAdmin: false });
const store = useStore()
const apiUrl = "http://localhost:8080/api";  // Укажите ваш серверный API URL

// Получаем JWT токен из localStorage
const getToken = () => localStorage.getItem('JWT_TOKEN');

// Добавим новое свойство для хранения изображения
const newClan = ref({ name: "", image: null });  // Новый клан с полем name и image

// Функция для обработки загрузки изображения и конвертации в Base64
const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            newClan.value.image = reader.result.split(',')[1];  // Сохраняем только часть Base64 (без префикса data:image...)
        };
        reader.readAsDataURL(file);  // Читаем файл как Data URL
    }
};

// Модификация функции для добавления клана, чтобы отправить изображение
const addClan = async () => {
    if (newClan.value.name) {
        try {
            const clanData = {
                name: newClan.value.name,
                image: newClan.value.image  // Если изображение есть, отправляем его в формате Base64
            };

            const response = await fetch(`${apiUrl}/clan`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                },
                body: JSON.stringify(clanData),  // Отправляем данные как JSON
            });

            if (response.ok) {
                // Очистка формы после успешного добавления
                newClan.value = { name: "", image: null };

                // Отправка запроса на получение всех кланов после добавления
                await fetchClans();
            } else {
                alert(response.message);
                console.error("Ошибка при добавлении клана");
            }
        } catch (error) {
            alert(error.message);
            console.error("Ошибка при отправке запроса", error);
        }
    }
};

// Функция для отправки данных на сервер и добавления пользователя
const addUser = async () => {
    if (newUser.value.name && newUser.value.email) {
        try {
            // Отправка запроса на создание пользователя
            const response = await fetch(`${apiUrl}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`, // Добавляем JWT токен в заголовки
                },
                body: JSON.stringify(newUser.value),
            });

            if (response.status === 200) {
                // Очистка формы после успешного добавления
                newUser.value = { name: "", surname: "", patronymic: "", email: "", isAdmin: false };

                // Отправка запроса на получение всех пользователей после добавления
                await fetchUsers();
            } else {
                if (response.status === 403) {
                    localStorage.setItem("JWT_TOKEN", null);
                    store.commit("SET_AUTH", false);
                }
                alert(response.status + " " + response.body);
                console.error("Ошибка при добавлении пользователя");
            }
        } catch (error) {
            alert(error.message);
            console.error("Ошибка при отправке запроса", error);
        }
    }
};


// Функция для получения списка всех пользователей
const fetchUsers = async () => {
    try {
        const response = await fetch(`${apiUrl}/users`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`, // Добавляем JWT токен в заголовки
            },
        });
        if (response.ok) {
            users.value = await response.json(); // Обновляем список пользователей
        } else {
            alert(response.message);
            console.error("Ошибка при получении списка пользователей");
        }
    } catch (error) {
        alert(error.message);
        console.error("Ошибка при отправке запроса", error);
    }
};

// Функция для получения списка всех кланов
const fetchClans = async () => {
    try {
        const response = await fetch(`${apiUrl}/clan/withMembers`, {
            headers: {
                "Authorization": `Bearer ${getToken()}`, // Добавляем JWT токен в заголовки
            },
        });
        if (response.ok) {
            clans.value = await response.json(); // Обновляем список кланов
        } else {
            alert(response.message);
            console.error("Ошибка при получении списка кланов");
        }
    } catch (error) {
        alert(error.message);
        console.error("Ошибка при отправке запроса", error);
    }
};

// Функция для назначения пользователя администратором
const makeAdmin = (user) => {
    // user.isAdmin = true;
};

// Получение списка пользователей и кланов при монтировании компонента
fetchUsers();
fetchClans();
</script>

<style>
.clan_card_container_admin {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Две карточки в ряду */
    gap: 20px; /* Отступы между карточками */
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
}

.input_label {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
}


.clan_card {
    background-color: #3b4a63;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px; /* Устанавливаем адекватную высоту для карточки */
    left: 0;
    overflow: hidden;
}

.clan_card:hover {
    transform: translateY(-10px);
}

.clan_name {
    font-size: 1.2rem; /* Размер шрифта для названия */
    font-weight: bold;
    color: #f2f2f2;
    margin-bottom: 10px; /* Отступ от названия */
}

.clan_points,
.clan_members {
    font-size: 0.9rem; /* Размер шрифта для остальных данных */
    color: #b0b0b0;
    margin: 5px 0; /* Отступ между данными */
}

.section_title {
    color: #e0e0e0;
    font-size: 1.5rem;
    margin-bottom: 20px;
}

.clan_list {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2d384b;
    border-radius: 10px;
    width: 100%;
    max-width: 800px;
    margin: auto;
    overflow-y: auto;
    max-height: 600px;
}

.admin_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2D384B;
    padding: 40px;
    border-radius: 10px;
    width: 600px;
    margin: auto;
    overflow: hidden;
    box-sizing: border-box;
}

.input_field {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 8px;
    border: none;
    border-radius: 5px;
}

.save_user_button, .save_clan_button {
    background-color: #44B094;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.clan_form {
    margin-top: 20px;
    padding: 10px;
    background-color: #3A4A63;
    border-radius: 5px;
    width: 100%;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
    .clan_card_container_admin {
        grid-template-columns: 1fr; /* На маленьких экранах одна карточка в ряду */
    }
}
</style>

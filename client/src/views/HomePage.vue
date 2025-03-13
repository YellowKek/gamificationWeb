<template>
    <div class="events_container">
        <h1 class="events_title">Ближайшие мероприятия</h1>
        <div class="events_list">
            <div
                class="event_card"
                v-for="event in events"
                :key="event.id"
                @click="toggleEventSelection(event)"
            >
                <p class="event_name">{{ event.name }}</p>
                <p class="event_organizer">Организатор: {{ event.organizer }}</p>

                <!-- Кнопка записаться/отменить запись -->
                <button
                    v-if="selectedEvent === event.id"
                    class="register_button"
                    @click.stop="toggleRegistration(event)"
                >
                    {{ event.registeredUsers.includes(currentUserId) ? "Отменить запись" : "Записаться" }}
                </button>
            </div>
        </div>

        <button class="create_event_button" @click="openModal">Создать мероприятие</button>

        <div v-if="isModalOpen" class="modal_overlay" @click="closeModal">
            <div class="modal_content" @click.stop>
                <h2>Создать мероприятие</h2>
                <input v-model="newEvent.name" placeholder="Название мероприятия" class="input_field" />
                <input v-model="newEvent.description" placeholder="Краткое описание мероприятия" class="input_field" />

                <!-- Выбор типа мероприятия -->
                <div class="event_type_buttons">
                    <button
                        v-for="type in eventTypes"
                        :key="type"
                        @click="newEvent.type = type"
                        :class="['event_type_button', { active: newEvent.type === type }]"
                    >
                        {{ type }}
                    </button>
                </div>

                <!-- Поля с плейсхолдерами -->
                <input v-model="newEvent.startTime" type="datetime-local" class="input_field" placeholder="Дата и время начала" />
                <input v-model="newEvent.endTime" type="datetime-local" class="input_field" placeholder="Дата и время окончания" />
                <input v-model="newEvent.quote" type="number" class="input_field" placeholder="Максимальное число участников" />

                <label class="checkbox_label">
                    <input v-model="newEvent.clanOnly" type="checkbox" /> Только для клана
                </label>
                <button class="save_event_button" @click="addEvent">Сохранить</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const events = ref([
    { id: 1, name: "Турнир по шахматам", organizer: "Клуб интеллектуалов", type: "Настолки", registeredUsers: [] },
    { id: 2, name: "Лекция по истории", organizer: "Исторический союз", type: "Лекция", registeredUsers: [] },
]);

const eventTypes = ["Спорт", "Лекция", "Настолки", "Мастер-класс", "Вечеринка", "Киберспорт"];

const isModalOpen = ref(false);
const selectedEvent = ref(null);
const currentUserId = 123; // ID текущего пользователя (можно заменить на реального юзера)

const newEvent = ref({ name: "", description: "", type: "", startTime: "", endTime: "", quote: 0, clanOnly: false });

const openModal = () => {
    isModalOpen.value = true;
};
const closeModal = () => {
    isModalOpen.value = false;
    newEvent.value = { name: "", description: "", type: "", startTime: "", endTime: "", quote: 0, clanOnly: false };
};
const addEvent = () => {
    if (newEvent.value.name && newEvent.value.type) {
        events.value.push({ ...newEvent.value, id: events.value.length + 1, registeredUsers: [] });
        closeModal();
    }
};

const toggleEventSelection = (event) => {
    selectedEvent.value = selectedEvent.value === event.id ? null : event.id;
};
const toggleRegistration = (event) => {
    const index = event.registeredUsers.indexOf(currentUserId);
    if (index === -1) {
        event.registeredUsers.push(currentUserId);
    } else {
        event.registeredUsers.splice(index, 1);
    }
};
</script>

<style>
.events_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2D384B;
    padding: 40px;
    border-radius: 10px;
    width: 800px;
    margin: auto;
}

.events_title {
    font-size: 32px;
    color: #E9EAEA;
    margin-bottom: 20px;
}

.events_list {
    width: 100%;
}

.event_card {
    background-color: #4A5674;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
    color: white;
    cursor: pointer;
    transition: 0.3s;
}
.event_card:hover {
    background-color: #5B6A8B;
}

.register_button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #81ADDB;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
}

.create_event_button {
    background-color: #81ADDB;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
}

.modal_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal_content {
    background: #2D384B;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    color: white;
}

.input_field {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 8px;
    border: none;
    border-radius: 5px;
}

.event_type_buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 15px;
}

.event_type_button {
    background-color: #4A5674;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
}

.event_type_button:hover {
    background-color: #5B6A8B;
}

.event_type_button.active {
    background-color: #81ADDB;
}

.save_event_button {
    background-color: #44B094;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}
</style>

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
                    style="background-color: #76C578"
                    v-if="selectedEvent === event.id"
                    class="register_button"
                    @click.stop="toggleRegistration(event)"
                >
                    {{ event.registeredUsers.includes(currentUserId) ? "Отменить запись" : "Записаться" }}
                </button>
            </div>
        </div>

        <button class="create_event_button" @click="openModal">Создать мероприятие</button>

        <CreateEvent :isOpen="isModalOpen" :event="newEvent" @close="closeModal" @save="addEvent" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import CreateEvent from "../components/event/CreateEvent.vue";

const events = ref([
    { id: 1, name: "Турнир по шахматам", organizer: "Клуб интеллектуалов", type: "Настолки", registeredUsers: [] },
    { id: 2, name: "Лекция по истории", organizer: "Исторический союз", type: "Лекция", registeredUsers: [] },
]);


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
</style>

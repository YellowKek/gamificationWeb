<template>
    <div v-if="isOpen" class="modal_overlay" @click="close">
        <div class="modal_content" @click.stop>
            <h2>{{ isEditing ? "Редактировать мероприятие" : "Создать мероприятие" }}</h2>
            <input v-model="localEvent.name" placeholder="Название мероприятия" class="input_field" />
            <input v-model="localEvent.description" placeholder="Краткое описание мероприятия" class="input_field" />

            <!-- Выбор типа мероприятия -->
            <div class="event_type_wrapper">
                <p>Тип мероприятия:</p>
                <div class="event_type_buttons">
                    <button
                        v-for="type in eventTypes"
                        :key="type"
                        @click="localEvent.type = type"
                        :class="['event_type_button', { active: localEvent.type === type }]"
                    >
                        {{ type }}
                    </button>
                </div>
            </div>

            <!-- Поля с плейсхолдерами -->
            <input v-model="localEvent.startTime" type="datetime-local" class="input_field" />
            <input v-model="localEvent.endTime" type="datetime-local" class="input_field" />
            <input v-model="localEvent.quote" type="number" class="input_field" placeholder="Максимальное число участников" />

            <label class="checkbox_label">
                <input v-model="localEvent.clanOnly" type="checkbox" /> Только для клана
            </label>

            <button class="save_event_button" @click="submitEvent">
                {{ isEditing ? "Сохранить изменения" : "Создать" }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
    isOpen: Boolean,
    event: Object,
    isEditing: Boolean,
});
const emit = defineEmits(["close", "save"]);

const eventTypes = ["Спорт", "Лекция", "Настолки", "Мастер-класс", "Вечеринка", "Киберспорт"];

const localEvent = ref({ name: "", description: "", type: "", startTime: "", endTime: "", quote: 0, clanOnly: false });

watch(
    () => props.event,
    (newEvent) => {
        if (newEvent) {
            localEvent.value = { ...newEvent };
        } else {
            localEvent.value = { name: "", description: "", type: "", startTime: "", endTime: "", quote: 0, clanOnly: false };
        }
    },
    { deep: true, immediate: true }
);

const close = () => {
    emit("close");
};

const submitEvent = () => {
    emit("save", { ...localEvent.value });
    close();
};
</script>

<style scoped>
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
    width: 90%;
    max-width: 400px;
}

.input_field {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 8px;
    border: none;
    border-radius: 5px;
}

.event_type_wrapper {
    text-align: left;
    margin-bottom: 10px;
}

.event_type_buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: center;
}

.event_type_button {
    background-color: #4A5674;
    color: white;
    border: none;
    padding: 8px 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    font-size: 14px;
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

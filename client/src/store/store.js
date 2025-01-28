import { createStore } from "vuex";

// Проверяем сохраненное состояние авторизации
const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

export default createStore({
    state: {
        isAuthenticated: isAuthenticated, // Состояние авторизации
        user: null, // Данные пользователя
    },
    mutations: {
        // Устанавливаем состояние авторизации и данные пользователя
        SET_AUTH(state, payload) {
            state.isAuthenticated = payload.isAuthenticated;
            state.user = payload.user;
            localStorage.setItem("isAuthenticated", payload.isAuthenticated.toString()); // Сохраняем в localStorage
        },
    },
    actions: {
        async login({ commit }, credentials) {
            try {
                // Используем ваш существующий API запрос для авторизации
                const response = await yourApiLoginFunction(credentials); // Замените на ваш реальный API запрос
                const user = response.data; // Данные пользователя

                // Если авторизация успешна, обновляем состояние
                commit("SET_AUTH", { isAuthenticated: true, user });
                return true;
            } catch (error) {
                console.error("Ошибка авторизации:", error);
                return false;
            }
        },
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated, // Геттер для проверки авторизации
        user: (state) => state.user, // Геттер для получения данных пользователя
    },
});

import { createStore } from "vuex";

// Проверяем сохраненное состояние авторизации
const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
const JWT_TOKEN = localStorage.getItem("JWT_TOKEN");

export default createStore({
    state: {
        isAuthenticated: isAuthenticated, // Состояние авторизации
        user: null, // Данные пользователя
        JWT_TOKEN: localStorage.getItem("JWT_TOKEN"), // Токен из localStorage
    },
    mutations: {
        // Устанавливаем состояние авторизации и данные пользователя
        SET_AUTH(state, payload) {
            state.isAuthenticated = payload.isAuthenticated;
            state.user = payload.user;
            localStorage.setItem("isAuthenticated", payload.isAuthenticated.toString()); // Сохраняем в localStorage
        },
        SET_JWT_TOKEN(state, token) {
            state.JWT_TOKEN = token;
            localStorage.setItem("JWT_TOKEN", token); // Сохраняем токен в localStorage
        }
    },
    actions: {
        // Мы не изменяем actions, так как запрос и получение токена происходит в другом месте
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated, // Геттер для проверки авторизации
        user: (state) => state.user, // Геттер для получения данных пользователя
        JWT_TOKEN: (state) => state.JWT_TOKEN, // Геттер для получения токена
    },
});

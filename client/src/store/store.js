import { createStore } from "vuex";

const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
const JWT_TOKEN = localStorage.getItem("JWT_TOKEN");

export default createStore({
    state: {
        isAuthenticated: isAuthenticated,
        user: null,
        JWT_TOKEN: localStorage.getItem("JWT_TOKEN"),
    },
    mutations: {
        SET_AUTH(state, payload) {
            state.isAuthenticated = payload.isAuthenticated;
            state.user = payload.user;
            localStorage.setItem("isAuthenticated", payload.isAuthenticated.toString());
        },
        SET_JWT_TOKEN(state, token) {
            state.JWT_TOKEN = token;
            localStorage.setItem("JWT_TOKEN", token);
        },
    },
    actions: {
        // Here will be the code for actions
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        user: (state) => state.user,
        JWT_TOKEN: (state) => state.JWT_TOKEN,
    },
});

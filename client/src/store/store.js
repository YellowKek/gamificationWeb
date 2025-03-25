import { createStore } from "vuex";

const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
const JWT_TOKEN = localStorage.getItem("JWT_TOKEN");
const userId = localStorage.getItem("userId");
const userEmail = localStorage.getItem("userEmail");

export default createStore({
    state: {
        isAuthenticated: isAuthenticated,
        JWT_TOKEN: localStorage.getItem("JWT_TOKEN"),
        userId: userId,
        userEmail: userEmail,
    },
    mutations: {
        SET_AUTH(state, payload) {
            state.isAuthenticated = payload.isAuthenticated;
            localStorage.setItem("isAuthenticated", payload.isAuthenticated.toString());
        },
        SET_JWT_TOKEN(state, token) {
            state.JWT_TOKEN = token;
            localStorage.setItem("JWT_TOKEN", token);
        },
        SET_USER_ID(state, id) {
            state.userId = id;
            localStorage.setItem("userId", id);
        },
        SET_USER_EMAIL(state, email) {
            state.userEmail = email;
            localStorage.setItem("userEmail", email);
        }
    },
    actions: {
        // Here will be the code for actions
    },
    getters: {
        isAuthenticated: (state) => state.isAuthenticated,
        JWT_TOKEN: (state) => state.JWT_TOKEN,
        userId: (state) => state.userId,
        userEmail: (state) => state.userEmail,
    },
});

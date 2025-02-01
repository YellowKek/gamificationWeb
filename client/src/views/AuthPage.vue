<template>
    <main class="wrapper">
        <div class="main__container">
            <section class="branding__container">
                <div class="logo__container">
                    <img class="auth__page__logo" src="../assets/img/svg/auth-icon/auth-page-logo.svg" alt="Logo image" />
                </div>
                <div class="text__container">
                    <p class="text-slide-in school-text-tertiary">SCHOOL5A</p>
                    <p class="text-slide-in school-text-secondary">SCHOOL5A</p>
                    <p class="text-slide-in school-text">SCHOOL5A</p>
                </div>
            </section>
            <section class="login__container">
                <div class="login__form">
                    <div class="login__text__content">
                        <p class="login__greeting__text">Welcome to School 5A</p>
                        <p class="login__action__text">Пожалуйста, введите логин и пароль!</p>
                    </div>
                    <div class="input__group">
                        <div class="login__form__container">
                            <img
                                class="login-form-user-icon"
                                src="../assets/img/svg/auth-icon/login-form-user-icon.svg"
                                alt="Image of login form user icon"
                            />
                            <input type="text" v-model="email" placeholder="Email" />
                        </div>
                        <div class="password__form__container">
                            <img
                                class="login-form-lock-icon"
                                src="../assets/img/svg/auth-icon/login-form-lock-icon.svg"
                                alt="Image of login form lock icon"
                            />
                            <input type="password" v-model="password" placeholder="Password" />
                            <img
                                id="togglePassword"
                                class="login-form-eye-icon"
                                src="../assets/img/svg/auth-icon/login-form-eye-icon.svg"
                                alt="Image of login form eye icon"
                            />
                        </div>
                        <div class="login-controls">
                            <button class="submit__btn" @click="submitAuth">
                                Log in
                                <img
                                    class="login-form-arrow-icon"
                                    src="../assets/img/svg/auth-icon/login-form-arrow-icon.svg"
                                    alt="Image of login form arrow icon"
                                />
                            </button>
                            <button class="reset__password__btn">Забыли пароль?</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const API_URL = "http://localhost:8080/api/auth";
const email = ref("");
const password = ref("");

const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data?.message || error.message);
        throw error.response?.data?.message || "An error occurred during login";
    }
};

const submitAuth = async () => {
    if (!email.value || !password.value) {
        alert("Please fill in both email and password fields.");
        return;
    }
    try {
        const response = await login(email.value, password.value);

        console.log("Login successful:", response);

        const user = response;
        const token = response.token;

        store.commit("SET_AUTH", { isAuthenticated: true, user });
        store.commit("SET_JWT_TOKEN", token);

        await router.push({ name: "homePage" });
    } catch (error) {
        console.error("Login failed:", error);
    }
};
</script>

<style>
.wrapper {
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
}

.main__container {
    max-width: 1160px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.branding__container {
    width: 560px;
    height: 572px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
}

.logo__container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}

.text__container {
    position: relative;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.text-slide-in {
    left: 0;
    user-select: none;
    -webkit-user-select: none;

    font-size: 200px;
    font-weight: 700;
}

.school-text {
    position: absolute;
    opacity: 0;
    animation: slideInFromLeft 1s ease forwards;
    color: #0440e4;
}

@keyframes slideInFromLeft {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

@-webkit-keyframes slideInFromLeft {
    0% {
        transform: translateX(-100%);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.school-text-secondary {
    position: absolute;
    top: -111px;
    opacity: 0;
    color: rgba(232.9, 238.82, 255, 0.6);
    animation-delay: 1s;
    animation: slideInFromBottom1 1s ease forwards;
}

.school-text-tertiary {
    position: relative;
    top: -212px;
    opacity: 0;
    color: rgba(232.9, 238.82, 255, 0.6);
    animation-delay: 1.1s;
    animation: slideInFromBottom2 1s ease forwards;
}

@keyframes slideInFromBottom1 {
    0% {
        transform: translateY(111px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 0.3;
    }
}

@-webkit-keyframes slideInFromBottom1 {
    0% {
        transform: translateY(111px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 0.3;
    }
}

@keyframes slideInFromBottom2 {
    0% {
        transform: translateY(212px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 0.1;
    }
}

@-webkit-keyframes slideInFromBottom2 {
    0% {
        transform: translateY(212px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 0.1;
    }
}

.login__container {
    height: 572px;
}

.login__form {
    position: relative;
    max-height: 572px;
    box-sizing: border-box;
    padding: 102px 49px;
    z-index: 9999;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 68px;

    background-color: #0440e4;
    border-radius: 35px;
}

.login__text__content {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 27px;
}

.login__greeting__text {
    font-size: 40px;
    font-weight: 700;
    color: #fff;
    text-align: center;
}

.login__action__text {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    text-align: center;
}

.input__group {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 18px;
}

.login__form__container,
.password__form__container {
    width: 100%;
    height: 60px;

    box-sizing: border-box;
    padding: 14px 22px;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    background-color: #fef7f7;
    border-radius: 8.65px;
}

.login-form-user-icon,
.login-form-lock-icon {
    margin-right: 15px;
}

#login,
#password {
    width: 100%;
    height: 100%;

    font-size: 18px;
    font-weight: 700;
    color: #000;
}

::placeholder {
    font-size: 18px;
    font-weight: 700;
    color: #5a5b67;
}

.login-form-eye-icon {
    margin-left: 10px;
    cursor: pointer;
}

.login-controls {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
}

.submit__btn {
    box-sizing: border-box;
    padding: 16px 24px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 25px;

    background-color: #fff;
    border-radius: 10px;

    font-size: 18px;
    font-weight: 700;
    color: #5a5b67;
    cursor: pointer;
}

.reset__password__btn {
    background: none;
    border: none;

    font-size: 24px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
}

.reset__password__btn:hover {
    text-decoration: underline;
}
</style>

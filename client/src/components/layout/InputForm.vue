<template>
    <section class="input_form_wrapper">
        <div class="input_form_container" @focus="onFocus" @blur="onBlur" tabindex="0">
            <img class="loupe_icon" :src="loupeIcon" alt="loupe icon" />
            <input id="id" type="text" placeholder="Искать" />
        </div>
    </section>
</template>

<script setup>
import { ref } from "vue";
import loupeIcon from "../../assets/img/svg/loupe-icon.svg";

const isFocused = ref(false);

const onFocus = () => {
    isFocused.value = true;
    console.log("Input is focused");
};

const onBlur = () => {
    isFocused.value = false;
    console.log("Input lost focus");
};
</script>

<style>
.input_form_wrapper {
    width: 100%;
    margin-top: 36px;
    margin-bottom: 60px;

    display: flex;
    justify-content: center;
    align-items: center;
}

.input_form_container {
    position: relative;
    width: 633px;
    height: 45px;
    cursor: text;
    border-radius: 8.65px;
    background: #e9eaea;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 13px;
}

.loupe_icon {
    position: absolute;
    top: 12.5px;
    left: 22px;
    pointer-events: none;
}

input {
    width: 100%;
    height: 100%;
    padding: 55px;

    font-size: 18px;
    font-weight: 400;
    color: #000;
}

input::placeholder {
    font-size: 18px;
    font-weight: 400;
    color: #5a5b67;
}
</style>

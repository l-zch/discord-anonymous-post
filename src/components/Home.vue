<template>
    <Login></Login>
</template>


<script setup>
import { useRoute } from "vue-router";
import Login from "./Login.vue";
import axios from "axios"

const route = useRoute();
const code = route.query.code;

if (code) {
    a(code)
}

async function a(code) {
    const response = await exchange_code(code);
    const get = get_with_token(response["access_token"]);
    console.log(await get("/"), await get("/guilds"));
}

async function exchange_code() {
    const response = await axios.get(`https://app.discordanonpost.repl.co/exchange-code?code=${code}`);
    return response.data
}

function get_with_token(token) {
    async function get(path) {
        const response = await axios.get(`https://api.allorigins.win/get?url=discord.com/api/users/@me${path}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        );
        return response.data;
    }
    return get;
}


</script>
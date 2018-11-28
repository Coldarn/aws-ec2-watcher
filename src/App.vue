<template>
    <div class="app vbox">
        <div class="page vbox" :class="page" v-if="page === 'creds'">
            <h1>AWS Credentials</h1>
            <label class="vbox" for="input">
                aws_access_key_id:
                <input type="text" :value="aws_access_key_id" />
            </label>
            <label class="vbox" for="input">
                aws_secret_access_key:
                <input type="text" :value="aws_secret_access_key" />
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    computed: {
        page() {
            return this.$store.state.page
        }
    }
}
</script>

<style>
html,
body {
    background: #111;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 11pt;
    margin: 0;
    padding: 0;
}
body {
    padding: 10px;
}
input {
    background: #333;
    color: white;
    border: 0;
    margin: 2px;
}
h1 {
    font-size: 1em;
    font-weight: bold;
    margin: 0;
    margin-bottom: 1em;
}
.hbox {
    display: flex;
    align-items: stretch;
}
.vbox {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
</style>

<style scoped>
label {
    margin-bottom: 0.5em;
}
</style>
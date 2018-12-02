<template>
    <div class="page vbox">
        <div class="tbar hbox">
            <button class="icon" @click="handleBack"><icon-back title="Back" /></button>
            <h1>Edit Profile</h1>
        </div>
        <div class="form">
            <label class="vbox" for="input">
                Name
                <input type="text" v-model="profile.name" v-focus placeholder="Profile name like &quot;default&quot;" />
            </label>
            <label class="vbox" for="input">
                Access Key ID
                <input type="text" v-model="profile.aws_access_key_id" />
            </label>
            <label class="vbox fill" for="input">
                Secret Access Key
                <input type="text" v-model="profile.aws_secret_access_key" />
            </label>
            <label class="vbox fill" for="input">
                AWS Region
                <input type="text" v-model="profile.region" placeholder="Region name like &quot;us-east-1&quot;" />
            </label>
            <a href="#" @click="handleHelp">Instructions for creating AWS credentials</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileEditor',
    data() {
        return {
            profile: Object.assign({}, this.$store.state.activeProfile)
        }
    },
    methods: {
        handleHelp() {
            require('electron').remote.require('./aws').launchHelp()
        },
        handleBack() {
            this.$store.commit('updateProfile', this.profile)
            this.$store.commit('popPage')
        }
    }
}
</script>

<style scoped>
a {
    color: white;
}
a:visited {
    color: white;
}
.form {
    padding: 0 12px;
}
label {
    margin-bottom: 0.5em;
}
label input {
    margin: 0;
    margin-top: 3px;
}
</style>
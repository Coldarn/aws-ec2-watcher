<template>
    <div class="page vbox">
        <h1>AWS Profile</h1>
        <label class="vbox" for="input">
            Name
            <input type="text" v-model="profile.name" v-focus />
        </label>
        <label class="vbox" for="input">
            Access Key ID
            <input type="text" v-model="profile.aws_access_key_id" />
        </label>
        <label class="vbox fill" for="input">
            Secret Access Key
            <input type="text" v-model="profile.aws_secret_access_key" />
        </label>
        <button @click="handleSave">Save</button>
        <button @click="handleCancel">Cancel</button>
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
        handleSave() {
            this.$store.commit('updateProfile', this.profile)
            this.$store.commit('popPage')
        },
        handleCancel() {
            this.$store.commit('popPage')
        }
    }
}
</script>

<style scoped>
label {
    margin-bottom: 0.5em;
}
</style>
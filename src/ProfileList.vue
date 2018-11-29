<template>
    <div class="page vbox">
        <h1>AWS Profile</h1>
        <div class="hbox profile" v-for="profile in profiles" :key="profile.name">
            <div class="fill">{{ profile.name }}</div>
            <button @click="handleSelect(profile)">Select</button>
            <button @click="handleEdit(profile)">Edit</button>
        </div>
        <button @click="handleAdd">Add new profile</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ProfileList',
    computed: mapState(['profiles']),
    methods: {
        handleSelect(profile) {
            this.$store.commit('setActiveProfile', profile)
            this.$store.commit('setPage', 'instance-list')
        },
        handleEdit(profile) {
            this.$store.commit('setActiveProfile', profile)
            this.$store.commit('pushPage', 'profile-edit')
        },
        handleAdd() {
            const name = this.$store.state.profiles.length === 0 ? 'default' : null
            this.$store.commit('addProfile', { name })
            this.$store.commit('pushPage', 'profile-edit')
        }
    }
}
</script>

<style scoped>
.profile {
    align-items: center;
}
</style>
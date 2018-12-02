<template>
    <div class="page vbox">
        <div class="hbox tbar">
            <h1>AWS Profile</h1>
            <button class="icon" @click="handleAdd"><icon-plus title="Add new profile" /></button>
        </div>
        <div class="hbox profile" v-for="profile in profiles" :key="profile.id">
            <div class="fill hover hbox name" @click="handleSelect(profile)"><icon-forward title="Select" /> {{ profile.name }}</div>
            <button class="icon" @click="handleEdit(profile)"><icon-edit title="Edit" /></button>
            <button class="icon" @click="handleDelete(profile)"><icon-trash title="Delete" /></button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileList',
    computed: {
        profiles() {
            return this.$store.state.profiles
        },
        activeProfileName() {
            return this.$store.state.activeProfile.name
        },
    },
    methods: {
        handleSelect(profile) {
            this.$store.commit('setActiveProfile', profile)
            this.$store.commit('setPage', 'instance-list')
        },
        handleEdit(profile) {
            this.$store.commit('setActiveProfile', profile)
            this.$store.commit('pushPage', 'profile-edit')
        },
        handleDelete(profile) {
            this.$store.commit('removeProfile', profile)
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
    height: 25px;
    align-items: center;
}
.name {
    align-items: center;
}
</style>
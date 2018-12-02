<template>
    <div class="page vbox">
        <div class="hbox tbar">
            <h1>Select a Profile</h1>
            <button class="icon" @click="handleAdd"><icon-plus title="Add new profile" /></button>
        </div>
        <div class="hbox profile" v-for="profile in profiles" :key="profile.id">
            <div class="fill hbox name" :class="{ strike: isDeleting(profile), hover: !isDeleting(profile) }" @click="handleSelect(profile)"><icon-forward title="Select" /> {{ profile.name }}</div>
            <button class="icon" @click="handleEdit(profile)" v-show="!isDeleting(profile)"><icon-edit title="Edit" /></button>
            <button class="icon" @click="handleDelete(profile)" v-show="!isDeleting(profile)"><icon-trash title="Delete" /></button>

            <button class="icon" @click="handleDeleteConfirm(profile)" v-show="isDeleting(profile)"><icon-check title="Confirm" /></button>
            <button class="icon" @click="handleDeleteCancel(profile)" v-show="isDeleting(profile)"><icon-cancel title="Cancel" /></button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileList',
    data() {
        return {
            pendingDeletes: new Set()
        }
    },
    computed: {
        profiles() {
            return this.$store.state.profiles
        },
        activeProfileName() {
            return this.$store.state.activeProfile.name
        },
    },
    methods: {
        isDeleting(profile) {
            return this.pendingDeletes.has(profile.id)
        },
        handleSelect(profile) {
            if (!this.isDeleting(profile)) {
                this.$store.commit('setActiveProfile', profile)
                this.$store.commit('setPage', 'instance-list')
            }
        },
        handleEdit(profile) {
            this.$store.commit('setActiveProfile', profile)
            this.$store.commit('pushPage', 'profile-edit')
        },
        handleAdd() {
            const name = this.$store.state.profiles.length === 0 ? 'default' : null
            this.$store.commit('addProfile', { name })
            this.$store.commit('pushPage', 'profile-edit')
        },
        handleDelete(profile) {
            this.pendingDeletes.add(profile.id)
            this.$forceUpdate()
        },
        handleDeleteCancel(profile) {
            this.pendingDeletes.delete(profile.id)
            this.$forceUpdate()
        },
        handleDeleteConfirm(profile) {
            this.$store.commit('removeProfile', profile)
        },
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
.name.strike {
    color: #888;
}
</style>
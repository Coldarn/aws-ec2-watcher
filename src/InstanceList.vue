<template>
    <div class="page vbox">
        <h1>EC2 Instances</h1>
        <div class="hbox instance" v-for="instance in instances" :key="instance.id">
            <div class="fill">{{ instance.name }}</div>
            <!-- <button @click="handleSelect(instance)">Select</button>
            <button @click="handleEdit(instance)">Edit</button> -->
        </div>
        <button @click="handleAdd">Add new instance</button>
    </div>
</template>

<script>
import InstanceService from './services/InstanceService'

export default {
    name: 'InstanceList',
    computed: {
        instances() {
            return this.$store.state.activeProfile.instances
        }
    },
    methods: {
        // handleSelect(instance) {
        //     this.$store.commit('setActiveProfile', profile)
        //     this.$store.commit('setPage', 'instance-list')
        // },
        // handleEdit(instance) {
        //     this.$store.commit('setActiveProfile', profile)
        //     this.$store.commit('pushPage', 'profile-edit')
        // },
        handleAdd() {
            InstanceService.listInstances(this.$store.state.activeProfile).then(data => console.log(data))
            // const name = this.$store.state.profiles.length === 0 ? 'default' : null
            // this.$store.commit('addProfile', { name })
            // this.$store.commit('pushPage', 'profile-edit')
        }
    }
}
</script>

<style scoped>
.profile {
    align-items: center;
}
</style>
<template>
    <div class="page vbox">
        <h1>Add EC2 Instance to Monitor</h1>
        <div class="search hbox">
            <input class="fill" placeholder="Instance name, ID, or private IP" v-model="search" @keypress.enter="handleSearch" v-focus />
            <button @click="handleSearch">Search</button>
        </div>
        <div class="vbox fill scroll-y">
            <div class="hbox instance" v-for="instance in instances" :key="instance.id">
                <div class="fill name">{{ instance.name }}</div>
                <!-- <button @click="handleSelect(instance)">Select</button>
                <button @click="handleEdit(instance)">Edit</button> -->
            </div>
        </div>
        <button @click="handleBack">Back</button>
    </div>
</template>

<script>
import InstanceService from './services/InstanceService'

export default {
    name: 'AddInstance',
    data() {
        return {
            search: null,
            instances: []
        }
    },
    methods: {
        // handleSelect(instance) {
        //     this.$store.commit('setActiveProfile', profile)
        //     this.$store.commit('setPage', 'instance-list')
        // },
        handleSearch() {
            InstanceService.listInstances(this.$store.state.activeProfile, 'us-east-1', this.search).then(instances => {
                this.instances.length = 0
                this.instances.push.apply(this.instances, instances)

                console.log(instances)
            })
        },
        handleBack() {
            this.$store.commit('popPage');
        }
    }
}
</script>

<style scoped>
.search {
    margin-bottom: 10px;
}
.instance {
    align-items: center;
}
.name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
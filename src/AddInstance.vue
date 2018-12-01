<template>
    <div class="page vbox">
        <div class="tbar hbox">
            <button class="icon" @click="handleBack"><icon-back /></button>
            <h1>Select Instances to Monitor</h1>
        </div>
        <div class="search hbox">
            <input class="fill" placeholder="Instance name, ID, or private IP" v-model="search" @keypress.enter="handleSearch" v-focus />
            <button @click="handleSearch">Search</button>
        </div>
        <div class="vbox fill scroll-y">
            <div class="hbox instance" v-for="instance in prospectiveInstances" :key="instance.id">
                <button class="icon" @click="handleAddRemove(instance)">
                    <icon-checkbox-empty title="Add" v-if="!isIncluded(instance)" />
                    <icon-checkbox-checked title="Remove" v-if="isIncluded(instance)" />
                </button>
                <div class="fill name" @click="handleAddRemove(instance)" :title="`${instance.name} - ${instance.privateIp} - ${instance.id}`">
                    {{ instance.name }} &nbsp;<small>{{ instance.privateIp }} &nbsp;{{ instance.id }}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InstanceService from './services/InstanceService'

export default {
    name: 'AddInstance',
    computed: {
        instances() {
            return this.$store.state.activeProfile.instances
        }
    },
    data() {
        return {
            search: null,
            prospectiveInstances: []
        }
    },
    methods: {
        isIncluded(instance) {
            return this.instances.indexOf(instance.id) >= 0
        },
        handleAddRemove(instance) {
            this.$store.commit(this.isIncluded(instance) ? 'removeInstance' : 'addInstance', instance.id)
        },
        handleSearch() {
            this.prospectiveInstances = []
            InstanceService.listInstances(this.$store.state.activeProfile, 'us-east-1', this.search).then(instances => {
                this.prospectiveInstances.push.apply(this.prospectiveInstances, instances)
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
    margin: 0 10px 10px 10px;
}
.instance {
    align-items: center;
    min-height: 25px;
    padding: 0 10px 0 6px;
}
.name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
}
.name small {
    color: #aaa;
    font-size: 0.85em;
}
</style>
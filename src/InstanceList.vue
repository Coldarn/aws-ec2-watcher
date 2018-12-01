<template>
    <div class="page vbox">
        <h1>EC2 Instances</h1>
        <div class="vbox fill scroll-y">
            <div class="hbox instance" :class="instance.state" v-for="instance in instances" :key="instance.id" @click="handleStartStop(instance)">
                <!-- pending | running | shutting-down | terminated | stopping | stopped -->
                <button class="icon" v-if="instance.state === 'stopped'">
                    <icon-play title="Start instance" />
                </button>
                <button class="icon" v-else-if="instance.state === 'running'">
                    <icon-stop title="Stop instance" />
                </button>
                <div class="fill name" :title="`${instance.name} - ${instance.privateIp} - ${instance.id}`">
                    {{ instance.name }} &nbsp;<small>{{ instance.privateIp }} &nbsp;{{ instance.id }}</small>
                </div>
            </div>
        </div>
        <button class="add" @click="handleAdd">Add instances</button>
    </div>
</template>

<script>
import Vue from 'vue'
import InstanceService from './services/InstanceService'

export default {
    name: 'InstanceList',
    data() {
        const me = this
        function handleVisibilityChange() {
            if (document.hidden) {
                clearTimeout(me.refreshTimer)
            } else {
                me.refreshInstances()
            }
        }
        return {
            handleVisibilityChange,

            refreshTimer: 0,
            instances: this.$store.state.activeProfile.instances.map(id => { return { id, name: 'Loading...', state: 'loading' } }),
        }
    },
    computed: {
        instanceIds() {
            return this.$store.state.activeProfile.instances
        }
    },
    created() {
        this.refreshInstances()
        document.addEventListener('visibilitychange', this.handleVisibilityChange)
    },
    beforeDestroy() {
        clearTimeout(this.refreshTimer)
        document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    },
    methods: {
        refreshInstances() {
            InstanceService.listInstances(this.$store.state.activeProfile, 'us-east-1', this.instanceIds).then(instances => {
                this.instances = instances
                this.refreshTimer = setTimeout(() => this.refreshInstances(), 5000)
            })
        },
        handleStartStop(instance) {
            let changed = false

            if (instance.state === 'stopped') {
                InstanceService.startInstance(instance.id)
                instance.state = 'pending'
                changed = true
            } else if (instance.state === 'running') {
                InstanceService.stopInstance(instance.id)
                instance.state = 'stopping'
                changed = true
            }
            if (changed) {
                this.instances = this.instances.slice()
                clearTimeout(this.refreshTimer)
                this.refreshTimer = setTimeout(() => this.refreshInstances(), 5000)
            }
        },
        handleAdd() {
            this.$store.commit('pushPage', 'instance-add')
        }
    }
}
</script>

<style scoped>
.page {
    padding: 10px 0;
}
h1 {
    padding: 0 10px;
}
button.add {
    margin: 0 10px;
}
button.icon {
    margin: 0 2px;
}
.instance {
    align-items: center;
    min-height: 25px;
    padding-right: 10px;
    padding-left: 10px;
}
.instance.pending {
    background: repeating-linear-gradient(
        -45deg,
        #161616,
        #161616 9px,
        #094028 9px,
        #094028 18px
    );
    animation: RunningBackground 1s linear infinite;
}
.instance.running {
    background: #094028;
    cursor: pointer;
    padding-left: 0;
}
.instance.stopped {
    background: #292929;
    cursor: pointer;
    padding-left: 0;
}
.instance.stopping {
    background: repeating-linear-gradient(
        -45deg,
        #161616,
        #161616 9px,
        #292929 9px,
        #292929 18px
    );
    animation: RunningBackground 1s linear infinite;
}
.instance.shutting-down {
    background: repeating-linear-gradient(
        -45deg,
        #161616,
        #161616 9px,
        #570d1b 9px,
        #570d1b 18px
    );
    animation: RunningBackground 1s linear infinite;
}
.instance.terminated {
    background: #570d1b;
}
@keyframes RunningBackground {
    0% {
        background-position-x: 0;
    }
    100% {
        background-position-x: 25px;
    }
}
.name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.name small {
    color: #aaa;
    font-size: 0.85em;
}
</style>
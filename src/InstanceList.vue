<template>
    <div class="page vbox">
        <div class="tbar hbox">
            <h1>EC2 Instances</h1>
            <button class="icon" @click="handleAdd"><icon-plus title="Add instances" /></button>
            <button class="icon" @click="handleChangeProfile"><icon-profile :title="'Profile: ' + profileName" /></button>
            <button class="icon" @click="handleClose"><icon-close title="Close" /></button>
        </div>
        <div class="vbox fill scroll-y">
            <div class="hbox instance" :class="instance.state" v-for="instance in instances" :key="instance.id" @click="handleStartStop(instance)">
                <!-- pending | running | shutting-down | terminated | stopping | stopped -->
                <button class="icon" v-if="instance.state === 'stopped'">
                    <icon-play title="Start instance" />
                </button>
                <button class="icon" v-else-if="instance.state === 'running'">
                    <icon-stop title="Stop instance" />
                </button>
                <div class="hbox center spinner" v-else>
                    <div class="dot-spin" />
                </div>
                <div class="fill name" :title="`${instance.name} - ${instance.privateIp} - ${instance.id}`">
                    {{ instance.name }} &nbsp;<small>{{ instance.privateIp }} &nbsp;{{ instance.id }}</small>
                </div>
            </div>
        </div>
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
        profileName() {
            return this.$store.state.activeProfile.name
        },
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
            if (!this.instanceIds || this.instanceIds.length === 0) {
                return
            }
            clearTimeout(this.refreshTimer)
            InstanceService.listInstances(this.$store.state.activeProfile, this.instanceIds).then(instances => {
                this.instances = []
                if (instances.length < this.instanceIds.length) {
                    this.instanceIds.forEach(id => {
                        if (!instances.some(inst => inst.id === id)) {
                            this.$store.commit('removeInstance', id)
                        }
                    })
                }
                instances.forEach(inst => {
                    this.instances[this.instanceIds.indexOf(inst.id)] = inst
                })
                if (!document.hidden) {
                    this.refreshTimer = setTimeout(() => this.refreshInstances(), 5000)
                }
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
        },
        handleChangeProfile() {
            this.$store.commit('pushPage', 'profile-list')
        },
        handleClose() {
            require('electron').remote.require('./aws').exit()
        }
    }
}
</script>

<style scoped>
button.add {
    margin: 0 10px;
}
.instance {
    align-items: center;
    min-height: 25px;
    padding-right: 10px;
}
.instance button:hover::after {
    display: none;
}
.spinner {
    width: 25px;
    height: 25px;
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
}
.instance.loading,
.instance.stopped {
    background: #292929;
}
.instance.running,
.instance.stopped {
    cursor: pointer;
    position: relative;
}
.instance.running:hover::after,
.instance.stopped:hover::after {
    position: absolute;
    content: ' ';
    width: 100%;
    height: 100%;
    background: white;
    opacity: 0.2;
    pointer-events: none;
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
    padding-left: 10px;
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
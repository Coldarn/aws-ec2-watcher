<template>
    <div class="app vbox">
        <ProfileList :class="page" v-if="page === 'profile-list'" />
        <ProfileEditor :class="page" v-else-if="page === 'profile-edit'" />
        <AddInstance :class="page" v-else-if="page === 'instance-add'" />
        <InstanceList :class="page" v-else />
    </div>
</template>

<script>
import "./loading.css"
import { mapState } from 'vuex'

import ProfileList from './ProfileList.vue'
import ProfileEditor from './ProfileEditor.vue'
import InstanceList from './InstanceList.vue'
import AddInstance from './AddInstance.vue'

export default {
    name: 'App',
    components: {
        ProfileList,
        ProfileEditor,
        AddInstance,
        InstanceList,
    },
    computed: mapState(['page'])
}
</script>

<style>
html,
body {
    background: #111;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 11pt;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
html {
    height: 100%;
    display: flex;
}
body {
    display: flex;
    flex: 1;
}
.app {
    flex: 1;
    overflow: hidden;
}
input {
    background: #333;
    color: white;
    border: 0;
    margin: 2px;
    padding: 3px 5px;
}
.tbar {
    align-items: center;
}
.tbar button.icon {
    margin: 0;
    padding: 0;
    width: 32px;
    height: 40px;
}
h1 {
    font-size: 1em;
    font-weight: bold;
    flex: 1;
    line-height: 40px;
    margin: 0 10px;
}
.tbar > button + h1 {
    margin-left: 0;
}
button {
    margin: 0 2px;
    padding: 3px 5px;
    background: #999;
    border-radius: 4px;
    border: 0;
    cursor: pointer;
}
button:focus {
    outline: none;
}
.icon {
    padding: 0;
    width: 25px;
    height: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    color: white;
}
.icon > * {
    height: 24px;
    width: 24px;
}
.hbox {
    display: flex;
    align-items: stretch;
}
.vbox {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
.fill {
    flex: 1;
}
.center {
    align-items: center;
    justify-content: center;
}
.page {
    height: 100%;
}
.scroll-y {
    overflow-y: auto;
}
</style>

<style scoped>
label {
    margin-bottom: 0.5em;
}
</style>
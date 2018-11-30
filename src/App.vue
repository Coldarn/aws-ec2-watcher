<template>
    <div class="app vbox">
        <ProfileList :class="page" v-if="page === 'profile-list'" />
        <ProfileEditor :class="page" v-else-if="page === 'profile-edit'" />
        <AddInstance :class="page" v-else-if="page === 'instance-add'" />
        <InstanceList :class="page" v-else />
    </div>
</template>

<script>
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
}
body {
    padding: 10px;
}
input {
    background: #333;
    color: white;
    border: 0;
    margin: 2px;
    padding: 3px 5px;
}
h1 {
    font-size: 1em;
    font-weight: bold;
    margin: 0;
    margin-bottom: 1em;
}
button {
    margin: 2px;
    padding: 3px 5px;
    background: #999;
    border-radius: 4px;
    border: 0;
    cursor: pointer;
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
</style>

<style scoped>
label {
    margin-bottom: 0.5em;
}
</style>
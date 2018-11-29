
// Bundled dependencies
import Vue from 'vue'
import App from './App.vue'
import Store from './store'
import ProfileService from './services/ProfileService'

const store = Store()

const profiles = ProfileService.getProfiles()
store.commit('addProfile', profiles)

if (profiles.length > 0 && profiles[0].aws_access_key_id) {
    store.commit('setActiveProfile', profiles[0])
    store.commit('setPage', 'instance-list')
}

const rootEl = document.createElement('div')
document.body.appendChild(rootEl)

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

const app = new Vue({
    el: rootEl,
    store: store,
    ...App
})

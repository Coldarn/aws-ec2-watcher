
// Bundled dependencies
import Vue from 'vue'
import App from './App.vue'
import Store from './store'
import ProfileService from './services/ProfileService'


import IconPlay from 'vue-material-design-icons/Play.vue'
import IconStop from 'vue-material-design-icons/Stop.vue'
import IconCheckboxEmpty from 'vue-material-design-icons/CheckboxBlankOutline.vue'
import IconCheckboxChecked from 'vue-material-design-icons/CheckboxMarkedOutline.vue'

Vue.component('icon-play', IconPlay)
Vue.component('icon-stop', IconStop)
Vue.component('icon-checkbox-empty', IconCheckboxEmpty)
Vue.component('icon-checkbox-checked', IconCheckboxChecked)


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

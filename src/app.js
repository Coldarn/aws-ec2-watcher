
// Bundled dependencies
import ini from 'ini'
import mkdirp from 'mkdirp'

import Vue from 'vue'
import App from './App.vue'
import Store from './store'

const store = Store()

// NOT bundled
const fs = require('fs')
const path = require('path')
const os = require('os')

const credsDir = path.join(os.homedir(), '.aws')
mkdirp.sync(credsDir)

const awsCredsFile = path.join(credsDir, 'credentials')
console.log('Using credentials file:', awsCredsFile)

if (!fs.existsSync(awsCredsFile)) {
    fs.writeFileSync(awsCredsFile, '')
}

let profiles = ini.parse(fs.readFileSync(awsCredsFile, { encoding: 'utf8' }))
profiles = Object.keys(profiles).map(name => {
    return {
        name,
        aws_access_key_id: profiles[name].aws_access_key_id,
        aws_secret_access_key: profiles[name].aws_secret_access_key,
    }
})
store.commit('addProfile', profiles)

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


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
    fs.writeFileSync(awsCredsFile, '');
}

const creds = ini.parse(fs.readFileSync(awsCredsFile, { encoding: 'utf8' }))
store.replaceState({
    creds: creds,
    profile: 'default'
})

const rootEl = document.createElement('div')
document.body.appendChild(rootEl)

const app = new Vue({
    el: rootEl,
    store: store,
    ...App
})

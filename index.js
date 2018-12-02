const path = require('path')

const basePath = require('electron').app.isPackaged ? process.resourcesPath : __dirname

const MenuBar = require('menubar')
const mb = new MenuBar({
    icon: path.join(basePath, 'icon.ico'),
    index: path.join(basePath, 'dist', 'index.html'),
    tooltip: 'AWS EC2 Watcher',
    width: 300,
})

mb.on('ready', () => {
    console.log('ready')
})

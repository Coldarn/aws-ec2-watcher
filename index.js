const path = require('path')

const MenuBar = require('menubar')
const mb = new MenuBar({
    icon: 'icon.ico',
    index: path.join(__dirname, 'dist', 'index.html'),
    tooltip: 'AWS EC2 Watcher'
})

mb.on('ready', () => {
    console.log('ready')
})

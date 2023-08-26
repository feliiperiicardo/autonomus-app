const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

//const socket = require('./socket.js')
//var spawn = require('child_process').spawn
//cp.execFile(path.join(__dirname, 'socket.js'))
/*
const { spawn } = require('child_process')
const bat = spawn('node', [path.join(__dirname, 'socket.js')], { shell: true })

bat.stdout.on('data', data => {
  console.log(data.toString())
})

bat.stderr.on('data', data => {
  console.error(data.toString())
})

bat.on('exit', code => {
  console.log(`Child exited with code ${code}`)
}) */

let mainWindow

const mainMenuTemplate = [
  {
    role: 'Autonomus',
  },
]

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: __dirname + '/icon.ico',
    webPreferences: {
      nodeIntegration: false,
    },
  })
  mainWindow.maximize()
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  mainWindow.on('closed', () => (mainWindow = null))
}

function closeAll() {
  const execSync = require('child_process').execSync
  execSync("taskkill /IM autonomus-socket-win.exe")
  execSync("taskkill /IM build.exe")
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    closeAll()
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

//
// Client.js
//
// const zmq = require('zeromq');
// import zmq from 'zeromq'
// const requester = zmq.socket('req');

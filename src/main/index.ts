import { app, BrowserWindow, globalShortcut } from 'electron'
import type { BrowserWindowConstructorOptions } from 'electron'
import windowStateKeeper from 'electron-window-state'

const isDevelopment = !app.isPackaged

function createWindow() {
  const windowOptions: BrowserWindowConstructorOptions = {
    maxWidth: 800,
    minHeight: 400,
    titleBarStyle: 'hidden',
    title: 'Emoji Picker',
    autoHideMenuBar: true,
    trafficLightPosition: {
      x: 20,
      y: 32
    },
    webPreferences: {
      contextIsolation: true,
      devTools: isDevelopment,
      spellcheck: false,
      nodeIntegration: true
    },
    show: false,
    center: true,
    skipTaskbar: true
  }

  const windowState = windowStateKeeper({
    defaultWidth: windowOptions.minWidth,
    defaultHeight: windowOptions.minHeight
  })

  const browserWindow = new BrowserWindow({
    ...windowOptions,
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    transparent: true
  })

  windowState.manage(browserWindow)

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
    browserWindow.focus()
  })

  const ret = globalShortcut.register('CommandOrControl+J', () => {
    browserWindow.show()
    browserWindow.focus()
  })

  if (!ret) {
    console.log('registration failed')
  }

  const port = process.env.PORT || 3000

  if (isDevelopment) {
    void browserWindow.loadURL(`http://localhost:${port}`)
  } else {
    void browserWindow.loadFile('./dist/index.html')
  }
}

void app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

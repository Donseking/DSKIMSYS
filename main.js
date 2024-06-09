const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const { ipcMain } = require("electron")

function createWindow(file, op){
  const mainwin = new BrowserWindow(op)
  mainwin.once('ready-to-show', () => {
    mainwin.show()
  })
  mainwin.loadFile(file)
  return mainwin
}

const mainop = {
  width : 800,
  height : 600,
  frame: false,
  autoHideMenuBar: true,
  show: false,
  resizable: false,
  webPreferences: {
    hasShadow: true,
    nodeIntegration: true,
    enableRemoteModule:true,
    contextIsolation:false,
    preload: path.join(__dirname, 'preload.js'),
    nativeWindowOpen : true
  },
  show : false,
}
app.whenReady().then(() => {
  const mainwin = createWindow("./indexwin/index.html", mainop)
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow("./indexwin/index.html", mainop)
  })
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })

  ipcMain.on("close", () => {
    app.quit()
  })

  ipcMain.on("reload", () => {
    BrowserWindow.getFocusedWindow().reload()
  })

  ipcMain.on("devtools", () => {
    BrowserWindow.getFocusedWindow().webContents.openDevTools({ mode: "detach" })
  })

  ipcMain.on("min", () => {
    BrowserWindow.getFocusedWindow().minimize()
  })

  const adop = {
    width : 400,
    height : 300,
    frame: false,
    autoHideMenuBar: true,
    show: false,
    resizable: false,
    webPreferences: {
      hasShadow: true,
      nodeIntegration: true,
      enableRemoteModule:true,
      contextIsolation:false,
      preload: path.join(__dirname, 'preload.js')
    },
    parent : mainwin,
    module : true,
    show : false,
  }

  let adcawin = undefined
  ipcMain.on("adcabtn click", () => {
    if (typeof adcawin === 'undefined'){
      adop.height = 150
      adcawin = createWindow("./addclawin/addclass.html", adop)
      adop.height = 300
    }
  })
  ipcMain.on("adca close", () => {
    adcawin.close()
    adcawin = undefined
  })

  let aditwin = undefined
  ipcMain.on("aditbtn click", () => {
    if (typeof aditwin === "undefined"){
      aditwin = createWindow("./additemwin/additem.html", adop)
    }
  })
  ipcMain.on("adit close", () => {
    aditwin.close()
    aditwin = undefined
  })

  let adCCWbtn = undefined
  ipcMain.on("adCCWbtn click", () => {
    if (typeof adCCWbtn === "undefined"){
      adCCWbtn = createWindow("./addChildClassWin/addCCW.html", adop)
    }
  })
  ipcMain.on("adCCW close", () => {
    adCCWbtn.close()
    adCCWbtn = undefined
  })
})
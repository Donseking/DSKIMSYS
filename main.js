const { app, BrowserWindow, Menu } = require('electron')
const path = require('node:path')
const { ipcMain } = require("electron")
require("electron-reload")(__dirname)

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
    mainwin.reload()
  })

  let aditwin = undefined
  ipcMain.on("aditbtn click", () => {
    if (typeof aditwin === "undefined"){
      adop.height = 250
      aditwin = createWindow("./additemwin/additem.html", adop)
      adop.height = 300
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

  let choosewin = undefined
  ipcMain.on("choose click", () => {
    if(typeof choosewin === "undefined"){
      adop.parent = aditwin
      choosewin = createWindow("./choosewin/chwin.html", adop)
    }
  })
  ipcMain.on("chwin close", () => {
    choosewin.close()
    choosewin = undefined
  })

  ipcMain.on("adccw choose click", () => {
    if(typeof choosewin === "undefined"){
      adop.parent = adCCWbtn
      choosewin = createWindow("./choosewin/chwin.html", adop)
    }
  })

  let warnwin = undefined
  ipcMain.on("warn", () => {
    if(typeof warnwin === "undefined"){
      adop.width = 400
      adop.height = 100
      adop.parent = aditwin
      warnwin = createWindow("./warnwin/warn.html", adop)
      adop.width = 400
      adop.height = 300
    }
  })
  ipcMain.on("warn close", () => {
    warnwin.close()
    warnwin = undefined
  })
})
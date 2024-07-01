const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const { ipcMain } = require("electron")
require("electron-reload")(__dirname)
var cmd = require("node-cmd")

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
  sandbox: false,
  center: true,
  webPreferences: {
    hasShadow: true,
    nodeIntegration: true,
    enableRemoteModule:true,
    contextIsolation:false,
    preload: path.join(__dirname, 'prel.js'),
    nativeWindowOpen : true
  },
  show : false,
  icon : "icon/letter-d.ico"
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
    sandbox: false,
    webPreferences: {
      hasShadow: true,
      nodeIntegration: true,
      enableRemoteModule:true,
      contextIsolation:false,
      preload: path.join(__dirname, 'prel.js'),
    },
    parent : mainwin,
    module : true,
    show : false,
    icon : "icon/letter-d.ico"
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
    if ( typeof aditwin != "undefined" ){
      aditwin.close()
    }
    aditwin = undefined
  })

  let adCCWbtn = undefined
  ipcMain.on("adCCWbtn click", () => {
    if (typeof adCCWbtn === "undefined"){
      adop.height = 150
      adCCWbtn = createWindow("./addChildClassWin/addCCW.html", adop)
      adop.height = 300
    }
  })
  ipcMain.on("adCCW close", () => {
    if ( typeof adCCWbtn != "undefined" ){
      adCCWbtn.close()
    }
    adCCWbtn = undefined
  })

  let choosewin = undefined
  ipcMain.on("choose click", () => {
    if(typeof choosewin === "undefined"){
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
      adop.parent = mainwin
      warnwin = createWindow("./warnwin/warn.html", adop)
      adop.width = 400
      adop.height = 300
    }
  })
  ipcMain.on("warn close", () => {
    warnwin.close()
    warnwin = undefined
  })

  ipcMain.on("ipc-msg", (e, arg) => {
    console.log(arg)
  })

  let declawin = undefined
  ipcMain.on("declabtn click", () => {
    if(typeof declawin === "undefined"){
      adop.parent = mainwin
      declawin = createWindow("declawin/decla.html", adop)
    }
  })
  ipcMain.on("decla close", () => {
    declawin.close()
    declawin = undefined
  })

  let conwin = undefined
  ipcMain.on("decla class click", () => {
    if ( typeof conwin === "undefined" ){
      adop.height = 150
      adop.parent = declawin
      conwin = createWindow("confirmwin/conwin.html", adop)
      adop.parent = mainwin
      adop.height = 300
    }
  })
  ipcMain.on("conwin close", () => {
    conwin.close()
    conwin = undefined
  })

  let deitmwin = undefined
  ipcMain.on("deitmbtn click", () => {
    if ( typeof conwin === "undefined" ){
      deitmwin = createWindow("deitmwin/deitmwin.html", adop)
    }
  })
  ipcMain.on("deitm close", () => {
    deitmwin.close()
    deitmwin = undefined
  })


  cmd.runSync("py jshand.py")
})
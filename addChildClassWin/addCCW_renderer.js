const { ipcRenderer } = require("electron")
var fs = require("fs")

// FUN 錯誤訊息
function warnning(str){
    fs.writeFileSync("warnwin/warntext.json", JSON.stringify([str]), (err) =>{
        if (err){
            console.log(err)
        }
    })
    send("warn")
}

// FUN 向主進程傳訊息
function send(str, ar){
    ipcRenderer.send(str, ar)
}

// FUN 計算 object 長度
function oblen(obj){
    let olen = Object.keys(obj).length
    return olen
}

// FUN array 長度
function len(arr){
    return arr.length
}

// FUN print
function con(str){
    console.log(str)
}

var data = JSON.parse(fs.readFileSync("proj.json").toString())

const clobtn = document.getElementById("close")
clobtn.addEventListener("click", () => {
    send("adCCW close")
})

const rebtn = document.getElementById("reload")
rebtn.addEventListener("click", () => {
    send("reload")
})

const devbtn = document.getElementById("DevTools")
devbtn.addEventListener("click", () => {
    send("devtools")
})

const chbtn = document.getElementById("choose")
chbtn.addEventListener("mouseover", () => {
    chbtn.classList.add("choose_new")
})
chbtn.addEventListener("mouseout", () => {
    chbtn.classList.remove("choose_new")
})
chbtn.addEventListener("click", () => {
    send("choose click")
})

const enbtn = document.getElementById("enter")
enbtn.addEventListener("mouseover", () => {
    enbtn.classList.add("enter_new")
})
enbtn.addEventListener("mouseout", () => {
    enbtn.classList.remove("enter_new")
})
enbtn.addEventListener("click", () => {
    getCCname()
})

// fix 第三次增加時會重複
// FUN 獲取子分類名稱 並顯示在主頁面
function getCCname(){
    var warnstr = ""
    var ccname = document.getElementById("name").value
    if ( len(ccname) === 0 ){    // > 檢查使用者輸入 如果沒有則跳出警告
        warnstr = "Please enter the child class name"
        warnning(warnstr)
    }else {                     // > 如果使用者有輸入
        if ( len(data) === 0 ){ // > 如果使用者尚未建立分類，跳出警告
            warnstr = "No classification has been created yet"
            warnning(warnstr)
            send("adCCW close")
        }else {                 // > 如果已建立分類
            var mark = data[len(data) - 1]
            var datalen = len(data)
            var classnamelist = allclassname(data)
            for ( var i = 0; i < datalen - 1; i ++ ){
                var pro = data[i]["project"]
                for ( var j = 0; j < len(pro); j ++ ){
                    if ( mark == classnamelist[i] && pro[j]["name"] == ccname ){       // > 檢查子分類是否重複建立
                        warnstr = "This subclass has been created in this class"
                        warnning(warnstr)
                    }
                }
            }
        }
    }
}

function allclassname(data){
    var dlen = len(data)
    var all = []
    for ( var i = 0; i < dlen - 1; i ++ ){
        all.push(data[i]["name"])
    }
    return all
}

// function if_name_equ_mark(all, mark){
//     for( var i = 0 ; i < len(all); i ++ ){
//         if ( all[i] == mark ){
//             return all[i]
//         }
//     }

// }
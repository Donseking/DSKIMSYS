const { ipcRenderer } = require("electron")
var fs = require("fs")

const clobtn = document.getElementById("close")
clobtn.addEventListener("click", () => {
    ipcRenderer.send("adit close")
})

const rebtn = document.getElementById("reload")
rebtn.addEventListener("click", () => {
    ipcRenderer.send("reload")
})

const devbtn = document.getElementById("DevTools")
devbtn.addEventListener("click", () => {
    ipcRenderer.send("devtools")
})

const chbtn = document.getElementById("choose")
chbtn.addEventListener("mouseover", () => {
    chbtn.classList.add("choose_new")
})
chbtn.addEventListener("mouseout", () => {
    chbtn.classList.remove("choose_new")
})
chbtn.addEventListener("click", () => {
    ipcRenderer.send("choose click")
})

const enbtn = document.getElementById("enter")
enbtn.addEventListener("mouseover", () => {
    enbtn.classList.add("enter_new")
})
enbtn.addEventListener("mouseout", () => {
    enbtn.classList.remove("enter_new")
})
enbtn.addEventListener("click", () => {
    getdata()
})

function getdata(){
    var name = document.getElementById("name").value
    var num = document.getElementById("num").value
    var unit = document.getElementById("unit").value
    adit(name, num, unit)
}

function adit(itname, itnum, itunit){
    var data = JSON.parse(fs.readFileSync("proj.json").toString())
    var mark = data[data.length - 1]
    for ( var i = 0 ; i < data.length - 1 ; i ++){
        if ( data[i]["name"] === mark ){
            var pro = data[i]["project"]
            if ( pro.length === 0) {
                pro.push(
                    {
                        "name" : itname,
                        "num" : parseInt(itnum),
                        "unit" : itunit
                    }
                )
                fs.writeFileSync("proj.json", JSON.stringify(data), (err) => {
                    if ( err ) {
                        console.log(err)
                    }
                })
            }else {
                for (var j = 0 ; j < pro.length ; j ++ ) {
                    if ( itname === pro[j]["name"] ){
                        pro[j]["num"] = parseInt(pro[j]['num']) + parseInt(itnum)
                        data[i]["project"] = [
                            {
                                "name" : itname,
                                "num" : pro[j]["num"],
                                "unit" : itunit
                            }
                        ]
                        fs.writeFileSync("proj.json", JSON.stringify(data), (err) => {
                            if ( err ) {
                                console.log(err)
                            }
                        })
                    }else {
                        var newdata = {
                            "name" : itname,
                            "num" : itnum,
                            "unit" : itunit,
                        }
                        data[i]['project'].push(newdata)
                        fs.writeFileSync("proj.json", JSON.stringify(data), (err) => {
                            console.log(err)
                        })
                    }
                }
            }
        }
    }
}
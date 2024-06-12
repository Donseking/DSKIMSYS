var fs = require("fs")

const data = JSON.parse(fs.readFileSync("proj.json").toString())

var newdata = {
    "name" : "",
    "project" : []
}

const result = Object.keys(data).map((key) => data[key]);

const colors1 = ["red", "yellow", "blue", "gray", "purple"]
const colors2 = result.splice(-1, 0, newdata)

console.log(result)
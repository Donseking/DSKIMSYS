import json

jsfile = open("proj.json", "r")
a = json.load(jsfile)

json.dump(a, jsfile, indent = 4)
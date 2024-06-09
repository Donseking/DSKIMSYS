import json

jsfile = open("proj.json", "r")
a = json.loads(jsfile)

print(a)
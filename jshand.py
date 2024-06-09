import json

with open("proj.json", "r") as f :
    data = json.load(f)

with open("proj.json", "w") as f :
    json.dump(data, f, indent = 4)
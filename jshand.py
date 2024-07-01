import json

with open("proj.json", "r", encoding = "utf-8") as f :
    data = json.load(f)

with open("proj.json", "w") as f :
    json.dump(data, f, indent = 4)


# > 這個程式是將 json 資料重新整理
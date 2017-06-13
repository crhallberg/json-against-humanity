import os
import json

with open('cah.json') as j:
    cah = json.load(j)

for deck in cah:
    if deck in ['blackCards', 'whiteCards', 'order']:
        continue
    obj = cah[deck]
    data =  """{
    "abbr": "%s",
    "name": "%s",
    "icon": "%s",
    "description": "- placeholder -"
}
"""  % (deck, obj['name'], obj["icon"] if ("icon" in obj) else "")
    with open('src/%s/metadata.json' % deck, 'w') as outfile:
        outfile.write(data)

import os
import json

with open('cah.json') as j:
    cah = json.load(j)

for deck in cah:
    if deck in ['blackCards', 'whiteCards', 'order']:
        continue
    obj = cah[deck]
    data = {
        'abbr': deck,
        'name': obj['name'],
        'icon': obj['icon'] if ('icon' in obj) else '',
        'description': '- placeholder -',
    }
    with open('src/%s/metadata.json' % deck, 'w') as outfile:
        json.dump(data, outfile, indent=4)

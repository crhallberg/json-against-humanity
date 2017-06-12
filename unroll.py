import os
import json
from markdownify import markdownify

with open('cah.json') as j:
    data = json.load(j)

def tomarkdown(s):
    # Collapse spaces
    # Undo markdownify escapes
    # Remove line breaks
    # Collapse line endings
    return markdownify(s).replace('  ', ' ').replace('\_', '_').replace('\n', '\\n').replace(' \\n', '\\n')

for deck in data['order']:
    # Create folder for each deck
    path = 'src/%s/' % deck
    if not os.path.exists(path):
        os.mkdir(path)

    bhtml = []
    bmarkdown = []
    for index in data[deck]['black']:
        bhtml.append(data['blackCards'][index]['text'])
        bmarkdown.append(tomarkdown(data['blackCards'][index]['text']))
    with open(path + 'black.html.txt', 'w') as bf:
        bf.write('\n'.join(bhtml))
    with open(path + 'black.md.txt', 'w') as bf:
        bf.write('\n'.join(bmarkdown).encode('utf8')) # markdownify introduces unicode characters

    whtml = []
    wmarkdown = []
    for index in data[deck]['white']:
        whtml.append(data['whiteCards'][index])
        wmarkdown.append(tomarkdown(data['whiteCards'][index]))
    with open(path + 'white.html.txt', 'w') as bf:
        bf.write('\n'.join(whtml))
    with open(path + 'white.md.txt', 'w') as bf:
        bf.write('\n'.join(wmarkdown).encode('utf8'))

    print ('%s - b:%u w:%u' % (deck, len(bhtml), len(whtml)))

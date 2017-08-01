import os
import re
import json
'''
JSON format:
{
    cards:
        black: []
        white: []
    decks: [
        abbr: {
            name: "",
            icon: "",
            description: "",
            official: true/false,
            black: [indices],
            white: [indices]
        }
    ]
'''

blackCards = set([])
whiteCards = set([])
for deckDir in os.listdir('src/'):
    with open('src/' + deckDir + '/black.md.txt') as f:
        bcards = [x.strip() for x in f.readlines()]
        blackCards.update(bcards)
    with open('src/' + deckDir + '/white.md.txt') as f:
        wcards = [x.strip() for x in f.readlines()]
        whiteCards.update(wcards)
blackCards = list(blackCards)
whiteCards = list(whiteCards)
print ('cards    - b:%u + w:%u = %7s' % (len(blackCards), len(whiteCards), '{:,}'.format(len(blackCards)+len(whiteCards))))

def treatCards(card):
    # Trim
    # Fix ending punctuation
    # Convert to regular line breaks
    return re.sub(r'([^\.\?!])$', '\g<1>.', card.strip()).replace('\\n', '\n')

officialBlack = 0
officialWhite = 0
blackJSON = []
whiteJSON = []
decks = {}
for deckDir in os.listdir('src/'):
    with open('src/%s/metadata.json' % deckDir) as j:
        metadata = json.load(j)
        with open('src/' + deckDir + '/black.md.txt') as f:
            bcards = [blackCards.index(x.strip()) for x in f.readlines()]
            metadata['black'] = bcards
            if metadata['official']:
                officialBlack += len(bcards)
        with open('src/' + deckDir + '/black.md.txt') as f:
            blackJSON.extend([{ 'text': treatCards(x), 'pick': max(1, x.count('_')), 'deck': deckDir, 'icon': metadata['icon'] } for x in f.readlines()])
        with open('src/' + deckDir + '/white.md.txt') as f:
            wcards = [whiteCards.index(x.strip()) for x in f.readlines()]
            metadata['white'] = wcards
            if metadata['official']:
                officialWhite += len(wcards)
        with open('src/' + deckDir + '/white.md.txt') as f:
            whiteJSON.extend([{ 'text': treatCards(x), 'deck': deckDir, 'icon': metadata['icon'] } for x in f.readlines()])
        decks[metadata['abbr']] = metadata
        del decks[metadata['abbr']]['abbr']
print ('official - b:%4u + w:%u = %7s' % (officialBlack, officialWhite, '{:,}'.format(officialBlack + officialWhite)))

#Compact format
compact = {
    'cards': {
        'black': [{ 'text': treatCards(x), 'pick': max(1, x.count('_')) } for x in blackCards],
        'white': [{ 'text': treatCards(x) } for x in whiteCards]
    },
    'decks': decks
}
compactdump = json.dumps(compact).encode('utf8')
with open('compact.md.json', 'w') as outfile:
    outfile.write(compactdump)
    outfile.flush()

# Full format
print ('w/ dups  - b:%u + w:%u = %7s' % (len(blackJSON), len(whiteJSON), '{:,}'.format(len(blackJSON)+len(whiteJSON))))
for i in decks:
    del decks[i]['black']
    del decks[i]['white']
full = {
    "black": blackJSON,
    "white": whiteJSON,
    "metadata": decks
}
fulldump = json.dumps(full).encode('utf8')
with open('full.md.json', 'w') as outfile:
    outfile.write(fulldump)
    outfile.flush()

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
        {
            abbr: "",
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
print ('b:%u + w:%u = %u' % (len(blackCards), len(whiteCards), len(blackCards)+len(whiteCards)))

def treatCards(card):
    # Trim
    # Fix ending punctuation
    # Convert to regular line breaks
    return re.sub(r'([^\.\?!])$', '\g<1>.', card.strip()).replace('\\n', '\n')

cah = {
    'cards': {
        'black': [treatCards(x) for x in blackCards],
        'white': [treatCards(x) for x in whiteCards]
    },
    'decks': []
}
officialBlack = 0
officialWhite = 0
for deckDir in os.listdir('src/'):
    with open('src/%s/metadata.json' % deckDir) as j:
        metadata = json.load(j)
        with open('src/' + deckDir + '/black.md.txt') as f:
            bcards = [blackCards.index(x.strip()) for x in f.readlines()]
            metadata['black'] = bcards
            if metadata['official']:
                officialBlack += len(bcards)
        with open('src/' + deckDir + '/white.md.txt') as f:
            wcards = [whiteCards.index(x.strip()) for x in f.readlines()]
            metadata['white'] = wcards
            if metadata['official']:
                officialWhite += len(wcards)
        cah['decks'].append(metadata)
print ('official - b:%u + w:%u = %u' % (officialBlack, officialWhite, officialBlack + officialWhite))
dump = json.dumps(cah).encode('utf8')
with open('compiled.md.json', 'w') as outfile:
    outfile.write(dump)
    outfile.flush()

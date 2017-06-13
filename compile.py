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
for deckDir in os.listdir('src/'):
    with open('src/%s/metadata.json' % deckDir) as j:
        metadata = json.load(j)
        with open('src/' + deckDir + '/black.md.txt') as f:
            metadata['black'] = [blackCards.index(x.strip()) for x in f.readlines()]
        with open('src/' + deckDir + '/white.md.txt') as f:
            metadata['white'] = [whiteCards.index(x.strip()) for x in f.readlines()]
        cah['decks'].append(metadata)
dump = json.dumps(cah).encode('utf8')
with open('compiled.md.json', 'w') as outfile:
    outfile.write(dump)
    outfile.flush()

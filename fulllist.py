import os

blackCards = []
whiteCards = []
for deckDir in os.listdir('src/'):
    with open('src/' + deckDir + '/black.md.txt') as f:
        cards = ["%s (%s)" % (x.strip(), deckDir) for x in f.readlines()]
        blackCards.extend(cards)
    with open('src/' + deckDir + '/white.md.txt') as f:
        cards = ["%s (%s)" % (x.strip(), deckDir) for x in f.readlines()]
        whiteCards.extend(cards)

uniqueBlack = sorted(blackCards)
uniqueWhite = sorted(whiteCards)
with open('list-black.txt', 'w') as lb:
    lb.write("\n".join(uniqueBlack))
with open('list-white.txt', 'w') as lb:
    lb.write("\n".join(uniqueWhite))

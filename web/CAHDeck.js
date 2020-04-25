class CAHDeck {
  _hydrateCompact(json) {
    let decks = {};
    console.log(Object.keys(json));
    for (let abbr in json.decks) {
      let deck = json.decks[abbr];
      deck.white = deck.white.map((index) =>
        Object.assign(json.cards.white[index], { deck: abbr, icon: deck.icon })
      );
      deck.black = deck.black.map((index) =>
        Object.assign(json.cards.black[index], { deck: abbr, icon: deck.icon })
      );
      decks[abbr] = deck;
    }
    return decks;
  }

  async _loadDeck() {
    if (typeof this.compactSrc != "undefined") {
      let json = await fetch(this.compactSrc).then((data) => data.json());
      this.deck = this._hydrateCompact(json);
    } else if (typeof this.fullSrc != "undefined") {
      this.deck = await fetch(this.fullSrc).then((data) => data.json());
    } else {
      throw Error(
        "No source specified, please use CAHDeck.fromCompact(src) or CAHDeck.fromFull(src) to make your objects."
      );
    }
  }

  static async fromCompact(compactSrc) {
    let n = new CAHDeck();
    n.compactSrc = compactSrc;
    await n._loadDeck();
    return n;
  }

  static async fromFull(fullSrc) {
    let n = new CAHDeck();
    n.fullSrc = fullSrc;
    await n._loadDeck();
    return n;
  }

  listDecks() {
    let decks = [];
    for (let abbr in this.deck) {
      let { name, official, description } = this.deck[abbr];
      decks.push({ abbr, name, official, description });
    }
    return decks;
  }

  getDecks(decks) {
    let white = [];
    let black = [];
    for (let deck of decks) {
      if (typeof this.deck[deck] != "undefined") {
        white.push(...this.deck[deck].white);
        black.push(...this.deck[deck].black);
      }
    }
    return { white, black };
  }
}

class CAHDeck {
  _hydrateCompact(json) {
    let packs = {};
    for (let abbr in json.decks) {
      let pack = json.decks[abbr];
      pack.white = pack.white.map((index) =>
        Object.assign(json.cards.white[index], { pack: abbr, icon: pack.icon })
      );
      pack.black = pack.black.map((index) =>
        Object.assign(json.cards.black[index], { pack: abbr, icon: pack.icon })
      );
      packs[abbr] = pack;
    }
    return packs;
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

  listPacks() {
    let packs = [];
    for (let abbr in this.deck) {
      let { name, official, description } = this.deck[abbr];
      packs.push({ abbr, name, official, description });
    }
    return packs;
  }

  getPacks(decks) {
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

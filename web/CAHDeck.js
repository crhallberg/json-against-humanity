class CAHDeck {
  _hydrateCompact(json) {
    let packs = {};
    for (let abbr in json.decks) {
      let pack = json.decks[abbr];
      pack.white = pack.white.map((index) =>
        Object.assign({}, json.cards.white[index], { pack: abbr, icon: pack.icon })
      );
      pack.black = pack.black.map((index) =>
        Object.assign({}, json.cards.black[index], { pack: abbr, icon: pack.icon })
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
      let { name, official, description, icon, white, black } = this.deck[abbr];
      packs.push({
        abbr,
        name,
        official,
        description,
        icon,
        counts: {
          white: white.length,
          black: black.length,
          total: white.length + black.length,
        },
      });
    }
    return packs;
  }

  getPack(pack) {
    return this.deck[pack];
  }

  getPacks(packs) {
    if (typeof packs == "undefined") {
      packs = Object.keys(this.deck);
    }
    let white = [];
    let black = [];
    for (let pack of packs) {
      if (typeof this.deck[pack] != "undefined") {
        white.push(...this.deck[pack].white);
        black.push(...this.deck[pack].black);
      }
    }
    return { white, black };
  }
}

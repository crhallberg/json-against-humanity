class CAHDeck {
  _hydrateCompact(json) {
    let packs = [];
    for (let pack of json.packs) {
      pack.white = pack.white.map((index) =>
        Object.assign(
          {},
          { text: json.white[index] },
          { pack: packs.length },
          pack.icon ? { icon: pack.icon } : {}
        )
      );
      pack.black = pack.black.map((index) =>
        Object.assign(
          {},
          json.black[index],
          { pack: packs.length },
          pack.icon ? { icon: pack.icon } : {}
        )
      );
      packs.push(pack);
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
    let id = 0;
    for (let { name, official, description, icon, white, black } of this.deck) {
      let pack = {
        id,
        name,
        official,
        description,
        counts: {
          white: white.length,
          black: black.length,
          total: white.length + black.length,
        },
      };
      if (icon) {
        pack.icon = icon;
      }
      packs.push(pack);
      id += 1;
    }
    return packs;
  }

  getPack(index) {
    return this.deck[index];
  }

  getPacks(indexes) {
    if (typeof indexes == "undefined") {
      indexes = Object.keys(this.deck);
    }
    let white = [];
    let black = [];
    for (let pack of indexes) {
      if (typeof this.deck[pack] != "undefined") {
        white.push(...this.deck[pack].white);
        black.push(...this.deck[pack].black);
      }
    }
    return { white, black };
  }
}

class Pack {
    constructor(deck, pack, index) {
        this.deck = deck;

        this.hydrated = {
            black: false,
            white: false,
        };

        this.name = pack.name;
        this.official = pack.official;
        this._black = pack.black;
        this._white = pack.white;

        this.id = pack.id ?? index;
        this.icon = pack.icon ?? null;
    }

    setIcon(icon) {
        this.icon = icon;

        if (this.hydrated.black) {
            this._black.forEach((card) => {
                card.icon = icon;
            });
        }

        if (this.hydrated.white) {
            this._white.forEach((card) => {
                card.icon = icon;
            });
        }
    }

    summary() {
        return {
            id: this.id,
            icon: this.icon,
            name: this.name,
            official: this.official,
            counts: this.counts(),
        };
    }

    get black() {
        if (!this.hydrated.black) {
            this.hydrated.black = true;
            const json = this.deck.json;
            let blackSet = new Set();
            this._black = this._black
                .map((index) => {
                    const text = this.deck.json.black[index].text;
                    if (blackSet.has(text)) {
                        return null;
                    }
                    blackSet.add(text);
                    return Object.assign(
                        { ...this.deck.json.black[index] },
                        { packID: this.id ?? this.name },
                        this.icon ? { icon: this.icon } : {}
                    );
                })
                .filter((card) => card !== null);
        }
        return this._black;
    }

    get white() {
        if (!this.hydrated.white) {
            this.hydrated.white = true;
            let whiteSet = new Set();
            this._white = this._white
                .map((index) => {
                    const text = this.deck.json.white[index];
                    if (whiteSet.has(text)) {
                        return null;
                    }
                    whiteSet.add(text);
                    return Object.assign(
                        { text },
                        { packID: this.id ?? this.name },
                        this.icon ? { icon: this.icon } : {}
                    );
                })
                .filter((card) => card !== null);
        }
        return this._white;
    }

    /**
     * get counts of black and white decks
     *
     * @return {Record<string, number>}
     */
    counts() {
        return {
            black: this._black.length,
            white: this._white.length,
        };
    }
}

class Deck {
    loadPromise = null;
    json = null;

    constructor(filePath) {
        this.loadPromise = (async () => {
            const json = await fetch(filePath).then((data) => data.json());

            this.json = json;

            this.packs = json.packs.map((pack, index) => {
                return new Pack(this, pack, index);
            });

            return this;
        })();
    }

    get loaded() {
        return this.loadPromise.then((instance) => {
            return this;
        });
    }

    static async fromFile(filePath) {
        return await new Deck(filePath).loaded;
    }

    listPacks() {
        if (!this.json) {
            throw Error("Wait for Deck.loaded Promise to resolve");
        }
        return this.packs.map((pack) => pack.summary());
    }

    getPackById(id) {
        if (!this.json) {
            throw Error("Wait for Deck.loaded Promise to resolve");
        }

        for (let i = 0; i < this.packs.length; i++) {
            if (this.packs[i].id === id) {
                return this.packs[i];
            }
        }

        if (typeof id == "string") {
            const num = parseInt(id);
            if (!isNaN(num)) {
                return this.getPackById(num);
            }
        }
        return null;
    }

    getPackByName(name) {
        if (!this.json) {
            throw Error("Wait for Deck.loaded Promise to resolve");
        }
        for (let i = 0; i < this.packs.length; i++) {
            if (this.packs[i].name === name) {
                return this.packs[i];
            }
        }
        return null;
    }
}

if (typeof module !== "undefined") {
    module.exports = { Pack, Deck };
}

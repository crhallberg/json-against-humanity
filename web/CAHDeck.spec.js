const assert = chai.assert;

describe("constructor", () => {
    it("resolved loaded correctly", async () => {
        const deck = new Deck("../cah-all-compact.json");
        assert.isNull(deck.json);
        await deck.loaded;
        assert.isNotNull(deck.json);
    });

    it("test one liner", async () => {
        const deck = await new Deck("../cah-all-compact.json").loaded;
        assert.isNotNull(deck.json);
    });

    it("loads statically", async () => {
        const deck = await Deck.fromFile("../cah-all-compact.json");
        assert.isNotNull(deck.json);
    });
});

describe("packs", () => {
    let deck, basePack;

    before(async () => {
        deck = await new Deck("../cah-all-compact.json").loaded;
        basePack = deck.getPackByName("CAH Base Set");
    });

    it("get pack by name", () => {
        assert.equal(basePack.name, "CAH Base Set");
    });

    it("get pack by id", () => {
        assert.equal(
            deck.getPackById(basePack.id).name,
            "CAH Base Set",
            "from object"
        );

        assert.equal(
            deck.getPackById(basePack.id | 0).name,
            "CAH Base Set",
            "number double check"
        );

        assert.equal(
            deck.getPackById(String(basePack.id)).name,
            "CAH Base Set",
            "string double check"
        );
    });

    it("counts are correct", () => {
        let jsonPack = null;
        for (let i = 0; i < deck.json.packs.length; i++) {
            if (deck.json.packs[i].name == "CAH Base Set") {
                jsonPack = deck.json.packs[i];
                break;
            }
        }

        const counts = basePack.counts();
        assert.equal(counts.black, jsonPack.black.length);
        assert.equal(counts.white, jsonPack.white.length);
    });

    it("summary is accurate", () => {
        const summary = basePack.summary();
        assert.isDefined(summary.id);
        assert.isDefined(summary.icon);
        assert.isDefined(summary.name);
        assert.isTrue(summary.official);
        assert.isDefined(summary.counts);
    });

    it("lists all packs", () => {
        const packs = deck.listPacks();
        assert.equal(packs.length, deck.json.packs.length);
    });
});

describe("cards", () => {
    let deck, basePack;

    before(async () => {
        deck = await new Deck("../cah-all-compact.json").loaded;
    });

    beforeEach(() => {
        basePack = deck.getPackByName("CAH Base Set");
    });

    it("returns full cards", () => {
        const whiteCard = basePack.white[0];
        assert.isDefined(whiteCard.text, "has text");
        assert.isDefined(whiteCard.packID, "has packID");

        const blackCard = basePack.black[0];
        assert.isDefined(blackCard.text, "has text");
        assert.isDefined(blackCard.pick, "has pick");
        assert.isDefined(blackCard.packID, "has packID");
    });

    it("returns no duplicates", () => {
        const whiteSet = new Set();
        basePack.white.forEach(({ text }) => {
            if (whiteSet.has(text)) {
                console.error(text);
            }
            whiteSet.add(text);
        });
        assert.equal(whiteSet.size, basePack.counts().white);

        const blackSet = new Set();
        basePack.black.forEach(({ text }) => {
            if (blackSet.has(text)) {
                console.error(text);
            }
            blackSet.add(text);
        });
        assert.equal(blackSet.size, basePack.counts().black);
    });

    it("add icon before lazy load", () => {
        assert.isUndefined(basePack.white[0].icon);
        basePack.setIcon("hello");
        assert.equal(basePack.white[0].icon, "hello");
    });

    it("add icon after lazy load", () => {
        basePack.setIcon("hello");
        assert.equal(basePack.white[0].icon, "hello");
    });
});

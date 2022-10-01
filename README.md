# JSON Against Humanity

Finally, [Cards Against Humanity](https://cardsagainsthumanity.com/) as plain text and JSON.

[CONTRIBUTING](./CONTRIBUTING.md)

## FAQ

**How many cards are there?** [Check the website](https://crhallberg.com/cah).

**What font is CAH?** Cards Against Humanity cards are in [Helvetica® Neue](https://www.myfonts.com/fonts/linotype/neue-helvetica/). It's not free. I use [Inter Medium](https://rsms.me/inter/).

**Are you associated with **\_\_**?** No. Only in my dreams.

**I'm just getting started and I have a lot of questions** You can reach me on Twitter as [@crhallberg](https://twitter.com/crhallberg). I'd love to hear from you! My DMs are open if privacy is a concern.

**Is this legal?** Yes. Cards Against Humanity is distributed under a [Creative Commons BY-NC-SA 4.0 license](https://creativecommons.org/licenses/by-nc-sa/4.0/). I think their website puts it best:

> We give you permission to use the Cards Against Humanity writing under a limited Creative Commons BY-NC-SA 4.0 license. That means you can use our writing if (and only if) you do all of these things:
> 1. Make your work available totally for free.
> 2. Share your work with others under the same Creative Commons license that we use.
> 3. Give us credit in your project.

If you have questions or paperwork that says otherwise, contact me, we can work this out.

## Compact JSON Format

```json
{
  "white": [
    "Answer cards in plain text, formatted with **Markdown**",
    "Vin Diesel"
  ],
  "black": [
    { "text": "_Prompt_ cards\nformatted with _.", "pick": 1 },
    { "text": "I want a _ **and** _ sandwich! No corners!", "pick": 2 }
  ],
  "packs": {
    "${abbr/key}": {
      "name": "The Base Set",
      "description": "Sweet dirty vanilla",
      "official": true,
      "white": [0, 1, 2, "indexes for every white card in this pack"],
      "black": [0, 1, 2, "indexes for every black card in this pack"]
    },
    "${abbr/key}": {},
    "${abbr/key}": {}
  }
}
```

## Full JSON Format

```json
{
  "${abbr/key}": {
    "name": "The Base Set",
    "description": "Sweet dirty vanilla",
    "official": true,
    "white": [
      {
        "text": "Answer cards in plain text, formatted with **Markdown**",
        "pack": "base"
      }
    ],
    "black": [
      {
        "text": "_Prompt_ cards\nformatted with _.",
        "pick": 1,
        "pack": "base"
      }
    ]
  },
  "${abbr/key}": {},
  "${abbr/key}": {}
}
```

## [CAHDeck.js](./web/CAHDeck.js)

I've written a simple JS library to make working with the compact file format easier. [Customize and download a compact deck](https://crhallberg.com/cah/) and load it into JS with it like so.

```js
// Load a deck downloaded from the website
const deck = Deck.fromFile("../cah-all-compact.json");

// List your packs
const packSummaries = deck.listPacks();
/**
 * [
 *   {
 *     id: 0,
 *     icon: "seagull",
 *     name: "CAH Base Set",
 *     official: true,
 *     counts: {
 *       white: 420,
 *       black: 39,
 *     },
 *   },
 *   ...
 * ]
 */

// Get your packs
const base = deck.getPackByName("CAH Base Set");
// or
const base = deck.getPackById(0);
// or

// Use your packs!
base.white[0] // { text: "Teaching a robot to love.", packID: 0, icon: "seagull" }
base.black[0] // { text: "What's that sound?", pick: 1, packID: 0, icon: "seagull" }
```

## Fine Print

The primary source is [this Google Sheet](https://docs.google.com/spreadsheet/ccc?key=0Ajv9fdKngBJ_dHFvZjBzZDBjTE16T3JwNC0tRlp6Wnc&usp=sharing#gid=55) I found through [Board Game Geek](https://boardgamegeek.com/). Previous sources included [Hangouts Against Humanity](https://github.com/samurailink3/hangouts-against-humanity), [Pretend You're Xyzzy](http://pyx-3.pretendyoure.xyz/zy/viewcards.jsp), and contributions from viewers like you.

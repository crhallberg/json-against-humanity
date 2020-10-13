# JSON Against Humanity

Finally, [Cards Against Humanity](https://cardsagainsthumanity.com/) as plain text and JSON.

[CONTRIBUTING](./CONTRIBUTING.md)

## File formats

### cah-all-compact.json

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

### Rehydrated with [CAHDeck.js](./web/CAHDeck.js)

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

## FAQ

**How many cards are there?** [Check the website](https://crhallberg/cah).

**What font is CAH?** Cards Against Humanity cards are in [Helvetica® Neue](https://www.myfonts.com/fonts/linotype/neue-helvetica/). It's not free. I use [Inter Medium](https://rsms.me/inter/).

**Are you associated with **\_\_**?** No. Only in my dreams.

**I'm just getting started and I have a lot of questions** You can reach me on Twitter as [@crhallberg](https://twitter.com/crhallberg). I'd love to hear from you! My DMs are open if privacy is a concern.

**Is this legal?** Yes. Cards Against Humanity is distributed under a [Creative Commons BY-NC-SA 4.0 license](https://creativecommons.org/licenses/by-nc-sa/4.0/). think their website puts it best:

> We give you permission to use the Cards Against Humanity writing under a limited Creative Commons BY-NC-SA 4.0 license. That means you can use our writing if (and only if) you do all of these things: 
  1. Make your work available totally for free.
  2. Share your work with others under the same Creative Commons license that we use.
  3. Give us credit in your project.

This project meets the share-alike standard with an updated Creative Commons license, the [CC BY-NC-SA 4.0 license](https://creativecommons.org/licenses/by-nc-sa/4.0/), as recommended by CC. If you have questions or paperwork that says otherwise, email me, we can work this out.

## Fine Print

The primary source is [this Google Sheet](https://docs.google.com/spreadsheet/ccc?key=0Ajv9fdKngBJ_dHFvZjBzZDBjTE16T3JwNC0tRlp6Wnc&usp=sharing#gid=55) I found through [Board Game Geek](https://boardgamegeek.com/). Previous sources included [Hangouts Against Humanity](https://github.com/samurailink3/hangouts-against-humanity), [Pretend You're Xyzzy](http://pyx-3.pretendyoure.xyz/zy/viewcards.jsp), and contributions from viewers like you.

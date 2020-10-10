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

**Is this legal?** Yes. Cards Against Humanity is distributed under a [Creative Commons BY-NC-SA 2.0 license](https://creativecommons.org/licenses/by-nc-sa/2.0/). think their website puts it best:

> Cards Against Humanity is available under a BY-NC-SA 2.0 Creative Commons license. That means you can use our content to make whatever, but you have to give us credit, you can’t profit from the use of our content (this means ad revenue is not allowed), and you have to share whatever you make in the same way we share it (this means you can’t submit our content to any app store). We own the name "Cards Against Humanity," so you have to call your crappy thing something else.

This project meets the share-alike standard with an updated Creative Commons license, the [CC BY-NC-SA 4.0 license](https://creativecommons.org/licenses/by-nc-sa/4.0/), as recommended by CC and allowed by their [similar license clause](https://creativecommons.org/share-your-work/licensing-considerations/compatible-licenses). If you have questions or paperwork that says otherwise, email me, we can work this out.

## Fine Print

Cards are sourced from [this spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0Ajv9fdKngBJ_dHFvZjBzZDBjTE16T3JwNC0tRlp6Wnc&usp=sharing#gid=55) I found through [Board Game Geek](https://boardgamegeek.com/) and formatted automatically. Additional decks come from coders like you.

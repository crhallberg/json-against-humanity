# JSON Against Humanity

Finally, [Cards Against Humanity](https://cardsagainsthumanity.com/) as plain text and JSON.

[CONTRIBUTING](./CONTRIBUTING.md)

## File formats

### compact.json

```json
{
  "white": ["Answer cards in plain text, formatted with **Markdown**"],
  "black": [
    { "text": "_Prompt_ cards\nformatted with _.", "pick": 1 },
    { "text": "I want a _ **and** _ sandwich! No corners!", "pick": 2 }
  ],
  "packs": {
    "abbreviation": {
      "name": "The Base Set",
      "description": "Sweet dirty vanilla",
      "official": true,
      "icon": "fa-a-font-awesome-icon or number",
      "white": [0, 1, 2, "indexes for every white card in this pack"],
      "black": [0, 1, 2, "indexes for every black card in this pack"]
    }
  }
}
```

### full.json

```json
{
  "base": {
    "name": "The Base Set",
    "description": "Sweet dirty vanilla",
    "official": true,
    "icon": "fa-base-set-example",
    "white": [
      {
        "text": "Answer cards in plain text, formatted with **Markdown**",
        "icon": "fa-base-set-example",
        "pack": "base"
      }
    ],
    "black": [
      {
        "text": "_Prompt_ cards\nformatted with _.",
        "pick": 1,
        "icon": "fa-base-set-example",
        "pack": "base"
      }
    ]
  },
  "pack2": {},
  "pack3": {}
}
```

## Fine Print

Please buy [Cards Against Humanity](https://cardsagainsthumanity.com/). They deserve your gross, germ-covered money more than you do.

Card sources, merged by hand and machine: [Hangouts Against Humanity](https://github.com/samurailink3/hangouts-against-humanity), [Pretend You're Xyzzy](http://pyx-3.pretendyoure.xyz/zy/viewcards.jsp) and [this spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0Ajv9fdKngBJ_dHFvZjBzZDBjTE16T3JwNC0tRlp6Wnc&usp=sharing#gid=55) I found through [Board Game Geek](https://boardgamegeek.com/).

## FAQ

**Is this legal?** Yes. Cards Against Humanity is distributed under a [Creative Commons BY-NC-SA 2.0 license](https://creativecommons.org/licenses/by-nc-sa/2.0/), and so is this website and all the data that comes out of it. That means you can use, remix, and share the game for free, but you can't sell it without permission. Consult [their FAQ](https://cardsagainsthumanity.com/#info) if you don't believe me. If you have paperwork that says otherwise, email me, we can work this out.

**What font is CAH?** Cards Against Humanity cards are in [Helvetica® Neue](https://www.myfonts.com/fonts/linotype/neue-helvetica/). It's not free. I use [Inter Medium](https://rsms.me/inter/).

**Are you associated with **\_\_**?** No. Only in my dreams.

**I'm just getting started and I have a lot of questions** You can reach me on Twitter as [@crhallberg](https://twitter.com/crhallberg). I'd love to hear from you! My DMs are open if privacy is a concern.

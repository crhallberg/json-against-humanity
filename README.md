> This project has been archived in favor of the [modernized fork](https://github.com/FireRat666/Json-Against-Humanity) by [@FireRat666](https://github.com/FireRat666/).
>
> For future updates and contributions, go to their [GitHub](https://github.com/FireRat666/Json-Against-Humanity) and [website](https://jah.firer.at/).

---

[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

# JSON Against Humanity

Finally, [Cards Against Humanity](https://cardsagainsthumanity.com/) as plain text and JSON.

## FAQ

### How many cards are there?

There are 31,700 cards available from 205 different packs and boxes.

- That's all 5,702 official cards from 71 different products
- Plus 25,998 even worse cards from fans around the world

### Wha— where the heck did you find all those cards??

The primary source is [this Google Sheet](https://docs.google.com/spreadsheet/ccc?key=0Ajv9fdKngBJ_dHFvZjBzZDBjTE16T3JwNC0tRlp6Wnc&usp=sharing#gid=55) I found through [Board Game Geek](https://boardgamegeek.com/). Previous sources included [Hangouts Against Humanity](https://github.com/samurailink3/hangouts-against-humanity), [Pretend You're Xyzzy](http://pyx-3.pretendyoure.xyz/zy/viewcards.jsp), and contributions from viewers like you.

### What font is CAH?

Cards Against Humanity® cards are printed in [Helvetica® Neue](https://www.myfonts.com/fonts/linotype/neue-helvetica/). It's not free. I use [Inter Medium](https://rsms.me/inter/). You're looking at it now.

### Who are you?

[Chris Hallberg](https://crhallberg.com).

### I'm just getting started and I have a lot of questions

You can reach me by [opening an Issue on GitHub](https://github.com/crhallberg/json-against-humanity/issues) or by email at chris.hallberg@hey.com. I'd love to hear from you!

### I have the best feature idea! Can you add this?

Sure! [Open a pull request](https://github.com/crhallberg/json-against-humanity/blob/latest/CONTRIBUTING.md).

### I want to give you money.

That's very nice of you but you legally can't. [More on that later](#fine-print). You should instead donate to [local community bail funds](https://secure.actblue.com/donate/bail_funds_george_floyd).

## File formats

### Plaintext

```
White, answer cards.
Putting a new card on each line.
Adding a divider after the white cards.
----------
I love it when my _ are in plaintext.
How are these cards styled?
Are **you** telling **me** that _these cards_ are styled with Markdown and _?
```

### full.json

```json
[
  {
    "name": "The Base Set",
    "description": "Sweet dirty vanilla",
    "official": true,
    "white": [
      {
        "text": "Answer cards in plain text, formatted with **Markdown**",
        "pack": 0
      }
    ],
    "black": [
      {
        "text": "_Prompt_ cards\nwith _ for blanks!",
        "pick": 1,
        "pack": {pack index}
      }
    ]
  },
  { "white": [ { "pack": 1 }, ... ], ... },
  { "white": [ { "pack": 2 }, ... ], ... }
]
```

### compact.json

I wrote a small library to take advantage of this concise format: [CAHDeck.js](https://github.com/crhallberg/json-against-humanity/blob/latest/web/CAHDeck.js).

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
      "white": [0, 1, 2, "indexes for every white card in this pack"],
      "black": [0, 1, 2, "indexes for every black card in this pack"]
    }
  }
}
```

## Examples

**[Canvas Deck Sampler](./examples/canvas).** Demonstration of ingesting the [cah-all-compact.json](https://github.com/crhallberg/json-against-humanity/blob/latest/cah-all-compact.json) file with the [basic Javascript library](https://github.com/crhallberg/json-against-humanity/blob/latest/web/CAHDeck.js) and displaying cards on a canvas element.

**[This Very Webpage](https://github.com/crhallberg/json-against-humanity/tree/latest/web).** [Ingesting from compact.json](https://github.com/crhallberg/json-against-humanity/blob/latest/web/site.js#L249-L253), listing decks, [combining selected decks](https://github.com/crhallberg/json-against-humanity/blob/latest/web/site.js#L178-L182), and [exporting files](https://github.com/crhallberg/json-against-humanity/blob/latest/web/site.js#L163-L174).

## Fine Print

### Is this legal?

Yes. Cards Against Humanity® is distributed under a [Creative Commons BY-NC-SA 4.0 license](https://creativecommons.org/licenses/by-nc-sa/4.0/). I think their website puts it best:

> We give you permission to use the Cards Against Humanity® writing under a limited Creative Commons BY-NC-SA 4.0 license. That means you can use our writing if (and only if) you do all of these things:
>
> 1.  Make your work available totally for free.
> 2.  Share your work with others under the same Creative Commons license that we use.
> 3.  Give us credit in your project.

If you have questions or paperwork that says otherwise, contact me, we can work this out.

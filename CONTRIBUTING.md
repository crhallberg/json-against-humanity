# Contributor Guide

I will be vigilant of Pull Requests, that is my prefered method of contribution. I'm willing to help as well! Open an issue with any concerns as well.

## Adding Decks

Make a directory in [src/](../src) with these files:
 - **metadata.json** - With the name, abbreviation, [icon](http://fontawesome.io/icons/ "Font Awesome"), description, and whether or not the pack is official
 - **black.md.txt** - One per line, `\\n` instead of `\n`, don't escape underscores (for now)
 - **white.md.txt** - ^^^

Run `python compile.py` to create `compact.md.json` and `full.md.json`.

## Contributing code

I am new to Python, this is a play project for me, so help me out!

### Dependencies

 - **Python** - I'm using 2.7.
 - [**markdownify**](https://github.com/matthewwithanm/python-markdownify) - for HTML to MD conversion ([unroll.py](../dev/unroll.py))

# TODO
- [ ] Fix hyphens (for phrases like half-elf)
- [ ] Fix blatant grammar mistakes
- [ ] Create `.html.json` files
- [ ] Create unittests
  - [ ] Setup
  - [ ] Test MD to HTML
    - [ ] Once this test passes, remove HTML files from src/

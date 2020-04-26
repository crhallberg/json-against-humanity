function comma(number) {
  return Number(number).toLocaleString();
}

function bindDeckBtns(decksEl) {
  decksEl.querySelectorAll(".deck-btn").forEach((btn) => {
    btn.addEventListener(
      "click",
      (e) => {
        btn.classList.toggle("is-checked");
      },
      false
    );
  });
}

function cardCounts(deck) {
  let packs = deck.listPacks();
  let totalCount = packs.reduce((sum, pack) => sum + pack.counts.total, 0);
  let html = `<p>There are ${comma(totalCount)} cards available from ${comma(
    packs.length
  )} different packs and boxes.</p>`;

  let official = packs.filter((pack) => pack.official);
  let officialCount = official.reduce(
    (sum, pack) => sum + pack.counts.total,
    0
  );
  html += `<ul><li>That's all ${comma(officialCount)} official cards from ${
    official.length
  } different products</li>`;

  let fanCount = packs.reduce(
    (sum, pack) => sum + (pack.official ? 0 : pack.counts.total),
    0
  );
  html += `<li>Plus ${comma(
    fanCount
  )} even worse cards from fans around the world</li></ul>`;

  document.getElementById("card-counts").innerHTML = html;
}

function deckCheckboxes(deck) {
  let packs = deck.listPacks();
  packs = packs.sort((a, b) => {
    if (a.abbr == "Base") {
      return -1;
    }
    if (b.abbr == "Base") {
      return 1;
    }
    if (a.official != b.official) {
      return a.official ? -1 : 1;
    }
    if (a.official) {
      return b.counts.total - a.counts.total;
    }
    return a.name < b.name ? -1 : 1;
  });

  let html = '<ul class="deck-list">';
  for (let pack of packs) {
    html += `<li class="deck">
      <button class="deck-btn" data-pack="${pack.abbr}"><i class="fa fa-fw fa-${pack.icon}"></i> ${pack.name}</button>
    </li>`;
  }

  let decksEl = document.getElementById("deck-list");
  decksEl.innerHTML = html + "</ul>";
  bindDeckBtns(decksEl);
}

let deck = CAHDeck.fromCompact("./compact.md.json").then((deck) => {
  cardCounts(deck);
  deckCheckboxes(deck);
});

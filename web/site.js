function comma(number) {
  return Number(number).toLocaleString();
}

let tallyEl;
let selectedDecks = new Set();
function tallySelected() {
  if (typeof tallyEl == "undefined") {
    tallyEl = document.getElementById("checkout-count");
  }
  let sum = 0;
  for (let abbr of selectedDecks) {
    sum += PACKLIST[abbr].counts.total;
  }
  switch (sum) {
    case 0:
      tallyEl.innerHTML = "f-ckin' nothin'";
      break;
    case 1:
      tallyEl.innerHTML = "a single, lonesome card";
      break;
    case 69:
      tallyEl.innerHTML = `${comma(sum)} cards. Nice`;
      break;
    default:
      tallyEl.innerHTML = `${comma(sum)} cards`;
  }
}

function bindPackBtns(contEl = document) {
  contEl.querySelectorAll(".deck-btn").forEach((btn) => {
    if (
      btn.classList.contains("is-checked") &&
      typeof btn.dataset.pack != "undefined"
    ) {
      selectedDecks.add(btn.dataset.pack);
    }
    btn.addEventListener(
      "click",
      (e) => {
        btn.classList.toggle("is-checked");
        if (typeof btn.dataset.pack != "undefined") {
          if (btn.classList.contains("is-checked")) {
            selectedDecks.add(btn.dataset.pack);
          } else {
            selectedDecks.delete(btn.dataset.pack);
          }
        }
        tallySelected();
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

let PACKLIST = {};
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
    PACKLIST[pack.abbr] = pack;
    html += `<li class="deck">
      <button class="deck-btn${
        pack.official ? " is-official is-checked" : ""
      }" data-pack="${pack.abbr}"><i class="deck-icon fa fa-fw fa-${
      pack.icon
    }"></i> ${pack.name}</button>
    </li>`;
  }

  let decksEl = document.getElementById("deck-list");
  decksEl.innerHTML = html + "</ul>";
  bindPackBtns(decksEl);
  tallySelected();
}

bindPackBtns();
let deck = CAHDeck.fromCompact("./compact.md.json").then((deck) => {
  cardCounts(deck);
  deckCheckboxes(deck);
});

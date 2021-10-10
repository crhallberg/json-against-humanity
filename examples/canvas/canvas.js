/* ====== DECK STUFF ====== */

function shuffle(arr) {
    // Random number instead of comparison
    arr.sort((a, b) => Math.random() - 0.5);
}
function addCards(btn) {
    let id = btn.dataset.pack;
    let pack = deck.getPackById(id);
    shuffle(pack.white);
    shuffle(pack.black);
    let cards = [...pack.white.slice(0, 12), ...pack.black.slice(0, 4)];
    let box = btn.getBoundingClientRect();
    let cx = box.left + box.width / 2;
    let cy = box.top + box.height / 2;
    cardSprites.push(...cards.map((card) => makeCard(card, cx, cy)));
    if (cardSprites.length > 200) {
        cardSprites = cardSprites.slice(50);
    }
}

function bindPackBtns(context) {
    context.querySelectorAll(".deck-btn").forEach((btn) => {
        btn.addEventListener(
            "click",
            function btnClick() {
                addCards(btn);
            },
            false
        );
    });
}

let deck;
function loadDecks(_deck) {
    deck = _deck;
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
            return b.counts.white - a.counts.white;
        }
        return a.name < b.name ? -1 : 1;
    });

    let html = "";
    for (let pack of packs) {
        html += `<li class="deck" role="none">
      <button class="deck-btn" data-pack="${pack.id}">
        ${pack.name}
      </button>
    </li>`;
    }

    let packsEl = document.getElementById("pack-list");
    packsEl.innerHTML = html;
    bindPackBtns(packsEl);
    loop();
}

Deck.fromFile(
    "https://raw.githubusercontent.com/crhallberg/json-against-humanity/latest/cah-all-compact.json"
).then(loadDecks);

/* ====== CANVAS ====== */

let cardSprites = [];
function updateCard(card, dt) {
    if (card.atRest) {
        return;
    }
    card.x += (dt * (card.tx - card.x)) / card.steps;
    card.y += (dt * (card.ty - card.y)) / card.steps;
    card.rot += (dt * (card.trot - card.rot)) / card.steps;
    // Ignore the Achilles Paradox at the end
    if (Math.abs(card.tx - card.x) < 2) {
        card.atRest = true;
    }
}

const cardWidth = 200,
    cardHeight = 300,
    cardPadding = 20,
    fontSize = 18;
const cardOffsetX = cardWidth / 2,
    cardOffsetY = cardHeight / 2,
    lineHeight = fontSize * 1.15;
function drawCard(card) {
    c.save();
    c.translate(card.x, card.y);
    c.rotate(card.rot);
    c.fillStyle = card.black ? "#000" : "#fff";
    c.strokeStyle = "#757575";
    c.fillRect(-cardOffsetX, -cardOffsetY, cardWidth, cardHeight);
    c.strokeRect(-cardOffsetX, -cardOffsetY, cardWidth, cardHeight);
    // Text
    c.fillStyle = card.black ? "#fff" : "#000";
    for (let i = 0; i < card.text.length; i++) {
        c.fillText(
            card.text[i],
            -cardOffsetX + cardPadding,
            -cardOffsetY + cardPadding + lineHeight * i
        );
    }
    c.restore();
}

// Split the text into lines that will fit on the card
function wrap(text) {
    let words = text.split(" ");
    let lines = [];
    let prev = words[0];
    let curr = words[0];
    for (let i = 1; i < words.length; i++) {
        curr += " " + words[i];
        let tm = c.measureText(curr);
        if (tm.width > cardWidth - cardPadding * 2 - 5) {
            lines.push(prev);
            curr = words[i];
        }
        prev = curr;
    }
    lines.push(curr);
    return lines;
}

/**
 * Make a new card object
 *
 * Starts off the leftside of the screen,
 * should pass thru the button.
 */
function makeCard(card, cx, cy) {
    let tx = (Math.random() * 0.7 + 0.3) * a.width;
    let ty = Math.random() * a.height;
    let angle = Math.atan2(ty - cy, tx - cx);
    let x = -200;
    return {
        steps: 240 + (Math.random() * 40 - 20),
        black: typeof card.pick != "undefined",
        text: wrap(card.text.replace(/_/g, "_____")),
        tx,
        ty,
        x,
        y: ty - (tx - x) * Math.sin(angle),
        rot: Math.random() * -Math.PI,
        trot: ((Math.random() * 2 - 1) * Math.PI) / 4,
    };
}

let a, c;
function initCanvas() {
    a = document.getElementById("a");
    a.width = a.offsetWidth;
    a.height = a.offsetHeight;
    c = a.getContext("2d");
    c.textAlign = "left";
    c.textBaseline = "top";
    c.font = `500 ${fontSize}px Inter`;
}
function update(dt) {
    for (let i = 0; i < cardSprites.length; i++) {
        updateCard(cardSprites[i], dt);
    }
}
function render() {
    c.clearRect(0, 0, a.width, a.height);
    for (let i = 0; i < cardSprites.length; i++) {
        drawCard(cardSprites[i]);
    }
}

/**
 * GameLoop borrowed from Kontra.js
 * https://github.com/straker/kontra/blob/master/src/gameLoop.js
 */
const performance = window.performance || Date;
let now,
    last = performance.now();
function loop() {
    requestAnimationFrame(loop);

    now = performance.now();
    const dt = now - last;
    last = now;

    // prevent updating the game with a very large dt if the game were to lose focus
    // and then regain focus later
    if (dt > 1e3) {
        return;
    }

    update(dt);
    render();
}

initCanvas();

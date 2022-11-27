const fs = require("fs");
const { google } = require("googleapis");
const { nanoid } = require("nanoid");
const {
    replace: { exoticChars: replaceExoticChars },
} = require("clean-text-utils");
const readline = require("readline");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.
fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    console.log("connecting to Google Sheets...");
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), saveCardsToJSON);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err)
                return console.error(
                    "Error while trying to retrieve access token",
                    err
                );
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log("Token stored to", TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

function normalizeName(name) {
    return name.replace("CAH :", "CAH:").trim();
}

let packMap = {};
function rangeToDeck({ values }) {
    let header = values.shift();
    if (header[0] == "Prompt Cards") {
        return values.map((row) => {
            let name = normalizeName(row[2]);
            if (!packMap[name]) {
                packMap[name] = {
                    id: nanoid(4),
                    official: !!row[3].match("CAH"),
                };
            }
            let picks = row[0].match(/_+/g);
            return [
                packMap[name].id,
                replaceExoticChars(row[0].replace(/_+/g, "_")),
                picks ? picks.length : row[0] == "Make a haiku." ? 3 : 1,
            ];
        });
    }
    return values.map((row) => {
        let name = normalizeName(row[1]);
        if (!packMap[name]) {
            packMap[name] = { id: nanoid(4), official: !!name.match("CAH") };
        }
        return [packMap[name].id, replaceExoticChars(row[0])];
    });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function saveCardsToJSON(auth) {
    console.log("getting ranges...");
    const sheets = google.sheets({ version: "v4", auth });
    sheets.spreadsheets.values.batchGet(
        {
            spreadsheetId: "1lsy7lIwBe-DWOi2PALZPf5DgXHx9MEvKfRw1GaWQkzg",
            ranges: ["Master Cards List!A:E", "Master Cards List!G:J"],
        },
        (err, ranges) => {
            if (err) return console.log("The API returned an error: " + err);
            console.log("parsing ranges...");
            let cards = ranges.data.valueRanges.map(rangeToDeck).flat();

            console.log("separating...");
            let packs = {};
            for (let name in packMap) {
                let pack = packMap[name];
                packs[pack.id] = {
                    name,
                    white: [],
                    black: [],
                    official: pack.official,
                };
            }

            let white = [];
            let black = [];
            let blackIndexes = [];
            let whiteIndexes = [];
            for (let card of cards) {
                if (!card[1]) {
                    continue;
                }
                const textLower = card[1].toLowerCase();
                if (card.length > 2) {
                    let index = blackIndexes.indexOf(textLower);
                    if (index === -1) {
                        black.push({
                            text: card[1],
                            pick: card[2],
                        });
                        index = blackIndexes.length;
                        blackIndexes.push(textLower);
                    }
                    packs[card[0]].black.push(index);
                } else {
                    let index = whiteIndexes.indexOf(textLower);
                    if (index === -1) {
                        white.push(card[1].trim());
                        index = blackIndexes.length;
                        whiteIndexes.push(textLower);
                    }
                    packs[card[0]].white.push(index);
                }
            }

            console.log(`saving... (${white.length} white, ${black.length} black)`);
            fs.writeFileSync(
                "../cah-all-compact.json",
                JSON.stringify({ white, black, packs: Object.values(packs) })
            );
        }
    );
}

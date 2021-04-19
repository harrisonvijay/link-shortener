const express = require("express");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 3000;
const hostURL = process.env.HOST_URL;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const LinkSchema = mongoose.Schema({
    full: String,
    short: String
});

const Link = mongoose.model("Link", LinkSchema);

const app = express();
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

app.get("/api/short", async (req, res) => {
    const full_link = req.query.link;
    const custom = req.query.custom;
    var short_link_id, foundLink;
    if (isValidHttpUrl(full_link)) {
        if (custom !== "") {
            if (custom.search("/") === -1) {
                foundLink = await Link.findOne({ short: custom });
                if (foundLink !== null) {
                    if (foundLink.full === full_link) {
                        res.send({ full_link: foundLink.full, short_link: hostURL + foundLink.short, error_msg: null });
                    } else {
                        res.send({ full_link: full_link, short_link: null, error_msg: "The custom path " + custom + " is unavailable." });
                    }
                } else {
                    short_link_id = custom;
                    const newLink = new Link({ full: full_link, short: short_link_id });
                    await newLink.save();
                    res.send({ full_link: full_link, short_link: hostURL + short_link_id, error_msg: null });
                }
            } else {
                res.send({ full_link: full_link, short_link: null, error_msg: "The custom path should not contain /" });
            }
        } else {
            foundLink = await Link.findOne({ full: full_link });
            if (foundLink !== null) {
                short_link_id = foundLink.short;
            } else {
                short_link_id = nanoid(9);
                const newLink = new Link({ full: full_link, short: short_link_id });
                await newLink.save();
            }
            res.send({ full_link: full_link, short_link: hostURL + short_link_id, error_msg: null });
        }
    }
    else {
        res.send({ full_link: full_link, short_link: null, error_msg: "The link is not valid" });
    }
});

app.get("/:short", async function (req, res) {
    const short = req.params.short;
    const foundLink = await Link.findOne({ short: short });
    if (foundLink !== null) {
        res.redirect(foundLink.full);
    } else {
        res.sendFile(__dirname + "/invalid-link.html");
    }
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});
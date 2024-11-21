const express = require("express");
const { Musician } = require("../models");
const app = express();

app.use(express.json());

app.get("/musicians/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const musician = await Musician.findByPk(id);
        if (musician) {
            res.json(musician);
        } else {
            res.status(404).json({ message: "Musician not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving musician", error });
    }
});

module.exports = app;


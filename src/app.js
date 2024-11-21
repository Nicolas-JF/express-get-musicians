const express = require("express");
const { Musician } = require("../models");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post("/musicians", async (req, res) => {
    const { name, instrument } = req.body;
    try {
        const newMusician = await Musician.create({ name, instrument });
        res.status(201).json(newMusician);
    } catch (error) {
        res.status(500).json({ message: "Error creating musician", error });
    }
});

app.put("/musicians/:id", async (req, res) => {
    const { id } = req.params;
    const { name, instrument } = req.body;
    try {
        const musician = await Musician.findByPk(id);
        if (musician) {
            musician.name = name;
            musician.instrument = instrument;
            await musician.save();
            res.json(musician);
        } else {
            res.status(404).json({ message: "Musician not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating musician", error });
    }
});

app.delete("/musicians/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const musician = await Musician.findByPk(id);
        if (musician) {
            await musician.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Musician not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting musician", error });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;



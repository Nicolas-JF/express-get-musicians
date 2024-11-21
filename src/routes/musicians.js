const express = require("express");
const { Musician } = require("../../models");

const router = express.Router();

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
    const { name, instrument } = req.body;
    try {
        const newMusician = await Musician.create({ name, instrument });
        res.status(201).json(newMusician);
    } catch (error) {
        res.status(500).json({ message: "Error creating musician", error });
    }
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;

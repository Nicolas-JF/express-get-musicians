const express = require("express");
const { Musician } = require("../models");

const app = express();
const port = 3000;

app.get("/musicians", async (req, res) => {
  try {
    const musicians = await Musician.findAll();
    res.json(musicians);
  } catch (error) {
    console.error("Error fetching musicians:", error);
    res.status(500).json({ message: "Error fetching musicians" });
  }
});


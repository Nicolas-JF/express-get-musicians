const express = require("express");
const musiciansRouter = require("./routes/musicians");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/musicians", musiciansRouter);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
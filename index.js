require("dotenv").config();
const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const app = express();
app.use(cors());
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("./db");
const User = require("./Models/User");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.post("/api/gameState", async (req, res) => {
  const { userId, nickname, board, score } = req.body;

  if (!userId || !board || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid request data" });
  }

  try {
    let game = await User.findOne({ userId });

    if (game) {
      game = await User.findOneAndUpdate(
        { userId },
        { nickname, board, score },
        { new: true },
      );
    } else {
      game = await User.create({ userId, nickname, board, score });
    }

    res.status(201).json(game);
  } catch (error) {
    console.error("Error while saving or updating game state:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/gameState/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const game = await User.findOne({ userId }).sort({ createdAt: -1 });
    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: "Game state not found" });
    }
  } catch (error) {
    console.error("Error fetching game state:", error);
    res.status(500).json({ error: error.message });
  }
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(8000, () => console.log(`Server running on port 8000`));

import express, { request, response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, ATLAS_URI } from "./config.js";
import { Game } from "./models/gameModel.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
  })
);

//Route to Save Game
app.post("/api/game", async (request, response) => {
  try {
    const { winner, rounds, status, playerOne, playerTwo } = request.body;

    if (!winner || !rounds || !playerOne || !playerTwo) {
      return response.status(400).send({
        message: "Please fill in all required fields!",
      });
    }

    await Game.updateMany({ status: "ongoing" }, { status: "completed" });
    const gameCount = await Game.countDocuments({}).exec();
    console.log(gameCount, "test");

    const newGame = {
      winner,
      game: gameCount + 1,
      rounds,
      status,
      playerOne,
      playerTwo,
    };

    const gameData = await Game.create(newGame);

    return response.status(201).send(gameData);
  } catch (e) {
    console.log(e.message);
    response.status(500).send({ message: e.message });
  }
});

app.post("/api/update-game", async (request, response) => {
  try {
    const { winner, rounds, status, playerOne, playerTwo, gameid } =
      request.body;

    if (!winner || !rounds || !playerOne || !playerTwo) {
      return response.status(400).send({
        message: "Please fill in all required fields!",
      });
    }

    await Game.findOneAndUpdate(
      { _id: gameid },
      { winner, rounds, status, playerOne, playerTwo }
    );

    return response.sendStatus(200);
  } catch (e) {
    console.log(e.message);
    response.status(500).send({ message: e.message });
  }
});

app.get("/api/histories", async (request, response) => {
  try {
    const histories = await Game.find({});
    return response.status(200).json({
      count: histories.length,
      data: histories,
    });
  } catch (e) {
    console.log(e.message);
    response.status(500).send({ message: e.message });
  }
});

app.get("/api/has-continue", async (request, response) => {
  try {
    const ongoing = await Game.find({
      status: "ongoing",
    });
    return response.status(200).json({
      data: ongoing,
    });
  } catch (e) {
    console.log(e.message);
    response.status(500).send({ message: e.message });
  }
});

mongoose
  .connect(ATLAS_URI)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

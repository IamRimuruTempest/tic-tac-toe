import mongoose from "mongoose";

const playerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  win: {
    type: Number,
    required: true,
  },
  draw: {
    type: Number,
    required: true,
  },
  loss: {
    type: Number,
    required: true,
  },
});

const gameSchema = mongoose.Schema(
  {
    winner: {
      type: String,
      required: true,
    },
    game: {
      type: Number,
      required: true,
    },
    rounds: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    playerOne: {
      type: playerSchema,
      required: true,
    },
    playerTwo: {
      type: playerSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Game = mongoose.model("Game", gameSchema);

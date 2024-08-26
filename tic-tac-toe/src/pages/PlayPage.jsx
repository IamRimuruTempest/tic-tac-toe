import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import mushroomGreen from "../assets/images/mushroom-green.png";
import mushroomRed from "../assets/images/mushroom-red.png";
import Tile from "../components/Tile";
import Winner from "../components/Winner";
import GameOver from "../components/GameOver";
import Name from "../components/Name";
import ModalLayout from "../layout/ModalLayout";
import PlayerStatus from "../components/PlayerStatus";
import { useSearchParams } from "react-router-dom";
import { api } from "../../config";

export default function PlayPage() {
  const [params] = useSearchParams();
  const isContinue = params.get("continue");

  const [tiles, setTiles] = useState(Array(9).fill(""));
  const [current, setCurrent] = useState(true);
  const [player, setPlayer] = useState(1);
  const [rounds, setRounds] = useState(1);
  const [winner, setWinner] = useState(null);
  const [count, setCount] = useState(0);
  const [draw, setDraw] = useState(false);
  // const [gameover, setGameover] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [gameid, setGameid] = useState();

  const navigate = useNavigate();

  const [playerOne, setPlayerOne] = useState({
    name: "",
    win: 0,
    draw: 0,
    loss: 0,
  });

  const [playerTwo, setPlayerTwo] = useState({
    name: "",
    win: 0,
    draw: 0,
    loss: 0,
  });

  const WINNING_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (tiles) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];
      if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
        return tiles[a];
      }
    }
    return null;
  };

  const checkForDraw = (tiles) => {
    return !tiles.includes("");
  };

  const resetGame = () => {
    setTiles(Array(9).fill(""));
    setWinner(null);
    setCurrent(true);
    setCount(0);
    setRounds((prev) => prev + 1);
    setDraw(false);
  };

  const gameOver = () => {
    // const navigate = useNavigate();
    resetGame();
    // setGameover(true);

    let progressInterval = 0;

    const winner = current ? playerTwo.name : playerOne.name;

    const data = {
      winner,
      rounds,
      status: "ongoing",
      playerOne,
      playerTwo,
    };

    setSaving(true);

    // console.log(data, "test");

    // navigate("/");

    if (!isContinue) {
      console.log("Add new");
      axios
        .post(`${api}/api/add-game`, data)
        .then(() => {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Update");
      axios
        .post(`${api}/api/update-game`, {
          ...data,
          gameid,
        })
        .then(() => {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((error) => console.log(error));
    }

    // setProgress(40);
    const interval = setInterval(() => {
      if (progressInterval < 100) {
        progressInterval += 1; // Increment progress
        setProgress(progressInterval);
      } else {
        clearInterval(interval); // Clear interval when done
      }
    }, 50); // Update every 50ms

    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  const insertName = (name) => {
    // console.log(player, "test");

    if (player === 1) {
      setPlayerOne((prev) => ({ ...prev, name: name }));
      setPlayer(2);
      // console.log(player);
    } else {
      setPlayerTwo((prev) => ({ ...prev, name: name }));
    }
  };

  useEffect(() => {
    if (isContinue) {
      // console.log("Hello, World!");

      axios
        .get(`${api}/api/has-continue`)
        .then((res) => {
          console.log(res.data.data);
          const [ongoing] = res.data.data;
          setRounds(ongoing.rounds + 1);
          setPlayerOne(ongoing.playerOne);
          setPlayerTwo(ongoing.playerTwo);
          setGameid(ongoing._id);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  useEffect(() => {
    if (winner) {
      console.log("wiineer", winner, current);
      if (!current) {
        setPlayerOne((prev) => ({ ...prev, win: prev.win + 1 }));
        setPlayerTwo((prev2) => ({ ...prev2, loss: prev2.loss + 1 }));
      } else {
        setPlayerTwo((prev) => ({ ...prev, win: prev.win + 1 }));
        setPlayerOne((prev2) => ({ ...prev2, loss: prev2.loss + 1 }));
      }
    }
  }, [winner]);

  const handleClick = (index) => {
    if (tiles[index] || winner) return;

    setTiles((prev) => {
      const newTiles = [...prev];
      newTiles[index] = current ? "x" : "o";

      const win = calculateWinner(newTiles);
      if (win) {
        setWinner(win);
      } else if (checkForDraw(newTiles)) {
        setDraw(true);
        setPlayerOne((prev) => ({ ...prev, draw: prev.draw++ }));
        setPlayerTwo((prev) => ({ ...prev, draw: prev.draw++ }));
      }

      return newTiles;
    });

    setCurrent((prev) => !prev);
    // setCount((prevCount) => prevCount + 1);
  };

  return (
    <MainLayout>
      <div className="w-full flex justify-center">
        <PlayerStatus
          player={playerOne}
          imgsrc={mushroomGreen}
          color="text-green-600"
        />
        <div className="w-auto flex justify-between flex-col">
          <h1 className="font-primaryRegular text-center text-sky-600 mb-10">
            Round {rounds}
          </h1>

          <div className="grid grid-cols-3 gap-2">
            {tiles.map((tile, index) => (
              <Tile
                key={index}
                id={index}
                tile={tile}
                current={current}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>

        <PlayerStatus
          player={playerTwo}
          imgsrc={mushroomRed}
          color="text-red-600"
        />

        {player === 1 && !isContinue && (
          <Name insertName={insertName} player="Player One" />
        )}

        {player === 2 && !playerTwo.name && (
          <Name insertName={insertName} player="Player Two" />
        )}

        {winner && (
          <Winner
            current={current}
            winner={current ? playerTwo.name : playerOne.name}
            resetGame={resetGame}
            gameOver={gameOver}
            draw={draw}
          />
        )}

        {draw && (
          <Winner
            current={current}
            winner="Draw"
            resetGame={resetGame}
            gameOver={gameOver}
            draw={draw}
          />
        )}

        {/* {gameover && (
          <GameOver
            playerOne={playerOne}
            playerTwo={playerTwo}
            draw={draw}
            gameOver={gameOver}
          />
        )} */}

        {saving && (
          <ModalLayout background="gray-800" opacity="75">
            <div className="w-1/2">
              <h1 className="text-white">Saving...</h1>
              <progress
                className="nes-progress is-pattern"
                value={progress}
                max="100"
              ></progress>
            </div>
          </ModalLayout>
        )}
      </div>
    </MainLayout>
  );
}

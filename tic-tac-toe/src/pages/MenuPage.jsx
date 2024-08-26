import MainLayout from "../layout/MainLayout";
import tictactoeLogo from "../assets/images/tictactoe-logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MenuPage() {
  const [ongoing, setOngoing] = useState();
  useEffect(() => {
    axios
      .get("https://tic-tac-toe-api-five.vercel.app/api/has-continue")
      .then((res) => {
        console.log(res.data.data);
        const isOngoing = res.data.data;
        setOngoing(isOngoing.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col text-center gap-10">
        {ongoing > 0 && (
          <Link
            to="/play?continue=true"
            className="font-primaryRegular hover:text-red-500"
          >
            Continue
          </Link>
        )}

        <Link to="/play" className="font-primaryRegular hover:text-red-500">
          New Game
        </Link>
        <Link to="/history" className="font-primaryRegular hover:text-red-500">
          History
        </Link>
      </div>
    </MainLayout>
  );
}

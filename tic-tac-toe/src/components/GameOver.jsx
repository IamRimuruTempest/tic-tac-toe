import ModalLayout from "../layout/ModalLayout";
import { Link } from "react-router-dom";
import mario from "../assets/images/mario-cartoon.png";
import luigi from "../assets/images/luigi-cartoon.png";

export default function GameOver({ playerOne, playerTwo }) {
  const isDraw = playerOne.win === playerTwo.win;

  const winner = isDraw
    ? "Draw"
    : playerOne.win > playerTwo.win
    ? playerOne.name
    : playerTwo.name;

  const icon = winner === playerOne.name ? luigi : mario;

  return (
    <ModalLayout background="gray-800" opacity="75">
      <div className="flex justify-center">
        {isDraw ? (
          <div className="flex gap-5 flex-row">
            <img src={mario} className="w-52" alt="super mario" />
            <img src={luigi} className="w-52" alt="luigi" />
          </div>
        ) : (
          <img src={icon} className="w-52" alt={winner} />
        )}
      </div>
      <h1 className="text-white font-titleRegular text-5xl">{winner}</h1>

      {!isDraw && <h1 className="text-white">The Tic-tac-toe champion!</h1>}

      <Link to="/" className="nes-btn">
        Ok
      </Link>
    </ModalLayout>
  );
}

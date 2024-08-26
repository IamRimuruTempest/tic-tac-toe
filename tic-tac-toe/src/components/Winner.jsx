import mario from "../assets/images/super-mario.png";
import luigi from "../assets/images/luigi.png";
import ModalLayout from "../layout/ModalLayout";
import Button from "./Button";

export default function Winner({ current, winner, resetGame, gameOver, draw }) {
  const icon = current ? mario : luigi;
  const message = draw ? "Draw" : `${winner}, wins the game!`;
  return (
    <ModalLayout background="gray-800" opacity="75">
      <div className="flex justify-center">
        {draw ? (
          <div className="flex gap-5 flex-row">
            <img src={mario} className="w-32" alt="super mario" />
            <img src={luigi} className="w-32" alt="luigi" />
          </div>
        ) : (
          <img
            src={icon}
            className="w-32"
            alt={current ? "super mario" : "luigi"}
          />
        )}
      </div>
      <h1 className="text-white"> {message}</h1>

      <div className=" px-4 py-3 gap-4 sm:flex  sm:px-6">
        <Button name="Continue" type="primary" handleClick={resetGame} />

        <Button name="Game Over" type="warning" handleClick={gameOver} />
      </div>
    </ModalLayout>
  );
}

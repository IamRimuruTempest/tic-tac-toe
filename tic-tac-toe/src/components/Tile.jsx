import mushroomGreen from "../assets/images/mushroom-green.png";
import mushroomRed from "../assets/images/mushroom-red.png";

export default function Tile({ id, tile, onClick }) {
  let icon = null;

  if (tile === "x") {
    icon = <img src={mushroomGreen} />;
  } else if (tile === "o") {
    icon = <img src={mushroomRed} />;
  }

  return (
    <>
      <div
        id={id}
        className="bg-white h-32 w-32 text-center text-4xl border-solid border-2 border-green-600  p-3"
        onClick={onClick}
      >
        {icon}
      </div>
    </>
  );
}

export default function PlayerStatus({ player, imgsrc, color }) {
  return (
    <div
      className={`w-1/4 flex flex-col  justify-center text-center font-primaryRegular gap-5 ${color}`}
    >
      <img src={imgsrc} className="w-12 mx-auto" alt={player.name} />
      <h1>{player.name}</h1>
      <h1>Win(s) : {player.win}</h1>
      <h1>Loss(es) : {player.loss}</h1>
      <h1>Draw(s) : {player.draw}</h1>
    </div>
  );
}

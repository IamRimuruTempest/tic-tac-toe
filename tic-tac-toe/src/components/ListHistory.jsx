import moment from "moment";

export default function ListHistory({ histories }) {
  return (
    <>
      {histories.map((history, index) => (
        <tr key={index}>
          <td className="px-6 py-4 whitespace-nowrap">{history.game}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            {" "}
            {history.playerOne.win === history.playerTwo.win
              ? `${history.playerOne.name} & ${history.playerTwo.name}`
              : history.winner}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-center">
            {history.rounds}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-center">
            {history.winner === history.playerOne.name
              ? `${history.playerOne.win}-${history.playerTwo.win}`
              : `${history.playerTwo.win}-${history.playerOne.win}`}
          </td>

          <td className="px-6 py-4 whitespace-nowrap text-center">
            {history.playerOne.draw}
          </td>

          <td className="px-6 py-4 whitespace-nowrap">
            {moment(history.createdAt).format("MMM D, YYYY")}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-end">
            {moment(history.createdAt).format("h:mm A")}
          </td>
        </tr>
      ))}
    </>
  );
}

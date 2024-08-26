import MainLayout from "../layout/MainLayout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

export default function HistoryPage() {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    axios
      .get(`${api}/api/histories`)
      .then((res) => {
        setHistories(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <MainLayout>
      <div className="flex justify-center text-left font-primaryRegular">
        <div className="flex flex-col gap-10">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-black ">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start font-normal"
                      >
                        Game
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start font-normal"
                      >
                        Winner
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start font-normal"
                      >
                        Rounds
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start font-normal"
                      >
                        Score
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-start font-normal"
                      >
                        Date
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-end font-normal"
                      >
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {histories.map((history, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {history.game}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {history.winner}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {history.rounds}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {history.winner === history.playerOne.name
                            ? `${history.playerOne.win}-${history.playerTwo.win}`
                            : `${history.playerTwo.win}-${history.playerOne.win}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {moment(history.createdAt).format("MMM D, YYYY")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end">
                          {moment(history.createdAt).format("h:mm A")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Link to="/" className="text-red-600">
              Menu
            </Link>
            <Link to="/play" className="text-red-600">
              Play
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

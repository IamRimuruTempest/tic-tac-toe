import MainLayout from "../layout/MainLayout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { api } from "../../config";
import ListHistory from "../components/ListHistory";

export default function HistoryPage() {
  const [histories, setHistories] = useState([]);
  const [count, setCount] = useState();

  useEffect(() => {
    axios
      .get(`${api}/api/histories`)
      .then((res) => {
        setHistories(res.data.data);
        setCount(res.data.count);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <MainLayout>
      <div className="flex justify-center text-left font-primaryRegular">
        <div className="flex flex-col gap-5">
          {count > 1 ? (
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="h-64 scrollbar-hide">
                  <table className="min-w-full  divide-y divide-black ">
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
                      <ListHistory histories={histories} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div class="nes-container is-rounded">
              <p>
                Good day! There's no history yet. Play the game to get started!
              </p>
            </div>
          )}

          <div className="flex align-center">
            <Link to="/" className="nes-btn is-primary">
              Menu
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

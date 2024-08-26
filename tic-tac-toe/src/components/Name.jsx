import { useState } from "react";
import { Link } from "react-router-dom";
import ModalLayout from "../layout/ModalLayout";
import Button from "../components/Button";
import Input from "./Input";
import mario from "../assets/images/mario-cartoon.png";
import luigi from "../assets/images/luigi-cartoon.png";

export default function Name({ insertName, player }) {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);

    // console.log(name, "test");
  };

  const handleClick = () => {
    if (name) {
      insertName(name);
    }
  };

  return (
    <ModalLayout background="white" opacity="50">
      <div className="">
        {/* <img src={mario} className="w-32" alt="super mario" /> */}
        <div className="nes-container is-dark with-title">
          <p className="title"> {player}</p>
          <p>Good day! Please enter your name to get started.</p>
          <div className="flex gap-4">
            <Input
              value={name}
              handleChange={handleChange}
              placeholder="Enter your name..."
            />

            <div className="flex">
              <Button name="Save" type="primary" handleClick={handleClick} />
              <Link to="/" className="nes-btn is-warning">
                Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}

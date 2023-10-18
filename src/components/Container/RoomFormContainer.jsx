import React, { useState } from "react";
import RoomFormView from "../view/RoomFormView";

const RoomFormContainer = () => {
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([number, price, state, description].includes("")) {
      setError(true);
      return;
    }

    const roomData = { number, price, state, description };

    fetch("http://localhost:8080/api/room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roomData),
    })
      .then(() => {
        console.log("New Habitacion added");
        setSuccessMessage("Habitación agregada con éxito");
        setTimeout(() => {
          setSuccessMessage("");
          window.location.reload();
        }, 2000);
        setNumber("");
        setPrice("");
        setState("");
        setDescription("");
        
      })
      .catch((error) => {
        console.error("Error adding new room:", error);
      });

    setError(false);
  };

  return (
    <RoomFormView
      number={number}
      price={price}
      state={state}
      description={description}
      error={error}
      successMessage={successMessage}
      onChangeNumber={(e) => setNumber(e.target.value)}
      onChangePrice={(e) => setPrice(e.target.value)}
      onChangeState={(e) => setState(e.target.value)}
      onChangeDescription={(e) => setDescription(e.target.value)}
      onSubmit={handleSubmit}
    />
  );
};

export default RoomFormContainer;

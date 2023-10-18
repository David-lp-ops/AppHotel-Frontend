import React, { useState, useEffect } from "react";
import ReservationFormView from "../view/ReservationFromView";

const ReservationFormContainer = () => {
  const apiUrl = "http://localhost:8080/api";
  const [nameClient, setNameClient] = useState("");
  const [dateReservation, setDateReservation] = useState("");
  const [state, setState] = useState("");
  const [idRoom, setIdRoom] = useState("");
  const [roomOptions, setRoomOptions] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchRoomOptions();
  }, []);

  const fetchRoomOptions = async () => {
    try {
      const response = await fetch(`${apiUrl}/room`);
      const data = await response.json();
      setRoomOptions(data.content);
    } catch (error) {
      console.error("Error fetching room options:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nameClient, dateReservation, state, idRoom].includes("")) {
      setError(true);
      return;
    }

    setError(false);

    try {
      const createReservationResponse = await fetch(`${apiUrl}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameClient,
          dateReservation,
          state,
        }),
      });

      if (!createReservationResponse.ok) {
        console.error("Error creating reservation");
        return;
      }

      const createdReservation = await createReservationResponse.json();
      const reservationId = createdReservation.id;

      const assignRoomUrl = `${apiUrl}/reservations/${reservationId}/assign/${idRoom}`;

      await fetch(assignRoomUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      console.log("Room assigned to reservation successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error handling reservation submission:", error);
    }
  };

  return (
    <ReservationFormView
      nameClient={nameClient}
      dateReservation={dateReservation}
      state={state}
      idRoom={idRoom}
      roomOptions={roomOptions}
      error={error}
      onChangeName={(e) => setNameClient(e.target.value)}
      onChangeDate={(e) => setDateReservation(e.target.value)}
      onChangeState={(e) => setState(e.target.value)}
      onChangeRoom={(e) => setIdRoom(e.target.value)}
      onSubmit={handleSubmit}
    />
  );
};

export default ReservationFormContainer;

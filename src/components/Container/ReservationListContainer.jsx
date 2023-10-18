import React, { useState, useEffect } from "react";
import ReservationListView from "../view/ReservationListView";

const ReservationListContainer = () => {
  const apiUrl = "http://localhost:8080/api/reservations";
  const [reservations, setReservations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedReservation, setEditedReservation] = useState({
    nameClient: "",
    dateReservation: "",
    state: "",
  });

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setReservations(data.content);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const confirmDeletion = (id) => {
    return window.confirm("¿Estás seguro de que quieres eliminar esta reserva?");
  };

  const deleteReservation = async (id) => {
    if (confirmDeletion(id)) {
      try {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        updateReservationsAfterDeletion(id);
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
    }
  };

  const updateReservationsAfterDeletion = (id) => {
    setReservations((prevReservations) =>
      prevReservations.filter((reservation) => reservation.id !== id)
    );
    clearEditingState();
  };

  const editReservation = (reservation) => {
    setEditingId(reservation.id);
    setEditedReservation(reservation);
  };

  const cancelEditing = () => {
    clearEditingState();
  };

  const saveEditedReservation = async () => {
    try {
      await fetch(`${apiUrl}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedReservation),
      });
      updateReservationsAfterEdit();
    } catch (error) {
      console.error("Error editing reservation:", error);
    }
  };

  const updateReservationsAfterEdit = () => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === editingId
          ? { ...reservation, ...editedReservation }
          : reservation
      )
    );
    clearEditingState();
  };

  const clearEditingState = () => {
    setEditingId(null);
    setEditedReservation({
      nameClient: "",
      dateReservation: "",
      state: "",
    });
  };

  return (
    <ReservationListView
      reservations={reservations}
      editingId={editingId}
      editedReservation={editedReservation}
      onDelete={deleteReservation}
      onEdit={editReservation}
      onCancelEdit={cancelEditing}
      onSaveEdit={saveEditedReservation}
      onFieldChange={(field, value) => {
        setEditedReservation((prev) => ({ ...prev, [field]: value }));
      }}
    />
  );
};

export default ReservationListContainer;

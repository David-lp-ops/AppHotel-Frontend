import React from "react";

const EditReservationFields = ({
  editedReservation,
  onFieldChange,
  handleCancel,
  handleSave,
}) => (
  <div>
    <label htmlFor="editedNameClient">Nombre de cliente:</label>
    <input
      id="editedNameClient"
      type="text"
      value={editedReservation.nameClient}
      onChange={(e) => onFieldChange("nameClient", e.target.value)}
      className="w-full border-2 p-2 mt-3 rounded-lg"
    />
    <label htmlFor="editedDateReservation">Fecha de Reservacion:</label>
    <input
      id="editedDateReservation"
      type="date"
      value={editedReservation.dateReservation}
      onChange={(e) => onFieldChange("dateReservation", e.target.value)}
      className="w-full border-2 p-2 mt-3 rounded-lg"
    />
    <label htmlFor="editedState">Estado:</label>
    <input
      id="editedState"
      type="text"
      value={editedReservation.state}
      onChange={(e) => onFieldChange("state", e.target.value)}
      className="w-full border-2 p-2 mt-3 rounded-lg"
    />
    <div className="flex justify-end mt-3">
      <button
        onClick={handleCancel}
        className="bg-gray-500 hover-bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
      >
        Cancelar
      </button>
      <button
        onClick={handleSave}
        className="bg-indigo-500 hover-bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"
      >
        Guardar
      </button>
    </div>
  </div>
);

const NonEditableReservationFields = ({ reservation, onEdit, onDelete }) => (
  <div>
    <p className="font-bold mb-3 text-gray-700">
      Nombre Cliente: <span className="font-normal normal-case mr-10">{reservation.nameClient}</span>
    </p>
    <p className="font-bold mb-3 text-gray-700">
      Fecha de Reservacion: <span className="font-normal normal-case mr-10">{reservation.dateReservation}</span>
    </p>
    <p className="font-bold mb-3 text-gray-700">
      Estado: <span className="font-normal normal-case mr-10">{reservation.state}</span>
    </p>
    <div className="flex justify-between mt-10">
      <button
        type="button"
        className="py-2 px-10 bg-indigo-600 hover-bg-indigo-700 text-white font-bold rounded-full"
        onClick={() => onEdit(reservation)}
      >
        Editar
      </button>
      <button
        type="button"
        className="py-2 px-10 bg-red-600 hover-bg-red-700 text-white font-bold rounded-full"
        onClick={() => onDelete(reservation.id)}
      >
        Eliminar
      </button>
    </div>
  </div>
);

const ReservationListView = ({
  reservations,
  editingId,
  editedReservation,
  onDelete,
  onEdit,
  onCancelEdit,
  onSaveEdit,
  onFieldChange,
}) => (
  <>
    {reservations.length ? (
      <div className="md:w-1/2 lg:w-3/5">
        <h2 className="font-black text-center text-3xl text-violet-500">
          Listado de Reservaciones realizadas
        </h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Administra tus{" "}
          <span className="text-indigo-600 font-bold">Reservaciones</span>
        </p>
        <div className="md:h-screen overflow-y-scroll">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className={`mx-5 mb-5 bg-white shadow-md px-5 py-10 rounded-xl ${
                editingId === reservation.id ? "border-2 border-indigo-500" : ""
              }`}
            >
              {editingId === reservation.id ? (
                <EditReservationFields
                  editedReservation={editedReservation}
                  onFieldChange={onFieldChange}
                  handleCancel={onCancelEdit}
                  handleSave={onSaveEdit}
                />
              ) : (
                <NonEditableReservationFields
                  reservation={reservation}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div>
        <h2 className="font-black text-center text-3xl text-violet-500">
          No hay reservaciones
        </h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Comienza agregando reservaciones{" "}
          <span className="text-indigo-600 font-bold">
            y aparecerán en este lugar
          </span>
        </p>
      </div>
    )}
  </>
);

export default ReservationListView;

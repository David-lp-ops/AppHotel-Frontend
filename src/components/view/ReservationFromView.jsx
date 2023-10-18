import React from "react";
import Error from "../Error";

const ReservationFormView = ({
  nameClient,
  dateReservation,
  state,
  idRoom,
  roomOptions,
  error,
  onChangeName,
  onChangeDate,
  onChangeState,
  onChangeRoom,
  onSubmit,
}) => (
  <div className="md:w-1/2 lg:w-2/5 mx-5 mb-4">
    <h2 className="font-black text-center text-3xl text-violet-500">
      Reservaciones
    </h2>
    <p className="text-lg mt-5 text-center mb-10">
      Añade Reservaciones y{" "}
      <span className="text-indigo-600 font-bold">Adminístralos</span>
    </p>
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-xl rounded-xl py-10 px-5  "
    >
      {error && <Error><p>Todos los campos son obligatorios</p></Error>}

      <div className="mb-5">
        <label htmlFor="nameClient" className="block text-sm font-medium text-gray-500">
          Nombre de cliente
        </label>
        <input
          id="nameClient"
          className="border-2 w-full p-2 mt-3 rounded-lg"
          type="text"
          placeholder="Nombre de cliente"
          value={nameClient}
          onChange={onChangeName}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="state" className="block text-sm font-medium text-gray-500">
          Estado
        </label>
        <input
          id="state"
          className="border-2 w-full p-2 mt-3 rounded-lg"
          type="text"
          placeholder="Estado"
          value={state}
          onChange={onChangeState}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="idRoom" className="block text-sm font-medium text-gray-500">
          Selecciona el numero de Habitacion
        </label>
        <select
          id="idRoom"
          className="border-2 w-full p-2 mt-3 rounded-lg text-black"
          style={{ color: 'black' }}
          value={idRoom}
          onChange={onChangeRoom}
        >
          <option value="" disabled>Selecciona el numero de habitacion</option>
          {roomOptions.map((room) => (
            <option key={room.id} value={room.id}>{room.number}</option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="dateReservation" className="block text-sm font-medium text-gray-500">
          Fecha de Reservacion
        </label>
        <input
          id="dateReservation"
          className="border-2 w-full p-2 mt-3 rounded-lg"
          type="date"
          value={dateReservation}
          onChange={onChangeDate}
        />
      </div>

      <input
        type="submit"
        className="bg-violet-500 hover:bg-violet-700 hover:ring hover:ring-violet-300  text-white font-bold  w-full py-2 px-4 rounded-lg cursor-pointer shadow-md"
        value={'Agregar Reservacion'}
      />
    </form>
  </div>
);

export default ReservationFormView;

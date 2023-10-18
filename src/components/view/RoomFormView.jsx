import React from "react";
import Error from "../Error";

const SuccessMessage = ({ children }) => (
  <div className="bg-green-200 border-green-600 text-green-600 border-l-4 p-4 mb-4">
    {children}
  </div>
);

const RoomFormView = ({
  number,
  price,
  state,
  description,
  error,
  successMessage,
  onChangeNumber,
  onChangePrice,
  onChangeState,
  onChangeDescription,
  onSubmit,
}) => (
  <div className="md:w-1/2 lg:w-2/5 mx-5 mb-4">
    <h2 className="font-black text-center text-3xl text-violet-500">
      Crea las Habitaciones
    </h2>
    <p className="text-lg mt-5 text-center mb-10">Añade Habitaciones</p>
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-xl rounded-xl py-10 px-5  "
    >
      {error && <Error><p>Todos los campos son obligatorios</p></Error>}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

      <div className="mb-5">
        <label htmlFor="number" className="block text-sm font-medium text-gray-500 ">
          Numero de Habitacion
        </label>
        <input
          id="number"
          className="border-2 w-full p-2 mt-3 rounded-lg"
          type="text"
          placeholder="Numero de Habitacion"
          value={number}
          onChange={onChangeNumber}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="state" className="block text-sm font-medium text-gray-500 ">
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
        <label htmlFor="price" className="block text-sm font-medium text-gray-500">
          Precio de la habitacion
        </label>
        <input
          id="price"
          className="border-2 w-full p-2 mt-3 rounded-lg"
          type="text"
          value={price}
          onChange={onChangePrice}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="description" className="block text-sm font-medium text-gray-500">
          Descripcion de la Habitacion
        </label>
        <input
          id="description"
          className="border-2 w-full p-2 mt-3 rounded-lg"
          type="textarea"
          value={description}
          onChange={onChangeDescription}
        />
      </div>

      <input
        type="submit"
        className="bg-violet-500 hover:bg-violet-700 hover:ring hover:ring-violet-300  text-white font-bold  w-full py-2 px-4 rounded-lg cursor-pointer shadow-md"
        value={"Agregar Habitacion"}
      />
    </form>
  </div>
);

export default RoomFormView;

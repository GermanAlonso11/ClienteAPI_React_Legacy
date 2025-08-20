import React, { useEffect, useState, Fragment } from "react";

//Importar cliente axios
import clienteAxios from "../../config/axios";

//Importar componente Cliente
import Cliente from "./Cliente";

//Importar link de react-router-dom
import { Link } from "react-router-dom";

function Clientes() {
  //State para almacenar los clientes
  //clientes = state, guardarClientes = funcion para guardar el state
  const [clientes, guardarClientes] = useState([]);

  const consultarAPI = async () => {
    const clientes = await clienteAxios.get("/clientes");
    // console.log(clientes.data);

    //Colocar el estado en el state
    guardarClientes(clientes.data);
  };

  //Use effect para consultar la API
  useEffect(() => {
    //Llamar a la función
    consultarAPI();
  }, [clientes]);

  return (
    <Fragment>
      <h2>Clientes</h2>

      <Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente">
        {" "}
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul className="listado-clientes">
        {clientes.map((cliente) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </Fragment>
  );
}

export default Clientes;

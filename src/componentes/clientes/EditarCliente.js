import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

function EditarCliente() {
    //Obtenemos el id del cliente
    const { id } = useParams(); 

    //State para el formulario
    //cliente = state, guardarCliente = funcion para guardar el state
    //Inicializar el state
    const [cliente, datosCliente] = useState({
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        telefono: ""
    });

    //Query a la API
    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

        //Colocar los datos del cliente en el state
        datosCliente(clienteConsulta.data);
    }


    //Use effect cuando el componente carga
    useEffect(() => {
        consultarAPI();
    }, []);




    //Leer los datos del formulario y colocarlos en el state
    const actualizarState = e => {
        //Almacenar lo que el usuario escribe en el state
        datosCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });
        //Imprimir el state
        //  console.log(cliente);

    }

    //Validar el formulario
    const validarCliente = () => {
        //Destructuring
        const { nombre, apellido, empresa, email, telefono } = cliente;

        //Revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;

        //Retornar true o false
        return valido;
    }


    

  return(
  <Fragment>
    <h2>Editar Cliente</h2>
    <form>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Cliente" 
                            name="nombre"
                            onChange={actualizarState}
                            value={cliente.nombre || ""}  
                            />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text" 
                            placeholder="Apellido Cliente" 
                            name="apellido"
                            onChange={actualizarState}
                            value={cliente.apellido || ""}  
                            />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                            placeholder="Empresa Cliente" 
                            name="empresa"
                            onChange={actualizarState}
                            value={cliente.apellido || ""} 
                            />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                            placeholder="Email Cliente" 
                            name="email"
                            onChange={actualizarState}
                            value={cliente.apellido || ""} 
                            />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" 
                            placeholder="Teléfono Cliente" 
                            name="telefono"
                            onChange={actualizarState}
                            value={cliente.apellido || ""} 
                            />
                </div>

                <div className="enviar">
                        <input  type="submit" 
                                className="btn btn-azul" 
                                value="Guardar Cambios"
                                disabled={validarCliente() }
                                />
                </div>

            </form>

  </Fragment>
  )
}

export default EditarCliente;

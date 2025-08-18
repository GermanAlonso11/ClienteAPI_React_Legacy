import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

function EditarCliente() {
    //Obtenemos el id del cliente
    const { id } = useParams(); 

    //State para el formulario
    //cliente = state, guardarCliente = funcion para guardar el state
    //Inicializar el state
    const [cliente, guardarCliente] = useState({
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        telefono: ""
    });

    //Leer los datos del formulario y colocarlos en el state
    const actualizarState = e => {
        //Almacenar lo que el usuario escribe en el state
        guardarCliente({
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
    <h2>Nuevo Cliente</h2>
    <form>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                            placeholder="Nombre Cliente" 
                            name="nombre"
                            onChange={actualizarState}
                            />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input  type="text" 
                            placeholder="Apellido Cliente" 
                            name="apellido"
                            onChange={actualizarState}
                            />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                            placeholder="Empresa Cliente" 
                            name="empresa"
                            onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                            placeholder="Email Cliente" 
                            name="email"
                            onChange={actualizarState}/>
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel" 
                            placeholder="Teléfono Cliente" 
                            name="telefono"
                            onChange={actualizarState}/>
                </div>

                <div className="enviar">
                        <input  type="submit" 
                                className="btn btn-azul" 
                                value="Agregar Cliente"
                                disabled={validarCliente() }
                                />
                </div>

            </form>

  </Fragment>
  )
}

export default EditarCliente;

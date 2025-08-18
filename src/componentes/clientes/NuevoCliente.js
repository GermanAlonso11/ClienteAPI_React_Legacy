import React, { Fragment, useState } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
//Importar withrouter
 import { withRouter } from "react-router-dom"; // No es necesario en React Router v6

function NuevoCliente({ history }) {
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

    //Agregar cliente
const agregarCliente = e => {
    e.preventDefault();

    //Enviar petición a axios
    clienteAxios.post('/clientes', cliente)
        .then(respuesta => {
            // Éxito al crear el cliente
            console.log("Se agregó un nuevo cliente");
            Swal.fire(
                'Cliente Creado',
                'El cliente se creó correctamente',
                'success'
            );
        }
            //Redireccionar al usuario
            , history.push('/') // No es necesario en React Router v6, usar navigate en su lugar
    
    )
        .catch(error => {
            // Manejar errores
            if (error.response || error.response.data || error.response.data.code === 11000) {
                console.log("Ese cliente ya está registrado");
                Swal.fire({
                    icon: 'error',  // Cambiado de 'type' a 'icon' (versiones actuales de SweetAlert)
                    title: 'Error',
                    text: 'Ese cliente ya está registrado'
                });
            } else {
                console.log("Error desconocido:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al registrar el cliente'
                });
            }
        });
}
    

  return(
  <Fragment>
    <h2>Nuevo Cliente</h2>
    <form onSubmit={agregarCliente}>
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

export default withRouter(NuevoCliente);

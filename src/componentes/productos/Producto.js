import React from "react";
import { Link } from "react-router-dom";
//Importar sweetalert
import swal from "sweetalert";
//Importar axios
import clienteAxios from "../../config/axios";

function Producto({ producto }) {
  const { _id, nombre, precio, imagen } = producto;

  //Elimina un producto
  const eliminarProducto = (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar este producto?"
    );
    if (confirmar) {
      //Alerta sweetalert
      swal({
        title: "¿Estás seguro?",
        text: "Una vez eliminado, no podrás recuperar este producto",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          //Eliminado y alerta de borrado exitoso
          swal("¡Producto eliminado!", {
            text: res.data.mensaje,
            icon: "success",
          });
          //Llamar a la api y eliminar
          clienteAxios
            .delete(`/productos/${id}`)
            .then((res) => {
              console.log(res);
              // Eliminar el producto del state
              guardarProductos(
                productos.filter((producto) => producto._id !== id)
              );
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  };

  return (
    <div>
      <li className="producto">
        <div className="info-producto">
          <p className="nombre">{nombre}</p>
          <p className="precio">${precio} </p>
          {imagen ? <img src={imagen} alt={nombre} /> : null}
        </div>
        <div className="acciones">
          <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Producto
          </Link>

          <button
            type="button"
            className="btn btn-rojo btn-eliminar"
            onClick={() => eliminarProducto(_id)}
          >
            <i className="fas fa-times"></i>
            Eliminar Cliente
          </button>
        </div>
      </li>
      <li className="producto">
        <div className="info-producto">
          <p className="nombre">AngularJS</p>
          <p className="precio">$25.00 </p>
          <img src="img/2.jpg" />
        </div>
        <div className="acciones">
          <a href="#" className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Producto
          </a>

          <button type="button" className="btn btn-rojo btn-eliminar">
            <i className="fas fa-times"></i>
            Eliminar Producto
          </button>
        </div>
      </li>
      <li className="producto">
        <div className="info-producto">
          <p className="nombre">ReactJS</p>
          <p className="precio">$25.00 </p>
          <img src="img/3.jpg" />
        </div>
        <div className="acciones">
          <a href="#" className="btn btn-azul">
            <i className="fas fa-pen-alt"></i>
            Editar Producto
          </a>

          <button type="button" className="btn btn-rojo btn-eliminar">
            <i className="fas fa-times"></i>
            Eliminar Producto
          </button>
        </div>
      </li>
    </div>
  );
}

export default Producto;

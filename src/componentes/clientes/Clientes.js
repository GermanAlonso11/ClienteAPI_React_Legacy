import React, {useEffect} from 'react';

//Importar cliente axios
import clienteAxios from '../../config/axios';

function Clientes() {
  const consultarAPI = async () => {
    const clientes = await clienteAxios.get('/clientes');
    console.log(clientes.data);
  }

  //Use effect para consultar la API
  useEffect(() => {
    //Llamar a la función
    consultarAPI();
  }, []);

  return (
    <div>
      <h2>Clientes</h2>

    </div>
  );
}

export default Clientes;
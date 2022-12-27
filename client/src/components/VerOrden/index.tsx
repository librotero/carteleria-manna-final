import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import useInsumo from "../../store/insumo";
import useUser from "../../store/user";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill, BsWhatsapp } from "react-icons/bs";
import { MdError, MdDone, MdArrowBack, MdEmail } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

import Swal from "sweetalert2";
import moment from "moment";
import useClients from "../../store/clientes";
import useHeaders from "../../hooks/useHeaders";
import useOrdenes from "../../store/ordenes";
type Props = {
  setShowModal3: any;
  orden: any;
};
const InsumoEdit = ({ setShowModal3, orden }: Props) => {
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const { clientes, getClients } = useClients((state) => state);
  var cliente: any = clientes.find((e: any) => e.name === orden.cliente);
  useEffect(() => {
    getClients(headers);

    console.log("hola soy clientes", clientes, cliente);
  }, []);
  const {
    ordenes,
    getOrdenesAll,
    putOrden,
    getOrdenes,
    deleteOrdenes,
    loading,
  } = useOrdenes((state) => state);
  const {
   getUser,
   user
  } = useUser((state) => state)

  var color: any = "white";

  const [category, setCartegory] = useState(["IMPRESIONES", "CARTELERIA"]);
  const [ocultar, setOcultar]= useState(false)

  const { success, putInsumo, closeModal, error } = useInsumo((state) => state);
  const [token] = useLocalStorage();

  const navigate = useNavigate();

  const [values, setValues] = useState({
    fecha: orden.fecha,
    cliente: orden.cliente,
    contacto: orden.contacto, //nombre de contacto
    carteles: orden.carteles,
    operacion: orden.operacion,
    lugardecolocacion: orden.lugardecolocacion,
    lugartraslado: orden.lugartraslado,
    seña: orden.seña,
    formadepago: orden.formadepago,
    fechaentrega: orden.fechaentrega,
    facturanum: orden.facturanum,
    observaciones: orden.observaciones,
    montototal: orden.montototal,
    porcentaje: orden.porcentaje,
    id: orden.id,
    resta: orden.resta,
    restaHistory: orden.restaHistory,
    vendedor: orden.vendedor
  });
  const [totalOrden, setTotalOrden] = useState(orden.montototal);
  const [metodoPago, setMetodoPago] = useState([]);
  const [metodoPagoitems, setMetodoPagoitems] = useState([]);
  var [cajaMetodoMonto, setCajaMetodoMonto] = useState([1]);

  const [totalDefault, setTotalDefault] = useState(orden.montototal);
  const [metodoObject, setMetodoObject] = useState({
    metodo: "",
    monto: totalDefault - orden.seña,
  });
  var metodosPagosActual: any = [];
  const [errors, setErrors] = useState<any>({});
  const handleSelectMetodo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;
    setMetodoObject({
      ...metodoObject,
      metodo: value,
    });
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setMetodoObject({
      ...metodoObject,
      [name]: value,
    });
    console.log("holaaa", metodoObject);
  };

  const handleCloseModal = () => {
    setShowModal3(false);
    closeModal();
  };
  const agregarCaja = () => {
    console.log("holaaaaaaaaaaaaaa", metodoPago, values, totalOrden);

    var array: any = [...cajaMetodoMonto, 1];
    if (metodoObject.metodo) {
      var newArray: any = [...metodoPago, metodoObject];
      setMetodoPago(newArray);
      setMetodoObject({
        metodo: "",
        monto: 0,
      });
      setCajaMetodoMonto(array);
    }
    if (totalOrden === 0) {
      setValues({
        ...values,
        resta: orden.montototal - orden.seña,
      });
      orden.resta = orden.montototal - orden.seña;
    }

    console.log("holaa", metodoPago);
  };
  var put = () => {
    console.log("hola aca voy a modificar esto datos que me llegan", values);
    orden.resta = orden.montototal+orden.seña;
    values.restaHistory=metodoPago
    putOrden(values, headers);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cambios guardados exitosamente",
      showConfirmButton: false,
      timer: 1500,
    });
    setOcultar(true)
  };
  const aceptar = () => {
    if (metodoObject.metodo) {
      var newArray: any = [...metodoPago, metodoObject];
      setMetodoPago(newArray);

      var arraysum: any = metodoPago.map((e: any) => e.monto);
      let total: any = 0;
      total = arraysum.reduce((a: any, b: any) => a + b, 0);
      var totalresta: any = totalOrden - total;
      setTotalOrden(totalresta);
      setValues({
        ...values,
        resta: totalOrden - orden.seña,
        restaHistory: metodoPago,
      });
      console.log("holaaaaaaaaaaaaaa", totalOrden, metodoPago, values);
      setMetodoObject({
        metodo: "",
        monto: 0,
      });
    }
  };

  useEffect(() => {
    getUser(accessToken)
    if (!orden.values) {
      setValues({
        ...values,
        resta: 0,
      });
    }
  }, []);
  return (
    <div className="">
        <div className="relative flex justify-end mb-10 p-5 flex text-end ">
              <button
                className="absolute top-1/3 left-5 text-xl w-10 h-10 rounded-full flex justify-center "
                onClick={handleCloseModal}
              >
                <MdArrowBack />
              </button>
              <div className="block">
              <div className="flex text-end border-b-4">
                <b className="flex text-end">Orden:</b>
                {orden.facturanum} 
              </div>
              <div className="flex text-end text-lg">
                <b className="flex text-end">Vendedor: </b>
                {orden.vendedor===user._id
                ?user.name
                :"no tiene un vendedor asignado"
              }
              </div>
              </div>
            </div>
    <div className="p-5">
      <div className="bg-white p-5 text-start text-2xl rounded">
       

        <div className="mt-1 flex ">
          <div className="w-1/3">
            <b className="text-gray-600">Cliente: </b>
            <h1>{orden.cliente}</h1>
          </div>
          <div className="w-1/3">
            <b className="text-gray-600">Contacto </b>
            <h1>{orden.contacto}</h1>
          </div>
          <div className="w-1/3">
            <b className="text-gray-600">Fecha </b>
            <h1>{moment(orden.fecha).format("L")}</h1>
          </div>
        </div>
        {/** tercera columna */}
        <div className="mt-5 flex ">
          <div className="w-1/3">
            <b className="text-gray-600">Operación</b>
            <h1>{orden.operacion}</h1>
          </div>
          {orden.operacion === "colocacion" || orden.operacion=="traslado" ? (
            <div className="w-1/3">
              <b className="text-gray-600">Dirección</b>
              <h1>{orden.lugardecolocacion}</h1>
            </div>
          ) : (
            <div className="w-1/3">
              <b className="text-gray-600">Dirección</b>
              <h1>No especifica</h1>
            </div>
          )}
          <div className="w-1/3">
            <b className="text-gray-600">Entrega </b>
            <h1>{moment(orden.fechaentrega).format("L")}</h1>
          </div>
        </div>

        {/** tercera columna */}
        <div className="mt-5 flex text-lg">
          <div className="border-b-4 border-green-600 w-1/3">
            <b className="text-gray-600 ">pagado</b>
            <h1>$ {orden.seña+ orden.resta}</h1>
          </div>

          <div className="w-1/3">
            <div className="ml-2 border-b-4 border-red-600">
              <b className="text-gray-600 ">Resta</b>
              <h1>
              $  {orden.montototal - (orden.seña + orden.resta)}
              </h1>
            </div>
          </div>
          <div className="ml-2 border-b-4 border-blue-600 text-center w-1/3 ">
            <b className="text-gray-600">Total</b>
            <h1>$ {orden.montototal}</h1>
          </div>
        </div>
        {orden.restaHistory.length == 0 ? (
          <div className="w-full bg-gray-100 p-5 mt-5 rounded-lg"
           style={ocultar===true ? {"display":"none"} :{"cursor":"none"}} >
            <div className="flex w-full">
              <div className="flex justify-start pt-5 w-1/2">
                Método de pago
              </div>
              <div className="flex w-1/2 justify-end m-5 ">
                <button
                  className="bg-green-600 w-1/4 h-10 rounded-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300  dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 text-white"
                  onClick={agregarCaja}
                >
                  +
                </button>
              </div>
            </div>
            <div className="p-2">
              {/** monto metoto start */}
              {cajaMetodoMonto.map((e: any) => (
                <div className=" p-4  bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex w-full ">
                  <div className="sm:w-1/5 md:w-1/2">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Método de pago
                    </label>
                    <select
                      className="w-full bg-white"
                      id="grid-state"
                      name="metodo"
                      onChange={handleSelectMetodo}
                    >
                      <option value="" defaultValue={""} disabled>
                        Seleccionar cartel
                      </option>
                      <option value="Transferencia">
                        Transferencia
                      </option>
                      <option value="Cheque">Cheque</option>
                      <option value="Tarjeta">Tarjeta</option>
                      <option value="Efectivo">Efectivo</option>
                    </select>
                  </div>
                  <div className=" md:w-1/2 ml-2 sm:w-1/5">
                    <div className="">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        monto
                      </label>
                      
                      <input
                        className="border-gray-200 w-full  "
                        id="grid-first-name "
                        type="number"
                        placeholder="$ monto"
                        name="monto"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {/**end monto metodo  */}
            </div>

            <div className="flex justify-end mt-5">
              <button
                className="py-2.5 px-5 mr-2 text-xl mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={put}
              >
                modificar cambios
              </button>
              <button
                className="text-white text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={aceptar}
              >
                aceptar
              </button>
            </div>
            <div>
            </div>
          </div>
        ) : (
          ""
        )}
        {values.restaHistory.length > 0 ? (
          <div>
            <hr />
            <h1 className="text-bold mt-5">Metodos de Pago</h1>
            <div className="flex pl-2 ">
            
            <p className="text-lg pt-2">
              <b>Seña: </b>
              {orden.formadepago}
            </p>
            <p className="text-lg pt-2 pl-2">
              <b>seña: </b>
              {orden.seña}
            </p>
            </div>
            {values.restaHistory.map((e: any) => (
              <div className="rounded ">
                <div className="flex pl-2 ">
                  <div className="w-full flex ">
                  <b className="text-lg">método: </b>
                    <p className="text-lg">
                    {e.metodo}
                    </p>
                  </div>
                  <div className="w-full">
                    <p className="text-lg">
                      <b>monto: {e.monto}</b>
                      
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <hr />
          </div>
        ) : (
          ""
        )}
      </div>
      <h1 className="text-lg text-center font-bold">Contacto</h1>
      {
  orden.clientes?
<>
<div className="ml-10 mt-5 text-xl ">
  <p>Email</p>
  <h1>{orden.clientes.email}</h1>
</div>
<div className="flex m-5">

<div className="flex justify-end ">

<div className="m-5 text-xl">
  <p className="flex justify-start">Telefono</p>
  <h1 className="flex justify-end">
    {orden.clientes.telefono}
  </h1>
</div>
<div className="flex justify-end mt-3">
  <div className="m-7 text-2xl">
    <a
      href={`https://api.whatsapp.com/send?phone=${orden.clientes.telefono}&text=Hola, ${orden.clientes.name}.Le escribimos desde Carteleria`}
    >
      <BsWhatsapp />
    </a>
  </div>
  <div className="m-7 text-2xl">
    <a
      href={`mailto:${orden.clientes.email}?Subject=Interesado%20en%20su%20trabajo`}
    >
      <MdEmail />
    </a>
  </div>
</div>
</div>
</div>
</>
:
<>
<div className="ml-10 mt-5 text-xl ">
                <p>Email</p>
                <h1>{cliente.email}</h1>
              </div>
          <div className="flex m-5">
          
            <div className="flex justify-end ">
              
              <div className="m-5 text-xl">
                <p className="flex justify-start">Telefono</p>
                <h1 className="flex justify-end">
                  {cliente.telefono}
                </h1>
              </div>
              <div className="flex justify-end mt-3">
                <div className="m-7 text-2xl">
                  <a
                    href={`https://api.whatsapp.com/send?phone=${cliente.telefono}&text=Hola, ${cliente.name}.Le escribimos desde Carteleria`}
                  >
                    <BsWhatsapp />
                  </a>
                </div>
                <div className="m-7 text-2xl">
                  <a
                    href={`mailto:${cliente.email}?Subject=Interesado%20en%20su%20trabajo`}
                  >
                    <MdEmail />
                  </a>
                </div>
              </div>
            </div>
          </div>
</>
}
    </div>
  </div>

  );
};

export default InsumoEdit;

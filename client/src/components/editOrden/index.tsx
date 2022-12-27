import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdExitToApp } from "react-icons/md";
import useInusmo from "../../store/insumo";
import { useEffect, useState } from "react";
import useHeaders from "../../hooks/useHeaders";
import Swal from "sweetalert2";
import useLocalStorage from "../../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);
import useClients from "../../store/clientes";
import useCartel from "../../store/carteles";
import useOrdenes from "../../store/ordenes";
import useUser from "../../store/user";
import moment from "moment";
import AddCartel from "../AddCartel";
type Props = {
  setShowModal2: any;
  orden: any;
};
interface Cartel {
  cant: number;
  name: string;
  base: number;
  altura: number;
  medidas: number;
  faz: string;
  total: number;
  estructura: string;
  otros: string;
  category: string[];
}
var totalArray: any = [];

let sumTotales: any = [];
var montofinal: any = 0;
var clienteSelect: any = {};
var cartelSelect: any = {};
var obreros: any = [];
var fechaActual: any = moment().format("MM/DD/YYYY");

var totalganancia: any = 0;
const multiplicar = (a: number, b: number): number => {
  return a * b;
};
const ClienteEdit = ({ setShowModal2, orden }: Props) => {
  const { carteles, getCarteles } = useCartel((state) => state);
  const { clientes, getClients } = useClients((state) => state);
  const { getUsers2, users, logout, user, closeModal } = useUser((state) => state);
  const [hola, setHola] = useState(false);
  const [montoModificado, setMontoModificado] = useState(0);

  const [porcentaje, setPorcentaje] = useState([
    0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
  ]);
  const [values, setValues] = useState({
    id: orden.id,
    fecha: orden.fecha,
    cliente: orden.cliente,
    contacto: orden.contacto, //nombre de contacto
    carteles: orden.carteles,
    operacion: orden.operacion,
    lugardecolocacion: orden.lugardecolocacion,
    seña: orden.seña,
    formadepago: orden.formadepago,
    fechaentrega: orden.fechaentrega,
    facturanum: orden.facturanum,
    observaciones: orden.observaciones,
    montototal: orden.montototal,
    porcentaje: 0,
  });
  const [errors, setErrors] = useState<any>({});
  var totales: any = values.carteles;

  const {
    ordenes,
    getOrdenesAll,
    putOrden,
    getOrdenes,
    deleteOrdenes,
    success,
    error,
    loading,
  } = useOrdenes((state) => state);
  useEffect(() => {
    getCarteles(accessToken);
    getClients(headers);
    getUsers2(headers);
    console.log("holaaaaaaaaaaa somo s usuariosa", values);
  }, []);

  /** handles */
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;
    setValues({
      ...values,
      formadepago: value,
    });
    if (value) {
      clienteSelect = clientes.find((e: any) => e.name === value);

      if (clienteSelect) {
        var clienteId = clienteSelect._id;
        setValues({
          ...values,
          cliente: clienteId,
        });
        console.log("hola amiguitos dolos", clienteSelect);
      } else {
        console.log("holalkdjsldkjsdlksdjsldkjamiguitos dolos", clienteSelect);
      }
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });

    console.log("esto es el total ", values.montototal);
  };

  const handleCloseModal = () => {
    setShowModal2(false);
    closeModal();
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Desea guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#77B327',
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('¡Guardado exitosamente!', '', 'success')
        putOrden(values, headers);
        handleCloseModal()
      } else if (result.isDenied) {
        Swal.fire('Los cambios no han sido guardados', '', 'info')
      }
    })
    
  };
  const handleSelectCliente = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;
    setValues({
      ...values,
      cliente: value,
    });
  };
  const handleSelectOperación = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;
    setValues({
      ...values,
      operacion: value,
    });
  };
  const handleSelectPorcentaje = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;
    var holaaa: any = values.montototal;
    if (value) {
      var valuesporcen: any = value;
      var porcentaje: any = 0;
      var montototalissimo: 0;
      totalganancia = 0;
      porcentaje = valuesporcen / 100;
      totalganancia = multiplicar(porcentaje, holaaa);
      montototalissimo = totalganancia + holaaa;
      setValues({
        ...values,
        montototal: montototalissimo,
      });
      console.log("esto es el total sdsdsds ", montototalissimo);
    }
  };
  const deleteCarteles =(e:any)=>{
    var  array: any = values.carteles.filter((item:any)=>e.name!==item.name)
    var nuevo1: any = array.map((e:any)=>e.total)
   var total: any =  nuevo1.reduce((a: any, b: any) => a + b, 0)
   console.log("hey hey hye ai you gatrit", array, total)
     setValues({
       ...values,
       carteles: array,
       montototal: total
     })
   
   };

  return (
    <div className="rounded-lg  md:mt-0 xl:p-0 ">
      <div className="p-6 space-y-4 sm:p-8 ">
        <div className="flex border-b-4 border-[#77B327] rounded border-b-4 p-5 mb-1 grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
      
        <div className="">
         <h1 className="text-3xl">Editar Orden</h1>
        </div>

        <button
          className=" text-black text-4xl w-full h-10  flex justify-end"
          onClick={handleCloseModal}
        >
          <MdExitToApp />
        </button>
        </div>
        <AddCartel
          values={values}
          setValues={setValues}
          montoModificado={montoModificado}
          setMontoModificado={setMontoModificado}
        />
<div className="flex  mb-1 grid sm:gap-2  sm:grid-cols-2 md:gap-3 md:grid-cols-3">
        {values.carteles.map((e: any) => (
          
            <div 
            onClick={()=>deleteCarteles(e)}
            className="block w-full text-gray-600 border-blue-600 border-2 text-lg uppercase bg-white p-3 rounded-lg" style={{"cursor":"pointer"}}>
            <p className="text-start">
                                <b>Nombre: </b>
                                {e.name}{" "}
                              </p>
                              <p className="text-start">
                                <b>base x altura : </b>
                                {e.base} x {e.altura}{" "}
                              </p>
                              <b>categoría</b>
                              {e.category.map((item: any) => (
                                <div>{item}</div>
                              ))}
                              <p className="text-start">
                                <b>estructura: </b>
                                {e.estructura}{" "}
                              </p>
                              <p className="text-start">
                                <b>otros: </b>
                                {e.otros}{" "}
                              </p>
                              <p className="text-start">
                                <b>faz: </b>
                                {e.faz}{" "}
                              </p>
          </div>
          
        ))}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
          {/**primera columna  */}

          <div className="flex flex-wrap-mx-3 ">
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Fecha
              </label>
              <input
                className="appearance-none block w-20 bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="string"
                placeholder="hola"
                name="fecha"
                value={(values.fecha = fechaActual)}
                onChange={handleChange}
              />
            </div>
            <div className="w-40 md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Cliente
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="clientes"
                value={values.cliente}
                onChange={handleSelectCliente}
              >
                <option value="" defaultValue={""} disabled>
                  Seleccionar cartel
                </option>
                {clientes.map((e: any) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
            </div>

            <div className="w-40 md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Operación
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                placeholder="operacion"
                name="operacion"
                value={values.operacion}
                onChange={handleSelectOperación}
              >
                <option value="" defaultValue={""} disabled>
                  Seleccionar cartel
                </option>
                <option value="colocacion">Colocación</option>
                <option value="retiro">Retiro en oficina</option>
                <option value="traslado">Traslado</option>
              </select>
            </div>
          </div>

          {/**segunda columna  */}

          <div
            className="flex  mb-1 grid sm:gap-1  sm:grid-cols-1
      md:gap-3 md:grid-cols-3"
          >
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Dirección de colocación
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="D. colocación"
                name="lugardecolocacion"
                value={values.lugardecolocacion}
                onChange={handleChange}
              />
            </div>

            <div className="w-full md:mb-0 sm:mb-1">
              <label className="block uppercase tracking-wide w-full text-gray-700 text-xs font-bold mb-2">
                Metodo de pago
              </label>
              <select
                value={values.formadepago}
                onChange={handleSelect}
                name="formadepago"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option value="" defaultValue={""} disabled>
                  seleccione método de pago
                </option>
                <option value="master">master</option>
                <option value="visa">visa</option>
                <option value="maestro">visa</option>
                <option value="efectivo">efectivo</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold md:mb-2 sm:mb-0">
                Fecha entrega
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="date"
                placeholder="Fecha"
                name="fechaentrega"
                value={values.fechaentrega}
                onChange={handleChange}
              />
            </div>
          </div>

          {/**tercera columna  */}

          <div
            className="flex  mb-1 grid sm:gap-1  sm:grid-cols-1
      md:gap-3 md:grid-cols-3 "
          >
            <div className="w-full mb-6 ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                porcentaje
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                placeholder="operacion"
                name="porcentaje"
                value={values.porcentaje}
                onChange={handleSelectPorcentaje}
              >
                <option value="" defaultValue={""} disabled>
                  Seleccionar cartel
                </option>
                {porcentaje.map((e: any) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                seña
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="number"
                placeholder="Seña"
                name="seña"
                value={values.seña}
                onChange={handleChange}
              />
            </div>
            <div className="ml-1">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Total
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="number"
                placeholder="Total"
                name="montototal"
                value={
                  values.seña
                    ? values.montototal - values.seña
                    : values.montototal
                }
                onChange={handleChange}
              />
            </div>
          </div>

          {/**segunda columna  */}

          <div className="flex flex-wrap-mx-3"></div>
          {/** ultima comuna */}
          <div className="flex flex-wrap-mx-3">
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                factura numero
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="facturanum"
                name="facturanum"
                value={values.facturanum}
                onChange={handleChange}
              />
            </div>
            <div className="ml-2 w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                contacto
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Contacto"
                name="contacto"
                value={values.contacto}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2"></div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Observaciones
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 h-20 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="observaciones"
                name="observaciones"
                onChange={handleChange}
                value={values.observaciones}
              />
              <p className="text-gray-600 text-xs italic">
                Algo para tener en cuenta
              </p>
            </div>
          </div>

          <div className="flex items-center mt-6 justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button
              className="bg-[#77B327] text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteEdit;

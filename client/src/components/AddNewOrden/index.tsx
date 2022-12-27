import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdExitToApp } from "react-icons/md";
import useCartel from "../../store/carteles";
import useClients from "../../store/clientes";
import useLocalStorage from "../../hooks/useLocalStorage";
import useHeaders from "../../hooks/useHeaders";
import usePresupuesto from "../../store/presupuesto";
import useOrdenes from "../../store/ordenes";
import useUser from "../../store/user";
import moment from 'moment'
import { value } from "rumble-charts/types/helpers";
import Swal from 'sweetalert2'
import AddCartel from '../AddCartel'
const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);

type Props = {
  setShowModal: any;
  ordenes: any
};

var totalArray: any = [];
var totales: any = [];
let sumTotales: any = [];
var montofinal: any = 0;
var montofinal2: any = 0;

var clienteSelect: any = {};
var cartelSelect: any = {};
var obreros: any = [];
var fechaActual: any =moment().format("L")
var cartelfaz: any = 0

interface Values {
  idUser: string;
  fecha: string;
  cliente: string;
  contacto: string; //nombre de contacto
  carteles: object[];
  operacion: string;
  lugardecolocacion: string;
  montototal: number;
  seña: number;
  formadepago: string;
  fechaentrega: string;
  facturanum: string;
  plazodeentrega: string;
  observaciones: string;
  porcentaje: number;
  resta: number;
  restaHistory: object[]
  stateCarteleria: string,
  stateImpresiones:string,
  vendedor:string
}
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
  category: string[]
}

const AddNewOrden = ({ setShowModal, ordenes }: Props) => {
  const { postOrden, success, error, closeModal } = useOrdenes(
    (state) => state
  );

  const { carteles2, getCarteles } = useCartel((state) => state);
  const { clientes, getClients } = useClients((state) => state);
  const { getUsers2, users, logout, user } = useUser((state) => state);
  const [hola, setHola] = useState(false);
const [porcentaje, setPorcentaje]=useState([10,20,30,40,50,60,70,80,90,100])
const [montoModificado, setMontoModificado]=useState(0)
  const [cartel, setCartel] = useState<Cartel>({
    cant: 1,
    name: "",
    base: 0,
    altura: 0,
    medidas: 0,
    faz: "",
    total: 0,
    estructura: "",
    category: [],
    otros: "",
  });
  const [values, setValues] = useState<Values>({
    idUser: user._id,
    fecha: "",
    cliente: "",
    contacto: "", //nombre de contacto
    carteles: [],
    operacion: "",
    lugardecolocacion: "",
    seña: 0,
    montototal: 0,
    formadepago: "",
    fechaentrega: "",
    facturanum: "",
    plazodeentrega: "",
    observaciones: "",
    porcentaje: 0,
    resta: 0,
    stateCarteleria:"pendiente",
    stateImpresiones: "pendiente",
    restaHistory:[],
    vendedor:user._id
  });
  const [errors, setErrors] = useState<any>({});
  const [monto, setMonto] = useState(montofinal);
 const resetCartel = ()=> {
  setMontoModificado(0)
  setCartel({
    cant: 1,
    name: "",
    base: 0,
    altura: 0,
    medidas: 0,
    faz: "",
    total: 0,
    estructura: "",
    category: [],
    otros: "",
  })
 }
  var totalganancia : any =0
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
    console.log("esto es el total ", values)
   
  };
  

  const multiplicar = (a: number, b: number): number => {
    return a * b;
  };

 

  
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    var newArray: any = ordenes
    newArray.push(values)
    ordenes= newArray
console.log("hola estos", ordenes)
console.log("hola estos", newArray, values)

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Orden creadas exitosamente',
      showConfirmButton: false,
      timer: 1500
    })
    postOrden(values, headers);
    
    setValues({
      idUser: user._id,
      fecha: "",
      cliente: "",
      contacto: "", //nombre de contacto
      carteles: [],
      operacion: "",
      lugardecolocacion: "",
      seña: 0,
      montototal: 0,
      formadepago: "",
      fechaentrega: "",
      facturanum: "",
      plazodeentrega: "",
      observaciones: "",
      porcentaje: 0,
      resta: 0,
      restaHistory:[],
      stateImpresiones:"pendiente",
      stateCarteleria:"pendiente",
      vendedor:user._id
    });
     
    setTimeout(() => {
      handleCloseModal()
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;
    setValues({
      ...values,
      formadepago: value,
    });
    if (value) {
      
      clienteSelect = clientes.find((e: any) => e.name === value);
      console.log("hola soy un valor que si vale", cartelSelect);
     
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

  const handleSelectCliente= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    setValues({
      ...values,
      cliente: value,
    });
  }
  const handleSelectOperación= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    setValues({
      ...values,
      operacion: value,
    });
  }

  const handleSelectPorcentaje= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    var holaaa: any =montoModificado
   if(value){
    var valuesporcen: any = value
    var porcentaje: any  = 0
    var montototalissimo: 0
    totalganancia=0
    porcentaje=(valuesporcen/100)
      totalganancia = multiplicar(porcentaje, holaaa)
      montototalissimo = totalganancia + holaaa
      setValues({
        ...values,
        montototal: montototalissimo,
        porcentaje: totalganancia
      })
    console.log("esto es el total sdsdsds ",montototalissimo, montofinal)
   }
  }


  useEffect(() => {
    setValues({
      idUser: user._id,
      fecha: "",
      cliente: "",
      contacto: "", //nombre de contacto
      carteles: [],
      operacion: "",
      lugardecolocacion: "",
      seña: 0,
      montototal: 0,
      formadepago: "",
      fechaentrega: "",
      facturanum: "",
      plazodeentrega: "",
      observaciones: "",
      porcentaje: 0,
      resta: 0,
      restaHistory:[],
      stateImpresiones:"pendiente",
      stateCarteleria:"pendiente",
      vendedor:user._id
    });
    getCarteles(accessToken);
    getClients(headers);
    getUsers2(headers);
    console.log("holaaaaaaaaaaa somo s usuariosa", user);
   
   
  }, []);
  return (
    <div className="rounded-lg shadow dark:border p-5 ">
        <div className="border-b-4 border-[#77B327] rounded border-b-4 p-5 mb-1 flex">
      
      <div className=" w-1/2">
       <h1 className="text-3xl p-5">Crear Orden</h1>
      </div>

      <button
        className=" text-black text-4xl w-1/2 pt-4 mr-4 flex justify-end"
        onClick={handleCloseModal}
      >
        <MdExitToApp />
      </button>
      </div>
    <div className=" ">
      
        <div className=" m-10">
        <AddCartel values={values} setValues={setValues} montoModificado={montoModificado} setMontoModificado={setMontoModificado}/>

        </div>
     
              <form onSubmit={handleSubmit} className="flex flex-col mt-4 p-10">
      
          {/**primera columna  */}

          <div className="flex flex-wrap-mx-3 ">
          <div className="w-1/3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Fecha
          </label>
          <input
            className="appearance-none block w-20 bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="string"
            placeholder="hola"
            name="fecha"
            value={values.fecha=fechaActual}
            onChange={handleChange}
          />
        </div>
            <div className="md:w-1/3 px-3 mb-6 md:mb-0">
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
                  Seleccionar cliente
                </option>
                {clientes.map((e: any) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
            </div>
            <div className=" md:w-1/3 px-3 mb-6 md:mb-0">
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
                  Seleccionar operacion
                </option>
                <option value="colocacion">
                  Colocación
                </option>
                <option value="retiro">
                  Retiro en oficina
                </option>
                <option value="traslado">
                  Traslado
                </option>
                
              </select>
            </div>
           
          </div>
          

          {/**segunda columna  */}

          <div className="flex  mb-1 grid sm:gap-1  sm:grid-cols-1 md:gap-3 md:grid-cols-3">
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

            <div className="w-full  mb-6 md:mb-0">
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
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
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

          <div className="flex  mb-1 grid sm:gap-1  sm:grid-cols-1
          md:gap-3 md:grid-cols-3 ">
          
          
            
            <div className="w-full mb-6 ">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Descuento
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
                {
                  porcentaje.map((e:any)=>(
                    <option value={e}>
                  {e}
                </option>
                  ))
                }
               
                
              </select>
            </div>
              <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                seña
              </label>
              <div className="relative">
             <label className="absolute left-2 top-2.5 ">
                $
                
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

            </div>
            <div className="ml-1">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Total
              </label>
             <div className="relative">
             <label className="absolute left-2 top-2.5 ">
                $
                
                </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="number"
                placeholder="Total"
                name="montototal"
                value={
                  values.seña?
                  values.montototal-values.seña
                  :
                  values.montototal
                }
                onChange={handleChange}
              />
             </div>
            </div>

          
          
          </div>

          
          {/**segunda columna  */}

          <div className="flex flex-wrap-mx-3">
          
          
          </div>
          {/** ultima comuna */}
          <div className="flex flex-wrap-mx-3">

          <div className="">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                factura N°
              </label>
              <input
                className="appearance-none block w-30 bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="facturanum"
                name="facturanum"
                value={values.facturanum}
                onChange={handleChange}
              />
            </div>
            <div className="ml-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                contacto
              </label>
              <input
                className="appearance-none block w-30 bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Contacto"
                name="contacto"
                value={values.contacto}
                onChange={handleChange}
              />
            </div>
          </div>
    
          <div className="flex flex-wrap -mx-3 mb-2">
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Observaciones
              </label>
              <input
                className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                id="grid-password"
                type="text"
                placeholder="observaciones"
                name="observaciones"
                onChange={handleChange}
                value={values.observaciones}
              />
              <p className="text-gray-600 text-sm m-1 italic">
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

export default AddNewOrden;

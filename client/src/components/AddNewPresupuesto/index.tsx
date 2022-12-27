import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError , MdExitToApp, MdArrowBack} from "react-icons/md";
import useCartel from "../../store/carteles";
import useClients from "../../store/clientes";
import useLocalStorage from "../../hooks/useLocalStorage";
import useHeaders from "../../hooks/useHeaders";
import usePresupuesto from "../../store/presupuesto";
import AddCartel from '../AddCartel'
import moment from 'moment'
const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);
import useUser from "../../store/user";

type Props = {
  setShowModal: any;
};

var totalArray:any= []
var totales:any =[]
let sumTotales:any=[]
var montofinal:any = 0
var clienteSelect:any={}
var cartelSelect:any={}
var fechaActual: any =moment().format('MM/DD/YYYY')
var totalganancia: any=0



interface Values {
  fecha: string;
  clientes: string; // que muestre nombre de contacto y telefono en el front
  carteles: string[];
  operacion: string;
  lugardecolocacion: string; //lugar de entrega colocación/entrega
  montototal: number;
  vendedor: string;
  plazodeentrega: number;
  fechavalida: string; //presupuesto valido hasta
  observaciones: string;
  contacto: string;
  porcentaje: string
}


const AddNewClient = ({ setShowModal }: Props) => {
  const { addPresupuesto, success, error, closeModal } =
    usePresupuesto((state) => state);
    const { users, user, getUsers , getUser} = useUser((state) => state);

  const { carteles, getCarteles } = useCartel((state) => state);
  const { clientes, getClients } = useClients((state) => state);
  const [montoModificado, setMontoModificado]=useState(0)
  const [porcentaje, setPorcentaje]=useState([10,20,30,40,50,60,70,80,90,100])

  const handleSelectCliente= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    setValues({
      ...values,
      clientes: value,
    });
  }
  const handleSelectOperación= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    setValues({
      ...values,
      operacion: value,
    });
  }
  const [values, setValues] = useState<Values>({
    fecha: fechaActual,
    clientes: "", // que muestre nombre de contacto y telefono en el front
    carteles: [],
    operacion: "",
    lugardecolocacion: "", //lugar de entrega colocación/entrega
    montototal: 0,
    plazodeentrega: 0,
    fechavalida: "", //presupuesto valido hasta
    observaciones: "",
    contacto: "",
    porcentaje:"",
    vendedor:user._id
  });
  const [errors, setErrors] = useState<any>({});
 

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
console.log("holaaaaaaaaaaaaa", values)
  };

  const multiplicar = (a: number, b: number): number => {
    return a * b;
  };



  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addPresupuesto(values);
	console.log("hola soy un valie", values)
  
    setTimeout(() => {
      handleCloseModal()
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();
  };


  


  useEffect(() => {
      setValues({
        fecha: fechaActual,
        clientes:"", // que muestre nombre de contacto y telefono en el front
        carteles: [],
        operacion: "",
        lugardecolocacion: "", //lugar de entrega colocación/entrega
        montototal: 0,
        plazodeentrega: 0,
        fechavalida: "", //presupuesto valido hasta
        observaciones: "",
        contacto:"",
        porcentaje:"",
        vendedor:user._id

      });
    getCarteles(accessToken);
    getClients(headers);
    getUser(accessToken)
  }, []);

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
    console.log("esto es el total sdsdsds ",montofinal, values)
   }
  }



  const handleSelectClient= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    clienteSelect=clientes.filter((e:any)=>e.name===value)
    if(clienteSelect){
      console.log("hola soy un cliente", clienteSelect, clienteSelect[0].name)
      setValues({
        ...values,
        clientes: clienteSelect[0].name
      });
    }
  }
  return (
    <div className="rounded-lg shadow dark:border md:mt-0  ">
    <div className="p-6 ">
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
      {/**form cartel */}
<AddCartel values ={values} setValues={setValues} montoModificado={montoModificado} setMontoModificado={setMontoModificado}/>
      {/**form cartel */}
<hr/>
<div className="flex  mb-1 grid sm:gap-1  sm:grid-cols-1 md:gap-3 md:grid-cols-3">
        {values.carteles.map((e: any) => (
          
            <div className="block w-full text-gray-600 border-blue-600 border-2 text-lg uppercase bg-white p-3 rounded-lg" style={{"cursor":"pointer"}}>
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
<hr />
      <form onSubmit={handleSubmit} className="flex flex-col mt-4">
    
        
          {/**primera columna  */}

          <div className="flex  grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2 ">
         <div className=" grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
         <div className="w-full">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Fecha
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="string"
            placeholder="hola"
            name="fecha"
            value={values.fecha=fechaActual}
            onChange={handleChange}
          />
        </div>
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Cliente
              </label>
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="clientes"
                value={values.clientes}
                onChange={handleSelectClient}
              >
                <option value="" defaultValue={""} disabled>
                  Seleccionar cliente
                </option>
                {clientes.map((e: any) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
            </div>

         </div>
            <div className=" grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
            <div className="w-full  mb-6 md:mb-0">
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
                  Seleccionar operación
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
            <div className=" w-full">
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
          </div>
          

          {/**segunda columna  */}

          <div className="flex  mb-1 grid sm:gap-1  sm:grid-cols-1
          md:gap-2 md:grid-cols-2">
          {
            values.operacion==="retiro"
            ? ""
            :
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
          }

           
           
          </div>



          <div className="flex flex-wrap-mx-3">
          
          
          </div>
          {/** ultima comuna */}
        <div className=" mt-2 grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
          <div className=" grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
          
          
          
            
          <div className="w-full mb-6 ">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              descuento
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
                  Seleccionar descuento
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
                values.montototal
              }
              onChange={handleChange}
            />
          </div>
          </div>

        
        
       
          </div>
          <div className="flex flex-wrap-mx-3">

<div className="w-full">
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
  Fecha válida
</label>
<input
  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
  id="grid-first-name"
  type="date"
  placeholder="hola"
  name="fechavalida"
  value={values.fechavalida}
  onChange={handleChange}
/>
</div>

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

export default AddNewClient;

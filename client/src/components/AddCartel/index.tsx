import moment from 'moment'

import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdExitToApp } from "react-icons/md";
import useInusmo from "../../store/insumo";
import { useEffect, useState } from "react";
import useHeaders from "../../hooks/useHeaders";
import Swal from 'sweetalert2'
import useLocalStorage from "../../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);
import useClients from "../../store/clientes";
import useCartel from "../../store/carteles";
import useOrdenes from "../../store/ordenes";
import useUser from "../../store/user";
//import moment from 'moment'
type Props = {
 values:any;
 setValues:any;
 montoModificado:any;
 setMontoModificado:any
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
    category: string[]
  }

  var totalArray: any = [];

let sumTotales: any = [];
var montofinal: any = 0;
var clienteSelect: any = {};
var cartelSelect: any = {};
var obreros: any = [];
var fechaActual: any =moment().format('MM/DD/YYYY')


var totalganancia: any=0
const multiplicar = (a: number, b: number): number => {
  return a * b;
};
const AddCartel = ({values, setValues, montoModificado,setMontoModificado}:Props) => {

    const { carteles2, getCarteles } = useCartel((state) => state);
    const { clientes, getClients } = useClients((state) => state);
    const { getUsers2, users, logout, user } = useUser((state) => state);
    const [hola, setHola] = useState(false);
  const [porcentaje, setPorcentaje]=useState([0,10,20,30,40,50,60,70,80,90,100])
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
      var totales: any = values.carteles;
      const handleSelectFaz= (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const { value } = e.currentTarget;
        if (value === "doble") {

          var valorDoble: any  = multiplicar(2, montoModificado);
          setMontoModificado(valorDoble)
          console.log("holaaaaaaaaaa", montoModificado)
          setCartel({
            ...cartel,
            faz:"doble",
          })
          console.log("hola", valorDoble)
        }
        if (value === "simple") {
          var valorSimple: any  =  montoModificado;
          setCartel({
            ...cartel,
            faz:"simple",
          })
          console.log("hola", valorDoble)
          
          
        } 
        
      }
      const handleSelectCartel= (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const { value } = e.currentTarget;
        cartelSelect = carteles2.find((e: any) => e.descripcion === value);
       
          if (cartelSelect) {
            setMontoModificado(cartelSelect.costo1faz+cartelSelect.costo2faz)
            setCartel({
              ...cartel,
              name: value,
              category: cartelSelect.category,
              total: montoModificado
            });
            console.log("hola", cartelSelect)
          }
      }
    
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
    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = e.currentTarget;
        setCartel({
          ...cartel,
          [name]: value,
        });
        console.log("esto es el total ", values.montototal)
      };
      const crearCartel = () => {
        if (cartel.cant > 0) {
          totales = [...totales, cartel];
          console.log("totales es", totales);
          sumTotales = totales.map((a: any) => a.total);
          montofinal = sumTotales.reduce((a: any, b: any) => a + b, 0);
          setValues({
            ...values,
            montototal: montofinal,
            carteles: totales
          });
        }
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
        });
      };
      const agregarCartel = () => {
        hola == false ? setHola(true) : setHola(false);
      };
    return (
        <div >
          
        {/**form cartel */}
        <div className="justify-end ">
          <h1
            onClick={agregarCartel}
            style={{ color: "blue", cursor: "pointer" }}
            className="text-start"
          >
            agregar cartel (+)
          </h1>
        </div>
        <div
          className="justify-center pt-2" 
          style={hola === false ? { display: "none" } : { cursor: "pointer" }}
        >
          <div className="block w-full  p-6 bg-white border border-gray-200 rounded-lg shadow-md  dark:border-gray-700 ">
            <div className="flex mb-1 grid sm:gap-2  sm:grid-cols-2 md:gap-5 md:grid-cols-5">
             
              <div className="">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  cartel
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="name"
                  value={cartel.name}
                  onChange={handleSelectCartel}
                >
                  <option value="" defaultValue={""} disabled>
                    Seleccionar cartel
                  </option>
                  {carteles2.map((e: any) => (
                    <option value={e.descripcion}>{e.descripcion}</option>
                  ))}
                </select>
              </div>
              <div className="ml-1">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  base
                </label>
                <input
                  className="appearance-none  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="number"
                  placeholder="base"
                  name="base"
                  value={cartel.base}
                  onChange={handleChange}
                />
              </div>
              <div className="ml-1">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Altura
                </label>
                <input
                  className="appearance-none  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="number"
                  placeholder="altura"
                  name="altura"
                  value={cartel.altura}
                  onChange={handleChange}
                />
              </div>
              
              <div className="ml-1">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Total M <sup>2</sup>
                </label>
                <input
                  className="appearance-none  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="number"
                  placeholder=""
                  name="medidas"
                  value={
                    cartel.base && cartel.altura
                      ? (cartel.medidas = multiplicar(
                          cartel.base,
                          cartel.altura
                        ))
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="ml-1">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  total
                </label>
               <div className="relative">
                <label className="absolute left-2 top-2.5 ">
                $
                
                </label>
                <input
                  className="appearance-none  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="number"
                  placeholder="total"
                  name="total"
                  value={
                    cartel.medidas?
                       cartel.total = multiplicar(multiplicar(montoModificado, cartel.medidas), cartel.cant)
                        
                      : cartel.total = montoModificado
                  }
                  onChange={handleChange}
                />
               </div>
              </div>
            </div>

            <div className="flex mb-1 grid sm:gap-2  sm:grid-cols-2 md:gap-4 md:grid-cols-4">
              
              <div >
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  faz
                </label>
                <select
                  value={cartel.faz}
                  onChange={handleSelectFaz}
                  name="faz"
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option value="" defaultValue={""} disabled>
                    Seleccionar cartel
                  </option>
                  <option value="simple">simple</option>
                  <option value="doble">doble</option>
                </select>
              </div>
              <div className="ml-1">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  estructura
                </label>
                <input
                  className="appearance-none  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="estructura"
                  name="estructura"
                  value={cartel.estructura}
                  onChange={handleChange}
                />
              </div>
              <div className="ml-1">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  otros
                </label>
                <input
                  className="appearance-none  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="otros"
                  name="otros"
                  value={cartel.otros}
                  onChange={handleChange}
                />
              </div>
              <div className="ml-1">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  cant
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="number"
                  placeholder="cant"
                  name="cant"
                  value={cartel.cant}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="justify-end flex pr-3 pb-3 m-5">
          <h1 className="text-red-600 mt-4 px-4 py-3 leading-6" onClick={resetCartel}>Reset</h1>
         <button
            onClick={crearCartel}
            className="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 hover:bg-blue-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-40 justify-center items-center font-medium focus:outline-none"
          >
           Agregar cartel
          </button>
         </div>
          </div>
        
        </div>
        {/**form cartel */}
        </div>
    )
}

export default AddCartel
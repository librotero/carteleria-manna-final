import ModalVer from "../ModalVer";
import VerOrden from "../VerOrden";
import moment from 'moment'
import { useEffect, useState, Fragment } from "react";
import { BsSearch } from "react-icons/bs";
import useLocalStorage from "../../hooks/useLocalStorage";
import useHeaders from "../../hooks/useHeaders";
import useClients from "../../store/clientes";

type Props ={
    ordenes:any
}

const OrdenesTableDashboard =({ordenes}:Props)=>{
    const [showModal3, setShowModal3] = useState(false);
    const [accessToken] = useLocalStorage();
    const headers = useHeaders(accessToken);
    const { clientes, getClients } = useClients((state) => state);
    const [cliente, setCliente ] =useState({})
  const [ordenEdit, setOrdenEdit] = useState({
    fecha: "",
    cliente: "",
    contacto: "", //nombre de contacto
    carteles: "",
    operacion: "",
    lugardecolocacion: "",
    lugartraslado: "",
    seña: "",
    formadepago: "",
    fechaentrega: "",
    facturanum: "",
    observaciones: "",
    montototal:"",
    porcentaje:"",
    id: "",
    resta:0,
    restaHistory: [],
    vendedor:"",
    clientes:{}
  });
  const ver = (orden: any) => {
    if (ordenes) {
      setShowModal3(true);
      console.log("hola", ordenes);
      setOrdenEdit({
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
        id: orden._id,
        resta: orden.resta,
        restaHistory: orden.restaHistory,
        vendedor: orden.vendedor,
        clientes: cliente
      });
      console.log("insumo", ordenEdit);
    }
    var clientela: any = clientes.find((e: any) => e.name === orden.cliente);
    setCliente(clientela)

  };

  useEffect(() => {
    getClients(headers);

    console.log("hola soy clientes", clientes, cliente);
  }, []);
   return(
    <>
     <table className="min-w-full leading-normal relative">
                  <thead>
                    <tr className="bg-gray-100 text-left text-gray-600 font-semibold uppercase">
                      <th
                        className="hover:bg-gray-300 px-3 py-3 border-b-2 border-gray-200 cursor-pointer tracking-wider"
                        
                      >
                        <div className="flex justify-between gap-2">
                          FECHA
                          
                        </div>
                      </th>
                      <th
                        className="hover:bg-gray-300 px-3 py-3 border-b-2 border-gray-200 cursor-pointer tracking-wider"
                     
                      >
                        <div className="flex justify-between gap-2">
                          CLIENTE
                          
                        </div>
                      </th>
                      <th
                        className="hover:bg-gray-300 px-3 py-3 border-b-2 border-gray-200 cursor-pointer tracking-wider"
                        
                      >
                        <div className="flex justify-between gap-2">
                          CONTACTO
                          
                        </div>
                      </th>

                      <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                        CARTELES
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                        OPERACION
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                        N° FACTURA
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 text-center tracking-wider">
                        Impresiones
                      </th>
                      <th className="px-3 py-3 border-b-2 text-center border-gray-200 tracking-wider">
                        Talleres
                      </th>
                      
                      <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                        VER
                      </th>
                     
                      
                      <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                        ESTADO
                      </th>
                    </tr>
                  </thead>
                  {
                    <tbody>
                      {ordenes?.map((orden: any, index: number) => (
                        <tr
                          key={orden._id}
                          className={`border-b border-gray-200 text-base ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } hover:bg-gray-100`}
                        >
                          <td className="px-3 py-2">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {moment(orden.fecha).format('L')}
                            </p>
                          </td>
                          <td className="px-3 py-2">
                            <p className="text-gray-900 whitespace-no-wrap capitalize">
                              {orden.cliente}
                            </p>
                          </td>
                          <td className="px-3 py-2">
                            <p className="text-gray-900 whitespace-no-wrap capitalize">
                              {orden.contacto}
                            </p>
                          </td>
                          <td className="px-3 py-2">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {orden.carteles === null
                                ? "hola"
                                : orden.carteles.length}
                            </p>
                          </td>
                          <td className="px-3 py-2">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {orden.operacion}
                            </p>
                          </td>
                          <td className="px-3 py-2">
                            <p className="text-gray-900 whitespace-no-wrap capitalize">
                              {orden.facturanum}
                            </p>
                          </td>
                          
                          <td className="">
                          <p className="text-gray-900 whitespace-no-wrap capitalize justify-center flex">
                          {orden.stateImpresiones
                           ? 
                           <div>
                             {
                           orden.stateImpresiones ==="realizada"
                           ?<p className="text-white w-20 bg-green-600 rounded p-1 text-center">En curso</p>
                           :""
                           }
                           {
                           orden.stateImpresiones ==="pendiente"
                           ?<p className="text-white w-20 bg-red-600 rounded align-center text-center p-1">Entradas</p>
                           :""
                           }
                           {
                             orden.stateImpresiones === "entregada"
                             ? <p className="text-white w-20 bg-blue-600 rounded  align-center text-center p-1">Terminada</p>
                             :
                             ""
                           }
                           </div>
                         :
                         <p className="text-white w-20 bg-red-600 rounded align-center text-center p-1">Entrada</p>
                          }
                          </p>
                          </td>
                          <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap capitalize justify-center flex">
                          {orden.stateCarteleria
                           ? 
                           <div>
                             {
                           orden.stateCarteleria ==="realizada"
                           ?<p className="text-white w-20 bg-green-600 rounded p-1 text-center">En curso</p>
                           :""
                           }
                           {
                           orden.stateCarteleria ==="pendiente"
                           ?<p className="text-white w-20 bg-red-600 rounded align-center text-center p-1">Entrada</p>
                           :""
                           }
                           {
                             orden.stateCarteleria === "entregada"
                             ? <p className="text-white w-20 bg-blue-600 rounded  align-center text-center p-1">Terminada</p>
                             :
                             ""
                           }
                           </div>
                         :
                         <p className="text-white w-20 bg-red-600 rounded align-center text-center p-1">Entrada</p>
                          }
                          </p>
                          </td>
                          <td className="px-3 py-2 ">
                        <p
                            className="text-gray-900 whitespace-no-wrap capitalize justify-center flex text-xl cursor-pointer"
                            onClick={() => ver(orden)}
                          >
                             $
                             
                          </p>
                          <ModalVer
                            showModal3={showModal3}
                            setShowModal3={setShowModal3}
                          >
                            <VerOrden
                              setShowModal3={setShowModal3}
                              orden={ordenEdit}
                            />
                          </ModalVer>
                        </td>
                          
                         
                          
                          <td className="px-3 py-2">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {
                                orden.montototal===orden.seña+orden.resta
                                ?<h1 className="text-white w-20 bg-violet-600 rounded p-1 text-center">Pagada</h1>
                                :<h1 className="text-white w-20 bg-yellow-600 rounded p-1 text-center">Sin Pagar</h1>
                              }
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  }
                </table>
   </>
   )
}
export default OrdenesTableDashboard 
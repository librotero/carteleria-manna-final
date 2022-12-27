import useOrdenes from "../store/ordenes";
import useUser from "../store/user";

import Layout from "../components/Layout/index";
import { useEffect, useState, Fragment } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Modal from "../components/Modal";
import AddNewOrden from "../components/AddNewOrden";
import ModalEdit from "../components/ModalEdit";
import EditOrden from "../components/editOrden";
import ModalVer from "../components/ModalVer";
import ModalVerOrdenPago from "../components/ModalVerOrdenPago";

import VerOrden from "../components/VerOrden";
import VerOrdenes from "../components/VerOrdenes";

import Home from "./Home"
import ProveedorEdit from "../components/ProveedorEdit";
import shallow from "zustand/shallow";
import useInsumo from "../store/insumo";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdLastPage,
  MdFirstPage,
  MdOutlineAdd,
  MdExpandLess,
  MdExpandMore,
  MdDisabledByDefault,
  MdAttachMoney
} from "react-icons/md";

import { BsSearch } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { GiReceiveMoney } from "react-icons/gi";


import Loader from "../components/Loader";
import useHeaders from "../hooks/useHeaders";
import useProveedores from "../store/proveedores";
import useClients from "../store/clientes";
import moment from "moment";
import Swal from 'sweetalert2'

const Proveedores = () => {
  const { users, user, getUsers , getUser} = useUser((state) => state, shallow);
  const { ordenes, getOrdenesAll, getOrdenes, getOrdenesAllByName, deleteOrdenes, loading, success } = useOrdenes(
    (state) => state
  );
  const { clientes, getClients } = useClients((state) => state);
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const [rol, setRol] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [name, setName] = useState('');

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
    vendedor: ""
  });


  const [sortUsername, setSortUsername] = useState<null | boolean>(true);
  const [sortName, setSortName] = useState<null | boolean>(null);
  const [sortLastName, setSortLastName] = useState<null | boolean>(null);

  useEffect(() => {
    getOrdenesAll(accessToken, page ,limit, name)

    console.log("holaaaaaa", name);
    getClients(headers);
    getUser(accessToken)
    console.log("esto es el total ", ordenes);
    
    
  }, [success, page ,limit, name]);


  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {value } = e.currentTarget;
    setName(value);
 

  };
const [idUser, setIdUser]=useState(user._id)
  //delete
  const DeleteOrden = (orden: any) => {
    var userTrue : any = user.roles?.find((e: any) => e.name === "vendedor" )
    if(userTrue){
      Swal.fire(
        `Hola, ${user.name}. No tiene autorización para eliminar Ordenes`,
        'Comuníquese con un encargado',
        'error'
        )
    }else{
    var arrayeliminado : any =ordenes.ordenes.filter((e:any)=>e._id!==orden._id)
ordenes.ordenes=arrayeliminado
console.log("hola est vienes del mas alla ",ordenes.ordenes)
    console.log("esto es la orden que viene del mass alla", arrayeliminado, orden._id)
    Swal.fire({
			title: '¿Estás seguro?',
			text: "No podrás revertir los cambios",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#77B327',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Eliminarlo!'
		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire(
				'Eliminado!',
				'X ha sido eliminado',
				'success'
			  )
        deleteOrdenes(orden._id, headers, idUser);
			}
		  })
    }
  };

  const nextPage = (): void => {
    console.log('nextPage', page)
    page < ordenes.totalPages && setPage(page + 1);
    console.log('nextPage', page)

  };

  const prevPage = (): void => {
    page > 1 && setPage(page - 1);
  };

  const firtPage = (): void => {
    page !== 1 && setPage(1);
  };

  const lastPage = (): void => {
    page !== ordenes.totalPages && setPage(users.totalPages);
  };

  const userPerPage = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    let { value } = e.currentTarget;
    setLimit(Number(value));
  };

  const sortByUsername = (): void => {
    if (!sortUsername || sortUsername === null) {
      setSort("username");
      setSortUsername(true);
    } else {
      setSort("username,desc");
      setSortUsername(false);
    }
    setSortName(null);
    setSortLastName(null);
  };

  const sortByName = (): void => {
    if (!sortName || sortName === null) {
      setSort("name");
      setSortName(true);
    } else {
      setSort("name,desc");
      setSortName(false);
    }
    setSortUsername(null);
    setSortLastName(null);
  };

  const sortByLastName = (): void => {
    if (!sortLastName || sortLastName === null) {
      setSort("lastname");
      setSortLastName(true);
    } else {
      setSort("lastname,desc");
      setSortLastName(false);
    }
    setSortUsername(null);
    setSortName(null);
  };

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
        vendedor: orden.vendedor
      });
      console.log("insumo", ordenEdit);
    }
  };
  const pagos = (orden: any) => {
    if (ordenes) {
      setShowModal4(true);
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
        vendedor: orden.vendedor
      });
      console.log("insumo", ordenEdit);
    }
  };
  const edit = (orden: any) => {
    var userTrue : any = user.roles?.find((e: any) => e.name === "vendedor" )
    if(userTrue){
      Swal.fire(
        `Hola, ${user.name}. No tiene autorización para editar ordenes`,
        'Comuníquese con un encargado',
        'error'
        )
    }else{
      setShowModal2(true);
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
vendedor: orden.vendedor
      });
      console.log("insumo", ordenEdit);
      
    }
  };
  return (
    <Layout>
     
      <div className="xl:container mx-auto px-4 sm:px-8">
        <div className="py-3">
          <div className="bg-[#77B327] h-16 flex items-center rounded">
            <h2 className="px-4 sm:px-4 text-3xl text-zinc-800 font-semibold leading-tight">
              Ordenes
            </h2>
          </div>
          
          <div className="my-3 flex sm:flex-row flex-col">
            <div className="flex flex-row mb-1 sm:mb-0">
              <div className="relative">
                <select
                  className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={userPerPage}
                >
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                placeholder="Buscar por N° de factura"
                onChange={handleChange}
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8  overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              
                <table className="min-w-full leading-normal relative">
                  <thead>
                    <tr className="bg-gray-100 text-left text-gray-600 font-semibold uppercase">
                      <th
                        className="hover:bg-gray-300 px-3 py-3 border-b-2 border-gray-200 cursor-pointer tracking-wider"
                        onClick={sortByUsername}
                      >
                        <div className="flex justify-between gap-2">
                          FECHA
                          <div
                            className={`${
                              sortUsername === null && "opacity-0"
                            }`}
                          >
                            <MdExpandLess
                              className={`text-red-600 ${
                                sortUsername && sortUsername !== null
                                  ? "opacity-100"
                                  : "opacity-40"
                              }`}
                            />
                            <MdExpandMore
                              className={`-mt-2 text-red-600 ${
                                !sortUsername ? "opacity-100" : "opacity-40"
                              }`}
                            />
                          </div>
                        </div>
                      </th>
                      <th
                        className="hover:bg-gray-300 px-3 py-3 border-b-2 border-gray-200 cursor-pointer tracking-wider"
                        onClick={sortByName}
                      >
                        <div className="flex justify-between gap-2">
                          CLIENTE
                          <div
                            className={`${sortName === null && "opacity-0"}`}
                          >
                            <MdExpandLess
                              className={`text-red-600 ${
                                sortName ? "opacity-100" : "opacity-40"
                              }`}
                            />
                            <MdExpandMore
                              className={`-mt-2 text-red-600 ${
                                !sortName ? "opacity-100" : "opacity-40"
                              }`}
                            />
                          </div>
                        </div>
                      </th>
                      <th
                        className="hover:bg-gray-300 px-3 py-3 border-b-2 border-gray-200 cursor-pointer tracking-wider"
                        onClick={sortByLastName}
                      >
                        <div className="flex justify-between gap-2">
                          CONTACTO
                          <div
                            className={`${
                              sortLastName === null && "opacity-0"
                            }`}
                          >
                            <MdExpandLess
                              className={`text-red-600 ${
                                sortLastName ? "opacity-100" : "opacity-40"
                              }`}
                            />
                            <MdExpandMore
                              className={`-mt-2 text-red-600 ${
                                !sortLastName ? "opacity-100" : "opacity-40"
                              }`}
                            />
                          </div>
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
                        pagos
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                        VER
                      </th>
                      
                      <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                        EDITAR
                      </th>
                      <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                        ELIMINAR
                      </th>
                      
                      <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                        ESTADO
                      </th>
                    </tr>
                  </thead>
                  {
                    <tbody>
                      {ordenes.ordenes?.map((orden: any, index: number) => (
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
                             <MdAttachMoney />
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
                        <td className="px-3 py-2 ">
                        <p
                            className="text-gray-900 whitespace-no-wrap capitalize justify-center flex text-xl cursor-pointer"
                            onClick={() =>pagos(orden)}
                          >
                             
                             <BsSearch />
                          </p>
                          <ModalVerOrdenPago
                            showModal4={showModal4}
                            setShowModal4={setShowModal4}
                          >
                            <VerOrdenes
                              setShowModal4={setShowModal4}
                              orden={ordenEdit}
                            />
                          </ModalVerOrdenPago>
                        </td>
                          <td className="px-3 py-2 ">
                          <p
                            className="text-gray-900 whitespace-no-wrap capitalize justify-center flex text-xl cursor-pointer"
                            onClick={() => edit(orden)}
                            style={orden.resta? {"cursor": "notAllowed", "pointerEvents":"none"}:{"cursor":"pointer"}}
                          >
                            <FiEdit3 />
                          </p>
                          <ModalEdit
                            showModal2={showModal2}
                            setShowModal2={setShowModal2}
                          >
                            <EditOrden
                              setShowModal2={setShowModal2}
                              orden={ordenEdit}
                            />
                          </ModalEdit>
                          </td>
                          <td className="px-3 py-2 ">
                            <p
                              className="text-gray-900 whitespace-no-wrap capitalize justify-center flex text-xl cursor-pointer"
                              style={{ cursor: "pointer" }}
                              onClick={() => DeleteOrden(orden)}
                            >
                              {<MdDelete />}
                            </p>
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
              
              <div className="px-3 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                <div className="flex gap-2 align-center items-center xs:mt-0">
                  <button onClick={firtPage}>
                    <MdFirstPage
                      className={`text-2xl text-red-600 ${
                        page === 1 && "opacity-50"
                      }`}
                    />
                  </button>
                  <button onClick={prevPage}>
                    <MdKeyboardArrowLeft
                      className={`text-2xl text-red-600 ${
                        page === 1 && "opacity-50"
                      }`}
                    />
                  </button>

                  <span className="text-base xs:text-xs text-gray-900">
                    {`Página ${ordenes.page} de ${ordenes.totalPages}`}
                  </span>

                  <button onClick={nextPage}>
                    <MdKeyboardArrowRight
                      className={`text-2xl text-red-600 ${
                        page === ordenes.totalPages && "opacity-50"
                      }`}
                    />
                  </button>

                  <button onClick={lastPage}>
                    <MdLastPage
                      className={`text-2xl text-red-600 ${
                        page === users.totalPages && "opacity-50"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <button
            className="bg-[#77B327] text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            onClick={() => setShowModal(true)}
          >
            <span className="text-white flex items-center gap-2">
              Iniciar nueva orden <MdOutlineAdd className="text-xl" />
            </span>
          </button>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <AddNewOrden setShowModal={setShowModal} ordenes={ordenes.ordenes} />
        </Modal>
      </div>
    </Layout>
  );
};

export default Proveedores;

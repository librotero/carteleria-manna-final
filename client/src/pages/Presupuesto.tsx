import useUser from "../store/user";
import Layout from "../components/Layout/index";
import { useEffect, useState, Fragment } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Modal from "../components/Modal";
import AddNewPresupuesto from "../components/AddNewPresupuesto";
import shallow from "zustand/shallow";
import Swal from 'sweetalert2'
import ModalEdit from "../components/ModalEdit";
import EditPresupuesto from "../components/editPresupuesto";
import ModalVer from "../components/ModalVer";
import useClients from "../store/clientes";


import VerPresupuesto from "../components/VerPresupuesto";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdLastPage,
  MdFirstPage,
  MdOutlineAdd,
  MdExpandLess,
  MdExpandMore,
} from "react-icons/md";

import { BsSearch } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";

import Loader from "../components/Loader";
import useHeaders from "../hooks/useHeaders";
import usePresupuesto from "../store/presupuesto";
import AddNewClient from "../components/AddNewClient";
import moment from "moment";
import Clientes from './Carteles';

const Presupuesto = () => {
  const { users, getUser, user } = useUser((state) => state, shallow);
  const { clientes, getClients } = useClients((state) => state);
  const {
    presupuestos,
    getPresupuestos,
    getPresupuestosAll,
    loading,
    success,
    deletePresupuestos,
  } = usePresupuesto((state) => state);
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const [rol, setRol] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
const [cliente, setCliente]= useState({})
  const [sortUsername, setSortUsername] = useState<null | boolean>(true);
  const [sortName, setSortName] = useState<null | boolean>(null);
  const [sortLastName, setSortLastName] = useState<null | boolean>(null);
  const [presupuestoEdit, setPresupuestoEdit] = useState({
    fecha: "",
    clientes: "",
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
    porcentaje:0,
    fechavalida: "",
    id:"",
    vendedor:""
  });
  const [name, setName] = useState('');

  useEffect(() => {
    !success && getPresupuestosAll(accessToken, page, limit, name);
    console.log("holaaaaaadsdsdsdsaaa", presupuestos);
    getClients(headers);
    getUser(accessToken);
    console.log("hola soy clientes", user);
  }, [success, page, limit, name ]);
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {value } = e.currentTarget;
    setName(value);
 

  };
  //delete
  const DeletePresupuesto = (presupuesto: any) => {
  var userTrue : any = user.roles?.find((e: any) => e.name === "vendedor" )
  if(userTrue){
    Swal.fire(
      `Hola, ${user.name}. No tiene autorización para eliminar presupuestos`,
      'Comuníquese con un encargado',
      'error'
      )
  }else{
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
        deletePresupuestos(presupuesto._id, headers);
			}
		  })
  }

    
  };

  const nextPage = (): void => {
    page < presupuestos.totalPages && setPage(page + 1);
  };

  const prevPage = (): void => {
    page > 1 && setPage(page - 1);
  };

  const firtPage = (): void => {
    page !== 1 && setPage(1);
  };

  const lastPage = (): void => {
    page !== presupuestos.totalPages && setPage(presupuestos.totalPages);
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

  const edit = (presupuesto: any) => {
    var userTrue : any = user.roles?.find((e: any) => e.name === "vendedor" )
  if(userTrue){
    Swal.fire(
      `Hola, ${user.name}. No tiene autorización para editar presupuestos`,
      'Comuníquese con un encargado',
      'error'
      )
  }else{
    setShowModal2(true);
    console.log("holaaa esto es lo que mando", presupuesto)
    setPresupuestoEdit({
      fecha: presupuesto.fecha,
      clientes: presupuesto.clientes,
      contacto: presupuesto.contacto, //nombre de contacto
      carteles: presupuesto.carteles,
      operacion: presupuesto.operacion,
      lugardecolocacion: presupuesto.lugardecolocacion,
      lugartraslado: presupuesto.lugartraslado,
      seña: presupuesto.seña,
      formadepago: JSON.stringify(presupuesto.formadepago),
      fechaentrega: presupuesto.fechaentrega,
      facturanum: presupuesto.facturanum,
      observaciones: presupuesto.observaciones,
      montototal: presupuesto.montototal,
      porcentaje: presupuesto.porcentaje,
      id: presupuesto._id,
      fechavalida: presupuesto.fechavalida,
      vendedor:presupuesto.vendedor
    });
    console.log("insumo", presupuestoEdit);
     
    }

  };
  const ver = (presupuesto: any) => {
    if (presupuesto) {
    var  clienteNew: any= clientes.find((e: any) => e.name === presupuesto.clientes);
    setCliente(clienteNew)
      setShowModal3(true);
      setPresupuestoEdit({
        fecha: presupuesto.fecha,
        clientes: presupuesto.clientes,
        contacto: presupuesto.contacto, //nombre de contacto
        carteles: presupuesto.carteles,
        operacion: presupuesto.operacion,
        lugardecolocacion: presupuesto.lugardecolocacion,
        lugartraslado: presupuesto.lugartraslado,
        seña: presupuesto.seña,
        formadepago: JSON.stringify(presupuesto.formadepago),
        fechaentrega: presupuesto.fechaentrega,
        facturanum: presupuesto.facturanum,
        observaciones: presupuesto.observaciones,
        montototal: presupuesto.montototal,
        porcentaje: presupuesto.porcentaje,
        id: presupuesto._id,
        fechavalida: presupuesto.fechavalida,
        vendedor:presupuesto.vendedor
      });
    }
  };

  return (
    <Layout>
      <div className="xl:container mx-auto px-4 sm:px-8">
        <div className="py-3">
          <div className="bg-[#77B327] h-16 flex items-center rounded">
            <h2 className="px-4 sm:px-4 text-3xl text-zinc-800 font-semibold leading-tight">
              Presupuestos
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
                placeholder="Buscar por clientes"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                onChange={handleChange}
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
                        Fecha
                        <div
                          className={`${sortUsername === null && "opacity-0"}`}
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
                        Clientes
                        <div className={`${sortName === null && "opacity-0"}`}>
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

                    <th className="px-3 py-3 border-b-2 border-gray-20 tracking-wider">
                      Operación
                    </th>

                    <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                      Total
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                      ver
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                      editar
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                      eliminar
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                     estado
                    </th>
                  </tr>
                </thead>
                {!loading && (
                  <tbody>
                    {presupuestos.presupuestos?.map((presupuesto: any, index: number) => (
                      <tr
                        key={presupuesto._id}
                        className={`border-b border-gray-200 text-base ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-gray-100`}
                      >
                        <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {moment(presupuesto.fecha).format('L')}
                          </p>
                        </td>
                        <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap capitalize">
                            {presupuesto.clientes?
                           presupuesto.clientes
                          :
                          "hola no hay "}
                          </p>
                        </td>

                        <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap capitalize">
                            {presupuesto.operacion
                              ? presupuesto.operacion
                              : "hola"}
                          </p>
                        </td>

                        <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap capitalize">
                            {presupuesto.montototal
                              ? presupuesto.montototal
                              : "hola"}
                          </p>
                        </td>
                        <td className="px-3 py-2">
                        <p
                            className="text-gray-900 whitespace-no-wrap capitalize"
                            onClick={() => ver(presupuesto)}
                          >
                             <BsSearch />
                          </p>
                          <ModalVer
                            showModal3={showModal3}
                            setShowModal3={setShowModal3}
                          >
                            <VerPresupuesto
                              setShowModal3={setShowModal3}
                              presupuesto={presupuestoEdit}
                              cliente={cliente}
                            />
                          </ModalVer>
                        </td>
                        <td className="px-3 py-2">
                          <p
                            className="text-gray-900 whitespace-no-wrap capitalize"
                            onClick={() => edit(presupuesto)}
                        style={presupuesto.orden===true? {"cursor": "notAllowed", "pointerEvents":"none"}:{"cursor":"pointer"}}
                          >
                            <FiEdit3 />
                          </p>
                          <ModalEdit
                            showModal2={showModal2}
                            setShowModal2={setShowModal2}
                          >
                            <EditPresupuesto
                              setShowModal2={setShowModal2}
                              presupuesto={presupuestoEdit}
                            />
                          </ModalEdit>
                          </td>
                        <td className="px-3 py-2" 
>                          <p
                            className="text-gray-900 whitespace-no-wrap capitalize"
                            style={{ cursor: "pointer" }}
                            onClick={() => DeletePresupuesto(presupuesto)}
                          >
                            {<MdDelete />}
                          </p>
                        </td>
                        <td className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                      {presupuesto.orden===false? <h1 className="bg-black text-white text-center w-20 rounded-lg p-1">No</h1> : <h1 className="bg-yellow-600 text-center w-20 rounded-lg p-1 text-white">Aprobado</h1>}
                    </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
              {loading && (
                <div>
                  <Loader />
                </div>
              )}
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
                    {`Página ${presupuestos.page} de ${presupuestos.totalPages}`}
                  </span>

                  <button onClick={nextPage}>
                    <MdKeyboardArrowRight
                      className={`text-2xl text-red-600 ${
                        page === presupuestos.totalPages && "opacity-50"
                      }`}
                    />
                  </button>

                  <button onClick={lastPage}>
                    <MdLastPage
                      className={`text-2xl text-red-600 ${
                        page === presupuestos.totalPages && "opacity-50"
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
              Crear Presupuesto <MdOutlineAdd className="text-xl" />
            </span>
          </button>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <AddNewPresupuesto setShowModal={setShowModal} />
        </Modal>
      </div>
    </Layout>
  );
};

export default Presupuesto;

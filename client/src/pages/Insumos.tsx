import useUser from "../store/user";
import Layout from "../components/Layout/index";
import { useEffect, useState, Fragment } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Modal from "../components/Modal";
import ModalVer from "../components/ModalVer";

import VerInsumo from '../components/VerInsumo'
import AddNewInsumo from "../components/addNewInsumo";
import EditInsumo from "../components/EditInsumo";
import shallow from "zustand/shallow";
import useInsumo from "../store/insumo";
import useProveedor from "../store/proveedores";


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
import  Swal from 'sweetalert2';
import Loader from "../components/Loader";
import useHeaders from "../hooks/useHeaders";
import useClients from "../store/clientes";
import AddNewClient from "../components/AddNewClient";
import ModalEdit from "../components/ModalEdit";
const Clientes = () => {
  const { users, getUsers } = useUser((state:any) => state, shallow);
  const { getInsumosAll, getInsumos, insumos, insumos2, deleteIsumos, loading, success } = useInsumo(
    (state:any) => state
  );
  const { proveedores, getProveedores } = useProveedor((state:any) => state);

  const [rol, setRol] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(10);
  const [limit, setLimit] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
const [proveedorInsumo, setProveedorInsumo]=useState({})
  const [insumoEdit, setInsumoEdit] = useState({
    id: "",
    name: "",
    descripcion: "",
    unidad: "",
    costo: "",
    category: "",
    proveedor: "",
    another:""
  });

  const [sortUsername, setSortUsername] = useState<null | boolean>(true);
  const [sortName, setSortName] = useState<null | boolean>(null);
  const [sortLastName, setSortLastName] = useState<null | boolean>(null);
  const [accessToken] = useLocalStorage();
  const [name, setName] = useState('');

  const headers = useHeaders(accessToken);
  useEffect(() => {
    getInsumosAll(accessToken, limit, page, name);
    getProveedores(headers)
    getInsumos(headers)
  }, [limit, page, name]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {value } = e.currentTarget;
    setName(value);
 

  };
  //delete
  const DeleteInsumo = (insumo: any) => {
    Swal.fire({
			title: '¿Estás seguro?',
			text: "No podrás revertir los cambios",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#77B327',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Eliminarlo!'
		  }).then((result:any) => {
			if (result.isConfirmed) {
			  Swal.fire(
				'Eliminado!',
				'X ha sido eliminado',
				'success'
			  )
        var newArray:any = insumos.insumos
        var arrayeliminado : any =insumos.insumos.filter((e:any)=>e._id!==insumo._id)
        insumos.insumos=arrayeliminado
        deleteIsumos(insumo._id, headers);
			}
		  })
  };

  const nextPage = (): void => {
    page < insumos.totalPages && setPage(page + 1);
  };

  const prevPage = (): void => {
    page > 1 && setPage(page - 1);
  };

  const firtPage = (): void => {
    page !== 1 && setPage(1);
  };

  const lastPage = (): void => {
    page !== insumos.totalPages && setPage(insumos.totalPages);
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

  const edit = (insumo: any) => {
    if (insumo) {
      setShowModal2(true);
      console.log("hola", insumo._id);
      setInsumoEdit({
        id: insumo._id,
        name: insumo.name,
        descripcion: insumo.descripcion,
        unidad: insumo.unidad,
        costo: insumo.costo,
        category: insumo.category,
        proveedor: insumo.proveedor,
        another:""
      });
      
    }
  };
  const ver = (insumo: any) => {
    if (insumo) {
      setShowModal3(true);
      var anotherInsumos: any = insumos2.filter((e:any)=>e.name===insumo.name)
      setInsumoEdit({
        id: insumo._id,
        name: insumo.name,
        descripcion: insumo.descripcion,
        unidad: insumo.unidad,
        costo: insumo.costo,
        category: insumo.category,
        proveedor: insumo.proveedor,
        another: anotherInsumos,
      });
    }
    console.log("hola",insumoEdit)
  var object:any = proveedores.find(
      (e: any) => e.name === insumo.proveedor
    );
    setProveedorInsumo(object)
  };
  return (
    <Layout>
      <div className="xl:container mx-auto px-4 sm:px-8">
        <div className="py-3">
          <div className="bg-[#77B327] h-16 flex items-center rounded">
            <h2 className="px-4 sm:px-4 text-3xl text-zinc-800 font-semibold leading-tight">
              Insumos
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
                placeholder="Buscar por nombre"
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
                        Nombre
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
                        descripción
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
                    <th
                      className="hover:bg-gray-300 px-3 py-3 border-b-2 border-gray-200 cursor-pointer tracking-wider"
                      onClick={sortByLastName}
                    >
                      <div className="flex justify-between gap-2">
                        categoría
                        <div
                          className={`${sortLastName === null && "opacity-0"}`}
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
                    <th className="px-3 py-3 border-b-2 border-gray-20 tracking-wider">
                      unidad
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200  tracking-wider">
                      costo
                    </th>
                    <th className="px-3 py-3 border-b-2 border-gray-200 tracking-wider">
                      proveedor
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
                  </tr>
                </thead>
                {
                  <tbody>
                    {insumos.insumos?.map((insumo: any, index: number) => (
                      <tr
                        key={insumo._id}
                        className={`border-b border-gray-200 text-base ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-gray-100`}
                      >
                        <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {insumo.name}
                          </p>
                        </td>
                        <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap capitalize">
                            {insumo.descripcion}
                          </p>
                        </td>
                        <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap capitalize">
                            {insumo.category}
                          </p>
                        </td>
                        <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {insumo.unidad}
                          </p>
                        </td>
                        <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {insumo.costo}
                          </p>
                        </td>
                        <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {insumo.proveedor}
                          </p>
                        </td>
                        <td className="px-3 py-2">
                        <p
                            className="text-gray-900 whitespace-no-wrap capitalize"
                            onClick={() => ver(insumo)}
                          >
                             <BsSearch />
                          </p>
                          <ModalVer
                            showModal3={showModal3}
                            setShowModal3={setShowModal3}
                          >
                            <VerInsumo
                              setShowModal3={setShowModal3}
                              insumo={insumoEdit}
                              proveedorInsumo={proveedorInsumo}
                            />
                          </ModalVer>
                        </td>
                        <td className="px-3 py-2">
                          <p
                            className="text-gray-900 whitespace-no-wrap capitalize"
                            onClick={() => edit(insumo)}
                          >
                            <FiEdit3 />
                          </p>
                          <ModalEdit
                            showModal2={showModal2}
                            setShowModal2={setShowModal2}
                          >
                            <EditInsumo
                              setShowModal2={setShowModal2}
                              insumo={insumoEdit}
                            />
                          </ModalEdit>
                        </td>
                        <td className="px-3 py-2">
                          <p
                            className="text-gray-900 whitespace-no-wrap capitalize"
                            style={{ cursor: "pointer" }}
                            onClick={() => DeleteInsumo(insumo)}
                          >
                            {<MdDelete />}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                }
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
                    {`Página ${insumos.page} de ${insumos.totalPages}`}
                  </span>

                  <button onClick={nextPage}>
                    <MdKeyboardArrowRight
                      className={`text-2xl text-red-600 ${
                        page === insumos.totalPages && "opacity-50"
                      }`}
                    />
                  </button>

                  <button onClick={lastPage}>
                    <MdLastPage
                      className={`text-2xl text-red-600 ${
                        page === insumos.totalPages && "opacity-50"
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
              Agregar nuevo Insumo <MdOutlineAdd className="text-xl" />
            </span>
          </button>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <AddNewInsumo setShowModal={setShowModal} insumos={insumos.insumos} />
        </Modal>
      </div>
    </Layout>
  );
};

export default Clientes;

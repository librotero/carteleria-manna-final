import useUser from "../store/user";
import useInsumo from "../store/insumo";

import Layout from "../components/Layout/index";
import { useEffect, useState, Fragment } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Modal from "../components/Modal";
import AddNewCartel from "../components/AddNewCartel";
import shallow from "zustand/shallow";
import Swal from "sweetalert2";
import EditCartel from "../components/editCartel";
import ModalEdit from "../components/ModalEdit";
import ModalVer from "../components/ModalVer";
import VerCartel from "../components/VerCartel";



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
import useCarteles from "../store/carteles";

const Clientes = () => {
  const { carteles, getCartelesAll, deleteCartel, loading } = useCarteles(
    (state:any) => state
  );
  const { insumos2, getInsumos } = useInsumo(
    (state:any) => state
  );
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const [rol, setRol] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  const [sortUsername, setSortUsername] = useState<null | boolean>(true);
  const [sortName, setSortName] = useState<null | boolean>(null);
  const [sortLastName, setSortLastName] = useState<null | boolean>(null);
  const [cartelEdit, setCartelEdit] = useState({
    id: "",
    descripcion: "",
    costo1faz: 0,
    costo2faz: 0,
    insumosArray: [],
    category: [],
  });
  const [name, setName] = useState('');

  useEffect(() => {
    getCartelesAll(accessToken, page, limit, name);
    getInsumos(headers)
  }, [rol, sort, page, limit, name]);
  
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {value } = e.currentTarget;
    setName(value);
 
  };
  //delete

  const nextPage = (): void => {
    page < carteles.totalPages && setPage(page + 1);
  };

  const prevPage = (): void => {
    page > 1 && setPage(page - 1);
  };

  const firtPage = (): void => {
    page !== 1 && setPage(1);
  };

  const lastPage = (): void => {
    page !== carteles.totalPages && setPage(carteles.totalPages);
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

  const DeleteCartel = (cartel: any) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No seras capaz de revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#77B327",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminarlo!",
    }).then((result:any) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "X ha sido eliminado", "success");
        console.log("hola delte");
        deleteCartel(cartel._id, headers);
        var array: any = carteles.carteles.filter((e:any)=>e._id!==cartel._id)
        carteles.carteles= array
      }
    });
  };

  const edit = (cartel: any) => {
    if (cartel) {
      setShowModal2(true);
      console.log("hola", cartel);
      setCartelEdit({
        id: cartel._id,
        descripcion: cartel.descripcion,
        costo1faz: cartel.costo1faz,
        costo2faz: cartel.costo2faz,
        insumosArray: cartel.insumosArray,
        category: cartel.insumosArray,
      });
    }
  };
  const ver = (cartel: any) => {
    if (cartel) {
      setShowModal3(true);
      console.log("hola", cartel);
      setCartelEdit({
        id: cartel._id,
        descripcion: cartel.descripcion,
        costo1faz: cartel.costo1faz,
        costo2faz: cartel.costo2faz,
        insumosArray: cartel.insumosArray,
        category: cartel.category,
      });
      console.log("holasasasasasasasasasasasa", cartelEdit.insumosArray)
    }
  };
  return (
    <Layout>
      <div className="xl:container mx-auto px-4 sm:px-8">
        <div className="py-3">
          <div className="bg-[#77B327] h-16 flex items-center rounded">
            <h2 className="px-4 sm:px-4 text-3xl text-zinc-800 font-semibold leading-tight">
              Carteles
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
                placeholder="Buscar por descripcion"
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
                        Descripción
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
                        Costo 1 faz
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
                        Costo 2 faz
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
                    {carteles.carteles?.map((cartel: any, index: number) => (
                      <tr
                        key={cartel._id}
                        className={`border-b border-gray-200 text-base ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-gray-100`}
                      >
                        <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {cartel.descripcion}
                          </p>
                        </td>
                        <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap capitalize">
                            {cartel.costo1faz}
                          </p>
                        </td>
                        <td className="px-3 py-2">
                          <p className="text-gray-900 whitespace-no-wrap capitalize">
                            {cartel.costo2faz}
                          </p>
                        </td>

                        <td className="px-3 py-2">
                        <p
                            className="text-gray-900 whitespace-no-wrap capitalize"
                            onClick={() => ver(cartel)}
                          >
                             <BsSearch />
                          </p>
                          <ModalVer
                            showModal3={showModal3}
                            setShowModal3={setShowModal3}
                          >
                            <VerCartel
                              setShowModal3={setShowModal3}
                              cartel={cartelEdit}
                            />
                          </ModalVer>
                        </td>
                        <td className="px-3 py-2">
                          <p
                            className="text-gray-900 whitespace-no-wrap capitalize"
                            onClick={() => edit(cartel)}
                          >
                            <FiEdit3 />
                          </p>
                          <ModalEdit
                            showModal2={showModal2}
                            setShowModal2={setShowModal2}
                          >
                            <EditCartel
                              setShowModal2={setShowModal2}
                              cartel={cartelEdit}
                              insumos2={insumos2}
                            />
                          </ModalEdit>
                        </td>
                        <td className="px-3 py-2">
                          <p
                            className="text-gray-900 whitespace-no-wrap capitalize"
                            style={{ cursor: "pointer" }}
                            onClick={() => DeleteCartel(cartel)}
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
                    {`Página ${carteles.page} de ${carteles.totalPages}`}
                  </span>

                  <button onClick={nextPage}>
                    <MdKeyboardArrowRight
                      className={`text-2xl text-red-600 ${
                        page === carteles.totalPages && "opacity-50"
                      }`}
                    />
                  </button>

                  <button onClick={lastPage}>
                    <MdLastPage
                      className={`text-2xl text-red-600 ${
                        page === carteles.totalPages && "opacity-50"
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
              Agregar nuevo cliente <MdOutlineAdd className="text-xl" />
            </span>
          </button>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <AddNewCartel setShowModal={setShowModal} carteles={carteles.carteles} insumos2={insumos2}/>
        </Modal>
      </div>
    </Layout>
  );
};

export default Clientes;

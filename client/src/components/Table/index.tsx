import React from 'react'
import useInsumo from "../../store/insumo";
import { useEffect, useState, Fragment } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Swal from "sweetalert2";
import ModalEdit from "../../components/ModalEdit";
import ModalVer from "../../components/ModalVer";
import ContentClient from './contentClient'
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
import Loader from "../../components/Loader";
import useHeaders from "../../hooks/useHeaders";
import FormEdit from '../FormEdit';

type Props = {
    items: any;
    itemGeneral: any;
    tableItems: any
    loading: any
    text: any
    setShowModal2: any;
    showModal2:any;
    TextForm: any;
    closeModal: any;
    values: any;
    addEdit: any;
    setValues: any
    errors: any;
    valuesBody: any;
    edit:any
}
const Table = ({ edit, errors, showModal2, setShowModal2, addEdit, setValues, TextForm, closeModal, values, valuesBody, items, itemGeneral, tableItems, loading, text }: Props) => {



    const [accessToken] = useLocalStorage();
    const headers = useHeaders(accessToken);
    const [rol, setRol] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
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


    useEffect(() => {
        console.log("jaaaaaaaaaaaaaaaaaaaaa", items)
    }, [rol, sort, page, limit, name]);


    //delete

    const nextPage = (): void => {
        page < itemGeneral.totalPages && setPage(page + 1);
    };

    const prevPage = (): void => {
        page > 1 && setPage(page - 1);
    };

    const firtPage = (): void => {
        page !== 1 && setPage(1);
    };

    const lastPage = (): void => {
        page !== itemGeneral.totalPages && setPage(itemGeneral.totalPages);
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

    const DeleteItem = (item: any) => {
        Swal.fire({
            title: "¿Estas seguro?",
            text: "No seras capaz de revertir los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#77B327",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminarlo!",
        }).then((result: any) => {
            if (result.isConfirmed) {
                Swal.fire("Eliminado!", "X ha sido eliminado", "success");
                console.log("hola delte");
                //deleteItem(cartel._id, headers);
                var array: any = items.filter((e: any) => e._id !== item._id)
                items = array
            }
        });
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
    const asignarContent = (item: any) => {
        switch (text) {
            case "clientes": return <ContentClient item={item} />
                break;
            case "proveedores": return <ContentClient item={item} />
                break;
            case "insumos": return <ContentClient item={item} />
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8  overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal relative">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-600 font-semibold uppercase">
                                {
                                    tableItems.map((item: any) => (
                                        <th className="px-3 py-3 border-b-2 border-gray-20 tracking-wider">
                                            {item}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        {!loading && (
                            <tbody>
                                {items?.map((item: any, index: number) => (
                                    <tr
                                        key={item._id}
                                        className={`border-b border-gray-200 text-base ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                            } hover:bg-gray-100`}
                                    >
                                        {
                                            asignarContent(item)
                                        }
                                        <td className="px-3 py-2">
                                            <p
                                                className="text-gray-900 whitespace-no-wrap capitalize"
                                                onClick={() => ver(item)}
                                            >
                                                <BsSearch />
                                            </p>
                                            <ModalVer
                                                showModal3={showModal3}
                                                setShowModal3={setShowModal3}

                                            >
                                                ver
                                            </ModalVer>
                                        </td>
                                        <td className="px-3 py-2">
                                            <p
                                                className="text-gray-900 whitespace-no-wrap capitalize"
                                                onClick={() => edit(item)}
                                            >
                                                <FiEdit3 />
                                            </p>
                                            <ModalEdit
                                                showModal2={showModal2}
                                                setShowModal2={setShowModal2}
                                            >
                                                <FormEdit
                                                    setShowModal={setShowModal2}
                                                    TextForm={TextForm}
                                                    closeModal={closeModal}
                                                    values={values}
                                                    add={addEdit}
                                                    setValues={setValues}
                                                    errors={errors}
                                                    valuesBody={valuesBody}
                                                />
                                            </ModalEdit>
                                        </td>
                                        <td className="px-3 py-2">
                                            <p
                                                className="text-gray-900 whitespace-no-wrap capitalize"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => DeleteItem(item)}
                                            >
                                                {<MdDelete />}
                                            </p>
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
                                    className={`text-2xl text-red-600 ${page === 1 && "opacity-50"
                                        }`}
                                />
                            </button>
                            <button onClick={prevPage}>
                                <MdKeyboardArrowLeft
                                    className={`text-2xl text-red-600 ${page === 1 && "opacity-50"
                                        }`}
                                />
                            </button>

                            <span className="text-base xs:text-xs text-gray-900">
                                {`Página ${itemGeneral.page} de ${itemGeneral.totalPages}`}
                            </span>

                            <button onClick={nextPage}>
                                <MdKeyboardArrowRight
                                    className={`text-2xl text-red-600 ${page === itemGeneral.totalPages && "opacity-50"
                                        }`}
                                />
                            </button>

                            <button onClick={lastPage}>
                                <MdLastPage
                                    className={`text-2xl text-red-600 ${page === itemGeneral.totalPages && "opacity-50"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
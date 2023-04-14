import React, { useState, useEffect } from 'react'
import {
    MdKeyboardArrowRight,
    MdKeyboardArrowLeft,
    MdLastPage,
    MdFirstPage
} from "react-icons/md";
import useLocalStorage from '../../../hooks/useLocalStorage';

type Props = {
    items: any;
    itemGeneral: any;
    tableItems: any
    loading: any
    text: any
    setShowModal2: any;
    showModal2: any;
    TextForm: any;
    closeModal: any;
    values: any;
    addEdit: any;
    setValues: any
    errors: any;
    valuesBody: any;
    edit: any
    actionDelete: any
    getItemsAll:any
}

const Paginado = ({ edit, getItemsAll, actionDelete, errors, showModal2, setShowModal2, addEdit, setValues, TextForm, closeModal, values, valuesBody, items, itemGeneral, tableItems, loading, text }: Props) => {

    const [accessToken] = useLocalStorage();
    const [rol, setRol] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sortUsername, setSortUsername] = useState<null | boolean>(true);
    const [sortName, setSortName] = useState<null | boolean>(null);
    const [sortLastName, setSortLastName] = useState<null | boolean>(null);

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

    useEffect(() => {
        console.log("jaaaaaaaaaaaaaaaaaaaaa", items)
        getItemsAll(accessToken, page, limit, name);
    }, [rol, sort, page, limit, name]);

  return (
   <>
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
   </>
  )
}

export default Paginado
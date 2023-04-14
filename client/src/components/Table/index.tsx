import React from 'react'
import ContentClient from './contentClient';
import ContentProveedor from './contentProveedor';
import Loader from "../../components/Loader";
import Head from './Head';
import Body from './Body';
import Paginado from './Paginado';

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
    getItemsAll: any
}

const Table = ({ 
    edit, 
    getItemsAll, 
    actionDelete, 
    errors, 
    showModal2, 
    setShowModal2, 
    addEdit, 
    setValues,
    closeModal,
    values, 
    valuesBody, 
    items, 
    itemGeneral, 
    tableItems, 
    loading, 
    text 
}: Props) => {


    {/**
   const [cartelEdit, setCartelEdit] = useState({
        id: "",
        descripcion: "",
        costo1faz: 0,
        costo2faz: 0,
        insumosArray: [],
        category: [],
    });



    //delete



    const ver = (cartel: any) => {
        if (cartel) {
            //setShowModal3(true);
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
    }; */}


    return (
        <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8  overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal relative">
                        <Head tableItems={tableItems} />
                        {!loading && (
                            <Body
                                text={"clientes"}
                                items={items}
                                itemGeneral={itemGeneral}
                                tableItems={tableItems}
                                loading={loading}
                                addEdit={addEdit}
                                setShowModal2={setShowModal2}
                                showModal2={showModal2}
                                TextForm={"Editar Cliente"}
                                closeModal={closeModal}
                                values={values}
                                setValues={setValues}
                                errors={errors}
                                valuesBody={valuesBody}
                                edit={edit}
                                actionDelete={actionDelete}
                            />
                        )}
                    </table>

                    {loading && (
                        <div>
                            <Loader />
                        </div>
                    )}

                    <Paginado
                        text={"clientes"}
                        items={items}
                        itemGeneral={itemGeneral}
                        tableItems={tableItems}
                        loading={loading}
                        addEdit={addEdit}
                        setShowModal2={setShowModal2}
                        showModal2={showModal2}
                        TextForm={"Editar Cliente"}
                        closeModal={closeModal}
                        values={values}
                        setValues={setValues}
                        errors={errors}
                        valuesBody={valuesBody}
                        edit={edit}
                        actionDelete={actionDelete}
                        getItemsAll={getItemsAll}
                    />

                </div>
            </div>
        </div>
    )
}

export default Table
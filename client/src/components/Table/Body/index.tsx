import React from 'react'
import ContentClient from '../contentClient/index'
import ContentProveedor from '../contentProveedor/index'
import { BsSearch } from "react-icons/bs";
import FormEdit from '../../FormEdit';
import ModalEdit from '../../ModalEdit';
import ModalVer from '../../ModalVer'
import DeleteBtn from '../../DeleteBtn';

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
}

const Body = ({ edit,  actionDelete, errors, showModal2, setShowModal2, addEdit, setValues, TextForm, closeModal, values, valuesBody, items, itemGeneral, tableItems, loading, text }: Props) => {

    const asignarContent = (item: any) => {
        switch (text) {
            case "clientes": return <ContentClient item={item} />
                break;
            case "proveedores": return <ContentProveedor item={item} />
                break;
            case "insumos": return <ContentClient item={item} />
                break;
            default:
                break;
        }
    }


    return (
        <tbody>
        {items?.map((item: any, index: number) => (
            <tr
                key={item._id}
                className={`border-b border-gray-200 text-base ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
            >
                {
                    asignarContent(item)
                }
                <td className="px-3 py-2">
                    <p
                        className="text-gray-900 whitespace-no-wrap capitalize"
                        
                    >
                    </p>
                    
                </td>
                <td className="px-3 py-2">
                    <p
                        className="text-gray-900 whitespace-no-wrap capitalize"
                        onClick={() => edit(item)}
                    >
                        efit
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
                    <DeleteBtn items={items} actionDelete={actionDelete} item={item}/>
                </td>
            </tr>
        ))}
    </tbody>
    )
}

export default Body
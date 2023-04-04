import React from 'react'
import Swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import useHeaders from '../../hooks/useHeaders';
import useLocalStorage from '../../hooks/useLocalStorage';

type Props = {
    items: any;
    actionDelete: any;
    item: any;
}
const DeleteBtn = ({ items, actionDelete, item }: Props) => {

    const [accessToken] = useLocalStorage();
    const headers = useHeaders(accessToken);

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
                actionDelete(item._id, headers);
                var array: any = items.filter((e: any) => e._id !== item._id)
                items = array
            }
        });
    };

    return (
        <div
            className="text-gray-900 whitespace-no-wrap capitalize"
            style={{ cursor: "pointer" }}
            onClick={() => DeleteItem(item)}
        >
            {<MdDelete />}
        </div>
    )
}

export default DeleteBtn
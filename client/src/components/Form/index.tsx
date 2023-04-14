import React from 'react'
import Swal from 'sweetalert2';
import { MdError, MdExitToApp } from "react-icons/md";

type Props = {
    setShowModal: any;
    clientes: any;
    TextForm: any;
    closeModal: any;
    values: any;
    add: any;
    setValues: any
    errors: any;
    valuesBody: any;
    proveedores: any;
};

const Form = ({ errors, setShowModal, add, setValues, clientes, TextForm, closeModal, values, valuesBody, proveedores }: Props) => {


    // close form 
    const handleCloseModal = () => {
        setShowModal(false);
        closeModal();
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();


        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cambios guardados exitosamente',
            showConfirmButton: false,
            timer: 1500
        })
        console.log("hola parece qu me va bien ", values)
        add(values);
        var newArray: any = clientes
        newArray.push(values)
        clientes = newArray

        handleCloseModal()
        location.reload()
    };

    function validarFormulario() {
        var form:any = document.getElementById("fomulario");
        var campos:any = form.querySelectorAll("[required]");
      
        for (var i = 0; i < campos.length; i++) {
          if (!campos[i].value) {
            alert("Debe llenar todos los campos obligatorios.");
            return false;
          }
        }
      
        return true;
      }
    const handleChange = (
        e: React.FormEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.currentTarget;
        setValues({
            ...values,
            [name]: value,
        });
        console.log("joaaaaaaaaaaaaaaaa", values)
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let { value } = e.currentTarget;
        setValues({
            ...values,
            proveedor: value
        })
    }
    return (
        <div className="uppercase">
            <div className="flex  bg-[#77B327] text-white  p-5 mb-1 grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">

                <div className="">
                    <h1 className="text-3xl">{TextForm}</h1>
                </div>

                <button
                    className=" text-white  text-4xl w-full h-10  flex justify-end"
                    onClick={handleCloseModal}
                >
                    <MdExitToApp />
                </button>
            </div>

            {/**aqui comienza el form */}
            <form id="formulario" onSubmit={handleSubmit} className='flex justify-center'>
                <div>
                    <div className='flex flex-wrap ml-10 '>
                        {
                            valuesBody.map((e: any, index: any) => (
                                <div className='m-1' key={index}>
                                    {
                                        e.name === "proveedor"
                                            ?
                                            <>
                                                <p className='m-1'>
                                                    {e.name}
                                                </p>
                                                <select
                                                    id='select'
                                                    value={e.name}
                                                    onChange={handleSelect}
                                                    className="px-4  py-4  w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                                                    required
                                               >
                                                    <option value={values.proveedor}>
                                                        {
                                                            values.proveedor === ""
                                                            ?
                                                            "Por favor seleccione un proveedor"
                                                            :
                                                            values.proveedor
                                                        }
                                                    </option>
                                                    {proveedores.map((e: any, index: any) => (
                                                        <option key={index} value={e.name}>{e.name} </option>
                                                    ))}
                                                </select>
                                            </>
                                            :
                                            <>
                                                <p className='m-1'>
                                                    {e.name}
                                                </p>
                                                <input
                                                    type='text'
                                                    name={e.name}
                                                    className='px-4 py-3 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
                                                    placeholder={e.name}
                                                    value={values.e}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </>
                                    }

                                </div>

                            ))
                        }
                    </div>

                    <div className='flex items-center mt-6 justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
                        <button
                            className='text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                            type='button'
                            onClick={handleCloseModal}
                        >
                            Cancelar
                        </button>
                        <button
                            className='bg-[#77B327] text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                            type='submit'
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            </form>

            {/**aqui finaliza el form */}

        </div>
    )
}

export default Form
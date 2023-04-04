import useForm from '../../hooks/useForm';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useInsumo from '../../store/insumo';
import useUser from '../../store/user';
import useProveedor from '../../store/proveedores';
import useHeaders from "../../hooks/useHeaders";
import Swal from 'sweetalert2'

import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdExitToApp  } from "react-icons/md";


type Props = {
	setShowModal: any;
  insumos: any
};
const InsumoPost = ({ setShowModal, insumos }: Props) => {
  
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
    const { insumo, success, postInsumo, closeModal, error} = useInsumo((state) => state);
    const { proveedores, getProveedores} = useProveedor((state) => state);

      const [token] = useLocalStorage();


    
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
      name:'',
      descripcion:'',
      unidad:'',
      costo:'',
      category:'',
      proveedor:''
    });
   useEffect(() => {
    getProveedores(headers)
   },[])

    const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleCloseModal = () => {
		setShowModal(false);
		closeModal();
	};

  const handleSubmit = (e: React.SyntheticEvent) => {
   
    e.preventDefault();
    var newArray: any = insumos
    newArray.push(values)
    insumos=newArray
        postInsumo(values, token)
    
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cambios guardados exitosamente',
          showConfirmButton: false,
          timer: 1500
        })
        setValues({
          name:'',
          descripcion:'',
          unidad:'',
          costo:'',
          category:'',
          proveedor:''
        })
        handleCloseModal()
  }
  const handleSelect= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    setValues({
      ...values,
      proveedor: value,
    });
  }
  return (
    <div className='rounded-lg shadow dark:border md:mt-0 xl:p-0 '>
    <div className='p-6 space-y-4 sm:p-8'>
    <div className="flex border-b-4 border-[#77B327] rounded border-b-4 p-5 mb-1 grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
      
      <div className="">
       <h1 className="text-3xl">Crear Insumo</h1>
      </div>

      <button
        className=" text-black text-4xl w-full h-10  flex justify-end"
        onClick={handleCloseModal}
      >
        <MdExitToApp />
      </button>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col mt-4'>
        <input
          type='text'
          name='name'
          className='px-4 py-3 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
          placeholder='Nombre'
          value={values.name}
          onChange={handleChange}
        />
        {errors.username && (
          <p className='text-red-600 text-sm'>{errors.username}</p>
        )}
        <div className='flex gap-4'>
          <div className='w-full'>
            <input
              type='text'
              name='descripcion'
              className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
              placeholder='Descripción'
              value={values.descripcion}
              onChange={handleChange}
            />
            {errors.name && (
              <p className='text-red-600 text-sm'>{errors.name}</p>
            )}
          </div>
          <div className='w-full'>
            <input
              type='text'
              name='unidad'
              className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
              placeholder='Unidad'
              value={values.unidad}
              onChange={handleChange}
            />
            {errors.lastname && (
              <p className='text-red-600 text-sm'>
                {errors.lastname}
              </p>
            )}
          </div>
        </div>
        <div className="relative">
             <label className="absolute left-2 top-1/3 mt-1.5 ">
                $
                
                </label>
        <input
          type='text'
          name='costo'
          className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
          placeholder='Costo'
          value={values.costo}
          onChange={handleChange}
        />
        {errors.email && (
          <p className='text-red-600 text-sm'>{errors.email}</p>
        )}
        </ div>
        <input
          type='text'
          name='category'
          className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
          placeholder='Categoría'
          value={values.category}
          onChange={handleChange}
        />
        {errors.password && (
          <p className='text-red-600 text-sm'>{errors.password}</p>
        )}
       
        <div className="w-full mt-3 ">
              
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="proveedor"
                value={values.proveedor}
                onChange={handleSelect}
              >
                <option value="" defaultValue={""} disabled>
                  Seleccionar proveedor
                </option>
                {proveedores.map((e: any) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
            </div>
        {errors.password2 && (
          <p className='text-red-600 text-sm'>{errors.password2}</p>
        )}
       
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
      </form>
    </div>
  </div>
  )
}


export default InsumoPost
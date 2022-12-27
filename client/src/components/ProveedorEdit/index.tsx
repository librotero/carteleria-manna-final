import useForm from '../../hooks/useForm';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useProveedor from '../../store/proveedores';
import useUser from '../../store/user';
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError , MdExitToApp} from "react-icons/md";
import Swal from 'sweetalert2';


type Props = {
	setShowModal2: any;
    proveedor:any
};
const ProveedorEdit = ({ setShowModal2, proveedor }: Props) => {
  

    const { success, putProveedor, closeModal, error} = useProveedor((state) => state);
      const [token] = useLocalStorage();


    
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
      id:proveedor.id,
			name: proveedor.name,
		telefono: proveedor.telefono,
		cuit: proveedor.cuit,
		email: proveedor.email,
		direccion: proveedor.direccion,
		web:proveedor.web
    });
   

    const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleCloseModal = () => {
		setShowModal2(false);
		closeModal();
	};

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
       
        Swal.fire({
          title: '¿Desea guardar los cambios?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonColor: '#77B327',
          confirmButtonText: 'Guardar',
          denyButtonText: `No guardar`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('¡Guardado exitosamente!', '', 'success')
            putProveedor(values, token)
            handleCloseModal()
            success
          } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guardados', '', 'info')
          
          }
        })
       
  }

  return (
    <div className='rounded-lg shadow dark:border md:mt-0 xl:p-0 '>
    <div className='p-6 space-y-4 sm:p-8'>
    <div className="flex border-b-4 border-[#77B327] rounded border-b-4 p-5 mb-1">
      
      <div className="w-1/2">
       <h1 className="text-3xl">Editar Proveedor</h1>
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
              name='telefono'
              className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
              placeholder='Descripción'
              value={values.telefono}
              onChange={handleChange}
            />
            {errors.name && (
              <p className='text-red-600 text-sm'>{errors.name}</p>
            )}
          </div>
          <div className='w-full'>
            <input
              type='text'
              name='cuit'
              className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
              placeholder='Unidad'
              value={values.cuit}
              onChange={handleChange}
            />
            {errors.lastname && (
              <p className='text-red-600 text-sm'>
                {errors.lastname}
              </p>
            )}
          </div>
        </div>
        <input
          type='text'
          name='email'
          className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
          placeholder='Costo'
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className='text-red-600 text-sm'>{errors.email}</p>
        )}
        <input
          type='text'
          name='direccion'
          className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
          placeholder='Categoría'
          value={values.direccion}
          onChange={handleChange}
        />
        {errors.password && (
          <p className='text-red-600 text-sm'>{errors.password}</p>
        )}
        <input
          type='text'
          name='web'
          className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
          placeholder='Proveedor'
          value={values.web}
          onChange={handleChange}
        />
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


export default ProveedorEdit
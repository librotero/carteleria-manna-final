import { useEffect, useState } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdExitToApp } from "react-icons/md";
import useProveedores from "../../store/proveedores";
import Swal from 'sweetalert2'

type Props = {
	setShowModal: any;
	proveedor:any
};

interface Values {
	name: string,
    telefono: string,
    cuit: string,
    direccion: string,
    email: string,
    web: string
}

const AddNewProveedor = ({ setShowModal, proveedor }: Props) => {

	const { addProveedores, success, error, closeModal } = useProveedores(
		(state) => state
	);
	const [values, setValues] = useState<Values>({
		name: "",
		telefono: "",
		cuit: "",
		email: "",
		direccion: "",
		web:""
	});
	const [errors, setErrors] = useState<any>({});

	const handleChange = (
		e: React.FormEvent<HTMLInputElement>
	): void => {
		const { name, value } = e.currentTarget;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		
		  var newArray: any = proveedor
		  newArray.push(values)
		  proveedor=newArray
		addProveedores(values);
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Cambios guardados exitosamente',
			showConfirmButton: false,
			timer: 1500
		  })
		setValues({
			name: "",
		telefono: "",
		cuit: "",
		email: "",
		direccion: "",
		web:""
		})
		handleCloseModal()
	};

	const handleCloseModal = () => {
		setShowModal(false);
		closeModal();
	};

	// const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	let { value } = e.currentTarget;

	// 	setValues({
	// 		...values,
	// 		roles: [value],
	// 	});
	// };

	useEffect(() => {
		success &&
			setValues({
				name: "",
				telefono: "",
				cuit: "",
				email: "",
				direccion: "",
				web: ""
			});
	}, [success]);

	console.log(values);

	return (
		<div className='rounded-lg shadow dark:border md:mt-0 xl:p-0 '>
			<div className='p-6 space-y-4 sm:p-8'>
			<div className="flex border-b-4 border-[#77B327] rounded border-b-4 p-5 mb-1 ">
      
	  <div className="w-1/2">
	   <h1 className="text-3xl">Agregar Proveedor</h1>
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
								placeholder='Telefono'
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
								name='direccion'
								className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
								placeholder='dirección'
								value={values.direccion}
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
						placeholder='Correo electrónico'
						value={values.email}
						onChange={handleChange}
					/>
					{errors.email && (
						<p className='text-red-600 text-sm'>{errors.email}</p>
					)}
					<input
						type='text'
						name='cuit'
						className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='CUIT'
						value={values.cuit}
						onChange={handleChange}
					/>
					{errors.password && (
						<p className='text-red-600 text-sm'>{errors.password}</p>
					)}
					<input
						type='text'
						name='web'
						className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='web'
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
	);
};

export default AddNewProveedor;

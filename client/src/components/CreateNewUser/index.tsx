import { validateInfo } from "../../utils/validate";
import { useEffect, useState } from "react";
import useUser from "../../store/user";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";

type Props = {
	setShowModal: any;
};

interface Values {
	username: string
	name: string
	lastname: string
	email: string
	password: string
	password2: string
	roles: string[]
}

const CreateNewUser = ({ setShowModal }: Props) => {
	const { success, createNewUser, error, closeModal } = useUser(
		(state) => state
	);
	const [values, setValues] = useState<Values>({
		username: "",
		name: "",
		lastname: "",
		email: "",
		password: "",
		password2: "",
		roles: [''],
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
		setErrors(
			validateInfo({
				...values,
			})
		);

		const error = validateInfo(values);

		if (Object.keys(error).length === 0) {
			createNewUser(values);
		}
		setTimeout(() => {
			closeModal();
		}, 2000);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		closeModal();
	};

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		let { value } = e.currentTarget;

		setValues({
			...values,
			roles: [value],
		});
	};

	useEffect(() => {
		success &&
			setValues({
				username: "",
				name: "",
				lastname: "",
				email: "",
				password: "",
				password2: "",
				roles: [''],
			});
	}, [success]);

	return (
		<div className='rounded-lg shadow dark:border md:mt-0 xl:p-0 '>
			<div className='p-6 space-y-4 sm:p-8'>
				<button
					className='absolute right-4 top-6 bg-white text-gray-500 text-2xl w-10 h-10 rounded-full flex justify-center border border-gray-300'
					onClick={handleCloseModal}
				>
					x
				</button>
				<div
					className={`flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded ${
						success
							? "bg-[#c2e593]"
							: error
							? "bg-red-300"
							: "bg-[#77B327]"
					}`}
				>
					<h3
						className={`text-3xl font-semibold text-center ${
							success
								? "text-[#77B327]"
								: error
								? "text-red-700"
								: "text-zinc-800"
						}`}
					>
						{success
							? "Usuario creado exitosamente"
							: error
							? "Email ya registrado"
							: "Crear usuario"}
					</h3>
					{success && (
						<BsFillCheckCircleFill
							size={55}
							className='text-[#77B327]'
						/>
					)}

					{error && (
						<MdError size={55} className='text-red-700 ml-1' />
					)}
				</div>
				<form onSubmit={handleSubmit} className='flex flex-col mt-4'>
					<input
						type='text'
						name='username'
						className='px-4 py-3 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='Nombre de Usuario'
						value={values.username}
						onChange={handleChange}
					/>
					{errors.username && (
						<p className='text-red-600 text-sm'>{errors.username}</p>
					)}
					<div className='flex gap-4'>
						<div className='w-full'>
							<input
								type='text'
								name='name'
								className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
								placeholder='Nombre'
								value={values.name}
								onChange={handleChange}
							/>
							{errors.name && (
								<p className='text-red-600 text-sm'>{errors.name}</p>
							)}
						</div>
						<div className='w-full'>
							<input
								type='text'
								name='lastname'
								className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
								placeholder='Apellido'
								value={values.lastname}
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
						type='password'
						name='password'
						className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='Password'
						value={values.password}
						onChange={handleChange}
					/>
					{errors.password && (
						<p className='text-red-600 text-sm'>{errors.password}</p>
					)}
					<input
						type='password'
						name='password2'
						className='px-4 py-3 mt-4 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm'
						placeholder='Repita la contraseña'
						value={values.password2}
						onChange={handleChange}
					/>
					{errors.password2 && (
						<p className='text-red-600 text-sm'>{errors.password2}</p>
					)}
					<div className='flex flex-row mb-1 sm:mb-0 relative mt-4'>
						<label
							htmlFor='roles'
							className='grid items-center rounded-l border border-gray-400 pl-4 pr-10'
						>
							Permisos
						</label>
						<select
							name='roles'
							id='roles'
							value={values.roles[0]}
							onChange={handleSelect}
							className='appearance-none h-full rounded-r border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						>
							<option value='' defaultValue={''}></option>
							<option value='impresiones'>Impresiones</option>
							<option value='gerente'>Gerente</option>
							<option value='carteleria'>Carteleria</option>
							<option value='vendedor'>Vendedor</option>
							<option value='user'>User</option>
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
							<svg
								className='fill-current h-4 w-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
							>
								<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
							</svg>
						</div>
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
				</form>
			</div>
		</div>
	);
};

export default CreateNewUser;

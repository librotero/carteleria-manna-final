import useUser from "../store/user";
import Layout from "../components/Layout/index";
import { useEffect, useState, Fragment } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Modal from "../components/Modal";
import useHeaders from "../hooks/useHeaders";
import CreateNewUser from "../components/CreateNewUser";
//import shallow from "zustand/shallow";
import {
	MdKeyboardArrowRight,
	MdKeyboardArrowLeft,
	MdLastPage,
	MdFirstPage,
	MdOutlineAdd,
	MdExpandLess,
	MdExpandMore,
} from "react-icons/md";
import Loader from "../components/Loader";
import Swal from "sweetalert2";

const Users = () => {
	const { users, getUsers, deleteUsers } = useUser((state) => state);
	const [accessToken] = useLocalStorage();
	const [rol, setRol] = useState("");
	const [sort, setSort] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [showModal, setShowModal] = useState(false);
	const [sortUsername, setSortUsername] = useState<null | boolean>(
		true
	);
	const [sortName, setSortName] = useState<null | boolean>(null);
	const [sortLastName, setSortLastName] = useState<null | boolean>(
		null
	);
	const headers = useHeaders(accessToken);
	const [name, setName] = useState('');

	useEffect(() => {
		getUsers(accessToken, rol, sort, page, limit, name);
		console.log("holaaaaaaaaaaaaaaaaaaa", users)
	}, [rol, sort, page, limit, name]);
	const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
		const {value } = e.currentTarget;
		setName(value);
	 
	
	  };
	const nextPage = (): void => {
		page < users.totalPages && setPage(page + 1);
	};

	const prevPage = (): void => {
		page > 1 && setPage(page - 1);
	};

	const firtPage = (): void => {
		page !== 1 && setPage(1);
	};

	const lastPage = (): void => {
		page !== users.totalPages && setPage(users.totalPages);
	};

	const userPerPage = (
		e: React.ChangeEvent<HTMLSelectElement>
	): void => {
		let { value } = e.currentTarget;
		setLimit(Number(value));
	};

	const handleRoles = (
		e: React.ChangeEvent<HTMLSelectElement>
	): void => {
		let { value } = e.currentTarget;
		setRol(value);
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
  //delete
  const deleteUser = (user: any) => {
    
	Swal.fire({
		title: '¿Estás seguro?',
		text: "No podrás revertir los cambios",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#77B327',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Si, Eliminarlo!'
	  }).then((result) => {
		if (result.isConfirmed) {
		  Swal.fire(
			'Eliminado!',
			'X ha sido eliminado',
			'success'
		  )
		  deleteUsers(user._id, headers);
		  console.log(user)
		}
	  })
        
  };

	return (
		<Layout>
			<div className='xl:container mx-auto px-4 sm:px-8'>
				<div className='py-3'>
					<div className='bg-[#77B327] h-16 flex items-center rounded'>
						<h2 className='px-4 sm:px-4 text-3xl text-zinc-800 font-semibold leading-tight'>
							Usuarios
						</h2>
					</div>
					<div className='my-3 flex sm:flex-row flex-col'>
						<div className='flex flex-row mb-1 sm:mb-0'>
							<div className='relative'>
								<select
									className='appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
									onChange={userPerPage}
								>
									<option value='10'>10</option>
									<option value='15'>15</option>
									<option value='20'>20</option>
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
							<div className='relative'>
								<select
									className='appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500'
									onChange={handleRoles}
								>
									<option value='all'>Todos</option>
									{users.roles?.map((role: string, index: number) => (
										<option
											key={index + role}
											value={role}
											className='capitalize'
										>
											{role}
										</option>
									))}
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
						</div>
						<div className='block relative'>
							<span className='h-full absolute inset-y-0 left-0 flex items-center pl-2'>
								<svg
									viewBox='0 0 24 24'
									className='h-4 w-4 fill-current text-gray-500'
								>
									<path d='M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z'></path>
								</svg>
							</span>
							<input
								placeholder='Buscar'
								className='appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none'
										onChange={handleChange}
							/>
						</div>
					</div>
					<div className='-mx-4 sm:-mx-8 px-4 sm:px-8  overflow-x-auto'>
						<div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
							<table className='min-w-full leading-normal relative'>
								<thead>
									<tr className='bg-gray-100 text-left text-gray-600 font-semibold uppercase'>
										<th
											className='hover:bg-gray-300 px-3 py-3 border-b-2 border-gray-200 cursor-pointer tracking-wider'
											onClick={sortByUsername}
										>
											<div className='flex justify-between gap-2'>
												Usuario
												<div
													className={`${
														sortUsername === null && "opacity-0"
													}`}
												>
													<MdExpandLess
														className={`text-red-600 ${
															sortUsername && sortUsername !== null
																? "opacity-100"
																: "opacity-40"
														}`}
													/>
													<MdExpandMore
														className={`-mt-2 text-red-600 ${
															!sortUsername
																? "opacity-100"
																: "opacity-40"
														}`}
													/>
												</div>
											</div>
										</th>
										<th
											className='hover:bg-gray-300 px-3 py-3 border-b-2 border-gray-200 cursor-pointer tracking-wider'
											onClick={sortByName}
										>
											<div className='flex justify-between gap-2'>
												Nombre
												<div
													className={`${
														sortName === null && "opacity-0"
													}`}
												>
													<MdExpandLess
														className={`text-red-600 ${
															sortName ? "opacity-100" : "opacity-40"
														}`}
													/>
													<MdExpandMore
														className={`-mt-2 text-red-600 ${
															!sortName ? "opacity-100" : "opacity-40"
														}`}
													/>
												</div>
											</div>
										</th>
										<th
											className='hover:bg-gray-300 px-3 py-3 border-b-2 border-gray-200 cursor-pointer tracking-wider'
											onClick={sortByLastName}
										>
											<div className='flex justify-between gap-2'>
												Apellido
												<div
													className={`${
														sortLastName === null && "opacity-0"
													}`}
												>
													<MdExpandLess
														className={`text-red-600 ${
															sortLastName
																? "opacity-100"
																: "opacity-40"
														}`}
													/>
													<MdExpandMore
														className={`-mt-2 text-red-600 ${
															!sortLastName
																? "opacity-100"
																: "opacity-40"
														}`}
													/>
												</div>
											</div>
										</th>
										<th className='px-3 py-3 border-b-2 border-gray-20 tracking-wider'>
											Email
										</th>
										<th className='px-3 py-3 border-b-2 border-gray-200  tracking-wider'>
											Rol
										</th>
										<th className='px-3 py-3 border-b-2 border-gray-200 tracking-wider'>
											Stado
										</th>
										<th className='px-3 py-3 border-b-2 border-gray-200 tracking-wider'>
											eliminar
										</th>
									</tr>
								</thead>
								{
									<tbody>
										{users.users?.map((user: any, index: number) => (
											<tr
												key={user._id}
												className={`border-b border-gray-200 text-base ${
													index % 2 === 0 ? "bg-white" : "bg-gray-50"
												} hover:bg-gray-100`}
											>
												<td className='px-3 py-2'>
													<p className='text-gray-900 whitespace-no-wrap'>
														{user.username}
													</p>
												</td>
												<td className='px-3 py-2'>
													<p className='text-gray-900 whitespace-no-wrap capitalize'>
														{user.name}
													</p>
												</td>
												<td className='px-3 py-2'>
													<p className='text-gray-900 whitespace-no-wrap capitalize'>
														{user.lastname}
													</p>
												</td>
												<td className='px-3 py-2'>
													<p className='text-gray-900 whitespace-no-wrap'>
														{user.email}
													</p>
												</td>
												<td className='px-3 py-2'>
													<p className='text-gray-900 whitespace-no-wrap capitalize'>
														{user.roles.map(
															(
																role: { _id: number; name: string },
																index: number
															) => (
																<Fragment key={index + role._id}>
																	{role.name + "\n"}
																</Fragment>
															)
														)}
													</p>
												</td>
												<td className='px-3 py-2'>
													<span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
														<span
															aria-hidden
															className='absolute inset-0 bg-green-100 rounded-full'
														></span>
														<span className='relative'>Activo</span>
													</span>
												</td>
												<td className='px-3 py-2'>
													<span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
														
														<span className='relative' style={{"cursor":"pointer"}} onClick={()=>deleteUser(user)}>Eliminar</span>
													</span>
												</td>
											</tr>
										))}
									</tbody>
								}
							</table>
							{!users.users && (
								<div>
									<Loader />
								</div>
							)}
							<div className='px-3 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between'>
								<div className='flex gap-2 align-center items-center xs:mt-0'>
									<button onClick={firtPage}>
										<MdFirstPage
											className={`text-2xl text-red-600 ${
												page === 1 && "opacity-50"
											}`}
										/>
									</button>
									<button onClick={prevPage}>
										<MdKeyboardArrowLeft
											className={`text-2xl text-red-600 ${
												page === 1 && "opacity-50"
											}`}
										/>
									</button>

									<span className='text-base xs:text-xs text-gray-900'>
										{`Página ${users.page} de ${users.totalPages}`}
									</span>

									<button onClick={nextPage}>
										<MdKeyboardArrowRight
											className={`text-2xl text-red-600 ${
												page === users.totalPages && "opacity-50"
											}`}
										/>
									</button>

									<button onClick={lastPage}>
										<MdLastPage
											className={`text-2xl text-red-600 ${
												page === users.totalPages && "opacity-50"
											}`}
										/>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='mb-5'>
					<button
						className='bg-[#77B327] text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
						onClick={() => setShowModal(true)}
					>
						<span className='text-white flex items-center gap-2'>
							Crear nuevo usuario <MdOutlineAdd className='text-xl' />
						</span>
					</button>
				</div>
				<Modal showModal={showModal} setShowModal={setShowModal}>
					<CreateNewUser setShowModal={setShowModal} />
				</Modal>
			</div>
		</Layout>
	);
};

export default Users;

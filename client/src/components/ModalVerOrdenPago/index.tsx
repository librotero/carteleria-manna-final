import { useState } from "react";
import 'animate.css';

type Props = {
	children: any;
	showModal4:boolean
	setShowModal4:any
};

const ModalEdit = ({children, showModal4,setShowModal4 }: Props) => {
	return (
		<>
			{showModal4? (
				<>
					<div className=' sm:m-2 justify-end  grid overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
						<div className='animate__animated animate__fadeInRight relative md:w-[1200px] sm:w-[200px]   max-w-3xl'>
							<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none'>
								{children}
							</div>
						</div>
					</div>
					<div className='opacity-10 fixed inset-0 z-40 bg-black'></div>
				</>
			) : null}
		</>
	);
};

export default ModalEdit;

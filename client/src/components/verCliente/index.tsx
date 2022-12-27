import useForm from '../../hooks/useForm';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useInsumo from '../../store/insumo';
import useUser from '../../store/user';
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdDone, MdArrowBack,  MdEmail  } from "react-icons/md";
import Swal from 'sweetalert2'
import { BsWhatsapp } from "react-icons/bs";
import moment from 'moment'
type Props = {
	setShowModal3: any;
    cliente:any
    ordenesPorMes:any
};
const InsumoEdit = ({ setShowModal3, cliente, ordenesPorMes }: Props) => {
  
const [category, setCartegory]=useState(["IMPRESIONES", "CARTELERIA"])
    const { success, putInsumo, closeModal, error} = useInsumo((state) => state);
      const [token] = useLocalStorage();


    
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
     
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
		setShowModal3(false);
		closeModal();
	};

  

  return (
    <div className="rounded-lg shadow dark:border p-5 md:mt-0 xl:p-0 flex md:w-full sm:w-[400px]  ">
      <div className="w-full space-y-4 sm:p-8">
      <div className=" flex  text-2xl mb-10 border-b-4 border-[#77B327] p-5 mb-1 ">
          <button
            className="w-full mt-2 align-center flex"
            onClick={handleCloseModal}
          >
            <MdArrowBack />
          </button>
          <h1 className=" text-end justify-end flex w-full">{cliente.name}</h1>
        </div>
        {/** inicio */}
<div>
  {/** tercera columna */}
  
 <div className="w-full ml-7  mb-5 text-lg">
            
 <div>
              <b className="text-gray-600">Nombre</b>
              <h1>{cliente.name}</h1>
            </div>
              <div className="flex">
              <div className="w-1/3">
                <b className="text-gray-600">Condición I.V.A.</b>
                <h1>{cliente.condicioniva}</h1>
              </div>
            <div className="w-1/3">
              <b className="text-gray-600">Razón Social</b>
              <h1>{cliente.razonsocial}</h1>
            </div>
            <div className="w-1/3">
              <b className="text-gray-600">Cuit</b>
              <h1>{cliente.cuit}</h1>
            </div>
              </div>
            </div>
            <hr/>

                 {/** tercera columna */}
                 <h1 className="text-2xl text-bold uppercase flex text-center justify-center text-white bg-gray-600 border-4 border-gray-600 mt-5">Historial de Ordenes</h1>
                 
                 <div className="grid sm:gap-1  sm:grid-cols-1
      md:gap-3 md:grid-cols-3 mt-5">
              {
                ordenesPorMes.map((e:any)=>(
                  <div className="m-5 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-end ">
                    <p className=" p-1 "><b>N° :  </b>{e.facturanum}</p>

                    </div>
                    <p><b>Fecha:</b>{moment(e.fecha).format("L")}</p>
                    <p><b>Operación:</b>{e.operacion}</p>
                    <p><b>Total: </b>$ {e.montototal}</p>
                    <p><b>N° Carteles: </b>{e.carteles.length}</p>
                    <br />
                    <p> {
          e.resta+e.seña===e.montototal?
          <h1 className="flex  bg-violet-600  text-white p-2 text-lg justify-center text-center">Pagada</h1>
          :
          <h1 className="flex  bg-yellow-600 text-white p-2 text-lg justify-center text-center">Sin pagar</h1>
        }</p>
                    

                  </div>
                ))
              }
                 </div>




                 {/** tercera columna */}
</div>

        {/** inicio */}
        <h1 className="text-lg text-center font-bold">Contacto</h1>
    
      
    <div className="ml-10 mt-5 text-xl ">
          <p>Email</p>
          <h1>{cliente.email}</h1>
        </div>
    <div className="flex m-5">
    
      <div className="flex justify-end ">
        
        <div className="m-5 text-xl">
          <p className="flex justify-start">Telefono</p>
          <h1 className="flex justify-end">
            {cliente.telefono}
          </h1>
        </div>
        <div className="flex justify-end mt-3">
          <div className="m-7 text-2xl">
            <a
              href={`https://api.whatsapp.com/send?phone=${cliente.telefono}&text=Hola, ${cliente.name}.Le escribimos desde Carteleria`}
            >
              <BsWhatsapp />
            </a>
          </div>
          <div className="m-7 text-2xl">
            <a
              href={`mailto:${cliente.email}?Subject=Interesado%20en%20su%20trabajo`}
            >
              <MdEmail />
            </a>
          </div>
        </div>
      </div>
    </div>

        </div>
      </div>
  )
}


export default InsumoEdit
import useForm from "../../hooks/useForm";
import { useState,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useInsumo from "../../store/insumo";
import useUser from "../../store/user";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdDone, MdArrowBack, MdEmail } from "react-icons/md";
import {BsWhatsapp} from "react-icons/bs";

import Swal from "sweetalert2";
import moment from "moment";
import useClients from "../../store/clientes";
import useHeaders from "../../hooks/useHeaders";
type Props = {
  setShowModal3: any;
  proveedor: any;
  insumosProveedor:any
};
const InsumoEdit = ({ setShowModal3, proveedor, insumosProveedor }: Props) => {
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const [category, setCartegory] = useState(["IMPRESIONES", "CARTELERIA"]);
  const { success, putInsumo, closeModal, error } = useInsumo((state) => state);
  const [token] = useLocalStorage();
  

  const navigate = useNavigate();

  const [values, setValues] = useState({});
  useEffect(() => {

  }, []);
  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCloseModal = () => {
    setShowModal3(false);
    closeModal();
  };

  return (
    <div className="rounded-lg shadow dark:border md:mt-0 xl:p-0 ">
      <div className="p-6 space-y-4 sm:p-8">
        <div className="relative flex justify-end text-2xl mb-10 border-b-4 border-[#77B327] p-5 ">
          <button
            className="absolute top-1/3 left-5 text-xl w-10 h-10 rounded-full flex justify-center rounded "
            onClick={handleCloseModal}
          >
            <MdArrowBack />
          </button>
          <h1>{proveedor.name}</h1>
        </div>
          {/** tercera columna */}
       <div>
       <div className="  mb-5 flex-wrap flex  text-lg">
            <div className="w-1/3">
              <b className="text-gray-600">Proveedor: </b>
              <h1>{proveedor.name}</h1>
            </div>
            <div className="w-1/3">
              <b className="text-gray-600">Cuit </b>
              <h1>{proveedor.cuit}</h1>
            </div>
            <div className="w-1/3">
              <b className="text-gray-600">Web</b>
              <h1>{proveedor.web}</h1>
            </div>
            
          </div>



          {/** tercera columna */}

          <h1 className="text-2xl text-bold uppercase flex text-center justify-center text-white bg-gray-600 border-4 border-gray-600 mt-5">Historial de Insumos</h1>
                 <div className="flex grid sm:gap-1 justify-center sm:grid-cols-1  md:gap-3 md:grid-cols-3 text-lg">
                 {
   insumosProveedor.map((e:any)=> (
      <div className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-2">
      <p className="">
      <b>Nombre: </b>{e.name}
      </p>
      <p className="">
      <b>Descripción: </b>{e.descripcion}
      </p>
      <p className="">
      <b>Unidad: </b>{e.unidad}
      </p>
      <p className="">
      <b>Categoría: </b>{e.category}
      </p>
      <p className="">
      <b>Costo: </b>$ {e.costo}
      </p>
      
  </div>
    
    ))
  }
</div>
          {/** tercera columna */}
         <hr />
          <h1 className="flex justify-center text-lg ">
                      Contacto
                    </h1>
                    <div className=" ">
                    <div className="m-5 text-xl ">
                          <p>Email</p>
                          <h1>{proveedor.email}</h1>
                        </div>
                      <div className="flex ">
                        
                        <div className="m-5 text-xl">
                          <p className="flex justify-end">Telefono</p>
                          <h1 className="flex justify-end">
                            {proveedor.telefono}
                          </h1>
                        </div>
                        <div className="flex justify-end mt-3">
                          <div className="m-7 text-2xl">
                            <a
                              href={`https://api.whatsapp.com/send?phone=${proveedor.telefono}&text=Hola, ${proveedor.name}.Le escribimos desde Carteleria`}
                            >
                              <BsWhatsapp />
                            </a>
                          </div>
                          <div className="m-7 text-2xl">
                            <a
                              href={`mailto:${proveedor.email}?Subject=Interesado%20en%20su%20trabajo`}
                            >
                              <MdEmail />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
          {/** tercera columna */}

       </div>
      </div>
    </div>
  );
};

export default InsumoEdit;

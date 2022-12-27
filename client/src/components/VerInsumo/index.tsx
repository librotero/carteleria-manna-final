import useForm from "../../hooks/useForm";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useInsumo from "../../store/insumo";
import useUser from "../../store/user";
import useProveedor from "../../store/proveedores";

import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdDone, MdArrowBack, MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";

import Swal from "sweetalert2";
import moment from "moment";
import useClients from "../../store/clientes";
import useHeaders from "../../hooks/useHeaders";
type Props = {
  setShowModal3: any;
  insumo: any;
  proveedorInsumo: any;
};
const InsumoEdit = ({ setShowModal3, insumo, proveedorInsumo }: Props) => {
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const [category, setCartegory] = useState(["IMPRESIONES", "CARTELERIA"]);
  const { success, putInsumo, closeModal, error } = useInsumo((state) => state);
  const { proveedores, getProveedores } = useProveedor((state) => state);
  const [token] = useLocalStorage();

  const navigate = useNavigate();

  const [values, setValues] = useState({});
  useEffect(() => {
    getProveedores(headers);
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
    <div className="rounded-lg shadow dark:border md:mt-0 xl:p-0 flex md:w-full sm:w-[400px]">
      <div className="p-6 space-y-4 sm:p-8 w-full">
        <div className="relative flex justify-end text-2xl mb-10 border-b-4 border-[#77B327] p-5 ">
          <button
            className="absolute top-1/3 left-5 text-xl w-1/3 h-10 rounded-full flex  rounded "
            onClick={handleCloseModal}
          >
            <MdArrowBack />
          </button>
          <h1 className="w-1/2">{insumo.name}</h1>
        </div>
        <div className="">
          {/** tercera columna */}
          <div className="w-full  mb-5 text-lg">
            <div className="w-1/3 mb-2">
              <b className="text-gray-600">Descripción</b>
              <h1>{insumo.descripcion}</h1>
            </div>
<hr />
            <div className="flex mt-4">
            <div className="w-1/3">
              <b className="text-gray-600">Unidad</b>
              <h1>{insumo.unidad}</h1>
            </div>
            <div className="w-1/3">
              <b className="text-gray-600">Costo</b>
              <h1>$ {insumo.costo}</h1>
            </div>
            <div className="w-1/3">
              <b className="text-gray-600">Categoría</b>
              <h1>{insumo.category}</h1>
            </div>
            </div>
          </div>

          {/** tercera columna */}
          <hr />
          {/** tercera columna */}
          <h1 className=" mt-5 text-2xl flex justify-start ">
            <b>Proveedor: </b>
            {proveedorInsumo.name}
          </h1>
          <div className="flex mt-1 text-center">
            {/** observaciones columna */}
            {/** contacto columna */}


            <div className="mt-2">
            <div className="mt-2 text-xl">
                  <p className="flex">Email</p>
                  <h1 className="">
                    {proveedorInsumo.email}
                  </h1>
                </div>
              <div className="flex  ">
              
                <div className="text-xl">
                  <p className="flex mt-4">Telefono</p>
                  <h1 className="flex">
                    {proveedorInsumo.telefono}
                  </h1>
                </div>
                <div className="flex justify-end mt-3">
                  <div className="m-7 text-2xl">
                    <a
                      href={`https://api.whatsapp.com/send?phone=${proveedorInsumo.telefono}&text=Hola, ${proveedorInsumo.name}.Le escribimos desde Carteleria`}
                    >
                      <BsWhatsapp />
                    </a>
                  </div>
                  <div className="m-7 text-2xl">
                    <a
                      href={`mailto:${proveedorInsumo.email}?Subject=Interesado%20en%20su%20trabajo`}
                    >
                      <MdEmail />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/** contacto columna */}
        </div>
        {/** tercera columna */}
        <hr />

        {/** tercera columna */}
        <h1 className="text-2xl text-bold uppercase flex text-center justify-center text-white bg-gray-600 border-4 border-gray-600 mt-5">
          Historial de Proveedores
        </h1>
        <div
          className="grid sm:gap-1  sm:grid-cols-1
      md:gap-2 md:grid-cols-2"
        >
          {insumo.another.map(
            (e: any) =>
              e.proveedor !== insumo.proveedor && (
                <div className="text-lg max-w-sm m-2 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                  <p className="text-center bg-blue-500 text-white">
                    {e.proveedor}
                  </p>
                  <p className="">
                    <b>tipo: </b>
                    {e.name}
                  </p>
                  <p className="">
                    <b>Descripción: </b>
                    {e.descripcion}
                  </p>
                  <p className="">
                    <b>Unidad: </b>
                    {e.unidad}
                  </p>
                  <p className="">
                    <b>Categoría: </b>
                    {e.category}
                  </p>
                  <p className="">
                    <b>Costo: </b>$ {e.costo}
                  </p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default InsumoEdit;

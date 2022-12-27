import useForm from "../../hooks/useForm";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useInsumo from "../../store/insumo";
import useUser from "../../store/user";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdDone, MdArrowBack, MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import useClients from "../../store/clientes";

import Swal from "sweetalert2";
import moment from "moment";
import useHeaders from "../../hooks/useHeaders";
type Props = {
  setShowModal3: any;
  presupuesto: any;
  cliente: any;
};
const InsumoEdit = ({ setShowModal3, presupuesto, cliente }: Props) => {
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const [category, setCartegory] = useState(["IMPRESIONES", "CARTELERIA"]);
  const { success, putInsumo, closeModal, error } = useInsumo((state) => state);
  const [token] = useLocalStorage();

  const navigate = useNavigate();

  const [values, setValues] = useState({});
  const { clientes, getClients } = useClients((state) => state);
  useEffect(() => {}, []);
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
    <div className="mb-10 md:p-5  sm:p-5 md:m-10 sm:m-5 ">
      <div className="relative  text-xl rounded">
        <div className="relative flex justify-end text-2xl mb-10 border-b-4 border-[#77B327] p-5 ">
          <button
            className="absolute top-1/3 left-5 text-xl w-10 h-10 rounded-full flex justify-center rounded "
            onClick={handleCloseModal}
          >
            <MdArrowBack />
          </button>
          <h1>Presupuesto</h1>
        </div>
        <div className="">
          <div className="m-5 flex text-lg justify-center w-full">
            <div className="m-5 w-1/3"> 
              <b className="text-gray-600">Cliente: </b>
              <h1>{presupuesto.clientes}</h1>
            </div>
            <div className="m-5 w-1/3">
              <b className="text-gray-600">Contacto </b>
              <h1>{presupuesto.contacto}</h1>
            </div>
            <div className="m-5 w-1/3">
              <b className="text-gray-600">Fecha </b>
              <h1>{moment(presupuesto.fecha).format("L")}</h1>
            </div>
          </div>
          {/** tercera columna */}
          <div className="m-5 mb-5 flex text-lg justify-center w-full ">
            <div className="m-5 w-1/3">
              <b className="text-gray-600">Tipo de operación</b>
              <h1>{presupuesto.operacion}</h1>
            </div>
            {presupuesto.operacion === "colocacion" ? (
              <div className="m-5 w-1/3">
                <b className="text-gray-600">Dirección</b>
                <h1>
                  {presupuesto.lugardecolocacion
                    ? presupuesto.logardecolocacion
                    : "Sin especificar"}
                </h1>
              </div>
            ) : (
              <div className="m-5 w-1/3">
              <b className="text-gray-600">Dirección</b>
              <h1>
                {presupuesto.lugardecolocacion==""
                  ? presupuesto.logardecolocacion
                  : "Sin especificar"}
              </h1>
            </div>
            )}
            <div className="m-5 w-1/3">
              <b className="text-gray-600">Fecha de entrega </b>
              <h1>{moment(presupuesto.fechaentrega).format("L")}</h1>
            </div>

           
          </div>
           {/** tercera columna */}
           <div className="m-5 flex justify-end  ">
              <div className="m-2 border-green-600 border-b-4 flex justify-end w-1/3">
                <p>
                  <b>Total: </b>${presupuesto.montototal}
                </p>
              </div>
            </div>
            {/** tercera columna */}
          <hr />

          {/** cartel columna */}

          <div className="flex w-full mt-5 mb-5 grid sm:gap-2 sm:grid-cols-2  md:gap-3 md:grid-cols-3">
            {presupuesto.carteles.map((e: any) => (
              <div className=" text-lg  rounded-xl  border-2 border-gray-200 overflow-hidden  sm:w-40 md:w-full lg:w-160 p-5 ">
                <p className="text-start">
                  <b>Nombre: </b>
                  {e.name}{" "}
                </p>
                <p className="text-start">
                  <b>base x altura : </b>
                  {e.base} x {e.altura}{" "}
                </p>
                <b>categoría</b>
                {e.category.map((item: any) => (
                  <div>-{item}</div>
                ))}
                <p className="text-start">
                  <b>estructura: </b>
                  {e.estructura}{" "}
                </p>
                <p className="text-start">
                  <b>otros: </b>
                  {e.otros}{" "}
                </p>
                <p className="text-start">
                  <b>faz: </b>
                  {e.faz}{" "}
                </p>
              </div>
            ))}
          </div>
          {/** cartles columna */}

          {/** observaciones columna */}

          <b className="text-black w-full flex justify-center m-5">
            Observaciones
          </b>
          <div>
            <div className="text-lg flex p-5 grid mr-5 ">
              <h1>{presupuesto.observaciones}</h1>
            </div>
          </div>
          {/** observaciones columna */}
          {/** contacto columna */}
          <b className="text-black flex justify-center m-5">contacto</b>
          <div className="flex justify-center">
            <div className="flex flex-wrap">
              <div className="m-5 text-xl ">
                <p>Email</p>
                <h1>{cliente.email}</h1>
              </div>
              <div className="m-5 text-xl">
                <p className="flex justify-end">Telefono</p>
                <h1 className="flex justify-end">{cliente.telefono}</h1>
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
          {/** contacto columna */}
        </div>
      </div>
    </div>
  );
};

export default InsumoEdit;

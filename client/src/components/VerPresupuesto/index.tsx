import useForm from "../../hooks/useForm";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useInsumo from "../../store/insumo";
import useUser from "../../store/user";
import useLocalStorage from "../../hooks/useLocalStorage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError, MdDone, MdArrowBack, MdEmail,MdPrint } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import useClients from "../../store/clientes";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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

  const jsPDFGenerator = () => {
    var doc = new jsPDF("p", "pt", "a4");
    var item: any = 240;
    var num = 0;
    var totalcosto = 0;

    doc.setFontSize(8);
    doc.text(20, 20, `${moment().format("L")}`);
    doc.text(280, 20, `Carteleria Manna`);

    doc.setFontSize(10);
    doc.text(35, 60, `PRESUPUESTO`);
    doc.setFontSize(20);
    doc.text(350, 65, `CARTELERIA MANNA`);

    doc.setFontSize(10);
    doc.text(35, 100, `FECHA: ${moment().format("L")}`);
    doc.text(
      180,
      100,
      `FECHA VÁLIDA: ${moment(presupuesto.fechavalida).format("L")}`
    );
    doc.text(35, 120, `CLIENTE: ${presupuesto.clientes}`);
    doc.text(35, 140, `DIRECCIÓN: ${presupuesto.lugardecolocacion}`);
    doc.text(35, 160, `CONTACTO: ${presupuesto.contacto}`);
    doc.text(180, 160, `TELEFONO: ${cliente.telefono}`);
    doc.setFontSize(20);

    doc.text(240, 200, `CARTELES`);
    doc.setFontSize(10);

    doc.text(35, 230, `N°`);
    doc.text(65, 230, `CARTELES`);
    doc.text(190, 230, `BASE`);
    doc.text(250, 230, `ALTURA`);
    doc.text(310, 230, `ESTRUCTURA`);
    doc.text(410, 230, `OTROS`);
    doc.text(500, 230, `COSTO`);

    for (let i = 0; i < presupuesto.carteles.length; i++) {
      item = item + 20;

      num = num + 1;

      doc.text(35, item, `${num}`);
      doc.text(65, item, `tipo de  ${presupuesto.carteles[i].name}`);
      doc.text(190, item, ` ${presupuesto.carteles[i].base} `);
      doc.text(250, item, `${presupuesto.carteles[i].altura}`);
      doc.text(310, item, `${presupuesto.carteles[i].estructura}`);
      doc.text(410, item, `${presupuesto.carteles[i].otros}`);
      doc.text(510, item, `$${presupuesto.carteles[i].total}`);
      totalcosto = totalcosto + presupuesto.carteles[i].total;
    doc.setTextColor(220,220,220);

    doc.text(35, item + 5, `__________________________________________________________________________________________`);
    doc.setTextColor(0,0,0);
  
  }
    doc.text(450, item + 30, `total costo:`);
    doc.text(510, item + 30, `$${totalcosto}`);
    doc.text(440, item + 40, `___________________`);
    doc.text(450, item + 55, `total:`);
    doc.text(510, item + 55, `$${presupuesto.montototal}`);

    doc.setFontSize(20);

    doc.text(200, item + 130, `OBSERVACIONES`);
    doc.setFontSize(10);

    doc.text(35, item + 180, `${presupuesto.observaciones}`, {align: 'justify',lineHeightFactor: 1.5,maxWidth:500});


    doc.save(`presupuesto.pdf`);
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
          <button className="pointer ml-5" onClick={jsPDFGenerator}>
                <MdPrint />
              </button>
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
              <b className="text-gray-600">Fecha Válida </b>
              <h1>{moment(presupuesto.fechavalida).format("L")}</h1>
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

import React, { PureComponent } from "react";
import { MdError, MdDone, MdArrowBack, MdEmail, MdPrint } from "react-icons/md";
import Swal from "sweetalert2";
import moment, { isMoment } from "moment";
import useClients from "../../store/clientes";
import useHeaders from "../../hooks/useHeaders";
import useLocalStorage from "../../hooks/useLocalStorage";
import useUser from "../../store/user";
import { BsFillCheckCircleFill, BsWhatsapp } from "react-icons/bs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
type Props = {
  setShowModal4: any;
  orden: any;
};
const VerOrdenes = ({ setShowModal4, orden }: Props) => {
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const { clientes, getClients, closeModal } = useClients((state) => state);
  var cliente: any = clientes.find((e: any) => e.name === orden.cliente);
  const { getUser, user } = useUser((state) => state);

  const handleCloseModal = () => {
    setShowModal4(false);
    closeModal();
  };

  const jsPDFGenerator = () => {
    var doc = new jsPDF("p", "pt", "a4");
    var item: any = 240;
    var num = 0;
    var totalcosto = 0;
    var image1 = new Image();
    image1.src='data:image/png;base64,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'
    doc.addImage(image1, 'JPEG', 360, 20, 200, 80)
    doc.setFontSize(8);
    doc.text(20, 20, `${moment().format("L")}`);
    doc.text(280, 20, `Carteleria Manna`);

    doc.setFontSize(10);
    doc.setFont("SourceSansPro", "bold")

    doc.text(35, 60, `ORDEN DE FABRICACIÓN N° ${orden.facturanum}`);
    doc.setFont("SourceSansPro", "normal")
    

    doc.setFontSize(10);

    doc.setFont("SourceSansPro", "bold")

    doc.text(35,100, 'FECHA:')
    doc.text(
      180,
      100,
      `FECHA VÁLIDA:`
    );
    doc.text(35, 120, `CLIENTE: `);
    doc.text(35, 140, `DIRECCIÓN: `);

    doc.text(35, 160, `CONTACTO: `);
    doc.text(180, 160, `TELEFONO: `);

    doc.setFont("SourceSansPro", "normal")

    doc.text(75, 100, ` ${moment().format("L")}`);
    doc.text(
      265,
      100,
      ` ${moment(orden.fechaentrega).format("L")}`
    );
    doc.text(85, 120, ` ${orden.cliente}`);
    doc.text(95, 140, ` ${orden.lugardecolocacion}`);
    doc.text(95, 160, ` ${orden.contacto}`);
    doc.text(235, 160, ` ${cliente.telefono}`);
    doc.setFontSize(20);

    doc.text(240, 200, `CARTELES`);
    doc.setFontSize(10);
    doc.setFont("SourceSansPro", "bold")

    doc.text(35, 230, `N°`);
    doc.text(65, 230, `CARTELES`);
    doc.text(190, 230, `BASE`);
    doc.text(250, 230, `ALTURA`);
    doc.text(310, 230, `ESTRUCTURA`);
    doc.text(410, 230, `OTROS`);
    doc.text(500, 230, `VALOR`);
    doc.setFont("SourceSansPro", "normal")


    doc.text(35, 235, `___________________________________________________________________________________________________`);
 

    for (let i = 0; i < orden.carteles.length; i++) {
      item = item + 20;

      num = num + 1;

      doc.text(35, item, `${num}`);
      doc.text(65, item, `tipo de  ${orden.carteles[i].name}`);
      doc.text(190, item, ` ${orden.carteles[i].base} `);
      doc.text(250, item, `${orden.carteles[i].altura}`);
      doc.text(310, item, `${orden.carteles[i].estructura}`);
      doc.text(410, item, `${orden.carteles[i].otros}`);
      doc.text(510, item, `$${orden.carteles[i].valortotal}`);
      totalcosto = totalcosto + orden.carteles[i].valortotal;
      doc.setTextColor(220,220,220);

      doc.text(35, item + 5, `__________________________________________________________________________________________`);
      doc.setTextColor(0,0,0);
    }
 
   


    doc.text(450, item + 30, `total costo:`);
    doc.text(510, item + 30, `$${totalcosto}`);
    doc.text(475, item + 50, `total:`);
    doc.text(510, item + 50, `$${orden.montototal}`);
    doc.text(475, item + 70, `seña:`);
    doc.text(510, item + 70, `$${orden.seña}`);
    doc.text(440, item + 80, `___________________`);
    doc.text(440, item + 95, `total restante:`);
    doc.text(510, item + 95, `$${orden.montototal - orden.seña}`);

    doc.setFontSize(20);

    doc.text(200, item + 150, `OBSERVACIONES`);
    doc.setFontSize(10);

    doc.text(35, item + 180, `${orden.observaciones}`, {align: 'justify',lineHeightFactor: 1.5,maxWidth:500});


    doc.save(`orden${orden.facturanum}.pdf`);
  };
  const hastacuanto = () => {};
  return (
    <div className="m-5">
      <div className="">
        <div className="relative flex justify-end mb-10 p-5 flex text-end p-10 ">
          <button
            className="absolute top-1/3 left-5 text-xl w-10 h-10 rounded-full flex justify-center "
            onClick={handleCloseModal}
          >
            <MdArrowBack />
          </button>
          <div className="block">
            <div className="flex border-b-4 ">
            <div className="flex text-end ">
              <b className="flex text-end">Orden:</b>
              {orden.facturanum}
            </div>
            <button className="pointer ml-10" onClick={jsPDFGenerator}>
                <MdPrint />
              </button>
            </div>
            <div className="flex text-end text-lg">
              <b className="flex text-end">Vendedor: </b>
              {orden.vendedor === user._id
                ? user.name
                : "no tiene un vendedor asignado"}
              
            </div>
          </div>
         
        </div>
        <div
          className="bg-white pl-10 pr-10 text-start text-2xl rounded"
          id="content"
        >
          <div className=" flex w-full  text-lg">
            <div className="w-1/3">
              <b className="">Cliente: </b>
              <h1>{orden.cliente}</h1>
            </div>
            <div className=" w-1/3 ">
              <b className="text-gray-600">Contacto </b>
              <h1>{orden.contacto}</h1>
            </div>
            <div className=" w-1/3 ">
              <b className="text-gray-600">Fecha </b>
              <h1>{moment(orden.fecha).format("L")}</h1>
            </div>
          </div>
          {/** tercera columna */}
          <div className="mt-5 flex text-lg">
            <div className="w-1/3">
              <b className="text-gray-600">Tipo de operación</b>
              <h1>{orden.operacion}</h1>
            </div>
            {orden.operacion === "colocacion" ||
            orden.operacion === "traslado" ? (
              <div className="w-1/3">
                <b className="text-gray-600">Dirección</b>
                <h1>{orden.lugardecolocacion}</h1>
              </div>
            ) : (
              <div className="w-1/3">
                <b className="text-gray-600">Dirección</b>
                <h1>Sin especificar</h1>
              </div>
            )}
            <div className="ml-2">
              <b className="text-gray-600">Fecha de entrega </b>
              <h1>{moment(orden.fechaentrega).format("L")}</h1>
            </div>
          </div>

          {/** tercera columna */}
          <div className="mt-5 flex text-lg mb-7">
            <div className="border-b-4 border-green-600 w-1/3">
              <b className="text-gray-600 ">Pagado</b>
              <h1>$ {orden.seña + orden.resta}</h1>
            </div>

            <div className="w-1/3 ">
              <div className="ml-1 border-b-4 border-red-600">
                <b className="text-gray-600 ">Resta</b>
                <h1>$ {orden.montototal - (orden.seña + orden.resta)}</h1>
              </div>
            </div>
            <div className="w-1/3 ml-1 border-b-4 border-blue-600 text-center ">
              <b className="text-gray-600">Total</b>
              <h1>$ {orden.montototal}</h1>
            </div>
          </div>
          <hr />
          <div className=" ">
            <b className="justify-center flex m-5">Carteles</b>
            <br />
            <div className="flex grid sm:gap-1 sm:grid-cols-1  md:gap-3 md:grid-cols-3">
              {orden.carteles.map((e: any) => (
                <div className=" text-lg  rounded-xl  border-2 border-gray-200 overflow-hidden  sm:w-full md:w-full lg:w-160 p-5 ">
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
          </div>
          <b className="text-black flex justify-center m-5">Observaciones</b>
          <div>
            <div className="text-lg flex p-5 grid mr-5 ">
              <h1>{orden.observaciones}</h1>
            </div>
          </div>
        </div>
        <h1 className="flex justify-center text-lg border-b-2 p-5 ">
          Contacto
        </h1>
      {/**
       *   {orden.clientes ? (
          <>
            <div className="ml-10 mt-5 text-xl ">
              <p>Email</p>
              <h1>{orden.clientes.email}</h1>
            </div>
            <div className="flex m-5">
              <div className="flex justify-end ">
                <div className="m-5 text-xl">
                  <p className="flex justify-start">Telefono</p>
                  <h1 className="flex justify-end">
                    {orden.clientes.telefono}
                  </h1>
                </div>
                <div className="flex justify-end mt-3">
                  <div className="m-7 text-2xl">
                    <a
                      href={`https://api.whatsapp.com/send?phone=${orden.clientes.telefono}&text=Hola, ${orden.clientes.name}.Le escribimos desde Carteleria`}
                    >
                      <BsWhatsapp />
                    </a>
                  </div>
                  <div className="m-7 text-2xl">
                    <a
                      href={`mailto:${orden.clientes.email}?Subject=Interesado%20en%20su%20trabajo`}
                    >
                      <MdEmail />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="ml-10 mt-5 text-xl ">
              <p>Email</p>
              <h1>{cliente.email}</h1>
            </div>
            <div className="flex m-5">
              <div className="flex justify-end ">
                <div className="m-5 text-xl">
                  <p className="flex justify-start">Telefono</p>
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
          </>
        )}
       */}
      </div>
    </div>
  );
};
export default VerOrdenes;

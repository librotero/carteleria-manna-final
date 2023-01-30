import React from 'react'
import moment from "moment";
import { BsSearch, BsPrinter } from "react-icons/bs";
import useOrdenes from "../../store/ordenes";
import useHeaders from "../../hooks/useHeaders";
import useLocalStorage from "../../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);
import  Swal from 'sweetalert2';
import jsPDF from 'jspdf'

type Props = {
    e: any;
  };

var num: any =0
function Card({ e }: Props) {

    const { putOrden, getOrdenesAll, success, error, closeModal } = useOrdenes(
        (state) => state
      );
      const aceptar = () => {
        Swal.fire({
          title: '¿Desea guardar los cambios?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonColor: '#77B327',
          confirmButtonText: 'Guardar',
          denyButtonText: `No guardar`,
        }).then((result) => {
          if (result.isConfirmed) {
            e.stateCarteleria = "realizada";
        var values: any = {
          ...values,
          stateCarteleria:"realizada",
          id:e._id
        };
        console.log("holaaaaaaaaaaaaa soy un camboio aaa", values, e);
    
        putOrden(values, headers);
            Swal.fire('¡Guardado exitosamente!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guardados', '', 'info')
          }
        })
        
      };
      const deshacer = () => {
        Swal.fire({
          title: '¿Desea guardar los cambios?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonColor: '#77B327',
          confirmButtonText: 'Guardar',
          denyButtonText: `No guardar`,
        }).then((result) => {
          if (result.isConfirmed) {
            if(e.stateCarteleria=== "entregada"){
          
              e.stateCarteleria ="realizada"
              var values: any = {
                ...values,
                stateCarteleria: "realizada",
                id: e._id,
              };
              console.log("holaaaaaaaaaaaaa soy un camboio aaa", values);
          
              putOrden(values, headers);
            } else if(e.stateCarteleria==="realizada") {
              e.stateCarteleria = "pendiente";
              console.log("holaaaaaaaaaaaaa soy un camboio aaa", e._id);
              var values: any = {
                ...values,
                stateCarteleria: "pendiente",
                id: e._id,
              };
              console.log("holaaaaaaaaaaaaa soy un camboio aaa", values);
          
              putOrden(values, headers);
            }
            Swal.fire('¡Guardado exitosamente!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guardados', '', 'info')
          }
        })
        
      };

      const entregado = () => {
        Swal.fire({
          title: '¿Desea guardar los cambios?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonColor: '#77B327',
          confirmButtonText: 'Guardar',
          denyButtonText: `No guardar`,
        }).then((result) => {
          if (result.isConfirmed) {
            e.stateCarteleria = "entregada";
            console.log("holaaaaaaaaaaaaa soy un camboio aaa", e._id);
            var values: any = {
              ...values,
              stateCarteleria: "entregada",
              id: e._id,
            };
            console.log("holaaaaaaaaaaaaa soy un camboio aaa", values);
            putOrden(values, headers);
            Swal.fire('¡Guardado exitosamente!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guardados', '', 'info')
          }
        })
       
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
        doc.text(35, 60, `e DE FABRICACIÓN N° ${e.facturanum}`);
        doc.setFontSize(20);
        doc.text(350, 65, `CARTELERIA MANNA`);
    
        doc.setFontSize(10);
        doc.text(35, 100, `FECHA: ${moment().format("L")}`);
        doc.text(
          180,
          100,
          `FECHA DE ENTREGA: ${moment(e.fechaentrega).format("L")}`
        );
        doc.text(35, 120, `CLIENTE: ${e.cliente}`);
        doc.text(35, 140, `DIRECCIÓN: ${e.lugardecolocacion}`);
        doc.text(35, 160, `CONTACTO: ${e.contacto}`);
        //doc.text(180, 160, `TELEFONO: ${cliente.telefono}`);
        doc.setFontSize(20);
    
        doc.text(240, 200, `CARTELES`);
        doc.setFontSize(10);
    
        doc.text(35, 230, `N°`);
        doc.text(65, 230, `CARTELES`);
        doc.text(190, 230, `BASE`);
        doc.text(250, 230, `ALTURA`);
        doc.text(310, 230, `ESTRUCTURA`);
        doc.text(450, 230, `OTROS`);
    
        doc.text(35, 235, `__________________________________________________________________________________________`);
     
    
        for (let i = 0; i < e.carteles.length; i++) {
          item = item + 20;
    
          num = num + 1;
    
          doc.text(35, item, `${num}`);
          doc.text(65, item, `tipo de  ${e.carteles[i].name}`);
          doc.text(190, item, ` ${e.carteles[i].base} `);
          doc.text(250, item, `${e.carteles[i].altura}`);
          doc.text(310, item, `${e.carteles[i].estructura}`);
          doc.text(450, item, `${e.carteles[i].otros}`);
          doc.setTextColor(220,220,220);
    
          doc.text(35, item + 5, `__________________________________________________________________________________________`);
          doc.setTextColor(0,0,0);
        }
     
    
        doc.setFontSize(20);
    
        doc.text(200, item + 150, `OBSERVACIONES`);
        doc.setFontSize(10);
    
        doc.text(35, item + 180, `${e.observaciones}`, {align: 'justify',lineHeightFactor: 1.5,maxWidth:18});
        
    
        doc.save(`orden${e.facturanum}.pdf`);
      };
  return (
    <div className="mb-2 rounded-lg  border-2 border-gray-200 border-b-gray-500">
                          <div className="block  mr-5 mt-5 ml-5 mb-1 p-1 rounded ">
                            <div className="flex w-full border-b-2">
                              <div className=" flex w-5/6  mt-2 mb-2">
                                <h1 className="m-4">
                                  <b>Orden N° </b>
                                  {e.facturanum}
                                </h1>
                                <h1 className="m-4">
                                  <b>cliente: </b>
                                  {e.cliente}
                                </h1>
                              </div>
                              <div className="md:flex sm:block">
                                <h1 className="w-5/6 m-4">
                                  {moment(e.fecha).format("L")}
                                </h1>
                                <div>
                                  {
                                    e.stateCarteleria === "pendiente"
                                    ? <h1 className="text-white bg-red-600 rounded-lg align-center text-center p-2 m-2">
                                    Pendiente
                                  </h1>
                                  :
                                 ""
                                  }
                                  {
                                     e.stateCarteleria ==="realizada"
                                     ? <h1 className="text-white bg-green-600 rounded-lg align-center text-center p-2 m-2">
                                     Realizada
                                   </h1>
                                   :
                                  "" 
                                  }
                                  {
                                    e.stateCarteleria ==="entregada"
                                    ?
                                    <h1 className="text-white bg-blue-600 rounded-lg align-center text-center p-2 m-2">
                                    Entregado
                                  </h1>
                                  : ""
                                  }
                                </div>
                                <div className="flex justify-end m-4">
                                  
                                  <h1 className="align-center mr-2" style={{ cursor: "pointer" }} onClick={jsPDFGenerator}>
                                    <BsPrinter />
                                  </h1>
                                </div>{" "}
                              </div>
                            </div>
                            <div className="md:flex sm:block m-1 rounded  ">
                              <div className="m-2  md:w-[800px] border">
                                <div className="flex grid sm:gap-1 sm:grid-cols-1 md:gap-4 md:grid-cols-4">
                               
                                  <div className=" m-5">
                                    <b>TIPO DE CARTEL</b>
                                    <h1>{e.carteles.map((item: any) => item.category.includes("CARTELERIA")&&(
                                      <div>
                                        <h1>{item.name}</h1>
                                      </div>
                                    ))}</h1>
                                  </div>
                                  <div className="m-5">
                                    <h1><b>MEDIDAS</b></h1>
                                    {e.carteles.map((item: any)  => item.category.includes("CARTELERIA")&&(
                                      <h1>
                                        {item.base} x {item.altura}
                                      </h1>
                                    ))}
                                  </div>

                                 <div className="m-5">
                                    <h1><b>ESTRUCTURA</b></h1>
                                    {e.carteles.map((item: any) => item.category.includes("CARTELERIA")&&(
                                      <h1>{item.estructura}</h1>
                                    ))}
                                  </div>
                                  <div className="m-5 w-[200px]">
                                    <h1><b>OTROS</b></h1>
                                    {e.carteles.map((item: any) =>item.category.includes("CARTELERIA")&& (
                                      <h1>{item.otros}</h1>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="justify-end m-2 md:w-[600px] sm:w-full p-3 bg-gray-100 rounded ">
                                
                                <b>OBSERVACIONES:</b>
                                <br />
                                {e.observaciones}
                                <div></div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-start ml-5 mb-2 mt-1">
                          {
                              e.stateCarteleria== "pendiente"
                              ?
                              <button
                              className="text-blue-500 w-40 items-center p-5 h-15 shadow border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-sm px-2 py-4 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={
                                e.stateCarteleria==="pendiente"
                                ? aceptar
                                : entregado

                            }
                            >
                              {
                                e.stateCarteleria==="pendiente"
                                ?<p>Aceptar Orden</p>
                                :""
                              }
                              {
                                e.stateCarteleria==="realizada"?
                                <p>Entregar Orden</p>
                                :
                                ""
                              }
                            </button>
                            :
                            ""
                            
                            }
                            {
                              e.stateCarteleria== "realizada"
                              ?
                              <button
                              className="text-blue-500 w-40 items-center p-5 h-15 shadow border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-sm px-2 py-4 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={
                                e.stateCarteleria==="pendiente"
                                ? aceptar
                                : entregado

                            }
                            >
                              {
                                e.stateCarteleria==="pendiente"
                                ?<p>Aceptar Orden</p>
                                :""
                              }
                              {
                                e.stateCarteleria==="realizada"?
                                <p>Entregar Orden</p>
                                :
                                ""
                              }
                            </button>
                            :
                            ""
                            
                            }
                            {
                              e.stateCarteleria== "entregada"
                              ?
                            ""
                            :
                            ""
                            
                            }
                            {
                                e.stateCarteleria==="realizada"
                                ?  <h1
                                className="flex justify-center items-center text-red-600 m-5"
                                onClick={deshacer}
                                style={{ cursor: "pointer" }}
                              >
                                Cancelar
                              </h1>
                              :
                             ""
                            }
                            {
                                e.stateCarteleria==="entregada"
                                ?  <h1
                                className="flex justify-center items-center text-red-600 m-5"
                                onClick={deshacer}
                                style={{ cursor: "pointer" }}
                              >
                                Cancelar
                              </h1>
                              :
                             ""
                            }
                          </div>
                        </div>
  )
}

export default Card

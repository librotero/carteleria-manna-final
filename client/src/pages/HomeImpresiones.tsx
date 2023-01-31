import React from 'react'
import Card from "../components/CardImpresiones";
import { useEffect, useState } from "react";

type Props = {
    ordImpresiones: any;
  };
function HomeCarteleria({ordImpresiones }: Props) {

    const [openTab, setOpenTab] = useState(1);
var color: any = "white";
var ordenes : any = ordImpresiones
  return (
    <div className="flex flex-wrap m-5">
          <div className="block relative">
             
              
            </div>
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3  flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 rounded-t-lg shadow-lg block leading-normal " +
                    (openTab === 1
                      ? "text-black bg-white"
                      : "text-" + color + "-600 bg-red-600")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  En Curso
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 rounded-t-lg shadow-lg  block leading-normal " +
                    (openTab === 2
                      ? "text-black bg-white"
                      : "text-" + color + "-600 bg-yellow-600")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Terminadas
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 rounded-t-lg shadow-lg block leading-normal " +
                    (openTab === 3
                      ? "text-black bg-white"
                      : "text-" + color + "-600 bg-green-600")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                 Entregadas
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full  shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >{
                    ordImpresiones.map((e:any)=>e.stateImpresiones==="pendiente"?(
                      <Card e={e} ordenes={ordImpresiones} />
                    ):
                    (""))
                  }
                  
                  </div>

                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    {
                    ordenes.map((e:any)=>e.stateImpresiones==="realizada"?(
                      <Card e={e} ordenes={ordImpresiones} />
                    ):
                    (""))
                  }
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    {
                    ordImpresiones.map((e:any)=>e.stateImpresiones==="entregada"?(
                      <Card e={e} ordenes={ordImpresiones} />
                    ):
                    (""))
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default HomeCarteleria

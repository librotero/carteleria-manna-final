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
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <input
                placeholder="Buscar"
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-80 bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
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
                  Entradas
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 rounded-t-lg shadow-lg  block leading-normal " +
                    (openTab === 2
                      ? "text-black bg-white"
                      : "text-" + color + "-600 bg-green-600")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  En proceso
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 rounded-t-lg shadow-lg block leading-normal " +
                    (openTab === 3
                      ? "text-black bg-white"
                      : "text-" + color + "-600 bg-blue-600")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                 Terminadas
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

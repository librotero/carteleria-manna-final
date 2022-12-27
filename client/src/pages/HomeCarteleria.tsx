import React from 'react'
import Card from "../components/CardCarteleria";
import { useEffect, useState } from "react";

type Props = {
    ord: any;
  };
function HomeCarteleria({ord }: Props) {

    const [openTab, setOpenTab] = useState(1);
var color: any = "white";


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
                  Entrada
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
                  >
                    {ord.map((orden: any) =>
                      orden.map((e: any) =>
                        e.stateCarteleria === "pendiente" ? (
                         <Card e={e} />
                        ) : (
                          ""
                        )
                      )
                    )}
                  </div>

                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    {ord.map((orden: any) =>
                      orden.map((e: any) =>
                        e.stateCarteleria === "realizada"? (
                          <Card e={e} />
                        ) : (
                          ""
                        )
                      )
                    )}
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                   {ord.map((orden: any) =>
                      orden.map((e: any) =>
                        e.stateCarteleria === "entregada"? (
                          <Card e={e} />
                        ) : (
                          ""
                        )
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default HomeCarteleria

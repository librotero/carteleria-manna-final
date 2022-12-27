import Layout from "../components/Layout/index";
import Charts from "../components/DashboardComponents/chart";
import VendedoresTable from "../components/DashboardComponents/VendedoresTable";
import OrdenesTableDashboard from "../components/DashboardComponents/OrdenesTableDashboard";
import ChartPresupuesto from "../components/DashboardComponents/chartPresupuestos";

import useOrdenes from "../store/ordenes";
import useLocalStorage from "../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
import { useEffect, useState, Fragment } from "react";
import FilterByDate from '../components/DashboardComponents/FilterByDate'
import TotalesByDate from '../components/DashboardComponents/TotalesByDate'
import useUser from "../store/user";
import useCartel from "../store/carteles";
import usePresupuesto from "../store/presupuesto";

import { Progress } from "@material-tailwind/react";
import Swal from 'sweetalert2'

import useHeaders from "../hooks/useHeaders";
import { AiOutlineUser } from "react-icons/ai";
import { Grid } from "gridjs-react";

import {
  // main component
  Chart,
  // graphs
  Bars,
  Cloud,
  Dots,
  Labels,
  Lines,
  Pies,
  RadialLines,
  Ticks,
  Title,
  // wrappers
  Layer,
  Animate,
  Transform,
  Handlers,
  // helpers
  DropShadow,
  Gradient,
} from "rumble-charts";
import moment from "moment";

const Dashboard = () => {
  const { ordenes2, getOrdenesAll, getOrdenes,getOrdenesDate, deleteOrdenes, loading } =
    useOrdenes((state:any) => state);
  const { carteles2, cartel, getCarteles } = useCartel((state:any) => state);
  const { presupuestos, getPresupuestos } = usePresupuesto((state:any) => state);

  const { getUsers2, users3, logout, user } = useUser((state:any) => state);
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  var fechaActual: any = moment().format("L");
  const [fecha, setFecha] = useState(fechaActual);

  const [values, setValues] = useState({
    date1: "",
    date2: ""
  });
  const [ date1, setDate1] = useState(fecha)
  const [ date2, setDate2] = useState(fecha)

  useEffect(() => {

    getOrdenesDate(date1, date2, accessToken);
    getCarteles(accessToken);
    console.log("holaaaaaaaaaaaaaaaaaaaaa", ordenes2);
  }, [date1, date2]);

  var arrayprueba: any = carteles2.map((e: any) => ({
    cartel: e.descripcion,
    item: [],
  }));
  var cont: any = 0;

  //Start operadores
  var totalOrdenes: any = ordenes2.map((e: any) => 1);
  var sumTotalOrdenes: any = totalOrdenes.reduce((a: any, b: any) => a + b, 0);

  //pendientes
  var ordenesPendientes: any = ordenes2.map(
    (e: any) =>
      e.stateImpresiones === "pendiente" && e.stateCarteleria === "pendiente"
  );
  var ordenesPendientesCarteleria: any = ordenes2.map(
    (e: any) => e.stateCarteleria === "pendiente"
  );
  var ordenesPendientesImpresiones: any = ordenes2.map(
    (e: any) => e.stateImpresiones === "pendiente"
  );
  var sumOrdenesPendientes: any = ordenesPendientes.reduce(
    (a: any, b: any) => a + b,
    0
  );
  var sumOrdenesPendientesCarteleria: any = ordenesPendientesCarteleria.reduce(
    (a: any, b: any) => a + b,
    0
  );
  var sumOrdenesPendientesImpresiones: any =
    ordenesPendientesImpresiones.reduce((a: any, b: any) => a + b, 0);
  //realizadas
  var ordenesRealizadas: any = ordenes2.map(
    (e: any) =>
      e.stateImpresiones === "realizada" && e.stateCarteleria === "realizada"
  );
  var ordenesRealizadasCarteleria: any = ordenes2.map(
    (e: any) => e.stateCarteleria === "realizada"
  );
  var ordenesRealizadasImpresiones: any = ordenes2.map(
    (e: any) => e.stateImpresiones === "realizada"
  );
  var sumOrdenesRealizadas: any = ordenesRealizadas.reduce(
    (a: any, b: any) => a + b,
    0
  );
  var sumOrdenesRealizadasCarteleria: any = ordenesRealizadasCarteleria.reduce(
    (a: any, b: any) => a + b,
    0
  );
  var sumOrdenesRealizadasImpresiones: any =
    ordenesRealizadasImpresiones.reduce((a: any, b: any) => a + b, 0);
  //entregados
  var ordenesEntregados: any = ordenes2.map(
    (e: any) =>
      e.stateImpresiones === "entregada" && e.stateCarteleria === "entregada"
  );
  var ordenesEntregadosCarteleria: any = ordenes2.map(
    (e: any) => e.stateCarteleria === "entregada"
  );

  var ordenesEntregadosImpresiones: any = ordenes2.map(
    (e: any) => e.stateImpresiones === "entregada"
  );

  var sumOrdenesEntregados: any = ordenesEntregados.reduce(
    (a: any, b: any) => a + b,
    0
  );
  var sumOrdenesEntregadosImpresiones: any =
    ordenesEntregadosImpresiones.reduce((a: any, b: any) => a + b, 0);
  var sumOrdenesEntregadosCarteleria: any = ordenesEntregadosCarteleria.reduce(
    (a: any, b: any) => a + b,
    0
  );
  //End operadores

  //totales
  var totalesSeña: any = ordenes2.map((e: any) => e.seña);
  var sumSeñas: any = totalesSeña.reduce((a: any, b: any) => a + b, 0);
  var totales: any = ordenes2.map((e: any) => e.montototal);
  var sumTotales: any = totales.reduce((a: any, b: any) => a + b, 0);
  //totales

  //vendedores
  var vendedores: any = users3.filter((e: any) =>
    e.roles.find((e: any) => e.name === "vendedor")
  );

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
    console.log("una fecha ", values);
  };
  
  //carteles2 rating
  var num: any = arrayprueba.map((e: any) =>
    e.item.reduce((a: any, b: any) => a + b, 0)
  );
  //fin carteles2
  var hola: any = num.sort(function (a: any, b: any) {
    return b - a;
  });
  //presupuestos
 
  return (
    <Layout>
      <div>
        <div className="p-2 bg-[#77B327] m-2 rounded">
          <h1 className="text-4xl text-start text-white m-5">
            Hola, {user.name} {user.lastname}
          </h1>
        </div>

     <FilterByDate values={values} setValues={setValues} date1={date1} date2={date2} setDate1={setDate1} setDate2={setDate2} />

        <div className="flex m-2 content-center"></div>

        <TotalesByDate sumTotalOrdenes={sumTotalOrdenes} sumSeñas={sumSeñas} sumTotales={sumTotales} />

        <div
          className="flex grid sm:gap-1  sm:grid-cols-1
          md:gap-4 md:grid-cols-4 m-2"
        >
          <div className="bg-white rounded shadow-lg mt-2">
            <div className=" m-1/4 overflow-x-auto relative shadow-md ">
              <VendedoresTable ordenes={ordenes2} vendedores={vendedores} date1={date1} date2={date2} />
            </div>
          </div>

          <div className="flex-1 w-full m-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-160 sm:w-full md:w-160 lg:w-160">
            <div className=" w-full ">
              <h1 className="text-center text-2xl font-bold uppercase m-5">
                ordenes totales
              </h1>
              <div className="  flex w-full justify-center content-center ">
                <div className="relative p-5">
                  <b className="text-gray-400 text-4xl absolute top-1/3 right-1/3 mr-10 mt-7">
                    {sumTotalOrdenes}
                  </b>
                  <Charts
                    sumOrdenesPendientesCarteleria={
                      sumOrdenesPendientesCarteleria
                    }
                    sumOrdenesPendientesImpresiones={
                      sumOrdenesPendientesImpresiones
                    }
                    sumOrdenesRealizadasCarteleria={
                      sumOrdenesRealizadasCarteleria
                    }
                    sumOrdenesRealizadasImpresiones={
                      sumOrdenesRealizadasImpresiones
                    }
                    sumOrdenesEntregadosCarteleria={
                      sumOrdenesEntregadosCarteleria
                    }
                    sumOrdenesEntregadosImpresiones={
                      sumOrdenesEntregadosImpresiones
                    }
                  />
                </div>
              </div>
              <div className="flex grid sm:gap-1  sm:grid-cols-1 md:gap-3 md:grid-cols-3 m-2">
                <div className="flex">
                  <div className="bg-red-600 p-2 text-white font-bold text-sm rounded-full w-5 h-5 text-center m-2 uppercase"></div>
                  <h1 className="m-1 uppercase">entradas</h1>
                </div>
                <div className="flex">
                  <div className="bg-green-600 p-2 text-white font-bold text-sm rounded-full w-5 h-5 text-center m-2 uppercase"></div>
                  <h1 className="m-1 uppercase">en curso</h1>
                </div>
                <div className="flex">
                  <div className="bg-blue-600 p-2 text-white font-bold text-sm rounded-full w-5 h-5 text-center m-2 uppercase"></div>
                  <h1 className="m-1 uppercase">terminadas</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full m-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-160 sm:w-160 md:w-160 lg:w-160">
            <div className=" w-full ">
              <h1 className="text-center text-2xl font-bold uppercase m-5">
                Impresiones
              </h1>
              <div className="  flex w-full justify-center content-center ">
                <div className="relative p-5">
                  <b className="text-gray-400 text-4xl absolute top-1/3 right-1/3 mr-10 mt-7">
                    {sumTotalOrdenes}
                  </b>
                  <Charts
                    sumOrdenesPendientesCarteleria={0}
                    sumOrdenesPendientesImpresiones={
                      sumOrdenesPendientesImpresiones
                    }
                    sumOrdenesRealizadasCarteleria={0}
                    sumOrdenesRealizadasImpresiones={
                      sumOrdenesRealizadasImpresiones
                    }
                    sumOrdenesEntregadosCarteleria={0}
                    sumOrdenesEntregadosImpresiones={
                      sumOrdenesEntregadosImpresiones
                    }
                  />
                </div>
              </div>
              <div className="flex grid sm:gap-1  sm:grid-cols-1 md:gap-3 md:grid-cols-3 m-2">
                <div className="flex">
                  <div className="bg-red-600 p-2 text-white font-bold text-sm rounded-full w-5 h-5 text-center m-2 uppercase"></div>
                  <h1 className="m-1 uppercase">entradas</h1>
                </div>
                <div className="flex">
                  <div className="bg-green-600 p-2 text-white font-bold text-sm rounded-full w-5 h-5 text-center m-2 uppercase"></div>
                  <h1 className="m-1 uppercase">en curso</h1>
                </div>
                <div className="flex">
                  <div className="bg-blue-600 p-2 text-white font-bold text-sm rounded-full w-5 h-5 text-center m-2 uppercase"></div>
                  <h1 className="m-1 uppercase">terminadas</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full m-1 mx-auto bg-white rounded-xl shadow-md overflow-hidden w-160 sm:w-160 md:w-160 lg:w-160">
            <div className=" w-full ">
              <h1 className="text-center text-2xl font-bold uppercase m-5">
                Taller
              </h1>
              <div className="  flex w-full justify-center content-center ">
                <div className="relative p-5">
                  <b className="text-gray-400 text-4xl absolute top-1/3 right-1/3 mr-10 mt-7">
                    {sumTotalOrdenes}
                  </b>
                  <Charts
                    sumOrdenesPendientesCarteleria={
                      sumOrdenesPendientesCarteleria
                    }
                    sumOrdenesPendientesImpresiones={0}
                    sumOrdenesRealizadasCarteleria={
                      sumOrdenesRealizadasCarteleria
                    }
                    sumOrdenesRealizadasImpresiones={0}
                    sumOrdenesEntregadosCarteleria={
                      sumOrdenesEntregadosCarteleria
                    }
                    sumOrdenesEntregadosImpresiones={0}
                  />
                </div>
              </div>
              <div className="flex grid sm:gap-1  sm:grid-cols-1 md:gap-3 md:grid-cols-3 m-2">
                <div className="flex">
                  <div className="bg-red-600 p-2 text-white font-bold text-sm rounded-full w-5 h-5 text-center m-2 uppercase"></div>
                  <h1 className="m-1 uppercase">entradas</h1>
                </div>
                <div className="flex">
                  <div className="bg-green-600 p-2 text-white font-bold text-sm rounded-full w-5 h-5 text-center m-2 uppercase"></div>
                  <h1 className="m-1 uppercase">en curso</h1>
                </div>
                <div className="flex">
                  <div className="bg-blue-600 p-2 text-white font-bold text-sm rounded-full w-5 h-5 text-center m-2 uppercase"></div>
                  <h1 className="m-1 uppercase">terminadas</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex m-2 ">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full mt-2 bg-white">
            <OrdenesTableDashboard ordenes={ordenes2} />
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

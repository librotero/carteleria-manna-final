import AddCartel from '../AddCartel'

import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError,MdArrowBack } from "react-icons/md";
import useInusmo from "../../store/insumo";
import { useEffect, useState } from "react";
import useHeaders from "../../hooks/useHeaders";
import Swal from 'sweetalert2'
import useLocalStorage from "../../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);
import usePresupuestos from "../../store/presupuesto";
import useOrdenes from "../../store/ordenes";
import moment from 'moment'
import useClients from "../../store/clientes";
var totalArray: any = [];
var totales: any = [];
let sumTotales: any = [];

var clienteSelect: any = {};
var cartelSelect: any = {};
var obreros: any = [];
//var fechaActual: any =moment().format('MM/DD/YYYY')
var totalganancia : any =0
type Props = {
  setShowModal2: any;
  presupuesto: any;
};
const ClienteEdit = ({ setShowModal2, presupuesto }: Props) => {
  const [montoModificado, setMontoModificado]=useState(0)
var fechaActual: any =moment().format('MM/DD/YYYY')

  const [values, setValues] = useState({
    fecha: presupuesto.fecha,
    cliente: presupuesto.clientes,
    contacto: presupuesto.contacto, //nombre de contacto
    carteles: presupuesto.carteles,
    operacion: presupuesto.operacion,
    lugardecolocacion: presupuesto.lugardecolocacion,
    lugartraslado: presupuesto.lugartraslado,
    seña: presupuesto.seña,
    formadepago: presupuesto.formadepago,
    fechaentrega: presupuesto.fechaentrega,
    facturanum: presupuesto.facturanum,
    observaciones: presupuesto.observaciones,
    montototal: presupuesto.montototal,
    porcentaje: presupuesto.porcentaje,
    fechavalida:presupuesto.fechavalida,
    id:presupuesto.id,
    vendedor: presupuesto.vendedor,
resta:0
  });
  const [ordenchange, setOrdenchange] = useState({
   id: presupuesto.id,
   orden:true
  });
  var montofinal: any = values.montototal;
  const multiplicar = (a: number, b: number): number => {
    return a * b;
  };
  const { presupuestos,putPresupuesto, success, error, loading, closeModal} = usePresupuestos(
    (state) => state
  );
  const { ordenes, postOrden} = useOrdenes(
    (state) => state
  );
  const { clientes, getClients } = useClients((state) => state);
  const [porcentaje, setPorcentaje]=useState([10,20,30,40,50,60,70,80,90,100])
 
  const [errors, setErrors] = useState<any>({});


  useEffect(() => {
  
  }, []);
  
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value
    });
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;
    setValues({
      ...values,
      formadepago: value,
    });
		
  };
  const handleCloseModal = () => {
		setShowModal2(false);
		closeModal();
	};
  const [openTab, setOpenTab] = useState(1);
  var color: any = "white";
  
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
        

        Swal.fire({
          title: '¿Desea guardar los cambios?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonColor: '#77B327',
          confirmButtonText: 'Guardar',
          denyButtonText: `No guardar`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('¡Guardado exitosamente!', '', 'success')
            putPresupuesto(values, headers)
            handleCloseModal()
            success
          } else if (result.isDenied) {
            Swal.fire('Los cambios no han sido guardados', '', 'info')
          
          }
        })
  }
  const handleSelectOperación= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    setValues({
      ...values,
      operacion: value,
    });
  }

  const handleSelectCliente= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    setValues({
      ...values,
      cliente: value,
    });
  }


const handleSelectPorcentaje= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    var holaaa: any =values.montototal
   if(value){
    var valuesporcen: any = value
    var porcentaje: any  = 0
    var montototalissimo: 0
    totalganancia=0
    porcentaje=(valuesporcen/100)
      totalganancia = multiplicar(porcentaje, holaaa)
      montototalissimo = totalganancia + holaaa
      setValues({
        ...values,
        montototal: montototalissimo,
        porcentaje: totalganancia
      })
    console.log("esto es el total sdsdsds ",montofinal, values)
   }
  }

 const handleSelectClient= (e: React.ChangeEvent<HTMLSelectElement>)=>{
    let {value}= e.currentTarget;
    clienteSelect=clientes.filter((e:any)=>e.name===value)
    if(clienteSelect){
      console.log("hola soy un cliente", clienteSelect, clienteSelect[0].name)
      setValues({
        ...values,
        cliente: clienteSelect[0].name
      });
    }
  }
const changeOrden=()=>{

console.log("hola", values)
Swal.fire({
  title: '¿Desea convertir en orden?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonColor: '#77B327',
  confirmButtonText: 'Guardar',
  denyButtonText: `No guardar`,
}).then((result) => {
  if (result.isConfirmed) {
    postOrden(values, headers)
putPresupuesto(ordenchange, headers)
handleCloseModal()
    Swal.fire('¡Cambios guardados exitosamente!', '', 'success')
  } else if (result.isDenied) {
    Swal.fire('Los cambios no han sido guardados', '', 'info')
  }
})
}
const deleteCarteles =(e:any)=>{
 var  array: any = values.carteles.filter((item:any)=>e.name!==item.name)
 var nuevo1: any = array.map((e:any)=>e.total)
var total: any =  nuevo1.reduce((a: any, b: any) => a + b, 0)
console.log("hey hey hye ai you gatrit", array, total)
  setValues({
    ...values,
    carteles: array,
    montototal: total
  })

}

  return (
    <div className="flex flex-wrap m-5">
         
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3  flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-lg uppercase px-5 py-3 rounded-t-lg shadow-lg block leading-normal " +
                    (openTab === 1
                      ? "border-t-4 border-[#77B327] bg-white text-[#77B327]"
                      : "text-" + color + "-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Editar presupuesto
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-lg uppercase px-5 py-3 rounded-t-lg shadow-lg  block leading-normal " +
                    (openTab === 2
                      ? "border-t-4 border-blue-600 bg-white text-blue-600 text-2xl"
                      : "text-" + color + "-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Iniciar orden
                </a>
              </li>
             
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full  rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                     <div className='dark:border md:mt-0 xl:p-0 '>
    <div className='p-6 space-y-4 sm:p-8'>
    <div className="flex justify-end ">
    <button
        className='pt-2 text-2xl w-10 h-10 rounded-full flex justify-center '
        onClick={handleCloseModal}
      >
      <MdArrowBack/>
      </button>
     
    </div>
   {/**form cartel */}
   <AddCartel values ={values} setValues={setValues} montoModificado={montoModificado} setMontoModificado={setMontoModificado}/>
      {/**form cartel */}
    <hr />
    <div className="flex  mb-1 grid sm:gap-1  sm:grid-cols-1 md:gap-3 md:grid-cols-3">
        {values.carteles.map((e: any, index: any) => (
          
            <div 
            onClick={()=>deleteCarteles(e)}
            className="block w-full text-gray-600 border-blue-600 border-2 text-lg uppercase bg-white p-3 rounded-lg" style={{"cursor":"pointer"}}>
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
                                <div>{item}</div>
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
    <hr />
    <form onSubmit={handleSubmit} className="flex flex-col mt-4">
    
        
    {/**primera columna  */}

    <div className="flex  grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2 ">
   <div className=" grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
   <div className="w-full">
  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
      Fecha
    </label>
    <input
      className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      id="grid-first-name"
      type="string"
      placeholder="hola"
      name="fecha"
      value={values.fecha=fechaActual}
      onChange={handleChange}
    />
  </div>
      <div className="w-full">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Cliente
        </label>
        <select
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-state"
          name="clientes"
          value={values.cliente}
          onChange={handleSelectClient}
        >
          <option value="" defaultValue={""} disabled>
            Seleccionar cartel
          </option>
          {clientes.map((e: any) => (
            <option value={e.name}>{e.name}</option>
          ))}
        </select>
      </div>

   </div>
      <div className=" grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
      <div className="w-full  mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Operación
        </label>
        <select
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-state"
          placeholder="operacion"
          name="operacion"
          value={values.operacion}
          onChange={handleSelectOperación}
        >
          <option value="" defaultValue={""} disabled>
            Seleccionar cartel
          </option>
          <option value="colocacion">
            Colocación
          </option>
          <option value="retiro">
            Retiro en oficina
          </option>
          <option value="traslado">
            Traslado
          </option>
          
        </select>
      </div>
      <div className=" w-full">
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
contacto
</label>
<input
className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
id="grid-first-name"
type="text"
placeholder="Contacto"
name="contacto"
value={values.contacto}
onChange={handleChange}
/>
</div>
      </div>
    </div>
    

    {/**segunda columna  */}

    <div className="flex  mb-1 grid sm:gap-1  sm:grid-cols-1
    md:gap-2 md:grid-cols-2">
    {
      values.operacion==="retiro"
      ? ""
      :
      <div className="w-full">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Dirección de colocación
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-city"
          type="text"
          placeholder="D. colocación"
          name="lugardecolocacion"
          value={values.lugardecolocacion}
          onChange={handleChange}
        />
      </div>
    }

      

     
    </div>



    <div className="flex flex-wrap-mx-3">
    
    
    </div>
    {/** ultima comuna */}
  <div className=" mt-2 grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
    <div className=" grid sm:gap-1  sm:grid-cols-1 md:gap-2 md:grid-cols-2">
    
    
    
      
    <div className="w-full mb-6 ">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        descuento
      </label>
      <select
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-state"
        placeholder="operacion"
        name="porcentaje"
        value={values.porcentaje}
        onChange={handleSelectPorcentaje}
      >
        <option value="" defaultValue={""} disabled>
          Seleccionar cartel
        </option>
        {
          porcentaje.map((e:any)=>(
            <option value={e}>
          {e}
        </option>
          ))
        }
       
        
      </select>
    </div>
    
    <div className="ml-1">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Total
      </label>
      <div className="relative">
             <label className="absolute left-2 top-2.5 ">
                $
                
                </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id="grid-first-name"
        type="number"
        placeholder="Total"
        name="montototal"
        value={
          values.montototal
        }
        onChange={handleChange}
      />
    </div>
    </div>

  
  
 
    </div>
    <div className="flex flex-wrap-mx-3">

<div className="w-full">
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
Fecha Válida "{moment(presupuesto.fechavalida).format("DD/MM/YYYY")}"
</label>
<input
className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
id="grid-first-name"
type="date"
placeholder="hola"
name="fechavalida"
value={values.fechavalida}
onChange={handleChange}
/>
</div>

</div>
  </div>

    <div className="flex flex-wrap -mx-3 mb-2">
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Observaciones
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 h-20 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-password"
          type="text"
          placeholder="observaciones"
          name="observaciones"
          onChange={handleChange}
          value={values.observaciones}
        />
        <p className="text-gray-600 text-xs italic">
          Algo para tener en cuenta
        </p>
      </div>
    </div>

    <div className="flex items-center mt-6 justify-end p-6 border-t border-solid border-slate-200 rounded-b">
      <button
        className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={handleCloseModal}
      >
        Cancelar
      </button>
      <button
        className="bg-[#77B327] text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="submit"
      >
        Aceptar
      </button>
    </div>
</form>
    
    </div>
  </div>
                  </div>

                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <div className=' md:mt-0 xl:p-0 '>
    <div className='p-6 space-y-4 sm:p-8'>
    
    <div className="flex justify-end ">
    <button
        className='pt-2 text-2xl w-10 h-10 rounded-full flex justify-center '
        onClick={handleCloseModal}
      >
      <MdArrowBack/>
      </button>
     
    </div>
      <form onSubmit={handleSubmit} className='flex flex-col mt-4'>
  {/**primera columna  */}

  <div className="flex  ">
          <div className="w-1/3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Fecha
          </label>
          <input
            className="appearance-none block w-full  bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="string"
            placeholder="hola"
            name="fecha"
            value={values.fecha}
            onChange={handleChange}
          />
        </div>
            <div className="w-1/3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Cliente
              </label>
              <select
                className="block appearance-none w-full ml-1 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                name="clientes"
                value={values.cliente}
                //onChange={handleSelectCliente}
              >
                <option value="" defaultValue={""} disabled>
                  Seleccionar cartel
                </option>
                {clientes.map((e: any) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>
            </div>

            <div className="w-1/3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Operación
              </label>
              <select
                className="block appearance-none w-full ml-2 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                placeholder="operacion"
                name="operacion"
                value={values.operacion}
               // onChange={handleSelectOperación}
              >
                <option value="" defaultValue={""} disabled>
                  Seleccionar cartel
                </option>
                <option value="colocacion">
                  Colocación
                </option>
                <option value="retiro">
                  Retiro en oficina
                </option>
                <option value="traslado">
                  Traslado
                </option>
                
              </select>
            </div>
          </div>
          

          {/**segunda columna  */}

          <div className="flex  mb-1 grid sm:gap-1  sm:grid-cols-1
          md:gap-3 md:grid-cols-3">
          <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Dirección de colocación
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="D. colocación"
                name="lugardecolocacion"
                value={values.lugardecolocacion}
                onChange={handleChange}
              />
            </div>

            

            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Fecha entrega
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="date"
                placeholder="Fecha"
                name="fechaentrega"
                value={values.fechaentrega}
                onChange={handleChange}
              />
            </div>
          </div>


          {/**tercera columna  */}

          <div className="flex  mb-1 grid sm:gap-1  sm:grid-cols-1
          md:gap-4 md:grid-cols-4 ">
          
          
            
              <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                seña
              </label>
              <div className="relative">
             <label className="absolute left-2 top-2.5 ">
                $
                
                </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="number"
                placeholder="Seña"
                name="seña"
                value={values.seña}
                onChange={handleChange}
              />
            </div>
            </div>

            <div className="w-full">
              <label className="block uppercase tracking-wide w-full text-gray-700 text-xs font-bold mb-2">
                Metodo de pago
              </label>
              <select
                value={values.formadepago}
                onChange={handleSelect}
                name="formadepago"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option value="" defaultValue={""} disabled>
                  seleccione método de pago
                </option>
                <option value="efectivo">efectivo</option>
                <option value="transferencia">transferencia</option>
                <option value="tarjeta debito">tarjeta débito</option>
                <option value="tarjeta credito">trajeta crédito</option>
              </select>
            </div>
            <div className="ml-1">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Total
              </label>
              <div className="relative">
             <label className="absolute left-2 top-2.5 ">
                $
                
                </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="number"
                placeholder="Total"
                name="montototal"
                value={
                  values.seña?
                  values.montototal-values.seña
                  :
                  values.montototal
                }
                onChange={handleChange}
              />
            </div>
            </div>


          
          
          </div>

          
          {/**segunda columna  */}

          <div className="flex flex-wrap-mx-3">
          
          
          </div>
          {/** ultima comuna */}
          <div className="flex flex-wrap-mx-3">

          <div className="">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                factura N°
              </label>
              <input
                className="appearance-none block w-30 bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="facturanum"
                name="facturanum"
                value={values.facturanum}
                onChange={handleChange}
              />
            </div>
            <div className="ml-2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                contacto
              </label>
              <input
                className="appearance-none block w-30 bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Contacto"
                name="contacto"
                value={values.contacto}
                onChange={handleChange}
              />
            </div>
          </div>
    
          <div className="flex flex-wrap -mx-3 mb-2">
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Observaciones
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 h-20 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="observaciones"
                name="observaciones"
                onChange={handleChange}
                value={values.observaciones}
              />
              <p className="text-gray-600 text-xs italic">
                Algo para tener en cuenta
              </p>
            </div>
          </div>

          
      </form>
    <div className="flex justify-end">
<hr/>
<button
              className="text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
    <button
              className=" tracking-wide bg-blue-600 text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
             onClick={changeOrden}
            >
              Iniciar Orden
            </button>
    </div>
    </div>
  </div>

                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
   
  );
};

export default ClienteEdit;

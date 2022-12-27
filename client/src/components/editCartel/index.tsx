import useForm from "../../hooks/useForm";

import { useNavigate, Link } from "react-router-dom";
import useClients from "../../store/clientes";
import useCarteles from "../../store/carteles";

import useUser from "../../store/user";

import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdError , MdExitToApp, MdArrowBack} from "react-icons/md";
import useInusmo from "../../store/insumo";
import { useEffect, useState } from "react";
import useHeaders from "../../hooks/useHeaders";
import Swal from 'sweetalert2'
import useLocalStorage from "../../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
const headers = useHeaders(accessToken);

type Props = {
  setShowModal2: any;
  cartel: any;
  insumos2: any ;
};
const ClienteEdit = ({ setShowModal2, cartel, insumos2 }: Props) => {

  const [values, setValues] = useState({
    descripcion: cartel.descripcion,
    id: cartel.id,
    costo1faz: cartel.costo1faz,
    costo2faz: 0,
    category: [""],
    insumosArray: cartel.insumosArray,
  });
  var insumoparte: any = "";
  var costoArray: any = "";
  var unidadArray: any = "";
  var Arraycosto1faz: any = [];


  var nameInsumo: any = "";
  var Arraycosto2faz: any = [];
  var insumosCartel: any = 0;
  var Arraycosto1fazSup: any =values.insumosArray.map((e:any)=>e.costox1faz)
  var Arraycosto2fazSup: any =values.insumosArray.map((e:any)=>e.costox2faz)


  var array:any =  []
var c1f:any=0
var c2f:any=0

useEffect(() => {
  getInsumos(headers)
  console.log("hola", Arraycosto1fazSup)
}, []);

  const { success, putCarteles, closeModal, error, loading } = useCarteles(
    (state) => state
  );
  const { getInsumos } = useInusmo((state) => state);
  const [token] = useLocalStorage();
  const [category, setCategory] = useState(["IMPRESIONES", "CARTELERIA"]);
  const [totalcosto1faz, setTotalcosto1faz] = useState(cartel.costo1faz)
  const [totalcosto2faz, setTotalcosto2faz] = useState(cartel.costo2faz)

  const [click, setClick] = useState(false)


  const navigate = useNavigate();

 
  const [insumo, setInsumo] = useState({
    name: "",
    costo: 0,
    faz: "",
    cant1faz: 0,
    cant2faz: 0,
    unidad: "",
    costox1faz: 0,
    costox2faz: 0,
  });
  const [hola, setHola] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value,
    });
    console.log("hola soy un cambio", values);
  };

  const handleCloseModal = () => {
    setShowModal2(false);
    closeModal();
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
        
        Swal.fire({
          title: '¿Estás seguro?',
          text: "Querés hacer estos cambios",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#77B327',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, modificarlo!'
        }).then((result) => {
          if (result.isConfirmed) {
            putCarteles(values, token);
            handleCloseModal()
            Swal.fire(
              'Modificado'
            )
          }
        })
     
    
   
  };

  const addInsumoCartel = () => {
    console.log(insumo, values)
    var arrayCarteles: any = values.insumosArray.map((e:any)=>e.name)
    Arraycosto1faz = values.insumosArray.map((e:any)=>e.costo)
console.log("sdsdsdsdsdsdsd", insumo)
    if(arrayCarteles.includes(insumo.name)){
    
      
      Swal.fire({
        position: 'bottom-end',
        title: 'Ya está adherido este insumo',
        showConfirmButton: false,
        showClass: {
          popup: 'animate__animated animate__bounceInUp'
        },
        timer: 2000
      })
    }else{
      setValues({
        ...values,
        insumosArray: [...values.insumosArray, insumo]
      })
      
      if (insumo.cant1faz) {
        
        var suma1 = insumo.costox1faz
        Arraycosto1faz = [...Arraycosto1faz, suma1]
        setTotalcosto1faz(Arraycosto1faz.reduce((a: any, b: any) => a + b, 0))
  
      } else {
        console.log("hola")
      }
      if (insumo.cant2faz) {
        var suma2 = insumo.costox2faz
        Arraycosto2faz = [...Arraycosto2faz, suma2]
        setTotalcosto2faz(Arraycosto2faz.reduce((a: any, b: any) => a + b, 0))
      } else {
        console.log("hola")
      }
      
    }
    
    setInsumo({
      name: "",
      costo: 0,
      faz: "",
      cant1faz: 0,
      cant2faz: 0,
      unidad: "",
      costox1faz: 0,
      costox2faz: 0
    })
  };
 
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;
    console.log(insumo);
    if (value === "simple") {
      return setInsumo({
        ...insumo,
        faz: "simple",
        cant2faz: 0,
      });
    } else if (value === "doble") {
      return setInsumo({
        ...insumo,
        faz: "doble",
      });
    } else {
      console.log("soy un", value);
    }

    insumoparte = insumos2.filter((e: any) => e.name === value);
    if (insumoparte) {
      costoArray = insumoparte[0].costo;
      unidadArray = insumoparte[0].unidad;
      nameInsumo = insumoparte[0].name;
      setInsumo({
        ...insumo,
        costo: costoArray,
        unidad: unidadArray,
        name: nameInsumo,
      });
    }
  };

  const categoryForm = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let { value } = e.currentTarget;

    console.log("holaaaaaaaaaaaa", value);
    if (value === "IMPRESIONES") {
      if (values.category.includes(value)) {
        setValues({
          ...values,
          category: values.category.filter((e: any) => e !== value),
        });
      } else {
        setValues({
          ...values,
          category: [...values.category, value],
        });
        console.log("holaaaa", values.category);
      }
    } else {
      if (values.category.includes(value)) {
        setValues({
          ...values,
          category: values.category.filter((e: any) => e !== value),
        });
        console.log("dddddddddddddddd", values.category);
      } else {
        setValues({
          ...values,
          category: [...values.category, value],
        });
        console.log("holaaaa", values.category);
      }
      console.log("holaaaa", values.category);
    }
  };
  
 
  const agregarCartel = () => {
    hola == false ? setHola(true) : setHola(false);
  };

  /** insumos */

  const handleChangeInsumo = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setInsumo({
      ...insumo,
      [name]: value,
    });
     console.log(insumo)
  };
  const multiplicar = (a: number, b: number): number => {
    return a * b;
  };

  const deleteInsumos =(e:any)=>{
    array = values.insumosArray.filter((item:any)=>item.name!==e.name)
    
    Arraycosto1faz =array
    Arraycosto2faz =array
    c1f =totalcosto1faz-e.costox1faz
    c2f =totalcosto2faz-e.costox2faz
   console.log("jaaaaaaaaaaaaghghghghghaaaa", c2f)
    
    
    setTotalcosto1faz(c1f)
    setTotalcosto2faz(c2f)

      setValues({
        ...values,
        insumosArray: array,
        costo1faz: c1f,
        costo2faz: c2f

      })
      console.log("hola perrrisssss", array.length, totalcosto1faz, cartel.costo1faz)
      if(array.length===0){
        setClick(true)
        console.log(cartel.costo1faz, click)
      }
      console.log(cartel.costo1faz, click)
      console.log("jajajajaja", cartel.costo1faz)
  console.log("hola", Arraycosto1fazSup)
  if(c1f<0 || c2f<0){
    setTotalcosto1faz(0)
    setTotalcosto2faz(0)
    
  } 
   
    }

  return (
    
      <div className="p-6 space-y-4 sm:p-8">
        <div className="relative flex justify-end text-2xl mb-10 border-b-4 border-[#77B327] p-5 ">
      <button
        className='absolute top-1/3 left-5 text-xl w-10 h-10 rounded-full flex justify-center rounded '
        onClick={handleCloseModal}
      >
      <MdArrowBack/>
      </button>
      <h1>{cartel.descripcion}</h1>
      </div>
     

      {/**Form agregar insumo */}
<div className="justify-center p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 w-full">
       
       <h1 className="text-3xl mb-4 font-semibold text-start">AGREGAR INSUMOS</h1>
     <div className=" flex grid sm:gap-2  sm:grid-cols-2 md:gap-4 md:grid-cols-4">
     <div>
     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
           Cartel
         </label>
   <select
         value={insumo.name}
         onChange={handleSelect}
         name="name"

         className="px-4  py-4  w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
       >
         <option value='' defaultValue={''}>
           Seleccionar insumo
         </option>
         {insumos2.map((e: any) => (
           <option key={e.id} value={e.name}>{e.name}</option>
         ))}
       </select>
   </div>
   <div>
   <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
           Costo
         </label>
   <input
         type="number"
         name="costo"
         className="px-4 py-3 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
         placeholder="costo"
         value={
           insumo.costo?
             insumo.costo
             :
             "costo"
         }
         onChange={handleChangeInsumo}
       />

   </div>

       <div>
       <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
           unidad
         </label>
       <input
         type="text"
         name="unidad"
         className="px-4 py-3 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
         placeholder="unidad"
         value={
           unidadArray ?
             insumo.unidad = unidadArray
             :
             "unidad"
         }
         onChange={handleChangeInsumo}
       />
       </div>
       <div>
     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          faz
         </label>
     <select
         value={
           insumo.faz?
           insumo.faz
           :
           "simple"
         }
         onChange={handleSelect}
         name="insumo"
         className="px-4  py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
       >
       <option value="simple">simple</option>
       <option value="doble">doble</option>
     </select>
     </div>
     </div>
     <div className=" flex mt-5 grid sm:gap-2  sm:grid-cols-2 md:gap-4 md:grid-cols-4">
    

     <div>
     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
           Cant 1 faz
         </label>
     <input
       type="number"
       name="cant1faz"
       className="px-4 py-3 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
       placeholder="C. 1 faz"
       value={insumo.cant1faz}
       onChange={handleChangeInsumo}

     />
     </div>

      
{/**condiciolan de costos doble o simples */}
<div>
{
insumo.faz==="doble"?

<>
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
           Cant 2 faz
         </label>
<input
type="number"
name="cant2faz"
className="px-4 py-3 w-full rounded-md mr-1 border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
placeholder="C. 2 faz"
value={insumo.cant2faz}
onChange={handleChangeInsumo}
/>
</>
:
<>
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
           Cartel
         </label>
<input
type="number"
name="cant2faz"
className="px-4 py-3 w-full blur-sm rounded-md mr-1 border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
placeholder="C. 2 faz"
value={insumo.cant2faz}
onChange={handleChangeInsumo}
disabled
/>
</>

}
</div>
{/**condiciolan de costos doble o simples */}
<div>
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
           Costo 1 faz
         </label>
<input
       type="number"
       name="costox1faz"
       className="px-4 py-3 w-full rounded-md  mr-1 border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
       placeholder="cantidad de 1 faz"
       value={
         insumo.cant1faz ?
           insumo.costox1faz = multiplicar(insumo.cant1faz, insumo.costo)
           :
           "costo"
       }
       onChange={handleChangeInsumo}
     />
</div>
{/**condiciolan de costos doble o simples */}
<div>
{
insumo.faz==="doble"?
<>
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
           Costo 2 Faz
         </label>
<input
type="number"
name="costox2faz"
className="px-4 py-3 w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
placeholder="costo 2 faz"
value={
insumo.cant2faz ?
 insumo.costox2faz = multiplicar(insumo.cant2faz, insumo.costo)
 :
 "costo"
}
onChange={handleChangeInsumo}
/>
</>
:
<>
<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
           Costo 2 faz
         </label><input
type="number"
name="costox2faz"
className="px-4 py-3 blur-sm w-full rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
placeholder="costo 2 faz"
value={
insumo.cant2faz ?
insumo.costox2faz = multiplicar(insumo.cant2faz, insumo.costo)
:
"costo"
}
onChange={handleChangeInsumo}
disabled
/>
</>

}
</div>  
     </div> 
     
{/**condiciolan de costos doble o simples */}

     <button
       onClick={addInsumoCartel}
       className="mt-4 px-4 py-3 w-40 flex justify-end leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-red-700 hover:bg-red-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
     >
       crear insumo
     </button>
   </div>
{/**end form agregar insumo */}
        <form onSubmit={handleSubmit} className="flex flex-col mt-4 p-5">
        <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                name
              </label>
              <input
                type="text"
                name="descripcion"
                className="px-4 py-3 w-full mb-2 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Nombre"
                value={values.descripcion}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-600 text-sm">{errors.username}</p>
              )}
            </div>
          <div className="flex">
           
            <div className="ml-1">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                costo 1 faz
              </label>
              <input
                type="text"
                name="costo1faz"
                className="px-4 py-3 w-40 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Nombre"
                value={totalcosto1faz?
                values.costo1faz=totalcosto1faz
                :
                0
                }
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-600 text-sm">{errors.username}</p>
              )}
            </div>
            <div className="ml-1">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                costo 2 faz
              </label>
              <input
                type="text"
                name="costo2faz"
                className="px-4 py-3 w-40 rounded-md border bg-gray-100 appearance-none border-gray-300 focus:outline-none focus:bg-white focus:ring-0 text-sm"
                placeholder="Nombre"
                value={totalcosto2faz?
                  values.costo2faz=totalcosto2faz
                  :
                  0
                  }
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-600 text-sm">{errors.username}</p>
              )}
            </div>
          </div>
          <div className="flex">
            
           
          </div>
          <div className="flex justify-center">
            {category.map((e: any) => (
              <div
                className="w-full flex rounded-t-lg border-b border-gray-200 dark:border-gray-600"
                key={e.id}
              >
                <div className="flex items-center pl-3">
                  <input
                    id={e}
                    type="checkbox"
                    value={e}
                    onChange={(e: any) => categoryForm(e)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    key={e.id}
                    className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {e}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-start mt-5 flex grid sm:gap-2 sm:grid-cols-2  md:gap-3 md:grid-cols-3 text-lg rounded-b">
            {
              values.insumosArray?
              values.insumosArray.map((e: any) => (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteInsumos(e)}
                  className="bg-white text-black  active:bg-[#77B327] border-gray-400 border-2 mt-2 uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                >
                  <p><b>Nombre: </b>{e.name}</p>
                  <p><b>costo: </b>{e.costo}</p>
  
                </div>
              ))
              :
              "No hay insumos"
            }
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
  );
};

export default ClienteEdit;

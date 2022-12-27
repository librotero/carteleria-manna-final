import useOrdenes from "../../store/ordenes";
import useLocalStorage from "../../hooks/useLocalStorage";
const [accessToken] = useLocalStorage();
import useHeaders from "../../hooks/useHeaders";
import Swal from 'sweetalert2'
import { useEffect, useState, Fragment } from "react";

type Props={
    values:any
    date1:any
    date2:any
    setDate1:any
    setDate2:any
    setValues:any
}

const FilterByDate =({values, date1, date2 , setDate1, setDate2, setValues}:Props)=>{
    const { ordenes2, getOrdenesAll, getOrdenes,getOrdenesDate, deleteOrdenes, loading } =
    useOrdenes((state) => state);
    const [accessToken] = useLocalStorage();
    const headers = useHeaders(accessToken);
    useEffect(() => {

        getOrdenesDate(date1, date2, accessToken);
        console.log("holaaaaaaaaaaaaaaaaaaaaa", ordenes2);
      }, [date1, date2]);
    const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { name, value } = e.currentTarget;
        setValues({
          ...values,
          [name]: value,
        });
        console.log("una fecha ", values);
      };

    const searchByDate = () => {
        if(values.date1 && values.date2){
          setDate1(values.date1)
          setDate2(values.date2)
          getOrdenesDate(date1, date2, accessToken)
        }else{
          Swal.fire({
            title: 'Hola',
            html:
          'No has seleccionado ningún rago de fecha',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }
          
        };

    return (
        <div className=" mr-2 mb-2 ml-2 rounded mt-2 p-2  flex justify-end">
        <div className="w-1/4 flex justify-end align-center pt-2 ml-2">
          <div date-rangepicker className="flex items-center">
            <div className="relative">
              
              <input 
              type="date" 
              id="first_name"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
               name="date1"
                value={values.date1}
                onChange={handleChange} 
               required
               />

             
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative">
              
              <input 
              type="date" 
              id="first_name"
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
               name="date2"
                value={values.date2}
                onChange={handleChange} 
               required
               />
            </div>
          </div>
          <button
            className="ml-2 bg-transparent hover:bg-blue-500 text-blue-700 text-2xl font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={searchByDate}
          >
            filtrar
          </button>
        </div>
      </div>

    )
}
export default FilterByDate
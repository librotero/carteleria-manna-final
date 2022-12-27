import { useEffect, useState, Fragment } from "react";
import moment from 'moment'
type Props ={
    vendedores:any
    ordenes:any
    date1:any
    date2:any
}
import {FiUser} from 'react-icons/fi'
const VendedoresTable =({vendedores, ordenes, date1, date2}:Props)=>{

  var descripcionVendedores: any=[]
  descripcionVendedores = vendedores.map((e:any)=>e.ordenes.filter(
    (n: any) =>
      moment(n.fecha).format("L") >= moment(date1).format("L") &&
      moment(n.fecha).format("L") <= moment(date2).format("L")
  )&& e)
  let busca: any =  vendedores.map((i:any)=>i.ordenes.filter(
    (n: any) =>
      moment(n.fecha).format("L") >= moment(date1).format("L") &&
      moment(n.fecha).format("L") <= moment(date2).format("L")
  )) 

console.log("holcvcvcvcvcvcva", busca)
  useEffect(() => {
  
  }, []);
    return(
<>



<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table className="min-w-full leading-normal relative">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              
                <th scope="col" className="py-3 px-6">
                    vendedor
                </th>
                <th scope="col" className="py-3 px-6">
                    estado
                </th>
                <th scope="col" className="py-3 px-6">
                    ordenes
                </th>
                <th scope="col" className="py-3 px-6">
                    totales
                </th>
                
            </tr>
        </thead>
        <tbody>
        {
 descripcionVendedores.map((e:any, index:any)=>(
  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
     
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {e.name}
                </th>
                <td className="py-4 px-6">
                    {e.state === true? <p className="uppercase, bg-green-600 p-2 text-white rounded text-center content-center">on</p>:<p className="uppercase, bg-gray-600 p-2 text-white rounded text-center content-center">off</p>}
                </td>
                <td className="py-4 px-6">
                    {(e.ordenes.filter(
    (n: any) =>
      moment(n.fecha).format("L") >= moment(date1).format("L") &&
      moment(n.fecha).format("L") <= moment(date2).format("L")
  )).length}
                </td>
                <td className="py-4 px-6">
               {
                (busca[index].map((i:any)=>i.montototal)).reduce((a: any, b: any) => a + b, 0)
               }
                </td>
              
            </tr>
 ))
}
            
        </tbody>
    </table>
</div>

</>
    )
}
export default VendedoresTable
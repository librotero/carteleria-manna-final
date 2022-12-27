

import create from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';

interface Headers {
	"x-access-token": { token: string };
}
//const url: any = "http://localhost:5000"
const url: any = "https://young-knife-production.up.railway.app"
interface Presupuesto {
    fecha: Date,
    clientes: string,// que muestre nombre de contacto y telefono en el front
    carteles: [string],
    operacion:string,
    lugardecolocacion: string,//lugar de entrega colocación/entrega
    montototal: number,
    formadepago:string,
    plazodeentrega:number,
    fechavalida: Date,//presupuesto valido hasta 
    observaciones:string
}


type PresupuestoStore = {
  presupuestos:any
  presupuesto: any
  tokken: any
  success: boolean
  error: boolean
  loading: boolean
  getPresupuestosAll: (
		token: string,
		page: number,
		limit: number,
    name: string
	) => Promise<void>;
  addPresupuesto: (body:{}) => Promise<void>
  getPresupuestos: (headers:{})=>Promise<void>
  deletePresupuestos: (params:any, headers:any)=> Promise<void>
  putPresupuesto: (body:any, token:any) => Promise<void>
  closeModal: () => void;
}


const usePresupuesto = create<PresupuestoStore>()(
    devtools((set) => ({
      //states
      presupuestos:[],
      presupuesto: {},
      tokken: '',
      success: false,
      error: false,
      loading: false,
      
      //actions
      putPresupuesto: async (body, token) => {
        
        let headers:any = {
        "x-access-token" : token
      };
        const { data } = await axios.put(`${url}/api/presupuesto`, body, { headers: { "x-access-token": token} });
       

      },
      addPresupuesto: async (body) => {
        try {
          const { data } = await axios.post(`${url}/api/presupuesto/create`, body );
        set({ success: true, error: false });
        } catch (error) {
          set({ error: true, success: false });
        }

      },
      getPresupuestos: async (headers:any) => {
        set({ loading: true });

        try{
          const { data } = await axios.get(`${url}/api/presupuesto`, headers )
          set((state) => ({ presupuestos: (state.presupuestos = data) }));
        }catch(error){
        }
        set({ loading: false });

      },
      getPresupuestosAll: async (token, page, limit,name) => {
        try{
          set({ loading: true}) 
          const { data } = await axios.get(`${url}/api/presupuestoss/allpresupuestos?page=${page}&limit=${limit}&name=${name}`,
          { headers: { "x-access-token": token } })
          set((state) => ({ presupuestos: (state.presupuestos = data) }));
        } catch(error){
          console.log(error)
        }
        set({ loading: false});
          
        },
      deletePresupuestos: async (params:any, headers:any)=>{
      
        const { data } = await axios.delete(`${url}/api/presupuesto/${params}`,  headers);
  
      },
      closeModal: () => {
        set({ error: false, success: false });
      },
    }
    ))
  )
  
  export default usePresupuesto;
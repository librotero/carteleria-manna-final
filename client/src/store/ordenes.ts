import create from 'zustand';
import axios from 'axios';
import { devtools } from 'zustand/middleware';


interface Headers {
	"x-access-token": { token: string };
}

//const url: any = "http://localhost:5000"
const url: any = "https://young-knife-production.up.railway.app"

interface Orden {
  fecha: string,
  cliente: string,
  contacto: string,//nombre de contacto
  carteles: [string],
  operacion:string,
  lugardecolocacion:string,
  lugartraslado:string,
  montototal: number,
  seña: number,
  formadepago: string,
  fechaentrega: string,
  facturanum: string,
  plazodeentrega: string;
  observaciones:string
}


type UserStore = {
  orden: any
  ordenes:any
  tokken: any
  success: boolean
  ordenes2:any
  error: boolean
  loading: boolean,
  postOrden: (body:any, token:any) => Promise<void>;
  getOrdenesDate:(
    token:string,
    date1:string,
    date2:string
  ) => Promise<void>;
  getOrdenesAllByName: (
		token: string,
		page: number,
		limit: number,
    name: string
	) => Promise<void>;
  getOrdenesAll: (
		token: string,
		page: number,
		limit: number,
    name:string
	) => Promise<void>;
  putOrden: (body:any, token:any) => Promise<void>
  getOrdenes: (token:any) => Promise<void>
  deleteOrdenes: (params:any, headers:any, idUser:string)=> Promise<void>
  closeModal: () => void
}


const useOrdenes = create<UserStore>()(
    devtools((set) => ({
      //states
      orden: {},
      ordenes:[],
      ordenes2:[],
      tokken: '',
      success: false,
      error: false,
      loading: false,
  
      //actions
      putOrden: async (body, token) => {
        
        let headers:any = {
        "x-access-token" : token
      };
        const { data } = await axios.put(`${url}/api/orden`, body, { headers: { "x-access-token": token} });
       

      },
      getOrdenesDate: async (date1, date2, token) => {
        let headers:any = {
          "x-access-token" : token
        };
        try{
          set({ loading: true}) 
          const { data } = await axios.get(`${url}/api/ordenes/ordenesbydate?date1=${date1}&date2=${date2}`,{ headers: { "x-access-token": token} }
          )
          set((state) => ({ ordenes2: (state.ordenes2 = data) }));
        }catch(error){
          console.log(error)
        }
        set({ loading: false})  
      },
      postOrden: async (body, token) => {
        
        let headers:any = {
        "x-access-token" : token
      };
      set({ success: true, error: false });
       try{ 
        const { data } = await axios.post(`${url}/api/ordenes/create`, body, { headers: { "x-access-token": token} });
      }catch (error) {
        set({ error: true, success: false });
       }

      },
      getOrdenes: async (headers) => {
        try{
          set({ loading: true}) 
          const { data } = await axios.get(`${url}/api/ordeness`, headers )
          set((state) => ({ ordenes2: (state.ordenes2 = data) }));
        }catch(error){
          console.log(error)
        }
        set({ loading: false})  
      },
      getOrdenesAll: async (token, page, limit, name) => {
        try{
          set({ loading: true}) 
          const { data } = await axios.get(`${url}/api/ordeness/all?page=${page}&limit=${limit}&name=${name}`,
          { headers: { "x-access-token": token } })
          set((state) => ({ ordenes: (state.ordenes = data) }));
        } catch(error){
          console.log(error)
        }
        set({ loading: false});
          
        },
        getOrdenesAllByName: async (token, page, limit, name) => {
          try{
            set({ loading: true}) 
            const { data } = await axios.get(`${url}/api/ordeness/byname?page=${page}&limit=${limit}&name=${name}`,
            { headers: { "x-access-token": token } })
            set((state) => ({ ordenes: (state.ordenes = data) }));
          } catch(error){
            console.log(error)
          }
          set({ loading: false});
            
          },
      deleteOrdenes: async (params, headers, idUser)=>{
        set({ success: true, error: false });
        const { data } = await axios.delete(`${url}/api/ordene/${params}?idUser=${idUser}`,   headers);
        set({ success: true, error: false });  
      },
      closeModal: () => {
        //set({ error: false})
        set({ success: false})
      },
     // verificated: (token: any) => {
       // set((state) => ({ tokken: (state.tokken = token) }));
    //},
    }))
  )
  
  export default useOrdenes;
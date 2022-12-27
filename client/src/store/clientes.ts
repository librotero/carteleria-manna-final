import create from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";

interface Headers {
	"x-access-token": { token: string };
}
const url: any = "http://localhost:5000"
//const url: any = "https://smiling-relation-production.up.railway.app"
type ClientStore = {
	clientes: [];
	success: boolean;
	error: boolean;
	loading: boolean
	getClients: (headers: {}) => Promise<void>;
	getClientesAll: (
		token: string,
		page: number,
		limit: number,name:string
	) => Promise<void>;
	addClient: (body: {}) => Promise<void>;
	putClients: (body:any, token:any) => Promise<void>
	deleteClients: (params: {}, headers:any) => Promise<void>;
	closeModal: () => void;
};

const useClients = create<ClientStore>()(
	devtools((set) => ({
		//initial state
		clientes: [],
		success: false,
		error: false,
		loading: false,

		//actions
		putClients: async (body, token) => {
        
			let headers:any = {
			"x-access-token" : token
		  };
		  set({ success: true})
		  set({ loading: true}) 
			const { data } = await axios.put(`${url}/api/clientes`, body, { headers: { "x-access-token": token} });
			set({ success: false})
			
			set({ loading: false}) 
	
	
		  },
		getClients: async (headers) => {
			try {
				set({ loading: true}) 
				const { data } = await axios.get(
					`${url}/api/clientes`,
					headers
				);
				set((state) => ({ clientes: (state.clientes = data) }));	
			} catch (error) {
				console.log(error)
			}
			set({ loading: false})  
		},
		getClientesAll: async (token, page, limit,name) => {
			try{
			  set({ loading: true}) 
			  const { data } = await axios.get(`${url}/api/clientes/allclientes?page=${page}&limit=${limit}&name=${name}`,
			  { headers: { "x-access-token": token } })
			  set((state) => ({ clientes: (state.clientes = data) }));
			} catch(error){
			  console.log(error)
			}
			set({ loading: false});
			  
		  },
		addClient: async (body) => {
			try {
				await axios.post(
					`${url}/api/clientes/create`,
					body
				);
				set({ success: true, error: false });
			} catch (error) {
				set({ error: true, success: false });
			}
		},
		deleteClients: async (params, headers)=>{
			set({ loading: true}) 
			const { data } = await axios.delete(`${url}/api/clientes/${params}`,   headers);
			set({ loading: false})  
		  },
		closeModal: () => {
			set({ error: false, success: false });
		},
	}))
);

export default useClients;

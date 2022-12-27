import create from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";

interface Headers {
	"x-access-token": { token: string };
}
//const url: any = "http://localhost:5000"
const url: any = "https://smiling-relation-production.up.railway.app"

type ProveedoresStore = {
	proveedores: [];
	proveedor:{};
	success: boolean;
	error: boolean;
	loading: boolean
	getProveedores: (headers: {}) => Promise<void>;
	putProveedor: (body:any, token:any) => Promise<void>
	addProveedores: (body: {}) => Promise<void>;
	deleteProveedores: (params: {}, headers:any) => Promise<void>;
	getProveedoresAll: (
		token: string,
		page: number,
		limit: number,
		name:string
	) => Promise<void>;
	closeModal: () => void;
};

const useProveedores = create<ProveedoresStore>()(
	devtools((set) => ({
		//initial state
		proveedores: [],
		proveedor:{},
		success: false,
		error: false,
		loading: false,

		//actions
		putProveedor: async (body, token) => {
        
			let headers:any = {
			"x-access-token" : token
		  };
		  set({ success: true})
		  set({ loading: true}) 
			const { data } = await axios.put(`${url}/api/proveedor`, body, { headers: { "x-access-token": token} });
			set({ success: false})
			
			set({ loading: false}) 
	
	
		  },
		getProveedores: async (headers) => {
			try {
				set({ loading: true}) 
				const { data } = await axios.get(
					`${url}/api/proveedor`,
					headers
				);
				set((state) => ({ proveedores: (state.proveedores = data) }));	
			} catch (error) {
				console.log(error)
			}
			set({ loading: false})  
		},
		getProveedoresAll: async (token, page, limit, name) => {
			try{
			  set({ loading: true}) 
			  const { data } = await axios.get(`${url}/api/proveedor/allproveedores?page=${page}&limit=${limit}&name=${name}`,
			  { headers: { "x-access-token": token } })
			  set((state) => ({ proveedores: (state.proveedores = data) }));
			} catch(error){
			  console.log(error)
			}
			set({ loading: false});
			  
			},
		addProveedores: async (body) => {
			try {
				await axios.post(
					`${url}/api/proveedor/create`,
					body
				);
				set({ success: true, error: false });
			} catch (error) {
				set({ error: true, success: false });
			}
		},
		deleteProveedores: async (params, headers)=>{
      
			const { data } = await axios.delete(`${url}/api/proveedor/${params}`,   headers);
	  
		  },
		closeModal: () => {
			set({ error: false, success: false });
		},
	}))
);

export default useProveedores;

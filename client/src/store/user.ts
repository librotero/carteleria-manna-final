import create from "zustand";
import axios from "axios";
import { devtools } from "zustand/middleware";

interface User {
	email: string;
	password: string;
	roles: string[];
	id: string;
	name: string;
	lastname: string;
	dni: Number;
	fechaNacimiento: Date;
}
//const url: any = "https://young-knife-production.up.railway.app"
const url: any = "http://localhost:5000"

interface UserLogin {
	email: string;
	password: string;
}

type UserStore = {
	user: any;
	users: any;
	users3: any
	isLogged: boolean;
	success: boolean;
	error: boolean;
	loading: boolean;
	getUser: (user: string) => Promise<void>;
	getUsers2: (headers:any) => Promise<void>;
	putUserState: (body:any, token:any) => Promise<void>
	getUsers: (
		token: string,
		rol: string,
		sort: string,
		page: number,
		limit: number,
		name: string
	) => Promise<void>;
	createNewUser: (body: any) => Promise<void>;
	signin: (body: UserLogin) => Promise<void>;
	deleteUsers: (params: {}, headers:any) => Promise<void>;
	logout: () => void;
	closeModal: () => void;
	updateToken: (refreshToken: string) => Promise<void>;
};

const useUser = create<UserStore>()(
	devtools((set) => ({
		//inicial state
		user: {},
		users: [],
		users3: [],

		isLogged: false,
		success: false,
		error: false,
		loading: false,

		//actions
		putUserState: async (body, token) => {
        
			let headers:any = {
			"x-access-token" : token
		  };
		  set({ success: true})
		  set({ loading: true}) 
			const { data } = await axios.put(`${url}/api/users/state`, body, { headers: { "x-access-token": token} });
			set({ success: false})
			
			set({ loading: false}) 
	
	
		  },
		getUser: async (token) => {
			try {
				const { data } = await axios.get(
					`${url}/api/user/profile`,
					{ headers: { "x-access-token": token } }
				);
				set((state) => ({ ...state, user: (state.user = data) }));
			} catch (error) {
				localStorage.removeItem("auth");
			}
		},
		getUsers: async (token, rol, sort, page, limit, name) => {
			const { data } = await axios.get(
				`${url}/api/user/allusers?roles=${rol}&sort=${sort}&page=${page}&limit=${limit}&name=${name}`,
				{ headers: { "x-access-token": token } }
			);
			if (!data) {
				set({ loading: true });
			}
			set((state) => ({ ...state, users: (state.users = data) }));
		},
		getUsers2: async (headers) => {
			const { data } = await axios.get(
				`${url}/api/users/all`, headers
			);
			if (!data) {
				set({ loading: true });
			}
			set((state) => ({ ...state, users3: (state.users3 = data) }));
		},
		createNewUser: async (body) => {
			try {
				await axios.post(
					`${url}/api/user/signUp`,
					body
				);
				set({ success: true, error: false });
			} catch (error) {
				set({ error: true, success: false });
			}
		},
		signin: async (body) => {
			try {
				const { data } = await axios.post(
					`${url}/api/user/signIn`,
					body
				);
				localStorage.setItem("auth", JSON.stringify(data));
				set({ isLogged: true });
			} catch (error) {
				console.log(error)
			}
		},
		deleteUsers: async (params, headers)=>{
      
			const { data } = await axios.delete(`${url}/api/user/${params}`,   headers);
	  
		  },
		logout: () => {
			localStorage.removeItem("auth");
		},
		closeModal: () => {
			set({ error: false, success: false });
		},
		updateToken: async (refreshToken) => {
			const { data } = await axios.post(
				`${url}/api/user/refresh`,
				{},
				{ headers: { "x-access-token": refreshToken } }
			);
			localStorage.setItem("auth", JSON.stringify(data));
		},
	}))
);

export default useUser;

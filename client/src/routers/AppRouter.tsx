import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Sidebar from "../components/Sidebar";
import Insumos from "../pages/Insumos";
import Carteles from '../pages/Carteles';
import Clientes from "../pages/Clientes";
import Proveedores from "../pages/Proveedores";
import Ordenes from "../pages/Ordenes";
import Presupuesto from "../pages/Presupuesto";
import Dashboard from "../pages/Dashboard";
const AppRouter = () => {
	
	return (
		<>
			<Sidebar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/insumos' element={<Insumos />} />
				<Route path='/carteles' element={<Carteles />} />
				<Route path='/usuarios' element={<Users />} />
				<Route path='/clientes' element={<Clientes />} />
				<Route path='/proveedores' element={<Proveedores />} />
				<Route path='/ordenes' element={<Ordenes />} />
				<Route path='/presupuesto' element={<Presupuesto />} />
				<Route path='/dashboard' element={<Dashboard/>} />
			</Routes>
		</>
	);
};

export default AppRouter;

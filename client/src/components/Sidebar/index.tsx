import { GiHamburgerMenu } from "react-icons/gi";
import { Transition, Menu } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineLogout,
  MdOutlinePanorama,
  MdOutlineAppRegistration,
  MdOutlinePaid,
  MdDashboardCustomize
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import useUser from "./../../store/user";
import { useEffect, Fragment, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { getUser, putUserState, user, logout } = useUser((state) => state);
  const [accessToken] = useLocalStorage();
  const [body, setBody] =useState({
    id: user.id, 
    state:false
  })
  useEffect(() => {
    getUser(accessToken);
    }, []);

  const AdminOptions = ["Clientes", "Insumos", "Proveedores", "Usuarios"];
 
  const handleLogout = () => {
    setBody({
      ...body,
      id: user._id,
      state: false
    })
    putUserState(body, accessToken)
    user.state===false
    if (user._id === body.id){
     
  
      logout();
     location.reload();
    }
 
  };

  return (
    <div>
      <nav>
        <button
          onClick={() => setShow(!show)}
          className="absolute top-4 right-4 inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-[#77B327] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
        >
          <GiHamburgerMenu
            className="block lg:hidden h-6 w-6"
            aria-hidden="true"
          />
        </button>
        <div
          className={`p-6 h-screen bg-zinc-800 z-20 fixed top-0 ${
            show ? "left-0" : "-left-96"
          } lg:left-0 lg:w-60 peer:transition ease-out delay-150 duration-200`}
        >
          <div className="flex flex-col justify-start item-center">
            
            <Link to="/" className="border-b border-gray-100 pb-4 w-full">
              <img
                src="https://carteleriamanna.com.ar/sistema/img/generales/logo.png"
                alt="Manna Logo"
                className="w-3/4 self-center"
              />
            </Link>
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="m-4 text-center">
                {user.roles?.find((e: any) => e.name === "impresiones") && (
                  <h3 className="text-lg text-gray-400 group-hover:text-white font-semibold ">
                    IMPRESIONES
                  </h3>
                )}
              </div>
              <div className="m-4 text-center">
                {user.roles?.find((e: any) => e.name === "carteleria") && (
                  <h3 className="text-lg text-gray-400 group-hover:text-white font-semibold ">
                    CARTELERIA
                  </h3>
                )}
              </div>

              {user.roles?.find((e: any) => e.name === "gerente") && (
                <>
                <Link
                    to="/"
                    className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                  >
                    <MdOutlineSpaceDashboard className="text-2xl text-gray-500 group-hover:text-white " />
                    <h3 className="text-lg text-gray-400 group-hover:text-white font-semibold ">
                      Inicio
                    </h3>
                  </Link>
                  
                <Link
                  to="/carteles"
                  className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                >
                  <MdOutlinePanorama className="text-2xl text-gray-500 group-hover:text-white " />
                  <h3 className="text-lg text-gray-400 group-hover:text-white font-semibold ">
                    Carteles
                  </h3>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                >
                  <MdDashboardCustomize className="text-2xl text-gray-500 group-hover:text-white " />
                  <h3 className="text-lg text-gray-400 group-hover:text-white font-semibold ">
                    Dashboard
                  </h3>
                </Link>
                </>
              )}

              {user.roles?.find(
                (e: any) => e.name === "gerente" || e.name === "vendedor"
              ) && (
                <Link
                  to="/ordenes"
                  className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                >
                  <MdOutlineAnalytics className="text-2xl text-gray-500 group-hover:text-white " />
                  <h3 className="text-lg text-gray-400 group-hover:text-white font-semibold ">
                    Órdenes
                  </h3>
                </Link>
              )}

              {user.roles?.find(
                (e: any) => e.name === "gerente" || e.name === "vendedor"
              ) && (
                <>
                  
                  <Link
                    to="/presupuesto"
                    className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
                  >
                    <MdOutlinePaid className="text-2xl text-gray-500 group-hover:text-white " />
                    <h3 className="text-lg text-gray-400 group-hover:text-white font-semibold ">
                      Presupuesto
                    </h3>
                  </Link>
                 
                </>
              )}
              {/* <div className='flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
								<MdOutlineIntegrationInstructions className='text-2xl text-gray-500 group-hover:text-white ' />
								<h3 className='text-lg text-gray-400 group-hover:text-white font-semibold '>
									Reportes
								</h3>
							</div> */}
            </div>
            {/* setting  */}
            {user.roles?.find((rol: any) => rol.name === "gerente") && (
              <Menu as="div" className=" my-4 border-b border-gray-100 pb-4">
                <Menu.Button className="flex w-full mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                  <MdOutlineAppRegistration className="text-2xl text-gray-500 group-hover:text-white " />
                  <h3 className="text-lg text-gray-400 group-hover:text-white font-semibold ">
                    Administrar
                  </h3>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-6 mt-2 w-48 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      {AdminOptions.map((item: string, index: number) => (
                        <Menu.Item key={index + item}>
                          {({ active }) => (
                            <Link
                              to={`/${item.toLocaleLowerCase()}`}
                              className={`${
                                active
                                  ? "bg-red-600 text-white"
                                  : "text-gray-900"
                              } group flex w-full px-8 items-center rounded-md px-2 py-2 text-lg font-semibold`}
                            >
                              {item}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
            {/* logout */}
            <div className=" my-4">
              <div
                onClick={handleLogout}
                className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-[#77B327] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
              >
                <MdOutlineLogout className="text-2xl text-gray-500 group-hover:text-white " />
                <h3 className="text-lg text-gray-400 group-hover:text-white font-semibold ">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

import useUser from "../store/user";
import useOrdenes from "../store/ordenes";

import Layout from "../components/Layout/index";
import { useEffect, useState, Fragment } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Modal from "../components/Modal";
import CreateNewUser from "../components/CreateNewUser";
//import shallow from "../../zustand/shallow";
import Swal from 'sweetalert2'
import ModalVer from "../components/ModalVer";
import VerCliente from "../components/verCliente";

import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdLastPage,
  MdFirstPage,
  MdOutlineAdd,
  MdExpandLess,
  MdExpandMore,
} from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";

import Loader from "../components/Loader";
import useHeaders from "../hooks/useHeaders";
import useClients from "../store/clientes";
import ModalEdit from "../components/ModalEdit";
import Form from "../components/Form";
import FormEdit from "../components/FormEdit";
import Table from "../components/Table";
import Header from "../components/header";

const Clientes = () => {
  const { clientes, getClients, putClients, getClientesAll, loading, success, deleteClients, closeModal, addClient, errors } = useClients(
    (state:any) => state
  );
   const { ordenes, ordenes2, getOrdenes} = useOrdenes(
    (state:any) => state
  );
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  const [ordenesPorMes, setOrdenesPorMes] = useState([])
  const [values, setValues] = useState({
    id: "",
		name: "",
		telefono: "",
		cuit: "",
		email: "",
		direccion: "",
		condicioniva: "",
		razonsocial: "",
	});
  const [valuesBody, setValuesBody] = useState([
    {name:"name", value:""}, 
    {name:"telefono", value:""}, 
    {name:"cuit", value:""}, 
    {name:"email", value:""}, 
    {name:"direccion", value:""}, 
    {name:"condicioniva", value:""}, 
    {name:"razonsocial", value:""}
  ]);
  const [clientEdit, setClientEdit] = useState({
    id: "",
    name: "",
    telefono: "",
    cuit: "",
    email: "",
    direccion: "",
    condicioniva: [""],
    razonsocial: "",
  });
  const [name, setName] = useState('');
  const [tableItems, setTableItems]=useState([
    "nombre", "telefono", "direccion", "email", "cuit", "condición i.v.a", "ver", "editar", "eliminar"
  ])
 

  useEffect(() => {
    getClientesAll(accessToken, page, limit, name);
    getOrdenes(headers)
    console.log("holaaaaaaaaaaaaaaaaaaaaa", values)
   
  }, [page, limit, name]);
  

  //delete
  const DeleteCliente = (client: any) => {
    
    Swal.fire({
			title: '¿Estás seguro?',
			text: "No podrás revertir los cambios",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#77B327',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Eliminarlo!'
		  }).then((result:any) => {
			if (result.isConfirmed) {
        var newArray:any = clientes.clientes
        var arrayeliminado : any =clientes.clientes.filter((e:any)=>e._id!==client._id)
        clientes.clientes=arrayeliminado
        deleteClients(client._id, headers);
			  Swal.fire(
				'Eliminado!',
				'X ha sido eliminado',
				'success'
			  )
       
			}
		  })
  };

 



  
  const edit = (client: any) => {
    if (client) {
      setShowModal2(true);
      console.log("hofffffffffffffffffffffffla", client);
      setValues({
        id: client._id,
        name: client.name,
        telefono: client.telefono,
        cuit: client.cuit,
        email: client.email,
        direccion: client.direccion,
        condicioniva: client.condicioniva,
        razonsocial: client.razonsocial,
      });
      setValuesBody([
        {name:"name", value:client.name}, 
        {name:"telefono", value:client.telefono}, 
        {name:"cuit", value:client.cuit}, 
        {name:"email", value:client.email}, 
        {name:"direccion", value:client.direccion}, 
        {name:"condicioniva", value:client.condicioniva}, 
        {name:"razonsocial", value:client.razonsocial}
      ])
      console.log("insumo", valuesBody);
    }
  };

  const ver = (client: any) => {

    if (client) {
      var ordenesArray:any = ordenes2.filter((e:any)=>e.cliente===client.name)
      setOrdenesPorMes(ordenesArray)
      setShowModal3(true);
      console.log("hola", client);
      setClientEdit({
        id: client._id,
        name: client.name,
        telefono: client.telefono,
        cuit: client.cuit,
        email: client.email,
        direccion: client.direccion,
        condicioniva: client.condicioniva,
        razonsocial: client.razonsocial,
      });
      console.log("insumo", clientEdit);
    }
  };

  return (
    <Layout>
      <div className="xl:container mx-auto px-4 sm:px-8">
        <div className="py-3">
          
          {/**start header */}
          <Header 
          text={"clientes"} 
          setName={setName} 
          setLimit={setLimit}
          />
          {/**end header */}


          {/**start table */}
          <Table 
          getItemsAll={getClientesAll}
          text={"clientes"} 
          items={clientes.clientes} 
          itemGeneral={clientes} 
          tableItems={tableItems} 
          loading={loading} 
          addEdit={putClients}
          setShowModal2={setShowModal2}
          showModal2={showModal2}
          TextForm={"Editar Cliente"}
          closeModal={closeModal}
          values={values}
          setValues={setValues}
          errors={errors}
          valuesBody={valuesBody}
          edit={edit}
          actionDelete={deleteClients}
          />
          {/**end table */}

        </div>
        <div className="mb-5">
          <button
            className="bg-[#77B327] text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            onClick={() => setShowModal(true)}
          >
            <span className="text-white flex items-center gap-2">
              Agregar nuevo cliente <MdOutlineAdd className="text-xl" />
            </span>
          </button>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <Form  values={values} valuesBody={valuesBody} errors={errors} add={addClient} setValues={setValues} setShowModal={setShowModal} clientes={clientes.clientes} TextForm={"Crear Cliente"} closeModal={closeModal} />
        </Modal>
      </div>
    </Layout>
  );
};

export default Clientes;

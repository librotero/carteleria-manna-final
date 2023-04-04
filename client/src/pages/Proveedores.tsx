import useUser from "../store/user";
import Layout from "../components/Layout/index";
import { useEffect, useState, Fragment } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Modal from "../components/Modal";
import ModalEdit from "../components/ModalEdit";
import VerProveedor from "../components/VerProveedor";
import ModalVer from "../components/ModalVer";
import Swal from 'sweetalert2';
//import shallow from "zustand/shallow";
import useInsumo from "../store/insumo";

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
import useProveedores from "../store/proveedores";
import Form from "../components/Form";
import FormEdit from "../components/FormEdit";
import Table from "../components/Table";
import Header from "../components/header";

const Proveedores = () => {
  const { getProveedoresAll, proveedores, deleteProveedores, putProveedor, loading, errors, addProveedores, closeModal } =
    useProveedores((state: any) => state);
  const { getInsumos, insumos2 } =
    useInsumo((state: any) => state);
  
  const [accessToken] = useLocalStorage();
  const headers = useHeaders(accessToken);
  const [page, setPage] = useState(10);
  const [limit, setLimit] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [tableItems, setTableItems]=useState([
     "nombre", "telefono", "direccion", "cuit", "email",  "web", "ver", "editar", "eliminar"
  ])
  const [proveedorEdit, setProveedorEdit] = useState({
    id: "",
    name: "",
    telefono: "",
    cuit: "",
    email: "",
    direccion: "",
    web: "",
  });

  const [insumosProveedor, setInsumosProveedor] = useState([])
  const [name, setName] = useState('');
  const [values, setValues] = useState({
    id: "",

    name: "",
    telefono: "",
    cuit: "",
    email: "",
    direccion: "",
    web: "",
  });
  const [valuesBody, setValuesBody] = useState([
    { name: "name", value: "" },
    { name: "telefono", value: "" },
    { name: "cuit", value: "" },
    { name: "email", value: "" },
    { name: "direccion", value: "" },
    { name: "web", value: "" }
  ]);

  useEffect(() => {
    getProveedoresAll(accessToken, limit, page, name);
    getInsumos(headers)
    console.log("holaaaaaa", insumos2, proveedores);
  }, [limit, page, name]);
  
  //delete
  const DeleteProveedor = (proveedor: any) => {

    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir los cambios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#77B327',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'X ha sido eliminado',
          'success'
        )
        var newArray: any = proveedores.proveedores
        var arrayeliminado: any = proveedores.proveedores.filter((e: any) => e._id !== proveedor._id)
        proveedores.proveedores = arrayeliminado
        deleteProveedores(proveedor._id, headers);
      }
    })

  };
 
  const edit = (proveedor: any) => {
    if (proveedor) {
      setShowModal2(true);
      console.log("hola", proveedor);
      setValues({
        id: proveedor._id,
        name: proveedor.name,
        telefono: proveedor.telefono,
        cuit: proveedor.cuit,
        email: proveedor.email,
        direccion: proveedor.direccion,
        web: proveedor.web,
      });
      console.log("insumo", proveedorEdit);
    setValuesBody([
      { name: "name", value:proveedor.name },
      { name: "telefono", value: proveedor.telefono},
      { name: "cuit", value: proveedor.cuit},
      { name: "email", value: proveedor.email },
      { name: "direccion", value: proveedor.direccion },
      { name: "web", value: proveedor.web}
    ])
    }
  };

  const ver = (proveedor: any) => {

    if (proveedor) {
      var array: any = insumos2.filter((e: any) => e.proveedor === proveedor.name)
      setShowModal3(true);
      setInsumosProveedor(array)
      console.log("hahahahaha", insumos2)
      setProveedorEdit({
        id: proveedor._id,
        name: proveedor.name,
        telefono: proveedor.telefono,
        cuit: proveedor.cuit,
        email: proveedor.email,
        direccion: proveedor.direccion,
        web: proveedor.web,
      });
    }
  };

  return (
    <Layout>
      <div className="xl:container mx-auto px-4 sm:px-8">
        <div className="py-3">
          

          {/**start header */}
          <Header 
          text={"proveedores"} 
          setName={setName} 
          setLimit={setLimit}
          />
          {/**end header */}

            {/**start table */}
         {/**
          *    <Table 
          text={"proveedores"} 
          items={proveedores.proveedores} 
          itemGeneral={proveedores} 
          tableItems={tableItems} 
          loading={loading} 
          addEdit={putProveedor}
          setShowModal2={setShowModal2}
          showModal2={showModal2}
          TextForm={"Editar Proveedor"}
          closeModal={closeModal}
          values={values}
          setValues={setValues}
          errors={errors}
          valuesBody={valuesBody}
          edit={edit}
          />
          */}
          {/**end table */}
        </div>
        <div className="mb-5">
          <button
            className="bg-[#77B327] text-white active:bg-[#77B327] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            onClick={() => setShowModal(true)}
          >
            <span className="text-white flex items-center gap-2">
              Agregar nuevo Proveedor <MdOutlineAdd className="text-xl" />
            </span>
          </button>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <Form values={values} valuesBody={valuesBody} errors={errors} add={addProveedores} setValues={setValues} setShowModal={setShowModal} clientes={proveedores.proveedores} TextForm={"Crear Proveedor"} closeModal={closeModal} />

        </Modal>
      </div>
    </Layout>
  );
};

export default Proveedores;

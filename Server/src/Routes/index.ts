import {Router} from 'express';
import {verifyToken, isGerente, isGerenteVendedor, isGerenteObrero} from '../middlewares/Auth/index'

const router = Router();

//user
import SignUp from './user/SignUp'
import SignIn from './user/SignIn'
import RefreshToken from './user/RefreshToken'
import GetUser from './user/getUsers'
import PutUserDatos from './user/PutUserDatos'
import PutRoleUser from './user/PutRoleUser'
import GetUserById from './user/getUserById'
import DeleteUserById from './user/deleteUserById'
import GetUsersAll from './user/GetUsersAll'
import putChangeState from './user/ChangeStateUser'






router.use('/user', SignUp)
router.use('/user', SignIn)
router.use('/user', RefreshToken)
router.use('/user', verifyToken, GetUserById)
router.use('/user', verifyToken, isGerente, GetUser)
router.use('/users',  PutUserDatos)
router.use('/user', verifyToken, isGerente, PutRoleUser)
router.use('/user',  DeleteUserById)
router.use('/users', GetUsersAll)
router.use('/users', putChangeState)





//insumo
import PostInsumo from './insumo/postInsumo'
import GetInsumo from './insumo/getInsumo'
import DeleteInsumo from './insumo/deleteInsumo'
import PutInsumo from './insumo/putInsumo'
import GetInsumosAll from './insumo/getInsumosAllPages'


router.use('/insumo',PostInsumo)
router.use('/insumos',  GetInsumo)
router.use('/insumo',  DeleteInsumo)
router.use('/insumo', PutInsumo)
router.use('/insumo',GetInsumosAll)


//clientes
import PostClientes from './clientes/postClientes'
import GetClientes from './clientes/getClientes'
import PutClientes from './clientes/putClientes'
import DeleteClientes from './clientes/deleteClientes'
import GetClientesAll from './clientes/getClientesAllPages'


router.use('/clients',PostClientes)
router.use('/clients',  GetClientes)
router.use('/clients', PutClientes)
router.use('/clients',  DeleteClientes)
router.use('/clients', GetClientesAll)


//proveedores
import PostProveedores from './proveedores/postProveedores'
import GetProveedores from './proveedores/getProveedores'
import PutProveedores from './proveedores/putProveedores'
import DeleteProveedores from './proveedores/deleteProveedores'
import GetProveedoresAll from './proveedores/getProveedoresAllPages'


router.use('/proveedor', PostProveedores)
router.use('/proveedor',  GetProveedores)
router.use('/proveedor',PutProveedores)
router.use('/proveedor', DeleteProveedores)
router.use('/proveedor', GetProveedoresAll)


//Carteles
import PostCarteles from './carteles/postCarteles'
import GetCarteles from './carteles/getCarteles'
import PutCarteles from './carteles/putCarteles'
import DeleteCarteles from './carteles/deleteCarteles'
import GetCartelesAll from './carteles/getCartelesAllPages'


router.use('/cartel',  PostCarteles)
router.use('/cartel', GetCarteles)
router.use('/cartel',PutCarteles)
router.use('/cartel',DeleteCarteles)
router.use('/cartel', GetCartelesAll)


//ordenes
import PostOrdenes from './ordenes/postOrdenes'
import GetOrdenes from './ordenes/getOrdenes'
import PutOrdenes from './ordenes/putOrdenes'
import DeleteOrdenes from './ordenes/deleteOrdenes'
import GetOrdenesAll from './ordenes/getOrdenesAllPages'
import GetOrdenesDate from './ordenes/getOrdenesDate'
import GetOrdenesAllByName from './ordenes/getOrdenesAllByName'



router.use('/orden',  PostOrdenes)
router.use('/orden', GetOrdenes)
router.use('/orden',  PutOrdenes)
router.use('/orden', DeleteOrdenes)
router.use('/orden', GetOrdenesAll)
router.use('/orden', GetOrdenesAllByName)

router.use('/orden', GetOrdenesDate)



//presupuesto
import PostPresupuesto from './presupuestos/postPresupuestos'
import PutPresupuesto from './presupuestos/putPresupuestos'
import GetPresupuesto from './presupuestos/getPresupuestos'
import DeletePresupuesto from './presupuestos/deletePresupuestos'
import GetPresupuestosAll from './presupuestos/getPresupuestosAllPages'


router.use('/presupu',PostPresupuesto);
router.use('/presupu', PutPresupuesto)
router.use('/presupu', GetPresupuesto)
router.use('/presupu', DeletePresupuesto)
router.use('/presupu',GetPresupuestosAll)












export default router
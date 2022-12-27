//import para su uso
import Swal from 'sweetalert2'


//Para guardar cambios con opcion de si y no
Swal.fire({
  title: '¿Desea guardar los cambios?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonColor: '#77B327',
  confirmButtonText: 'Guardar',
  denyButtonText: `No guardar`,
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire('¡Guardado exitosamente!', '', 'success')
  } else if (result.isDenied) {
    Swal.fire('Los cambios no han sido guardados', '', 'info')
  }
})

//guardar cambios sin confirmacion
Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Cambios guardados exitosamente',
  showConfirmButton: false,
  timer: 1500
})

//Para eliminar con opciones de confirmacion
Swal.fire({
  title: '¿Estas seguro?',
  text: "No seras capaz de revertir los cambios",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#77B327',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Eliminarlo!'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Eliminado!',
      'X ha sido eliminado',
      'success'
    )
  }
})
import Role from '../../Models/roles'

export const createRoles = async ()=> {
try {
    const count = await Role.estimatedDocumentCount()
    if (count > 0) return;
    const values = await Promise.all([
        new Role ({name: 'user'}).save(),
        new Role ({name: 'vendedor'}).save(),
        new Role ({name: 'impresiones'}).save(),
        new Role ({name: 'carteleria'}).save(),
        new Role ({name: 'gerente'}).save()
    ])

console.log(values);
} catch (error) {
    console.log(error)
}
}
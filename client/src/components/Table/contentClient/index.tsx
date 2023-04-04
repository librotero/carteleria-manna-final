import React from 'react'

type Props={
    item:any
}
const contentTable = ({item}:Props) => {
  return (
    <>

                                        <td className="px-3 py-2">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.name}
                                            </p>
                                        </td>
                                        <td className="px-3 py-2">
                                            <p className="text-gray-900 whitespace-no-wrap capitalize">
                                                {item.telefono}
                                            </p>
                                        </td>
                                        <td className="px-3 py-2">
                                            <p className="text-gray-900 whitespace-no-wrap capitalize">
                                                {item.direccion}
                                            </p>
                                        </td>
                                        <td className="px-3 py-2">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.email}
                                            </p>
                                        </td>
                                        <td className="px-3 py-2">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.cuit}
                                            </p>
                                        </td>
                                        <td className="px-3 py-2">
                                            <p className="text-gray-900 whitespace-no-wrap capitalize">
                                                {item.condicioniva}
                                            </p>
                                        </td>
                                      
    </>
  )
}

export default contentTable
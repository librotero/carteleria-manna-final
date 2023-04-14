import React from 'react'

type Props={
    tableItems:any
}
const Head = ({tableItems}:Props) => {
    return (
        <thead>
            <tr className="bg-gray-100 text-left text-gray-600 font-semibold uppercase">
                {
                    tableItems.map((item: any) => (
                        <th className="px-3 py-3 border-b-2 border-gray-20 tracking-wider">
                            {item}
                        </th>
                    ))
                }
            </tr>
        </thead>
    )
}

export default Head
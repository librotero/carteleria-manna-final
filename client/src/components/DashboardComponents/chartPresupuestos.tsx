import React from 'react'
import {
    // main component
    Chart,
    // graphs
    Bars,
    Cloud,
    Dots,
    Labels,
    Lines,
    Pies,
    RadialLines,
    Ticks,
    Title,
    // wrappers
    Layer,
    Animate,
    Transform,
    Handlers,
    // helpers
    DropShadow,
    Gradient,
  } from "rumble-charts";
  type Props={
    presupuestoNoAprobadoByDate:any
    presupuestoAprobadoByDate:any
    presupuestos:any
  }
const chartPresupuesto =({presupuestos, presupuestoAprobadoByDate, presupuestoNoAprobadoByDate}:Props)=>{
    return(
        <div>
<Chart
  height={300}
  width={600}
>
  <Bars
    colors="category10"
    groupPadding="3%"
    innerPadding="0.5%"
    minY={0}
    series={[
      {
        data: [
            presupuestos.length, presupuestoAprobadoByDate.length, presupuestoNoAprobadoByDate.length
        ]
      },
      
     
    ]}
  />
</Chart>
        </div>
    )
}
export default chartPresupuesto
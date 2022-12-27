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
  
  type Props = {
    sumOrdenesPendientesCarteleria :any
    sumOrdenesPendientesImpresiones :any,
  sumOrdenesRealizadasCarteleria :any
    sumOrdenesRealizadasImpresiones:any,
  sumOrdenesEntregadosCarteleria :any
    sumOrdenesEntregadosImpresiones:any,
   };
const Charts = ({sumOrdenesPendientesCarteleria, sumOrdenesPendientesImpresiones, sumOrdenesRealizadasCarteleria , sumOrdenesRealizadasImpresiones, sumOrdenesEntregadosCarteleria, sumOrdenesEntregadosImpresiones }: Props) => {
  return (
   <>
   <Chart
   height={250}
   series={[
     {
       data: [
         sumOrdenesPendientesCarteleria +
           sumOrdenesPendientesImpresiones,
         sumOrdenesRealizadasCarteleria +
           sumOrdenesRealizadasImpresiones,
         sumOrdenesEntregadosCarteleria +
           sumOrdenesEntregadosImpresiones,
       ],
     },
   ]}
   width={300}
 >
   <Transform method={["transpose", "stackNormalized"]}>
     <Pies
       colors={["red", "green", "blue"]}
       combined
       cornerRadius={5}
       innerPadding={10}
       innerRadius="40%"
       padAngle={0.025}
       pieAttributes={{
         onMouseLeave: function noRefCheck() {},
         onMouseMove: function noRefCheck() {},
       }}
       pieStyle={{
         opacity: 2,
       }}
     />
   </Transform>
 </Chart>
   </>
  )
}

export default Charts

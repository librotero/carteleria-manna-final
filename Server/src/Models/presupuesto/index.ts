import  mongoose,  {model, Document, Schema} from'mongoose';

export interface IPresupuesto extends mongoose.Document{
  fecha: Date,
  clientes: string,// que muestre nombre de contacto y telefono en el front
  //clientes: string,
  contacto: string,
  carteles: Schema.Types.ObjectId,
  operacion:string,
  lugardecolocacion: string,//lugar de entrega colocación/entrega
  //lugartraslado:string,
  montototal: number,
  formadepago:string,
  plazodeentrega:number,
  fechavalida: Date,//presupuesto valido hasta 
  observaciones:string,
   //obrero: string
orden:boolean;
vendedor:string;
};

const presupuestoSchema = new Schema(
    {
      fecha: {
        type: Date,
        required: true
      },
      vendedor:
      {
          type:String,
          required:true

      },
      orden:
      {
        type:Boolean,
        default: false
      },
      clientes: 
        {
          type: String,
          required:true
        },
      
        carteles:
        {
            type:[Object],
            required: true
        },
      operacion:
      {
        type: String,
        required: true
      },
      contacto:
      {
        type: String,
        required: true
      },
      lugardecolocacion:
      {
          type:String,
          request:true
      },
      
      formadepago:
      {
          type:[String],
          required: true
      },
      fechavalida:
      {
          type:Date,
          required:true
      },
      montototal:
      {
        type: Number,
        required: true
      },
      plazodeentrega:
      {
        type: Number,
        required:true
      },
      observaciones:
      {
        type: String,
        required: true
      }

    },
    {
      timestamps: true,
      versionKey: false,
      }
)


export default model<IPresupuesto>("presupuesto", presupuestoSchema)
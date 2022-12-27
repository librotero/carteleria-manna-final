import  mongoose,  {model, Document, Schema} from'mongoose';

export interface IClientes extends mongoose.Document{
    name: string,
    telefono: Number,
    cuit: Number,
    direccion: string,
    email: string,
    condicioniva:string,
    razonsocial:string
};


const clientesSchema = new Schema(
    {
        //nombre contacto
        name: 
        {
            type: String,
            required: true
        },
        telefono:
        {
            type: String,
            required: true
        },
        cuit:
        {
            type: String,
            required: true
        },
        direccion:
        {
            type:String,
            request: true
        },
        email:{
            type: String,
            required: true
        },
        condicioniva:{
            type: String,
            required: true
        },
        razonsocial:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        }
)


export default model<IClientes>("clientes", clientesSchema)
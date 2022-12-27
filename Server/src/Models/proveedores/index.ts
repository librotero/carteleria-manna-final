import  mongoose,  {model, Document, Schema} from'mongoose';

export interface IProveedores extends mongoose.Document{
    name: string,
    telefono: Number,
    cuit: Number,
    direccion: string,
    email: string,
    web: string
};


const proveedoresSchema = new Schema(
    {
        name: 
        {
            type: String,
            required: true
        },
        telefono:
        {
            type: Number,
            required: true
        },
        cuit:
        {
            type: Number,
            required: true
        },
        direccion:
        {
            type:String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        web:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        }
)


export default model<IProveedores>("proveedores", proveedoresSchema)
import  mongoose,  {model, Document, Schema} from'mongoose';

export interface ICliente extends mongoose.Document{
    name: string,
  
};


const clienteSchema = new Schema(
    {
        name: 
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


export default model<ICliente>("cliente", clienteSchema)
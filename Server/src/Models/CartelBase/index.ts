import  mongoose,  {model, Document, Schema} from'mongoose';

export interface ICartelBase extends mongoose.Document{
   descripcion:string,
   grupo:[string],
   faz1:number,
   faz2:number
};


const cartelBaseSchema = new Schema(
    {
        grupo:{
            type: [String],
            required: true
        },
        descripcion:
        {
            type:String,
            request: true
        },
        faz1:
        {
            type:Number,
            request: true
        },
        faz2:
        {
            type:Number,
            request: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        }
)


export default model<ICartelBase>("carteles", cartelBaseSchema)
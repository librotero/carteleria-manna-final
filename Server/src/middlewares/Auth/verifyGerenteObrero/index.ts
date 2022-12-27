
import User from "../../../Models/user";
import Role from "../../../Models/roles";


export const isGerenteObrero = async (req:any, res:any, next:any) => {
    try {
      const user:any = await User.findById(req.userId);
      const roles = await Role.find({ _id: { $in: user.roles } });
      for (let i = 0; i < roles.length; i++) {
      
        switch ( roles[i].name ) {
          case "gerente":
            next();
            return;
          case "impresiones":
            console.log("hola soy un jdidio impresines")
            next();
            return;
              case "carteleria":
                console.log("hola soy un jdidio impresines")
                next();
                return;
          default: 
              break;
       }
      }
      console.log("no se que pasa ")
      return res.status(403).json({ message: "Require gerente Role!" });
     
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  };
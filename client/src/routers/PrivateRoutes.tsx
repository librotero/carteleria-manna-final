import { Navigate } from "react-router-dom";

type Props = {
  isLogged: any;
  children: any;
};

const PrivateRoutes = ({ isLogged, children }: Props) => {
  return <>{isLogged ? children : <Navigate to="/auth/login" />}</>;
};

export default PrivateRoutes;

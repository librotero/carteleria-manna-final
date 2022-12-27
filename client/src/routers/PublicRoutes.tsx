import { Navigate } from "react-router-dom";

type Props = {
  children: any;
  isLogged: any;
  token: string;
};

const PublicRoutes = ({ children, isLogged, token }: Props) => {
  return isLogged || token ? <Navigate to="/" /> : children;
};

export default PublicRoutes;

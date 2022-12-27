import { useEffect, useState } from "react";
import PrincipalRoute from "./routers/PrincipalRoute";
import useUser from "./store/user";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
	const { updateToken } = useUser((state) => state);
	const [accessToken, refreshToken] = useLocalStorage();
	console.log(accessToken, refreshToken);
	const { getUsers2, putUserState, users, logout, user } = useUser((state) => state);
	var bodys = ({
		id: user.id, 
		state: true
	  })
	  if(user.state===false){
     
		user.state=true
	bodys =({
	  id: user._id,
	  state: true
	})
	putUserState(bodys, accessToken)
	console.log("hola como estannnnnn")
	   }

	useEffect(() => {
		accessToken && updateToken(refreshToken);
		getUsers2(accessToken)
		
		   

	}, [])

	useEffect(() => {
    const oneHour = 3600000
		let interval = setInterval(() => {
			accessToken && updateToken(refreshToken);
		}, oneHour);
		
		return () => clearInterval(interval);
	}, [accessToken]);

	return <PrincipalRoute />;
}

export default App;

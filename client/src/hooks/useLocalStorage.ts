
const useLocalStorage = () => {
  const loggedUserJSON: any = localStorage.getItem('auth');
  const {accessToken, refreshToken } = JSON.parse(loggedUserJSON) || {};

  return [accessToken, refreshToken]
}
export default useLocalStorage;

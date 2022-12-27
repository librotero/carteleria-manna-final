const useHeaders = (token: string) => {
	let headers = { headers: { "x-access-token": token } };

	return headers;
};

export default useHeaders;

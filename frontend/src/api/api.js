import axios from "axios";
const BASE_URL = "http://localhost:5000/api";

export default axios.create({
	baseURL: BASE_URL,
});
axios.defaults.withCredentials = true;
export const apiPrivate = axios.create({
	baseURL: BASE_URL,
	headers: {
		crossDomain: true,
		"Content-Type": "application/json",
	},
	withCredentials: true,
	timeout: 7000,
});

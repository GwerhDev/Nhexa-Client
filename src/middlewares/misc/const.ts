import { environment } from "../../environment";

export const API_URL: string = environment === "development" ? 'http://localhost:8080' : 'https://api.nhexa.cl';
export const ACCOUNTS_URL: string = environment === "development" ? 'http://localhost:5173' : 'https://accounts.nhexa.cl';

export const CLIENT_URL: string = environment === "development" ? 'http://localhost:5174' : 'https://nhexa.cl';
export const DOWNLOAD_URL: string = environment === "development" ? 'http://localhost:5175' : 'https://download.nhexa.cl';

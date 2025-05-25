import axios from "axios";

const isntance = axios.create({
    baseURL : "https://be199-tu7-928661779459.us-central1.run.app",
    withCredentials : true,
});

export default isntance;
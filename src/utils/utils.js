import axios from "axios";

export const getCurrentUser = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/whoami`, { withCredentials: true })
        .then(response => {
            console.log("response : ", response);
            return response;
        })
        .catch(error => {
            console.error("Error fetching current user:", error);
            return null;
        });
}


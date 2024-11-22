import { toast } from 'react-toastify';
import axios from 'axios';

export const useAuth = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    // Register function
    const register = async (userData: object) => {
        try {
            // Make the API call to register the user
            const response = await axios.post(`${API_URL}/users/register`, userData, {
                headers: {
                    'Content-Type': 'application/json', // Sending data as JSON
                },
            });

            // If the registration is successful, show success message
            toast.success(response.data.message || 'User registered successfully'); // Success message
            return response.data; // Return the response data
        } catch (error: any) {
            // In case of error, show error message
            const errorMessage = error?.response?.data?.message || 'Registration failed, please try again.';

            toast.error(`${errorMessage}`);
            throw error; // Throw the error so that it can be handled in the calling function
        }
    };

    const login = async (userData: object) => {
        try {
            // Make the API call to register the user
            const response = await axios.post(`${API_URL}/users/login`, userData, {
                headers: {
                    'Content-Type': 'application/json', // Sending data as JSON
                },
            });

            // If the registration is successful, show success message
            toast.success(response.data.message || 'User Logged in successfully'); // Success message
            return response.data; // Return the response data
        } catch (error: any) {
            // In case of error, show error message
            const errorMessage = error?.response?.data?.message || 'Login failed, please try again.';

            toast.error(`${errorMessage}`);
            throw error; // Throw the error so that it can be handled in the calling function
        }
    };

    return { register, login };
};

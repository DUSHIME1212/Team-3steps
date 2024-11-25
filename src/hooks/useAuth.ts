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
        } catch (error: unknown) {
            let errorMessage = 'Registration failed, please try again.';
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'object' && error !== null && 'response' in error) {
                const response = (error as { response?: { data?: { message?: string } } }).response;
                if (response && response.data && response.data.message) {
                    errorMessage = response.data.message;
                }
            }
            toast.error(errorMessage);
            throw error; // Rethrow the error for handling upstream
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
            toast.success(response.data.message || 'User Logged in successfully');
            console.log("Toast should appear: success");
            return response.data; // Return the response data
        } catch (error: unknown) {
            let errorMessage = 'Login failed, please try again.';

            // Check if the error has a response object with the expected structure
            if (error && typeof error === 'object' && 'response' in error) {
                const response = (error as { response?: { data?: { message?: string } } }).response;
                if (response?.data?.message) {
                    errorMessage = response.data.message;
                }
            } else if (error instanceof Error) {
                // For standard JS errors
                errorMessage = error.message;
            }

            toast.error(errorMessage);
            throw error; // Rethrow the error to handle it in the calling function
        }
    };

    return { register, login };
};

import { Category, CategoryFormValues, User, UserFormValues } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type IResponse<T> = {
    data: T[]
    message: string
}


export type SingleResponse<T> = {
    data: T
    message: string
}

export const fetchProperties = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/properties`);
        return response.data;
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }

};

export const createCategoryApiCall = async (categoryData: CategoryFormValues) => {
    try {
        // Make the API call to register the user
        const response = await axios.post(`${API_BASE_URL}/categories/categories`, categoryData, {
            headers: {
                'Content-Type': 'application/json', // Sending data as JSON
            },
        });

        // If the registration is successful, show success message
        toast.success(response.data.message || 'Category added successfully'); // Success message
        return response.data; // Return the response data
    } catch (error: unknown) {
        let errorMessage = 'Adding category failed, please try again.';
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

export const deleteCategoryApiCall = async (id: number) => {
    try {
        // Make the API call to register the user
        const response = await axios.delete(`${API_BASE_URL}/categories/categories/${id}`);

        // If the registration is successful, show success message
        toast.success(response.data.message || 'Category deleted successfully'); // Success message
        return response.data; // Return the response data
    } catch (error: unknown) {
        let errorMessage = 'Deleting category failed, please try again.';
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

export const updateCategoryApiCall = async (id: number, categoryData: CategoryFormValues) => {
    try {
        // Make the API call to register the user
        const response = await axios.put(`${API_BASE_URL}/categories/categories/${id}`, categoryData, {
            headers: {
                'Content-Type': 'application/json', // Sending data as JSON
            },
        });

        console.log('Category updated', response.data);

        // If the registration is successful, show success message
        toast.success(response.data.message || 'Category updated successfully'); // Success message
        return response.data; // Return the response data
    } catch (error: unknown) {
        let errorMessage = 'Updating category failed, please try again.';
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

export const createUserApiCall = async (userData: UserFormValues) => {
    try {
        // Make the API call to register the user
        const response = await axios.post(`${API_BASE_URL}/users/register`, userData, {
            headers: {
                'Content-Type': 'application/json', // Sending data as JSON
            },
        });

        // If the registration is successful, show success message
        toast.success(response.data.message || 'User added successfully'); // Success message
        return response.data; // Return the response data
    } catch (error: unknown) {
        let errorMessage = 'Adding user failed, please try again.';
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

export const deleteUserApiCall = async (id: number) => {
    try {
        // Make the API call to register the user
        const response = await axios.delete(`${API_BASE_URL}/users/${id}`);

        // If the registration is successful, show success message
        toast.success(response.data.message || 'User deleted successfully'); // Success message
        return response.data; // Return the response data
    } catch (error: unknown) {
        let errorMessage = 'Deleting user failed, please try again.';
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

export const updateUserApiCall = async (id: number, userData: UserFormValues) => {
    try {
        // Make the API call to register the user
        const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData, {
            headers: {
                'Content-Type': 'application/json', // Sending data as JSON
            },
        });

        // If the registration is successful, show success message
        toast.success(response.data.message || 'User updated successfully'); // Success message
        return response.data; // Return the response data
    } catch (error: unknown) {
        let errorMessage = 'Updating user failed, please try again.';
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

export const useGetUsers = () => {
    return useQuery<IResponse<User>, Error>({
        queryKey: ['users'],
        queryFn: () => axios.get(`${API_BASE_URL}/users`).then((res) => res.data),
    });
};
export const useGetCategories = () => {
    return useQuery<IResponse<Category>, Error>({
        queryKey: ['categories'],
        queryFn: () => axios.get(`${API_BASE_URL}/categories/categories`).then((res) => res.data),
    });
};


export const useGetCategoryById = (id: number) => {
    return useQuery<SingleResponse<Category>, Error>({
        queryKey: ['category'],
        queryFn: () => axios.get(`${API_BASE_URL}/categories/categories/${id}`).then((res) => res.data),
        enabled: !!id,
    });
};
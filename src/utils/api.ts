import { Category, CategoryFormValues, PropertyFormValues, User, UserFormValues } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_HEADERS = {
    'x-rapidapi-host': 'rwanda.p.rapidapi.com',
    'x-rapidapi-key': '295c1038bbmshfdeb3e71a7c5d95p182d83jsn4477c84033df',
};

export type IResponse<T> = {
    data: T[]
    message: string
}

export type Village = string[];  // A village is an array of strings (locations)
export type Cell = {
    [cell: string]: Village[];
}     // A cell is an array of villages (locations)
export type Sector = {          // A sector contains cells, each containing villages
    [sector: string]: Cell[];
};
export type District = {        // A district contains sectors, each containing cells
    [district: string]: Sector[];
};
export type Province = {        // A province contains districts, each containing sectors and cells
    [province: string]: District[];
};

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

export const createPropertyApiCall = async (propertyData: PropertyFormValues) => {
    try {
        // Make the API call to register the user
        const response = await axios.post(`${API_BASE_URL}/propertyPosts`, propertyData, {
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

export const deletePropertyApiCall = async (id: number) => {
    try {
        // Make the API call to register the user
        const response = await axios.delete(`${API_BASE_URL}/propertyData/${id}`);
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

export const updatePropertyApiCall = async (id: number, locationData: PropertyFormValues) => {
    try {
        // Make the API call to register the user
        const response = await axios.put(`${API_BASE_URL}/propertyData/${id}`, locationData, {
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

export const useGetProvinces = () => {
    return useQuery<IResponse<string[]>, Error>({
        queryKey: ['provinces'],
        queryFn: async () => {
            const { data } = await axios.get(`https://rwanda.p.rapidapi.com/`, {
                headers: API_HEADERS,
            });
            return data;
        },
    });
};


export const useGetDistricts = (province: string) => {
    return useQuery<SingleResponse<string[]>, Error>({
        queryKey: ['districts', province],
        queryFn: async () => {
            const { data } = await axios.get(`https://rwanda.p.rapidapi.com/districts`, {
                headers: API_HEADERS,
                params: { p: province },
            });
            return data; // Assuming data is an array of districts
        },
        enabled: !!province, // Only fetch if province is selected
    });
};

export const useGetSectors = (province: string, district: string) => {
    return useQuery<SingleResponse<string[]>, Error>({
        queryKey: ['sectors', province, district],
        queryFn: async () => {
            const { data } = await axios.get(`https://rwanda.p.rapidapi.com/sectors`, {
                headers: API_HEADERS,
                params: { p: province, d: district },
            });
            return data; // Assuming data is an array of sectors
        },
        enabled: !!province && !!district,
    });
};


export const useGetCells = (province: string, district: string, sector: string) => {
    return useQuery<SingleResponse<string[]>, Error>({
        queryKey: ['cells', province, district, sector],
        queryFn: async () => {
            const { data } = await axios.get(`https://rwanda.p.rapidapi.com/cells`, {
                headers: API_HEADERS,
                params: { p: province, d: district, s: sector },
            });
            return data; // Assuming data is an array of cells
        },
        enabled: !!province && !!district && !!sector,
    });
};

export const useGetVillages = (province: string, district: string, sector: string, cell: string) => {
    return useQuery<SingleResponse<string[]>, Error>({
        queryKey: ['villages', province, district, sector, cell],
        queryFn: async () => {
            const { data } = await axios.get(`https://rwanda.p.rapidapi.com/villages`, {
                headers: API_HEADERS,
                params: { p: province, d: district, s: sector, c: cell },
            });
            return data; // Assuming data is an array of villages
        },
        enabled: !!province && !!district && !!sector && !!cell,
    });
};


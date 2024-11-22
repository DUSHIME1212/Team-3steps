// Enum placeholder

enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    // Add other statuses as needed
}

// User interface
export interface User {
    password: string;
    id?: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    birthDate: string;
    role?: string;  // Enum for role
    bio: string | null;
    status?: Status;  // Enum for status
    picture?: File | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface AuthResponse {
    message: string;
    user: User;
    token: string;
}

export interface Registeresponse {
    message: string;
    user: User;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

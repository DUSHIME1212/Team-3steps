// Enums
import { z } from 'zod';
export enum LocationType {
  COUNTRY = "COUNTRY",
  PROVINCE = "PROVINCE",
  DISTRICT = "DISTRICT",
  SECTOR = "SECTOR",
  CELL = "CELL",
  VILLAGE = "VILLAGE",
}

// src/types/types.ts

export interface File {
  id: number;
  name: string;
  url: string;
  size: bigint; // Use `bigint` for large numbers
  sizeType: string;
  type: string;
  propertyPostId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum PropertyCondition {
  NEW = "NEW",
  REFURBISHED = "REFURBISHED",
  GOOD = "GOOD",
  BAD = "BAD",
}

export enum ListingType {
  SALE = "SALE",
  RENT = "RENT",
}

export enum ApprovalStatus {
  PENDING = "PENDING",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}

export enum Role {
  STANDARD_USER = "STANDARD_USER",
  PROPERTY_BROKER = "PROPERTY_BROKER",
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
}

export enum Status {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
  DELETED = "DELETED",
}

export enum Currency {
  RWF = "RWF",
  USD = "USD",
}

// Types
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  email: string;
  birthDate: string; // Date as string
  role?: Role;
  bio?: string;
  status?: Status;
  pictureId?: number;
  posts?: PropertyPost[];
  createdAt?: string; // Date as string
  updatedAt?: string; // Date as string
}

export interface PropertyPost {
  id: number;
  title: string;
  description: string;
  published: boolean;
  paymentStatus: PaymentStatus;
  approvalStatus: ApprovalStatus;
  listingType: ListingType;
  propertyCondition: PropertyCondition;
  currency: Currency;
  price: number;
  authorId: number;
  propertyLocationId?: number;
  categories: Category[];
  attachments: LocalFile[];
  createdAt?: string; // Date as string
  updatedAt?: string; // Date as string
  author: User;
  propertyLocation?: PropertyLocation;
}

export interface PropertyLocation {
  id: number;
  country?: string;
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;
  propertyPostId?: number;
  propertyPost?: PropertyPost;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  parentId?: number;
  posts?: PropertyPost[];
  createdAt?: string; // Date as string
  updatedAt?: string; // Date as string
  subcategories?: Category[];
  parent?: Category;
}

export interface LocalFile {
  id: number;
  name: string;
  url: string;
  size: string; // BigInt as string
  sizeType: string;
  type: string;
  propertyPostId: number;
  createdAt: string; // Date as string
  updatedAt: string; // Date as string
  users: User[];
  propertyPost: PropertyPost;
}

export interface Location {
  id: number;
  name: string;
  locationType: LocationType;
  parentId?: number;
}

export interface PropertyLocation {
  id: number;
  country?: string;
  province?: string;
  district?: string;
  sector?: string;
  cell?: string;
  village?: string;
  propertyPostId?: number;
  propertyPost?: PropertyPost;
}

// Define the attachment schema conditionally based on the environment
const fileSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string().url(),
  size: z.bigint(), // BigInt handling
  sizeType: z.string(),
  type: z.string(),
  propertyPostId: z.number().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const propertyPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  price: z.number().min(1, 'Price must be a positive number'),
  published: z.boolean(),
  paymentStatus: z.enum(['PENDING', 'COMPLETED']),
  approvalStatus: z.enum(['PENDING', 'APPROVED']),
  listingType: z.enum(['SALE', 'RENT']),
  propertyCondition: z.enum(['NEW', 'USED']),
  currency: z.enum(['RWF', 'USD', 'EUR']),
  authorId: z.number(),
  categories: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
  attachments: z.array(fileSchema),
  propertyLocationId: z.optional(z.number()),
});

export const userSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  birthDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Invalid birth date format",
  }),
  bio: z.string().optional(),
  role: z.enum([Role.PROPERTY_BROKER, Role.STANDARD_USER, Role.SYSTEM_ADMIN]).optional(),  // Adjust according to your roles
});

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(2, "Last name must be at least 2 characters"),
  parentId: z.number().optional(),
});


export const propertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  listingType: z.enum([ListingType.RENT, ListingType.SALE]),
  propertyCondition: z.enum([PropertyCondition.NEW, PropertyCondition.BAD, PropertyCondition.GOOD, PropertyCondition.REFURBISHED]),
  price: z.number().min(0),
  currency: z.enum([Currency.RWF, Currency.USD]),
  country: z.string(),
  province: z.string(),
  district: z.string(),
  attachments: z.any().optional(),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;

export type UserFormValues = z.infer<typeof userSchema>;

export type CategoryFormValues = z.infer<typeof categorySchema>;

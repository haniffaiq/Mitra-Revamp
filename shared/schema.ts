import { z } from "zod";

export interface User {
  id: string;
  username: string;
  password: string;
}

export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(8),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

export type MerchantPartnershipType =
  | "Self Managed"
  | "Semi-Autopilot"
  | "Full-Autopilot"
  | "Auto Pilot";

export interface MerchantPackage {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Merchant {
  id: string;
  name: string;
  slug: string;
  category: string;
  type: MerchantPartnershipType;
  logoUrl: string;
  bepMonths: number;
  packages: MerchantPackage[];
  rating?: number | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const insertMerchantSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  type: z.enum(["Self Managed", "Semi-Autopilot", "Full-Autopilot", "Auto Pilot"]),
  logoUrl: z.string().url(),
  bepMonths: z.number().int().positive(),
  packages: z.array(z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    price: z.number().int().positive(),
    description: z.string().min(1),
  })).min(1),
  rating: z.number().min(0).max(5).optional(),
  isActive: z.boolean().optional(),
});

export type InsertMerchant = z.infer<typeof insertMerchantSchema>;

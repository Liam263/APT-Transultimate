import { Role, GeneralStatus } from "@/lib/enum";
import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const customerSchema = z.object({
  _id: z.string(),
  businessName: z.string(),
  abn: z.string(),
  contactName: z.string(),
  mobile: z.string(),
  status: z.enum([GeneralStatus.Active, GeneralStatus.Inactive]),
  companyLogo: z.string().optional(),
  userId: z.object({
    _id: z.string(),
    email: z.string().email(),
    role: z.enum([Role.Admin, Role.Customer, Role.General, Role.User]),
    status: z.enum([GeneralStatus.Active, GeneralStatus.Inactive]),
    fullName: z.string(),
    photoUrl: z.string().optional(),
  }),
});

export type Customer = z.infer<typeof customerSchema>;

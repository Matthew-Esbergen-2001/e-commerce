import * as z from "zod";
export const checkoutSchema = z.object({
  details: z.string().nonempty("this field can't be empty"),
  phone: z
    .string()
    .nonempty("this field can't be empty")
    .regex(/^01[1250][0-9]{8}$/, "not valid phone number"),
  city: z.string().nonempty("this field can't be empty"),
});
export type checkoutSchemaType = z.infer<typeof checkoutSchema>;

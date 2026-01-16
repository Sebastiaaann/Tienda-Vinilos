import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Ingrese un correo electrónico válido" }),
    password: z.string().min(1, { message: "La contraseña es requerida" }),
    rememberMe: z.boolean().optional(),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z.string().email({ message: "Ingrese un correo electrónico válido" }),
    password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z.string(),
    phone: z.string().optional(),
    terms: z.boolean().refine((val) => val === true, {
        message: "Debes aceptar los términos y condiciones",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

import { z } from 'zod';

export const loginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, "El usuario o email es requerido")
    .refine(
      (value) => {
        const isEmail = z.string().email().safeParse(value).success;
        const isUsername = /^[a-zA-Z0-9_]+$/.test(value);
        return isEmail || isUsername;
      },
      {
        message: "Debe ser un email válido o un nombre de usuario",
      }
    ),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;
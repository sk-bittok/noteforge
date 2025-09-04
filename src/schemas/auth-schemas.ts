import { z } from "zod";

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(1, "Password is required"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z
	.object({
		email: z.email(),
		name: z
			.string()
			.min(3, "Name requires 3 characters.")
			.max(100, "Name must be under 100 characters."),
		password: z
			.string()
			.min(8, "Password requires 8 characters")
			.max(100, "Password must be under 100 characters."),
		confirmPassword: z.string().min(1, "Confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords must match",
	});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, "Password requires 8 characters")
			.max(100, "Password must be under 100 characters."),
		confirmPassword: z.string().min(1, "Confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords must match",
	});

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export const forgotPasswordSchema = z.object({
	email: z.email(),
});

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

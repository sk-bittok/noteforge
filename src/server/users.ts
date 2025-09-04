"use server";

import { auth } from "@/lib/auth";

export interface GenericResponse {
	success: boolean;
	message: string;
}

export const signInUser = async (email: string, password: string) => {
	try {
		await auth.api.signInEmail({
			body: {
				email,
				password,
			},
		});

		return {
			success: true,
			message: "Signed in successfully.",
		} as GenericResponse;
	} catch (error) {
		const e = error as Error;

		return {
			success: false,
			message: e.message || "Failed to sign in!",
		} as GenericResponse;
	}
};

export const signUpUser = async (
	email: string,
	password: string,
	name: string,
) => {
	try {
		await auth.api.signUpEmail({
			body: {
				email,
				password,
				name,
			},
		});
		return { success: true, message: "Sign up success." } as GenericResponse;
	} catch (error) {
		const e = error as Error;
		return {
			success: false,
			message: e.message || "Sign up failed. Try again later!",
		} as GenericResponse;
	}
};

export const forgotPassword = async (email: string) => {
	try {
		await auth.api.requestPasswordReset({
			body: {
				email,
				redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/forgot-password`,
			},
		});
		const response: GenericResponse = {
			success: true,
			message: "Password reset link sent to your inbox.",
		};

		return response;
	} catch (error) {
		const e = error as Error;
		const errorResponse: GenericResponse = {
			success: false,
			message: e.message || "Failed to send reset link.",
		};

		return errorResponse;
	}
};

export const resetPassword = async (token: string, newPassword: string) => {
	try {
		await auth.api.resetPassword({
			body: {
				newPassword,
				token,
			},
		});

		const response: GenericResponse = {
			success: true,
			message: "Password updated successfully.",
		};

		return response;
	} catch (error) {
		const e = error as Error;
		const errorResponse: GenericResponse = {
			success: false,
			message: e.message || "Failed to send reset link.",
		};

		return errorResponse;
	}
};

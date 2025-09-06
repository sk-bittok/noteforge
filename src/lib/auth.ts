/* eslint-disable @typescript-eslint/no-unused-vars */
import PasswordResetEmail from "@/components/emails/password-reset-email";
import VerificationEmail from "@/components/emails/verification-email";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./email";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			await sendEmail({
				to: user.email,
				subject: "Forgot Your Password?",
				react: PasswordResetEmail({
					requestUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`,
				}),
			});
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }, request) => {
			await sendEmail({
				to: user.email,
				subject: "Verify your Email",
				react: VerificationEmail({ userName: user.name, verificationUrl: url }),
			});
		},
		sendOnSignUp: true,
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
	}),
	plugins: [nextCookies()],
});

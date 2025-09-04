"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	forgotPasswordSchema,
	ForgotPasswordType,
} from "@/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function ForgotPasswordForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<ForgotPasswordType>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = async (values: ForgotPasswordType) => {
		try {
			setIsLoading(true);
			const { error } = await authClient.requestPasswordReset({
				email: values.email,
				redirectTo: "/reset-password",
			});
			if (!error) {
				toast.success("Check your email for a password reset link.");
			} else {
				toast.error("Something went wrong. Please try again.");
			}
		} catch (error) {
			const e = error as Error;
			toast.error(
				e.message || "Something went wrong on our end. Please try again later.",
			);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Forgot your password?</CardTitle>
					<CardDescription>
						Enter your email below to request password reset.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-6">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="grid gap-3">
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													type="email"
													id="password"
													placeholder="Enter your email"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex flex-col gap-3">
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading ? (
											<Loader2 className="animate-spin size-4" />
										) : (
											"Request Password Change"
										)}
									</Button>
								</div>
							</div>
							<div className="mt-4 text-center text-sm">
								Have an account?&nbsp;
								<Link href="/login" className="underline underline-offset-4">
									Sign in
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}

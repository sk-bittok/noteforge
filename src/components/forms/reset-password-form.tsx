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
import { resetPasswordSchema, ResetPasswordType } from "@/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/server/users";

export function ResetPasswordForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();

	const token = searchParams.get("token");

	const form = useForm<ResetPasswordType>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: ResetPasswordType) => {
		try {
			setIsLoading(true);
			const response = await resetPassword(token || "", data.password);
			if (response.success) {
				toast.success(response.message);
				router.push("/login");
			} else {
				toast.error(response.message);
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
					<CardTitle>Reset your password</CardTitle>
					<CardDescription>
						Fill the form below with your new password.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-6">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="grid gap-3">
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													type="password"
													id="password"
													placeholder="********"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem className="grid gap-3">
											<FormLabel>Confirm Password</FormLabel>
											<FormControl>
												<Input
													type="password"
													id="confirmPassword"
													placeholder="********"
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
											"Reset Password"
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

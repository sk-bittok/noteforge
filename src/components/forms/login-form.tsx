"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { loginSchema, LoginSchemaType } from "@/schemas/auth-schemas";
import { signInUser } from "@/server/users";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginSchemaType) => {
		try {
			setIsLoading(true);
			const response = await signInUser(data.email, data.password);
			if (response.success) {
				toast.success(response.message);
				router.push("/dashboard");
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
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
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
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													id="email"
													type="email"
													placeholder="user@example.com"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="grid gap-3">
											<div className="flex items-center">
												<FormLabel>Password</FormLabel>
												<Link
													href="/forgot-password"
													className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
												>
													Forgot your password?
												</Link>
											</div>
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
								<div className="flex flex-col gap-3">
									<Button
										type="submit"
										className="w-full disabled:bg-gray-200"
										disabled={isLoading}
									>
										{isLoading ? (
											<Loader2 className="size-4 animate-spin" />
										) : (
											"Login"
										)}
									</Button>
									<Button
										variant="outline"
										className="w-full"
										disabled={isLoading}
									>
										Login with Google
									</Button>
								</div>
							</div>
							<div className="mt-4 text-center text-sm">
								Don&apos;t have an account?{" "}
								<Link href="/sign-up" className="underline underline-offset-4">
									Sign up
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}

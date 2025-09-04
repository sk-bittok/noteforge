"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function Logout() {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await authClient.signOut();
			toast.success("Logout success");
			router.push("/");
		} catch (error) {
			console.error(error);
			const e = error as Error;
			toast.error(e.message || "Failed to logout");
			router.push("/");
		}
	};

	return (
		<Button variant={"outline"} onClick={handleLogout}>
			Logout
		</Button>
	);
}

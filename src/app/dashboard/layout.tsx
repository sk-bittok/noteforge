import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode, Suspense } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<Suspense>
				<AppSidebar />
			</Suspense>
			<main className="flex-1">{children}</main>
		</SidebarProvider>
	);
}

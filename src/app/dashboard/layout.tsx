import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex-1">{children}</main>
		</SidebarProvider>
	);
}

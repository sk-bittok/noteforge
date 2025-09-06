"use client";

import { useQueryState } from "nuqs";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./ui/sidebar";
import { ChevronRight, File } from "lucide-react";
import { Suspense } from "react";

interface SidebarClientProps {
	data: {
		navMain: {
			title: string;
			url: string;
			isActive?: boolean;
			items: {
				title: string;
				url: string;
				isActive?: boolean;
			}[];
		}[];
	};
}

function SidebarClientSkeleton() {
	return (
		<>
			{[1, 2, 3].map((i) => (
				<div key={i} className="mb-4">
					<SidebarGroup>
						<SidebarGroupLabel className="text-sidebar-foreground text-sm">
							<div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{[1, 2, 3].map((j) => (
									<SidebarMenuItem key={j}>
										<SidebarMenuButton>
											<div className="flex items-center gap-2 w-full">
												<div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
												<div className="h-4 bg-gray-200 rounded animate-pulse flex-1" />
											</div>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</div>
			))}
		</>
	);
}

function SidebarClientInner({ data }: SidebarClientProps) {
	const [search] = useQueryState("search", {
		defaultValue: "",
	});

	const filteredData = data.navMain.filter((item) => {
		const notebookMatches = item.title
			.toLowerCase()
			.includes(search.toLowerCase());
		const notesMatch = item.items.some((note) =>
			note.title.toLowerCase().includes(search.toLowerCase()),
		);
		return notebookMatches || notesMatch;
	});
	return (
		<>
			{filteredData.map((item) => (
				<Collapsible
					key={item.url}
					title={item.title}
					defaultOpen
					className="group/collapsible"
				>
					<SidebarGroup>
						<SidebarGroupLabel
							asChild
							className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
						>
							<CollapsibleTrigger>
								{item.title}&nbsp;
								{item.items.length > 0 && (
									<ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
								)}
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									{item.items.map((item) => (
										<SidebarMenuItem key={item.title}>
											<SidebarMenuButton asChild isActive={item.isActive}>
												<a href={item.url}>
													<File className="" />
													{item.title}
												</a>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
			))}
		</>
	);
}
export default function SidebarClient(props: SidebarClientProps) {
	return (
		<Suspense fallback={<SidebarClientSkeleton />}>
			<SidebarClientInner {...props} />
		</Suspense>
	);
}

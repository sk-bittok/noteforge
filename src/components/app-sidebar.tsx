import type * as React from "react";

import { SearchForm } from "@/components/search-form";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { getNotebooks } from "@/server/notebooks";
import Image from "next/image";
import SidebarClient from "./sidebar-client";
import Link from "next/link";

export async function AppSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const response = await getNotebooks();

	const notebooksData = response?.notebooks || [];

	const data = {
		versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
		navMain: [
			...(notebooksData.map((notebook) => ({
				title: notebook.name,
				url: `/dashboard/notebooks/${notebook.id}`,
				items:
					notebook.notes.map((note) => ({
						title: note.title,
						url: `/dashboard/notebooks/${notebook.id}/notes/${note.id}`,
					})) || [],
			})) ?? []),
		],
	};
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<Link href={"/"}>
					<div className="flex items-center gap-2 cursor-pointer">
						<Image
							src={"/noteforge-logo.png"}
							alt="Noteforge logo"
							width={32}
							height={31}
						/>
						<h2>NotesForge</h2>
					</div>
				</Link>
				<SearchForm />
			</SidebarHeader>
			<SidebarContent className="gap-0">
				<SidebarClient data={data} />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}

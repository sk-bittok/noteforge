"use client";

import { useQueryState } from "nuqs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { ChevronRight, File } from "lucide-react";

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
        }[]
    }
}

export default function SidebarClient({ data }: SidebarClientProps) {
    const [search] = useQueryState("search", {
        defaultValue: "",
    });

    const filteredData = data.navMain.filter((item) => {
        const notebookMatches = item.title.toLowerCase().includes(search.toLowerCase());
        const notesMatch = item.items.some((note) => note.title.toLowerCase().includes(search.toLowerCase()));
        return notebookMatches || notesMatch;
    }
    );
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
    )
}

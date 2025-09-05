import { Fragment, type ReactNode } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import Logout from "./logout";
import { ModeToggle } from "./mode-toggle";

interface Props {
	children: ReactNode;
	breadcrumbs: {
		label: string;
		href: string;
	}[];
}

export default function PageWrapper({ breadcrumbs, children }: Props) {
	return (
		<div className="flex flex-col gap-4">
			<header className="flex items-center p-4 border-b">
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center gap-4">
						<SidebarTrigger />
						<Breadcrumb>
							<BreadcrumbList>
								{breadcrumbs.map((breadcrumb, index) => (
									<Fragment key={breadcrumb.href}>
										{/* Use Fragment to avoid key warnings */}
										<BreadcrumbItem >
											<BreadcrumbLink href={breadcrumb.href}>
												{breadcrumb.label}
											</BreadcrumbLink>
										</BreadcrumbItem>
										{index !== breadcrumbs.length - 1 && (
											<BreadcrumbSeparator />
										)}
									</Fragment>
								))}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<div className="flex items-center gap-4">
						<ModeToggle />
						<Logout />
					</div>
				</div>
			</header>

			<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
		</div>
	);
}

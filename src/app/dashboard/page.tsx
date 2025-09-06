import { Notebooks } from "@/components/notebooks";
import PageWrapper from "@/components/page-wrapper";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getNotebooks } from "@/server/notebooks";
import { AlertCircleIcon } from "lucide-react";

export default async function DashboardPage() {
	const { success, notebooks, message } = await getNotebooks();
	return (
		<PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
			{success && notebooks !== undefined ? (
				<Notebooks notebooks={notebooks} />
			) : (
				<div className="container mx-auto">
					<Alert variant={"destructive"}>
						<AlertCircleIcon className="size-8" />
						<AlertDescription>
							<span>Error!</span>
							{message}
						</AlertDescription>
					</Alert>
				</div>
			)}
		</PageWrapper>
	);
}

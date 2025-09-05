import { Notebooks } from "@/components/notebooks";
import PageWrapper from "@/components/page-wrapper";
import { getNotebooks } from "@/server/notebooks";

export default async function DashboardPage() {
	const response = await getNotebooks();
	return (
		<PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}>
			{response.success ? (
				<Notebooks notebooks={response?.notebooks} />
			) : (
				<div>An error occurred</div>
			)}
		</PageWrapper>
	);
}

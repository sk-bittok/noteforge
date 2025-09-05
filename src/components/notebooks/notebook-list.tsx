import CreateNotebookButton from "./create-notebook";
import NotebookCard, { type NotebookRelation } from "./notebook-card";

interface Props {
	notebooks: NotebookRelation[];
}

export default function Notebooks({ notebooks }: Props) {
	return (
		<div className="container mx-auto">
			<div className="flex items-center justify-between pb-4">
				<h1 className="text-3xl font-bold">Notebooks</h1>
				<CreateNotebookButton />
			</div>

			{notebooks.length > 0 ? (
				<NotebookList notebooks={notebooks} />
			) : (
				<span>No notebook found</span>
			)}
		</div>
	);
}

function NotebookList({ notebooks }: { notebooks: NotebookRelation[] }) {
	return (
		<div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{notebooks.map((notebook) => (
				<NotebookCard notebook={notebook} key={notebook.id} />
			))}
		</div>
	);
}

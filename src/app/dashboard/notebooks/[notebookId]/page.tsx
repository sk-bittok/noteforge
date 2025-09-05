
import PageWrapper from "@/components/page-wrapper";
import { getNotebookById } from "@/server/notebooks";
import NoteCard from "@/components/notes-card";
import CreateNoteButton from "@/components/create-notes-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

type Params = Promise<{
    notebookId: string;
}>;

export default async function NotebookPage({ params }: { params: Params }) {
    const resolvedParams = await params;

    const { notebook, message, success } = await getNotebookById(resolvedParams.notebookId);


    return (
        <PageWrapper breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: notebook?.name ?? "Notebook", href: `/dashboard/notebooks/${notebook?.id}` }
        ]}>
            {success && notebook ?
                (
                    <div className="container mx-auto">
                        <div className="pb-4 flex items-center justify-between">
                            <h1 className="text-3xl font-bold">{notebook.name}</h1>
                            <CreateNoteButton notebookId={notebook.id} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {notebook.notes.map((note) => (
                                <NoteCard key={note.id} note={note} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto container">
                        <Alert variant={"destructive"}>
                            <AlertCircleIcon className="size-6" />
                            <AlertDescription>
                                <span className="font-medium">Error!</span> {message}
                            </AlertDescription>
                        </Alert>
                    </div>
                )
            }

        </PageWrapper>
    );

}
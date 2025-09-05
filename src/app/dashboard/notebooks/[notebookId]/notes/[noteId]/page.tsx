import PageWrapper from "@/components/page-wrapper";
import { getNoteById } from "@/server/notes";
import RichRextEditor from "@/components/rich-text-editor";
import type { JSONContent } from "@tiptap/react";

type Params = Promise<{
    noteId: string;
    notebookId: string;
}>;

export default async function NotePage({ params }: { params: Params }) {
    const resolvedParams = await params;

    const { note, message, success } = await getNoteById(resolvedParams.noteId);


    return (
        <PageWrapper breadcrumbs={
            [
                { label: "Dashboard", href: "/dashboard" },
                { label: note?.notebook?.name ?? "Notebook", href: `/dashboard/notebooks/${note?.notebook.id}` },
                { label: note?.title ?? "Note", href: `/dashboard/notebooks/${note?.notebookId}/notes/${note?.id}` }
            ]
        }
        >
            {success && note ?
                (
                    <div className="space-y-4 container mx-auto max-w-7xl">
                        <div className="pb-4 flex items-center justify-between">
                            <h1 className="text-3xl font-bold">{note.title}</h1>
                        </div>
                        <div className="">
                            <RichRextEditor content={note.content as JSONContent[]} noteId={note.id} />
                        </div>
                    </div>)
                :
                (<div>{message}</div>)}</PageWrapper>
    )


}
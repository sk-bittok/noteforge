"use client";

import type { Note, Notebook } from "@/db/schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteNotebook } from "@/server/notebooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



export interface NotebookRelation {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    notes: Note[];
}

export default function NotebookCard({ notebook }: { notebook: NotebookRelation }) {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();

    const onDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await deleteNotebook(notebook.id);
            if (response.success) {
                toast.success(response.message);
                setIsOpen(false);
                router.refresh();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            const e = error as Error;
            toast.error(e.message || "Something went wrong. Try again later.");
        } finally {
            setIsDeleting(false);
        }
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>{notebook.name}</CardTitle>
            </CardHeader>
            <CardContent>
                {notebook?.notes.length ?? 0} Notes
            </CardContent>
            <CardFooter className="flex justify-end gap-2" >
                <Link href={`/dashboard/notebooks/${notebook.id}`} className="w-full">
                    <Button variant={"outline"} disabled={isDeleting}>View</Button>
                </Link>

                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="flex items-center gap-2">
                            <Trash2 className="size-4" />
                            <span>Delete</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this
                                notebook and remove any notes associated with it.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onDelete} className="bg-red-600 text-white hover:bg-red-500">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    )
}

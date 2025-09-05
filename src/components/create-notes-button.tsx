"use client";

import z from "zod";
import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { createNotebook } from "@/server/notebooks";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { createNote } from "@/server/notes";

const formSchema = z.object({
    title: z
        .string()
        .min(5, "Name requires 5 letters")
        .max(50, "Name must be under 50 characters."),
    content: z.string().optional(),
});

type FormType = z.infer<typeof formSchema>;

export default function CreateNoteButton({ notebookId }: { notebookId: string }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const router = useRouter();

    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    const onSubmit = async (values: FormType) => {
        setIsLoading(true);

        try {
            const userId = (await authClient.getSession()).data?.user.id;

            if (!userId) {
                toast.error("You muse be signed in to create a notebook!");
                return;
            }

            const response = await createNote({ ...values, content: {}, notebookId });

            if (response.success) {
                toast.success(response.message);
                form.reset();
                setIsOpen(false);
                router.refresh();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            const e = error as Error;
            toast.error(e.message || "Something went wrong. Please try again!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="size-4" />
                    <span>Add Note</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new Note</DialogTitle>
                    <DialogDescription>
                        Add a new note to your notebook to capture your state.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="grid gap-3">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="My first note"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="animate-spin size-4" />
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

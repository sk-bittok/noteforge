"use server";

import { db } from "@/db/drizzle";
import { type NewNote, notes } from "@/db/schema";
import type { GenericResponse } from "./users";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export async function createNote(values: NewNote) {
	try {
		await db.insert(notes).values(values);

		return {
			success: true,
			message: "Note added successfully",
		} as GenericResponse;
	} catch (error) {
		const e = error as Error;

		return {
			success: false,
			message: e.message || "Something went wrong. Try again later.",
		} as GenericResponse;
	}
}

export async function updateNote(id: string, values: Partial<NewNote>) {
	try {
		await db.update(notes).set(values).where(eq(notes.id, id));

		return {
			success: true,
			message: "Note updated successfully",
		} as GenericResponse;
	} catch (error) {
		const e = error as Error;

		return {
			success: false,
			message: e.message || "Something went wrong. Try again later.",
		} as GenericResponse;
	}
}

export async function deleteNote(id: string) {
	try {
		await db.delete(notes).where(eq(notes.id, id));

		return {
			success: true,
			message: "Note deleted successfully",
		} as GenericResponse;
	} catch (error) {
		const e = error as Error;

		return {
			success: false,
			message: e.message || "Something went wrong. Try again later.",
		} as GenericResponse;
	}
}

export async function getNotes(notebookId: string) {
	try {
		const results = await db
			.select()
			.from(notes)
			.where(eq(notes.notebookId, notebookId));
		return { success: true, notes: results };
	} catch (error) {
		const e = error as Error;

		return {
			success: false,
			message: e.message || "Something went wrong. Try again later.",
		} as GenericResponse;
	}
}

export async function getNoteById(id: string) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		const userId = session?.user.id;

		if (!userId) {
			return { success: false, message: "User not found" };
		}

		const note = await db.query.notes.findFirst({
			where: eq(notes.id, id),
			with: {
				notebook: true,
			},
		});

		if (!note) {
			return { success: false, message: "Note not found" };
		}

		return { success: true, note: note };
	} catch (error) {
		const e = error as Error;

		return {
			success: false,
			message: e.message || "Something went wrong. Try again later.",
		};
	}
}

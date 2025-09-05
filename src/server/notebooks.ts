"use server";

import { db } from "@/db/drizzle";
import { type NewNotebook, notebooks } from "@/db/schema";
import type { GenericResponse } from "./users";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export async function createNotebook(values: NewNotebook) {
	try {
		await db.insert(notebooks).values(values);

		return {
			success: true,
			message: "Notebook added successfully",
		} as GenericResponse;
	} catch (error) {
		const e = error as Error;

		return {
			success: false,
			message: e.message || "Something went wrong. Try again later.",
		} as GenericResponse;
	}
}

export async function updateNotebook(id: string, values: NewNotebook) {
	try {
		await db.update(notebooks).set(values).where(eq(notebooks.id, id));

		return {
			success: true,
			message: "Notebook updated successfully",
		} as GenericResponse;
	} catch (error) {
		const e = error as Error;

		return {
			success: false,
			message: e.message || "Something went wrong. Try again later.",
		} as GenericResponse;
	}
}

export async function deleteNotebook(id: string) {
	try {
		await db.delete(notebooks).where(eq(notebooks.id, id));

		return {
			success: true,
			message: "Notebook deleted successfully",
		} as GenericResponse;
	} catch (error) {
		const e = error as Error;

		return {
			success: false,
			message: e.message || "Something went wrong. Try again later.",
		} as GenericResponse;
	}
}

export async function getNotebooks() {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		const userId = session?.user.id;

		if (!userId) {
			return { success: false, message: "User not found" };
		}

		const results = await db.query.notebooks.findMany({
			where: eq(notebooks.userId, userId),
			with: {
				notes: true,
			},
		});

		return { success: true, notebooks: results };
	} catch (error) {
		const e = error as Error;

		return {
			success: false,
			message: e.message || "Something went wrong. Try again later.",
		};
	}
}

export async function getNotebookById(id: string) {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		const userId = session?.user.id;

		if (!userId) {
			return {
				success: false,
				message: "User not found",
			};
		}

		const notebook = await db.query.notebooks.findFirst({
			where: eq(notebooks.id, id),
			with: {
				notes: true,
			},
		});

		if (!notebook) {
			return {
				success: false,
				message: "Notebook not found",
			};
		}

		return { success: true, notebook: notebook };
	} catch (error) {
		const e = error as Error;

		return {
			success: false,
			message: e.message || "Something went wrong. Try again later.",
		};
	}
}

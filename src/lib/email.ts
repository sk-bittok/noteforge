import { render } from "@react-email/render";
import { ServerClient } from "postmark";
import { ReactNode } from "react";

if (!process.env.POSTMARK_SERVER_TOKEN) {
	throw new Error("POSTMARK_SERVER_TOKEN environment variable is not set");
}

if (!process.env.FROM_EMAIL) {
	throw new Error("FROM_EMAIL environment variable is not set");
}

const postmarkClient = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);

interface EmailArgs {
	to: string;
	subject: string;
	from?: string;
	react: ReactNode;
	messageStream?: string;
}

export async function sendEmail({
	to,
	subject,
	react,
	from = process.env.FROM_EMAIL!,
	messageStream = "outbound",
}: EmailArgs) {
	try {
		const html = await render(react);

		const result = await postmarkClient.sendEmail({
			From: from,
			To: to,
			Subject: subject,
			HtmlBody: html,
			MessageStream: messageStream,
		});

		return { success: true, message: result.MessageID };
	} catch (error) {
		const e = error as Error;
		return { success: false, message: e.message || "Failed to send email" };
	}
}

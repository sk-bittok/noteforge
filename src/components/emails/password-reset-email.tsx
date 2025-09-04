import * as React from "react";
import {
	Html,
	Head,
	Body,
	Container,
	Section,
	Text,
	Button,
	Hr,
	Tailwind,
} from "@react-email/components";

interface Props {
	requestUrl: string;
}

const PasswordResetEmail = ({ requestUrl }: Props) => {
	return (
		<Html lang="en" dir="ltr">
			<Tailwind>
				<Head />
				<Body className="bg-gray-100 font-sans py-[40px]">
					<Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
						{/* Header */}
						<Section className="text-center mb-[32px]">
							<Text className="text-[24px] font-bold text-gray-900 m-0">
								Reset Your Password
							</Text>
						</Section>

						{/* Main Content */}
						<Section className="mb-[32px]">
							<Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
								Hello,
							</Text>
							<Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
								We received a request to reset the password for your account. If
								you made this request, click the button below to create a new
								password.
							</Text>

							{/* Reset Button */}
							<Section className="text-center my-[32px]">
								<Button
									href={requestUrl}
									className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-medium no-underline box-border"
								>
									Reset Password
								</Button>
							</Section>

							<Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
								This link will expire in 24 hours for security reasons.
							</Text>

							<Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
								If you didn&apos;t request a password reset, you can safely
								ignore this email. Your password will remain unchanged.
							</Text>
						</Section>

						<Hr className="border-gray-200 my-[32px]" />

						{/* Security Notice */}
						<Section className="mb-[32px]">
							<Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] font-medium">
								Security tip:
							</Text>
							<Text className="text-[14px] text-gray-600 leading-[20px]">
								Never share your password with anyone. We will never ask for
								your password via email or phone.
							</Text>
						</Section>

						<Hr className="border-gray-200 my-[32px]" />

						{/* Footer */}
						<Section className="text-center">
							<Text className="text-[12px] text-gray-500 leading-[16px] m-0">
								&copy; {new Date().getFullYear()} NotesForge. All rights
								reserved.
							</Text>
							<Text className="text-[12px] text-gray-500 leading-[16px] m-0">
								34 Moi Avenue, Nairobi, Kenya
							</Text>
							<Text className="text-[12px] text-gray-500 leading-[16px] m-0">
								<a href="#" className="text-gray-500 no-underline">
									Unsubscribe
								</a>
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default PasswordResetEmail;

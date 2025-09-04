import * as React from "react";
import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Section,
	Text,
	Tailwind,
} from "@react-email/components";

interface VerificationEmailProps {
	userName: string;
	verificationUrl: string;
	companyName?: string;
}

const VerificationEmail = ({
	userName,
	verificationUrl,
	companyName = "NoteForge",
}: VerificationEmailProps) => {
	return (
		<Html lang="en" dir="ltr">
			<Head />
			<Preview>
				Please verify your email address to complete your registration
			</Preview>
			<Tailwind>
				<Body className="bg-gray-100 font-sans py-[40px]">
					<Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
						{/* Header */}
						<Section className="text-center mb-[32px]">
							<Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
								Welcome to {companyName}!
							</Heading>
							<Text className="text-[16px] text-gray-600 m-0">
								Please verify your email address to get started
							</Text>
						</Section>

						{/* Main Content */}
						<Section className="mb-[32px]">
							<Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
								Hi {userName},
							</Text>
							<Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
								Thank you for signing up with {companyName}! To complete your
								registration and start using your account, please verify your
								email address by clicking the button below.
							</Text>
							<Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
								This verification link will expire in 24 hours for security
								purposes.
							</Text>
						</Section>

						{/* CTA Button */}
						<Section className="text-center mb-[32px]">
							<Button
								href={verificationUrl}
								className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-semibold no-underline box-border"
							>
								Verify Email Address
							</Button>
						</Section>

						{/* Alternative Link */}
						<Section className="mb-[32px]">
							<Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
								If the button above doesn&nbsp;t work, you can also copy and
								paste this link into your browser:
							</Text>
							<Link
								href={verificationUrl}
								className="text-blue-600 text-[14px] break-all"
							>
								{verificationUrl}
							</Link>
						</Section>

						{/* Help Section */}
						<Section className="border-t border-solid border-gray-200 pt-[24px] mb-[32px]">
							<Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
								Need help? Contact our support team at&nbsp;
								<Link
									href="mailto:support@company.com"
									className="text-blue-600"
								>
									support@notesforge.com
								</Link>
							</Text>
							<Text className="text-[14px] text-gray-600 leading-[20px] m-0">
								If you didn&apos;t create an account with us, you can safely
								ignore this email.
							</Text>
						</Section>

						{/* Footer */}
						<Section className="border-t border-solid border-gray-200 pt-[24px] text-center">
							<Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
								&copy;&nbsp;{new Date().getFullYear()} {companyName}. All rights
								reserved.
							</Text>
							<Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[4px]">
								34 Moi Avenue, Greener Suite 100
							</Text>
							<Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
								Nairobi, Kenya
							</Text>
							<Link
								href="https://company.com/unsubscribe"
								className="text-[12px] text-gray-500 underline"
							>
								Unsubscribe
							</Link>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default VerificationEmail;

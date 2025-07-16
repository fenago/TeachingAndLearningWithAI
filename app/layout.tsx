import { ReactNode } from "react";
import { Inter, DM_Serif_Display } from "next/font/google";
import { Viewport } from "next";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import CleanAuthHeader from "@/components/CleanAuthHeader";
import config from "@/config";
import "./globals.css";

const font = Inter({ subsets: ["latin"], variable: "--font-inter" });

const fontHeadings = DM_Serif_Display({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-dm-serif",
});

export const viewport: Viewport = {
	// Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
	themeColor: config.colors.main,
	width: "device-width",
	initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			data-theme={config.colors.theme}
			className={`${font.variable} ${fontHeadings.variable}`}
		>
			<body>
				{/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
				<ClientLayout>
					<CleanAuthHeader />
					{children}
				</ClientLayout>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import { Kanit } from "next/font/google"; // เพิ่มตรงนี้
import "./globals.css";

const kanit = Kanit({            // เพิ่ม Kanit font
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // เลือกน้ำหนักตามต้องการ
});


export const metadata: Metadata = {
  title: "Calculator Varity 2025 by DTI-SAU",
  description: "เพื่อคำนวนหลากหลายโดย DTI-SAU",
  keywords: ['เครื่องคำนวน', 'BMI', 'BMR', 'CAR Installment'],
  icons: {
    icon: '/calculator.png', 
  },

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

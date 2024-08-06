import Navbar from "@/components/navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-800">
      <Navbar />
      <div className="mt-[74px] py-8 px-6 container mx-auto">{children}</div>
    </div>
  );
}

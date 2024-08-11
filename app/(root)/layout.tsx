import Navbar from "@/components/navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-slate-900">
      <Navbar />
      <div className="mt-[74px] py-8 px-6  mx-auto container">{children}</div>
    </div>
  );
}

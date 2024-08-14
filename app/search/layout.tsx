import Navbar from "@/components/navbar/Navbar";

export default function PersonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#0f1114]">
      <Navbar />
      <div className="mt-[74px] py-16 px-6 mx-auto container min-h-[calc(100vh-74px)]">
        {children}
      </div>
    </div>
  );
}

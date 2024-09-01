export default function MovieLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#0f1114]">
      <div className="mt-[74px] py-8 px-6 mx-auto max-w-screen-2xl min-h-[calc(100vh-74px)]">
        {children}
      </div>
    </div>
  );
}

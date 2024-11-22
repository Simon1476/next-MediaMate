export default function FavoriteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#0f1114]">
      <div className="mt-[74px] py-8 px-6 mx-auto container min-h-[calc(100vh-74px)]">
        {children}
      </div>
    </div>
  );
}

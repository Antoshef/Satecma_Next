import StoreProvider from "@/StoreProvider";

export default function Spedition({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <div className="p-4">{children}</div>
    </StoreProvider>
  );
}

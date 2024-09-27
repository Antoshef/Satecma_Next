import ClientsLayout from '@/clients/layout';

export default function InvoicesLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClientsLayout>
        {children}
    </ClientsLayout>
  );
}

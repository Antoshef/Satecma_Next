import ClientsLayout from '@/clients/layout';

export default function CreateInvoiceLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <ClientsLayout>{children}</ClientsLayout>;
}

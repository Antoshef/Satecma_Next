import ClientsLayout from '@/clients/layout';

export default function ProfileLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <ClientsLayout>{children}</ClientsLayout>;
}

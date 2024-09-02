import { EcontUtils } from "./create/econt/services/utils";

export default function Spedition({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const offices = EcontUtils.getOffices();
  const cities = EcontUtils.getCities();

  return <div className="p-4">{children}</div>;
}

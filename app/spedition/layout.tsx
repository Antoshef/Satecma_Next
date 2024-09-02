import { EcontUtils } from "./create/econt/services/utils";
import { Spedition } from "./Spedition";

export default async function SpeditionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const offices = await EcontUtils.getOffices();
  const cities = await EcontUtils.getCities();
  console.log(offices, "Offices");

  return (
    <div className="p-4">
      <Spedition econt={{ offices, cities }} />
      {children}
    </div>
  );
}

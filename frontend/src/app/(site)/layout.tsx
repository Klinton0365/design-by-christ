import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getServices } from "@/lib/api";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const services = await getServices();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer services={services} />
    </div>
  );
}

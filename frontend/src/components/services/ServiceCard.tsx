import ServiceCarousel from "./ServiceCarousel";
import { getServices } from "@/lib/api";

export default async function ServiceCard() {
  const services = await getServices();

  return <ServiceCarousel services={services} />;
}

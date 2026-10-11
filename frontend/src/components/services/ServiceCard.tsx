import ServiceGallery from "./ServiceGallery";
import { getServices } from "@/lib/api";

export default async function ServiceCard() {
  const services = await getServices();

  return <ServiceGallery services={services} />;
}

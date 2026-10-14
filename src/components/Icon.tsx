import {
  Droplet,
  Sun,
  Wrench,
  Shield,
  Layers,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";


const ICONS: Record<string, LucideIcon> = {
  droplet: Droplet,
  sun: Sun,
  wrench: Wrench,
  shield: Shield,
  layers: Layers,
  "refresh-cw": RefreshCw,
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  clock: Clock,
  check: CheckCircle2,
};


export function Icon({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  const Cmp = (name && ICONS[name]) || Droplet;
  return <Cmp className={className} strokeWidth={1.75} />;
}

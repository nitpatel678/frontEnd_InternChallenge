import {
  BookOpen,
  Code,
  Palette,
  Brain,
  Rocket,
  Database,
  Globe,
  Layers,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "book-open": BookOpen,
  code: Code,
  palette: Palette,
  brain: Brain,
  rocket: Rocket,
  database: Database,
  globe: Globe,
  layers: Layers,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || BookOpen;
}

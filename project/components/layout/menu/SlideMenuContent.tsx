"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  History,
  Home,
  BookOpen,
  Settings,
  HelpCircle,
  ChevronDown,
  Layout,
  Globe,
  BookType,
  School,
  Building2,
  FileText,
  HelpingHand,
  Calendar,
} from "lucide-react";
import { useState } from "react";

interface SlideMenuContentProps {
  onClose: () => void;
}

interface MenuItem {
  title: string;
  icon: React.ElementType;
  href?: string;
  items?: {
    title: string;
    href: string;
    icon: React.ElementType;
  }[];
}

const menuItems: MenuItem[] = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Calendar", icon: Calendar, href: "/calendar" },
  {
    title: "Exam",
    icon: GraduationCap,
    items: [
      { title: "Take Exam", icon: BookOpen, href: "/exam/introduction" },
      { title: "History", icon: History, href: "/exam/history" },
    ],
  },
  {
    title: "Setup",
    icon: Layout,
    items: [
      { title: "Regions", icon: Globe, href: "/setup/regions" },
      { title: "Subjects", icon: BookType, href: "/setup/subjects" },
      { title: "Questions", icon: FileText, href: "/setup/questions" },
      { title: "Exams", icon: School, href: "/setup/exams" },
    ],
  },
  { title: "Settings", icon: Settings, href: "/settings" },
  { title: "Help", icon: HelpCircle, href: "/help" },
];

export function SlideMenuContent({ onClose }: SlideMenuContentProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname === href;

  const renderMenuItem = (item: MenuItem) => {
    const isExpanded = expandedItems.includes(item.title);

    if (item.items) {
      return (
        <div key={item.title}>
          <button
            onClick={() => toggleItem(item.title)}
            className={cn(
              "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md",
              "hover:bg-accent/50 transition-colors",
              isExpanded && "bg-accent"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-180"
              )}
            />
          </button>
          {isExpanded && (
            <div className="ml-4 mt-1 space-y-1">
              {item.items.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm rounded-md",
                    "hover:bg-accent/50 transition-colors",
                    isActive(subItem.href) && "bg-accent text-accent-foreground"
                  )}
                >
                  <subItem.icon className="h-4 w-4" />
                  <span>{subItem.title}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.title}
        href={item.href!}
        onClick={onClose}
        className={cn(
          "flex items-center gap-3 px-3 py-2 text-sm rounded-md",
          "hover:bg-accent/50 transition-colors",
          isActive(item.href!) && "bg-accent text-accent-foreground"
        )}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.title}</span>
      </Link>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <School className="h-6 w-6 text-primary" />
          <h2 className="font-semibold">Wizardry Academy</h2>
        </div>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-2 px-2">
          {menuItems.map(renderMenuItem)}
        </nav>
      </div>
    </div>
  );
}

import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { Menu, Search, TrendingUp, Calculator, CreditCard, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const NAVIGATION_ITEMS = [
  {
    label: "Piyasalar",
    icon: <TrendingUp className="h-4 w-4" />,
    items: [
      { label: "Döviz Kurları", href: "/doviz" },
      { label: "Altın Fiyatları", href: "/altin" },
      { label: "Borsa", href: "/borsa" },
      { label: "Kripto Paralar", href: "/kripto" },
    ],
  },
  {
    label: "Hesaplamalar",
    icon: <Calculator className="h-4 w-4" />,
    items: [
      { label: "Zam Hesaplama", href: "/hesaplamalar/zam-hesaplama" },
      { label: "Yüzde Hesaplama", href: "/hesaplamalar/yuzde-hesaplama" },
      { label: "Maaş Hesaplama", href: "/hesaplamalar/maas-hesaplama" },
      { label: "Kredi Hesaplama", href: "/hesaplamalar/kredi-hesaplama" },
    ],
  },
  {
    label: "Kredi",
    icon: <CreditCard className="h-4 w-4" />,
    items: [
      { label: "İhtiyaç Kredisi", href: "/kredi/ihtiyac" },
      { label: "Konut Kredisi", href: "/kredi/konut" },
      { label: "Taşıt Kredisi", href: "/kredi/tasit" },
      { label: "Kredi Kartları", href: "/kredi/kredi-kartlari" },
    ],
  },
];

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menüyü aç</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          {NAVIGATION_ITEMS.map((section) => (
            <div key={section.label} className="space-y-3">
              <div className="flex items-center gap-2 font-medium">
                {section.icon}
                {section.label}
              </div>
              <div className="grid gap-2 pl-6">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function DesktopNav() {
  return (
    <NavigationMenu className="relative">
      <NavigationMenuList>
        {NAVIGATION_ITEMS.map((section) => (
          <NavigationMenuItem key={section.label}>
            <NavigationMenuTrigger className="h-9">
              <div className="flex items-center gap-2">
                {section.icon}
                {section.label}
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid grid-cols-2 w-[400px] gap-3 p-4">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href}
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{item.label}</div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold">
              Para
              <span className="text-primary">Birikim</span>
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <DesktopNav />
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Ara</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

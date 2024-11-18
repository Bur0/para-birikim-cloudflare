import { Sheet, SheetTrigger, SheetContent } from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { Link } from '@remix-run/react';
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import { Navigation } from './Navigation';
import { useState, useEffect } from 'react';

// Navigation links data
const NAVIGATION_ITEMS = [
  { label: 'Döviz Kurları', href: '#' },
  { label: 'Altın Fiyatları', href: '#' },
  { label: 'Borsa', href: '#' },
  { label: 'Kripto Para', href: '#' },
];

// Common navigation link styles
const navigationLinkStyles =
  'group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50';

// Mobile Navigation Component
const MobileNavigation = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="lg:hidden">
        <MenuIcon className="h-6 w-6" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <Link to="#" prefetch="none">
        <ShirtIcon className="h-6 w-6" />
        <span className="sr-only">ShadCN</span>
      </Link>
      <div className="grid gap-2 py-6">
        {NAVIGATION_ITEMS.map(({ label, href }) => (
          <Link
            key={label}
            to={href}
            className="flex w-full items-center py-2 text-lg font-semibold"
            prefetch="intent"
          >
            {label}
          </Link>
        ))}
      </div>
    </SheetContent>
  </Sheet>
);

// Desktop Navigation Component
const DesktopNavigation = () => (
  <NavigationMenu className="hidden lg:flex">
    <NavigationMenuList>
      {NAVIGATION_ITEMS.map(({ label, href }) => (
        <NavigationMenuLink key={label} asChild>
          <Link to={href} className={navigationLinkStyles} prefetch="none">
            {label}
          </Link>
        </NavigationMenuLink>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full shadow-sm backdrop-blur-md bg-white/75 dark:bg-gray-950/75 ${
        !isScrolled ? ' border-b border-gray-100 dark:border-gray-800 shadow-none' : ''
      }`}
    >
      <div className="flex h-16 shrink-0 items-center max-w-screen-xl mx-auto w-full px-4 md:px-6">
        {/*   <MobileNavigation /> */}
        <Link to="#" className="mr-16 hidden lg:flex" prefetch="none">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-primary text-black-800">
              <span className="">Para</span>
              <span className=" ">Kredim</span>
              <span className="text-sm font-normal">.com</span>{' '}
            </span>
          </div>
          <span className="sr-only">ParaKredim.com</span>
        </Link>
        <Navigation />
        {/*  <div className="ml-auto flex gap-2">
        <Button variant="outline">Sign in</Button>
        <Button>Sign Up</Button>
      </div> */}
      </div>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function ShirtIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  );
}

'use client';

import * as React from 'react';
import { Link, useLocation, useMatches } from '@remix-run/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumb';

interface BreadcrumbItem {
  href?: string;
  label: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

interface HandleBreadcrumb {
  label: string;
  href: string;
}

export function BreadcrumbResponsive({ items: propItems }: BreadcrumbProps) {
  const location = useLocation();
  const matches = useMatches();

  // Dinamik breadcrumb öğelerini oluştur
  const breadcrumbs = React.useMemo(() => {
    // Eğer prop olarak items verilmişse onları kullan
    if (propItems) {
      return propItems;
    }

    // Route'lardan breadcrumb'ları oluştur
    const pathSegments = location.pathname.split('/').filter(Boolean);
    let currentPath = '';

    const defaultItems = [{ href: '/', label: 'Ana Sayfa' }];

    // Route'lardan breadcrumb'ları oluştur
    const dynamicItems = matches
      .filter((match) => match.handle?.breadcrumb)
      .map((match) => {
        const breadcrumb = match.handle?.breadcrumb(match) as HandleBreadcrumb;
        return {
          href: breadcrumb.href,
          label: breadcrumb.label,
        };
      });

    return [...defaultItems, ...dynamicItems];
  }, [matches, propItems, location]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.href || index}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild className="max-w-20 truncate md:max-w-none">
                  <Link to={item.href || '#'}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

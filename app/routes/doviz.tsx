import { Outlet } from '@remix-run/react';
import { BreadcrumbResponsive } from '~/components/Breadcrumb';

export const handle = {
  breadcrumb: () => ({
    label: 'Döviz Kurları',
    href: '/doviz',
  }),
};

export default function DovizLayout() {
  return (
    <div className="w-full">
      <BreadcrumbResponsive />
      <Outlet />
    </div>
  );
}

// components/DashboardLayout.tsx
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import PageHeader from './PageHeader';
import { usePathname } from 'next/navigation';
import DashboardNavbar from '@/app/property/_components/DashboardNavbar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname(); // Get the current pathname

    const title = pathname?.split('/').pop()?.replace('-', ' ') || 'Dashboard';

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 p-8 overflow-auto">
                <div>
                    <PageHeader title={title} />
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;

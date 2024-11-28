// components/DashboardLayout.tsx
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import PageHeader from './PageHeader';
import { usePathname } from 'next/navigation';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname(); // Get the current pathname

    const title = pathname?.split('/').pop()?.replace('-', ' ') || 'Dashboard';

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 p-6 overflow-auto">
                <PageHeader title={title} />
                <main>{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;

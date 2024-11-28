import Sidebar from './Sidebar';

import { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1">
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default DashboardLayout;

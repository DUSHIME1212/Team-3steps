// components/Sidebar.tsx
import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-64 h-full p-4">
            <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
            <ul className="space-y-4">
                <li>
                    <Link href="/dashboard/properties" className="text-lg hover:text-blue-400">
                        Properties
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/categories" className="text-lg hover:text-green-400">
                        Categories
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/users" className="text-lg hover:text-yellow-400">
                        Users
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className="bg-gray-800 text-white w-64 h-full p-4">
            <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
            <ul className="space-y-4">
                <li>
                    <Link href="/dashboard/properties" passHref>
                        <Link href="#" className="text-lg hover:text-blue-400">Properties</Link>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/categories" passHref>
                        <Link href="#" className="text-lg hover:text-green-400">Categories</Link>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/users" passHref>
                        <Link href="#" className="text-lg hover:text-yellow-400">Users</Link>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

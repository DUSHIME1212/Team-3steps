// components/PageHeader.tsx
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface PageHeaderProps {
    title: string;
}

const PageHeader: React.FC<PageHeaderProps> = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);

    return (
        <div className="bg-white p-4 mb-4 border-b-2 border-gray-100">
            {/* Breadcrumb Navigation */}
            <nav className="text-sm mb-2 text-gray-500">
                <ul className="flex space-x-2">
                    <li>
                        <Link href="/dashboard" className="hover:text-blue-500">Home</Link>
                    </li>
                    {pathSegments.map((segment, index) => (
                        <li key={index} className="flex items-center">
                            <span className="mx-1">/</span>
                            <Link
                                href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                                className="hover:text-blue-500 capitalize"
                            >
                                {segment}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default PageHeader;

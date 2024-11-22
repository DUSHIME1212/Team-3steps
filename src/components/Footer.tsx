// app/components/Footer.tsx
import Link from 'next/link';
import React from 'react';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="w-full px-4 md:px-16 lg:px-32 py-12 bg-zinc-100 text-black">
            <div className="container mx-auto flex flex-wrap justify-between">
                {/* <!-- Newsletter Signup --> */}
                <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
                    <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                    <p className="mb-4">Get the latest property listings and news delivered to your inbox.</p>
                    <div className="flex items-center border-b border-gray-600 pb-2">
                        <input type="email" placeholder="Enter your email" className="w-full bg-transparent border-none placeholder-black focus:outline-none" />
                        <button className="hover:text-blue-600 ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                    <label className="flex items-center mt-3">
                        <input type="checkbox" className="form-checkbox text-blue-600" />
                        <span className="ml-2 text-sm">I agree with the privacy policy and terms of use.</span>
                    </label>
                </div>

                {/* <!-- Property Links --> */}
                <div className="w-full sm:w-1/4 mb-8 sm:mb-0">
                    <h2 className="text-xl font-semibold mb-4">Explore</h2>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:text-blue-600">Buy Property</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Rent Property</Link></li>
                        <li><a href="#" className="hover:text-blue-600">Commercial Listings</a></li>
                        <li><Link href="#" className="hover:text-blue-600">New Developments</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Luxury Properties</Link></li>
                    </ul>
                </div>

                {/* <!-- Company Info --> */}
                <div className="w-full sm:w-1/4 mb-8 sm:mb-0">
                    <h2 className="text-xl font-semibold mb-4">Company</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                        <li><Link href="#" className="hover:text-blue-600">Careers</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Press</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Investor Relations</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Contact Us</Link></li>
                    </ul>
                </div>

                {/* <!-- Customer Resources --> */}
                <div className="w-full sm:w-1/4 mb-8 sm:mb-0">
                    <h2 className="text-xl font-semibold mb-4">Resources</h2>
                    <ul className="space-y-2">
                        <li><Link href="#" className="hover:text-blue-600">Help Center</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Privacy Policy</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Terms & Conditions</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">Blog</Link></li>
                        <li><Link href="#" className="hover:text-blue-600">FAQs</Link></li>
                    </ul>
                </div>
            </div>

            {/* <!-- Bottom Section --> */}
            <div className="container mx-auto mt-8 border-t border-gray-700 pt-6">
                <div className="flex flex-wrap items-center justify-between">
                    {/* <!-- Copyright --> */}
                    <p className="text-sm">&copy; 2024 Property Finder. All rights reserved.</p>

                    {/* <!-- Social Media Icons --> */}
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18 2h-3a7 7 0 0 0-7 7v3H5v4h3v8h4v-8h3l1-4h-4V9a3 3 0 0 1 3-3h3z" />
                            </svg>
                        </a>
                        <a href="#" className="hover:text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.23 5.924c-.81.36-1.685.602-2.6.71a4.607 4.607 0 0 0 2.02-2.53 9.147 9.147 0 0 1-2.9 1.11 4.596 4.596 0 0 0-7.82 4.19A13.07 13.07 0 0 1 1.64 4.15a4.59 4.59 0 0 0 1.42 6.13 4.57 4.57 0 0 1-2.08-.58v.06a4.6 4.6 0 0 0 3.68 4.51 4.608 4.608 0 0 1-2.08.08 4.598 4.598 0 0 0 4.29 3.18 9.196 9.196 0 0 1-6.74 1.87 13.002 13.002 0 0 0 7.06 2.07c8.5 0 13.15-7.04 13.15-13.15l-.02-.6A9.41 9.41 0 0 0 24 4.557a9.09 9.09 0 0 1-2.6.71z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

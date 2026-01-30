import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Providers from '../components/providers/Providers';
import ChatWidget from '../components/chat/ChatWidget';
import './globals.css';

export const metadata = {
    title: 'Phone E-commerce App',
    description: 'Shop for the latest smartphones and accessories',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-gray-50">
                <Providers>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
                        <Footer />
                    </div>
                    <ChatWidget />
                </Providers>
            </body>
        </html>
    );
}
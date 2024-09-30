import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';

import { Montserrat } from 'next/font/google';
import BackgroundImage from '@/assets/icons/background';
import { Metadata, Viewport } from 'next';
import { QueryProvider } from '@/constants/query.provider';

const montserrat = Montserrat({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Movies',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body className={montserrat.className} style={{ margin: 0 }}>
          <AntdRegistry>{children}</AntdRegistry>
          <BackgroundImage style={{ width: '100%', height: '100%' }} />
        </body>
      </QueryProvider>
    </html>
  );
}

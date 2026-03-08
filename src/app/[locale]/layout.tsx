import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Montserrat, Tajawal} from 'next/font/google';
import {routing} from '@/i18n/routing';
import "./globals.css";
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({locale});
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const localeFontVariable = locale === 'ar' ? tajawal.variable : montserrat.variable;
  const localeFontClass = locale === 'ar' ? 'font-arabic' : 'font-latin';
  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${localeFontVariable} ${localeFontClass} w-full min-h-screen overflow-x-hidden`}
        style={{direction}}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

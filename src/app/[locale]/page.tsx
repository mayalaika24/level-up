import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {LoginForm} from '@/features/auth/components/login-form';

type Props = Readonly<{
  params: Promise<{locale: string}>;
}>;

async function Page({params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <LoginForm />
  );
}

export default Page;
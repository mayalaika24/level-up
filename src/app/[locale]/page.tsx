import { getTranslations } from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

type Props = Readonly<{
  params: Promise<{locale: string}>;
}>;

async function Page({params}: Props) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({locale});

  return (
    <div>{t("hello")}</div>
  );
}

export default Page;
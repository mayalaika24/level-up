import {getTranslations} from 'next-intl/server';
import {Typography} from '@/components/ui/typography';

type Props = Readonly<{
  params: Promise<{locale: string}>;
}>;

export default async function DashboardPage({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale});

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <section className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-8">
        <Typography as="h1" variant="h2" weight="bold">
          {t('dashboard.title')}
        </Typography>
        <Typography className="mt-3">
          {t('dashboard.description')}
        </Typography>
      </section>
    </main>
  );
}

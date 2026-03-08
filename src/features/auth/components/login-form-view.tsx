'use client';

import Image from 'next/image';
import type {FormEventHandler} from 'react';
import type {UseFormRegister} from 'react-hook-form';
import {Typography} from '@/components/ui/typography';
import type {LoginFormValues} from '@/features/auth/lib/login-schema';

type LoginFormViewText = {
  logoAlt: string;
  title: string;
  subtitle: string;
  usernameLabel: string;
  usernamePlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  signIn: string;
  signingIn: string;
  demoCredentials: string;
};

type LoginFormViewProps = {
  text: LoginFormViewText;
  register: UseFormRegister<LoginFormValues>;
  isSubmitting: boolean;
  serverError: string | null;
  usernameError?: string;
  passwordError?: string;
  onFormSubmit: FormEventHandler<HTMLFormElement>;
};

export function LoginFormView({
  text,
  register,
  isSubmitting,
  serverError,
  usernameError,
  passwordError,
  onFormSubmit,
}: LoginFormViewProps) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -right-28 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />
      </div>

      <section className="mx-auto flex w-full max-w-md flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:p-8">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Image
            src="/school-logo.svg"
            alt={text.logoAlt}
            width={72}
            height={72}
            priority
            className="rounded-xl"
          />
          <Typography as="h1" variant="h2" weight="bold" align="center">
            {text.title}
          </Typography>
          <Typography variant="muted" align="center">
            {text.subtitle}
          </Typography>
        </div>

        <form onSubmit={onFormSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {text.usernameLabel}
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              placeholder={text.usernamePlaceholder}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-cyan-900"
              aria-invalid={Boolean(usernameError)}
              aria-describedby={usernameError ? 'username-error' : undefined}
              {...register('username')}
            />
            {usernameError ? (
              <Typography as="p" variant="bodySmall" className="text-red-600 dark:text-red-400" id="username-error">
                {usernameError}
              </Typography>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {text.passwordLabel}
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder={text.passwordPlaceholder}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-cyan-900"
              aria-invalid={Boolean(passwordError)}
              aria-describedby={passwordError ? 'password-error' : undefined}
              {...register('password')}
            />
            {passwordError ? (
              <Typography as="p" variant="bodySmall" className="text-red-600 dark:text-red-400" id="password-error">
                {passwordError}
              </Typography>
            ) : null}
          </div>

          {serverError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
              {serverError}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? text.signingIn : text.signIn}
          </button>
        </form>

        <Typography variant="muted" align="center" className="mt-6">
          {text.demoCredentials}
        </Typography>
      </section>
    </main>
  );
}

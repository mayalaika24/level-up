'use client';

import {useTranslations} from 'next-intl';
import {LoginFormView} from '@/features/auth/components/login-form-view';
import {useLoginForm} from '@/features/auth/hooks/use-login-form';

export function LoginForm() {
  const t = useTranslations();
  const {
    register,
    isSubmitting,
    serverError,
    usernameError,
    passwordError,
    onFormSubmit,
  } = useLoginForm();

  return (
    <LoginFormView
      text={{
        logoAlt: t('auth.logoAlt'),
        title: t('auth.title'),
        subtitle: t('auth.subtitle'),
        usernameLabel: t('auth.fields.username.label'),
        usernamePlaceholder: t('auth.fields.username.placeholder'),
        passwordLabel: t('auth.fields.password.label'),
        passwordPlaceholder: t('auth.fields.password.placeholder'),
        signIn: t('auth.actions.signIn'),
        signingIn: t('auth.actions.signingIn'),
        demoCredentials: t('auth.demoCredentials'),
      }}
      register={register}
      isSubmitting={isSubmitting}
      serverError={serverError}
      usernameError={usernameError}
      passwordError={passwordError}
      onFormSubmit={onFormSubmit}
    />
  );
}

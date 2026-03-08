'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useLocale, useTranslations} from 'next-intl';
import {loginSchema, type LoginFormValues} from '@/features/auth/lib/login-schema';
import {mockLogin} from '@/features/auth/lib/mock-auth';

export function useLoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    const result = await mockLogin(values);

    if (!result.ok) {
      setServerError(t(result.messageKey));
      return;
    }

    localStorage.setItem('mock_auth_token', result.token);
    localStorage.setItem('mock_user_name', result.user.name);
    router.push(`/${locale}/dashboard`);
  };

  const usernameError = errors.username
    ? t(errors.username.message ?? 'auth.validation.fallback')
    : undefined;
  const passwordError = errors.password
    ? t(errors.password.message ?? 'auth.validation.fallback')
    : undefined;

  return {
    register,
    isSubmitting,
    serverError,
    usernameError,
    passwordError,
    onFormSubmit: handleSubmit(onSubmit),
  };
}

import type {LoginFormValues} from './login-schema';
import {MOCK_USER} from '@/data/mock-auth-data';

type MockAuthSuccess = {
  ok: true;
  token: string;
  user: {
    id: string;
    name: string;
  };
};

type MockAuthError = {
  ok: false;
  messageKey: string;
};

type MockAuthResult = MockAuthSuccess | MockAuthError;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function mockLogin(values: LoginFormValues): Promise<MockAuthResult> {
  await sleep(700);

  const isValidUser =
    values.username.toLowerCase() === MOCK_USER.username &&
    values.password === MOCK_USER.password;

  if (!isValidUser) {
    return {
      ok: false,
      messageKey: 'auth.errors.invalidCredentials',
    };
  }

  return {
    ok: true,
    token: 'mock-jwt-token-for-dashboard',
    user: {
      id: '1',
      name: MOCK_USER.name,
    },
  };
}

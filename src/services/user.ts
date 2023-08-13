const USER_EMAIL_KEY_NAME = 'Email';

export const getUserEmail = (): string => {
  const userEmail = localStorage.getItem(USER_EMAIL_KEY_NAME);
  return userEmail ?? '';
};

export const saveUserEmail = (email: string) => {
  localStorage.setItem(USER_EMAIL_KEY_NAME, email);
};

export const dropUserEmail = (): void => {
  localStorage.removeItem(USER_EMAIL_KEY_NAME);
};

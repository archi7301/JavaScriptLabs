const profile = {
  id: 7,
  name: 'Ирина',
  settings: {
    theme: 'light',
    language: 'ru',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  },
};

const updatedProfile = {
  ...profile,
  name: 'Ирина Петрова',
  settings: {
    ...profile.settings,
    theme: 'dark',
    notifications: {
      ...profile.settings.notifications,
      push: false,
    },
  },
};
const data = {
  project: {
    info: {
      name: 'Digital Space',
      version: '2.4.0',
      authors: [
        {
          id: 1,
          profile: {
            name: 'Анна',
            contacts: {
              email: 'anna@example.com',
              social: {
                telegram: '@anna_dev',
              },
            },
          },
        },
        {
          id: 2,
          profile: {
            name: 'Иван',
            contacts: {
              email: 'ivan@example.com',
              social: {
                telegram: '@ivan_dev',
              },
            },
          },
        },
      ],
    },
    settings: {
      interface: {
        language: 'ru',
        theme: {
          name: 'dark',
          colors: {
            primary: '#6c5ce7',
          },
        },
      },
      features: {
        registration: true,
        notifications: true,
        analytics: false,
      },
    },
    statistics: {
      users: {
        total: 1250,
        activity: {
          today: 145,
          week: 684,
          month: 1027,
        },
      },
    },
  },
};


const {
  project: {
    info: {
      name: projectName, version,
      authors: [
        firstAuthor, ...otherAuthors
      ]
    },
    settings: {
      interface: {
        language,
        theme: {
          name: themeName,
          colors: {
            primary: primaryColor,
            secondary: secondaryColor = '#ffffff'
          }
        }
      },
      features: {
        registration,
        notifications
      }
    },
    statistics: {
      users: {
        total: totalUsers,
        activity: {
          today,
          week,
          month
        }
      }
    }
  }
} = data;

const {
  profile: {
    name: firstAuthorName,
    contacts: {
      email,
      social: {
        telegram
      }
    }
  }
} = firstAuthor;

console.log(projectName);       // Digital Space
console.log(version);           // 2.4.0
console.log(firstAuthorName);   // Анна
console.log(email);             // anna@example.com
console.log(telegram);          // @anna_dev

console.log(language);          // ru
console.log(themeName);         // dark
console.log(primaryColor);      // #6c5ce7
console.log(secondaryColor);    // #ffffff

console.log(registration);      // true
console.log(notifications);     // true

console.log(totalUsers);        // 1250
console.log(today);             // 145
console.log(week);              // 684
console.log(month);             // 1027
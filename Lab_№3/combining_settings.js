const defaultSettings = { theme: 'light', language: 'ru', pageSize: 10 };
const userSettings = { theme: 'dark', pageSize: 20 };
const sessionSettings = { language: 'en' };

function mergeSettings(...objects) 
{
  return Object.assign({}, ...objects);
}

const result = mergeSettings(defaultSettings, userSettings, sessionSettings);

console.log(result);
console.log(mergeSettings()); 
console.log(defaultSettings.theme); 
function reverseOnlyEnglish(str) {
  const lettersOnly = str.replace(/[^a-zA-Z]/g, '');
  
  return lettersOnly.split('').reverse().join('');
}

console.log(reverseOnlyEnglish("Привет! Hello, World! 123"));
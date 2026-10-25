function analyzeEventTitle(title) 
{
  const words = title.trim().split(' ').filter(word => word !== '');

  if (words.length === 0) {
    return {
      wordCount: 0,
      longestWord: '',
      averageLength: 0
    };
  }

  let longestWord = '';
  let totalLength = 0;

  for (const word of words) {
    totalLength += word.length;
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }

  const averageLength = totalLength / words.length;

  return {
    wordCount: words.length,
    longestWord: longestWord,
    averageLength: averageLength
  };
}

console.log(analyzeEventTitle('   JavaScript  for  modern  interfaces   '));

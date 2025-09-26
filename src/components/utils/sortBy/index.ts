type CharIndexMap = Map<string, number>;

const hungarianAlphabet = [
  "a",
  "á",
  "b",
  "c",
  "cs",
  "d",
  "dz",
  "dzs",
  "e",
  "é",
  "f",
  "g",
  "gy",
  "h",
  "i",
  "í",
  "j",
  "k",
  "l",
  "ly",
  "m",
  "n",
  "ny",
  "o",
  "ó",
  "ö",
  "ő",
  "p",
  "q",
  "r",
  "s",
  "sz",
  "t",
  "ty",
  "u",
  "ú",
  "ü",
  "ű",
  "v",
  "w",
  "x",
  "y",
  "z",
  "zs",
];

const createAlphabetMap = () => {
  const alphabetMap = new Map<string, number>();
  hungarianAlphabet.forEach((char, index) => {
    alphabetMap.set(char, index);
  });
  return alphabetMap;
};

const alphabetMap = createAlphabetMap();
const getCharValue = (char: string, map: CharIndexMap): number => {
  return map.get(char) ?? Number.MAX_SAFE_INTEGER;
};

const digraphs = ["dzs", "dz", "cs", "gy", "ly", "ny", "sz", "ty", "zs"];

const getWordValue = (word: string, map: CharIndexMap): number[] => {
  const values: number[] = [];
  let i = 0;
  const lowerWord = word.toLocaleLowerCase();
  while (i < lowerWord.length) {
    let found = false;
    for (const dg of digraphs) {
      if (lowerWord.startsWith(dg, i)) {
        values.push(getCharValue(dg, map));
        i += dg.length;
        found = true;
        break;
      }
    }
    if (!found) {
      values.push(getCharValue(lowerWord[i], map));
      i++;
    }
  }
  return values;
};

export const sortWordsByHungarianAlphabet = (words: string[]): string[] => {
  return words
    .map((w) => w.toLocaleLowerCase())
    .sort((a, b) => {
      const aValues = getWordValue(a, alphabetMap);
      const bValues = getWordValue(b, alphabetMap);
      const minLength = Math.min(aValues.length, bValues.length);

      for (let i = 0; i < minLength; i++) {
        if (aValues[i] !== bValues[i]) {
          return aValues[i] - bValues[i];
        }
      }
      return aValues.length - bValues.length;
    });
};

export default sortWordsByHungarianAlphabet;

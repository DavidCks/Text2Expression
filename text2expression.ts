import {
  TextToIPA,
  TextToIPAType,
  IPAWordType,
} from "./informath/text-to-ipa/index";
import {
  VRMMouthExpression,
  characterDuration,
  ipa2mouth,
  pauseDuration,
  wordBreakDuration,
} from "./ipa2VRMMouthExpression";

export type T2IPASupportedLanguages = "en" | "ipa";

export interface IPATextExpressions {
  text: string;
  duration: number;
  all: VRMMouthExpression[];
}

/** takes any text in a supported language and converts it into an IPATextExpressions.
 *
 * @example
 * 'Hi, how are you today' =>
 * {
 *  number duration: 1257.3 //(in ms)
 *  string text: 'hajˈ . hawˈ ɑˈɹ juˈ tʌdejˈ'
 *  VRMMouthExpression[] all: ...
 * }
 */
export async function text2expression(
  text: string,
  lang: T2IPASupportedLanguages = "ipa",
  ipaDictPath: string | undefined = undefined
): Promise<IPATextExpressions> {
  if (lang !== "ipa" && ipaDictPath === undefined) {
    throw new Error(
      `You need to provide a path to an ipa dictionary for your specified language (${lang}) if you want to use anything other than ipa. Refer to the README.md file of this package (text2expression) for more info.`
    );
  }
  switch (lang) {
    case "en":
      const ipaStr = await en2ipa(text, ipaDictPath as string);
      const expressions = ipa2mouth(ipaStr);
      return {
        text: ipaStr,
        duration: estimateIPARuntime(ipaStr),
        all: expressions,
      };
    default:
      return {
        text: text,
        duration: estimateIPARuntime(text),
        all: ipa2mouth(text),
      };
  }
}

/**
 * takes in an ipa string in a space-delimetered word format with dots indicating pauses
 *
 * @example
 * 'hajˈ . hawˈ ɑˈɹ juˈ tʌdejˈ' => 1257.3 //(in ms)
 */
function estimateIPARuntime(ipa: string): number {
  const ipaStrs = ipa.split(" ");
  const wordCount = ipaStrs.length;
  let characterCount = 0;
  let pauseCount = 0;

  for (let i = 0; i < ipaStrs.length; i++) {
    const ipaStr = ipaStrs[i];
    if (ipaStr === ".") {
      pauseCount++;
    } else {
      characterCount += ipaStr.length;
    }
  }
  const estimate =
    wordCount * wordBreakDuration +
    characterCount * characterDuration +
    pauseCount * pauseDuration;
  return estimate * 1.1;
}

let en2ipaUtil: TextToIPAType;
/** takes in any english text and converts it into a normalized ipa text.
 *
 * breaks are indicated by " . "
 *
 * @example
 * 'Hi, how are you today' =>
 * 'hajˈ . hawˈ ɑˈɹ juˈ tʌdejˈ'
 */
async function en2ipa(text: string, ipaDictPath: string) {
  if (!en2ipaUtil) {
    en2ipaUtil = new TextToIPA(ipaDictPath);
  }
  const words = text.split(" ").filter((word) => word !== "");
  const normalizedWords = normalizeSpecialCharacters(words);
  const ipas = [];
  for (let i = 0; i < normalizedWords.length; i++) {
    const word = normalizedWords[i];
    const ipaWord: IPAWordType = await en2ipaUtil.lookup(word);
    const ipa = ipaWord.text.split(" ")[0];
    ipas.push(ipa);
  }
  const convertedText = ipas.join(" ");
  return convertedText;
}

/**
 * Normalizes an array of strings by removing special characters and managing spaces.
 * Replaces certain special characters with words or punctuation, and ensures punctuation
 * is followed by spaces. Additionally, it removes non-alphanumeric characters except
 * for allowed punctuation.
 *
 * @param {string[]} strings - The array of strings to normalize.
 * @returns {string[]} An array of normalized strings with special characters replaced
 * and additional spaces added before punctuation.
 */
function normalizeSpecialCharacters(strings: string[]): string[] {
  const regex = /[^a-zA-Z0-9.!?;:]/g; // Regular expression to match non-alphanumeric characters
  const newList: string[] = [];
  // Iterate through each string and remove special characters
  strings.forEach((str) => {
    const newStrs = addSpaceBeforeSpecials(
      str
        .replace("&", "and")
        .replace("=", "equals")
        .replace(",", " .")
        .replace(".", " .")
        .replace(regex, "")
    ).split(" ");
    newStrs.forEach((newStr) => {
      if (
        newStr === "" &&
        newList.length > 0 &&
        newList[newList.length - 1] === ""
      ) {
        return;
      }
      newList.push(newStr);
    });
  });

  const newReducedList = newList.map((str) =>
    /\w/.test(str) ? str.replace(/\W+/, "") : ""
  );

  return replaceConsecutiveEmptyItems(newReducedList);
}

/**
 * Filters out consecutive empty strings from an array. It ensures no two empty strings
 * are adjacent by replacing consecutive empty strings with a single period unless
 * it follows a non-empty string.
 *
 * @param {string[]} inputList - The array of strings to filter.
 * @returns {string[]} The filtered array with consecutive empty items replaced by periods.
 */
function replaceConsecutiveEmptyItems(inputList: string[]): string[] {
  // Filter out consecutive empty items
  const filteredList = inputList.filter((item, index, array) => {
    // Keep the item if it's not empty or if the previous item is not empty
    return item !== "" || (index > 0 && array[index - 1] !== "");
  });

  return filteredList.map((v) => (v !== "" ? v : "."));
}

/**
 * Adds a space before any special punctuation characters within a string.
 * If the resulting string does not contain any alphanumeric characters, it returns
 * a period. Otherwise, it returns the modified string.
 *
 * @param {string} inputString - The string to process for special characters.
 * @returns {string} The processed string with spaces added before punctuation.
 */
function addSpaceBeforeSpecials(inputString: string): string {
  // Define the regex pattern
  const pattern = /[,.\!?;:]/;

  // Find the first match in the input string
  const match = inputString.search(pattern);

  // If a match is found, insert a space before it
  if (match !== -1) {
    const modifiedString =
      inputString.slice(0, match) + " " + inputString.slice(match);
    if (!/\w/.test(modifiedString)) {
      return ".";
    } else {
      return modifiedString;
    }
  } else {
    // If no match is found, return the original string
    return inputString;
  }
}

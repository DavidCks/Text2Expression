# text2expression

The text2expression function tries to estimate mouth positions of a VRM model based on a given text. It provides you with the estimated runtime of an audio file that may be created based on the text and an array of VRM Mouth Expressions, containing the values for the expressions of "a", "i", "u", "e" and "o" as well as the duration for which each expression should last.

Example usage:

```javascript

import { text2expression } from 'text2expression-package';

async function convertTextToExpression() {
  try {
    const expressions = await text2expression('Hi, how are you today', 'en', 'path/to/your/ipaDict.txt');
    console.log(ipaExpressions);
    /*
    Output will be:
    {
      duration: 1257.3, // in milliseconds
      text: 'hajˈ . hawˈ ɑˈɹ juˈ tʌdejˈ',
      all: [...], // VRMMouthExpression array
    }
    */
  } catch (error) {
    console.error(error);
  }
}

convertTextToExpression();

```

## IPA Dict
You can supply a path to an IPA Dictionary and specify your source language if you want.
The dictionary should be a simple text file containing tab-separated {source-language} <=> ipa list like so:

absolute  æˈbsʌluˌt
absolutely  æˌbsʌluˈtli
absoluteness  æˈbsʌluˌtnʌs
...

You can find some dictionaries here:
<https://github.com/open-dict-data/>

be sure to remove the "/" at the start and the end of the ipa strings.

An english <-> IPA dictionary is included inside this repository under "informath/text-to-ipa/ipadict.txt"

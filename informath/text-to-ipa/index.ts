// text-to-ipa.ts

export interface IPAWordType {
  error: string | null;
  text: string;
}

export interface TextToIPAType {
  loadDict(): Promise<void>;
  lookup(word: string): Promise<IPAWordType>;
}

export class TextToIPA {
  private dictLoaded: boolean = false;
  private _IPADict: { [key: string]: string } = {};
  private filepath: string;

  constructor(filepath: string) {
    this.filepath = filepath;
  }

  private _parseDict(lines: string[]) {
    for (const line of lines) {
      const arr = line.split(/\s+/g);
      this._IPADict[arr[0]] = arr[1];
    }
  }

  public async loadDict(): Promise<void> {
    try {
      const response = await fetch(this.filepath);
      const data = await response.text();
      this.dictLoaded = true;
      this._parseDict(data.split("\n"));
    } catch (error) {
      console.error("TextToIPA Error:", error);
    }
  }

  public async lookup(word: string): Promise<IPAWordType> {
    if (!this.dictLoaded) {
      await this.loadDict();
    }
    return this._performLookup(word.toLowerCase());
  }

  private _performLookup(word: string): IPAWordType {
    if (typeof this._IPADict[word] !== "undefined") {
      let text = this._IPADict[word];

      for (let i = 1; i < 4; i++) {
        const variantKey = `${word}(${i})`;
        if (typeof this._IPADict[variantKey] !== "undefined") {
          text += ` OR ${this._IPADict[variantKey]}`;
        } else {
          break;
        }
      }

      const ipaWord: any = new (IPAWord as any)(null, text);
      return ipaWord as IPAWordType;
    } else {
      return new (IPAWord as any)("Word not found", word) as IPAWordType;
    }
  }
}
// Create a constructor for an IPAWord
function IPAWord(error: string | null, text: string): IPAWordType {
  return { error: error, text: text };
}

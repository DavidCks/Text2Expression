import exp from "constants";

export const pauseDuration = 270,
  wordBreakDuration = 12,
  characterDuration = 40.05;

export type VRMMouthExpression = {
  duration: number;
  aa: number;
  ee: number;
  ih: number;
  oh: number;
  ou: number;
};

export const emptyVRMMouthExpression = (dur: number): VRMMouthExpression => {
  return {
    duration: dur,
    aa: 0,
    ee: 0,
    ih: 0,
    oh: 0,
    ou: 0,
  };
};

export function ipa2mouth(ipa: string): VRMMouthExpression[] {
  const expressions: VRMMouthExpression[] = [];
  for (let i = 0; i < ipa.length; i++) {
    const char = ipa.charAt(i);
    const expression = ipa2mouthMap[char];
    if (expression) {
      if (expression.duration) {
        expressions.push(expression);
      } else {
        expressions.push({ duration: characterDuration, ...expression });
      }
    } else {
      expressions.push(emptyVRMMouthExpression(characterDuration));
    }
  }
  return expressions;
}

const ipa2mouthMap = {
  " ": emptyVRMMouthExpression(wordBreakDuration),
  ".": emptyVRMMouthExpression(pauseDuration),
  i: { aa: 0.22, ee: 0, ih: 1, oh: 0, ou: 0 },
  y: { aa: 0, ee: 0, ih: 0, oh: 0.25, ou: 1 },
  ɨ: { aa: 0, ee: 41, ih: 1, oh: 0, ou: 0 },
  ʉ: { aa: 0, ee: 0, ih: 0, oh: 0.16, ou: 1 },
  ɯ: { aa: 0, ee: 0.09, ih: 0, oh: 0.07, ou: 0.03 },
  u: { aa: 0, ee: 0, ih: 0, oh: 0.27, ou: 1 },
  ɪ: { aa: 0, ee: 1, ih: 0, oh: 0, ou: 0 },
  ʊ: { aa: 0.28, ee: 0, ih: 0, oh: 0, ou: 0.44 },
  e: { aa: 0, ee: 1, ih: 57, oh: 0, ou: 0 },
  ø: { aa: 0, ee: 1, ih: 0, oh: 0.15, ou: 0.21 },
  ɤ: { aa: 0, ee: 0.5, ih: 0, oh: 0, ou: 0 },
  o: { aa: 0, ee: 0, ih: 0, oh: 1, ou: 0 },
  ə: { aa: 0.51, ee: 0.23, ih: 0.34, oh: 0, ou: 0.11 },
  ɛ: { aa: 0.65, ee: 0.24, ih: 0.82, oh: 0, ou: 0 },
  œ: { aa: 0.43, ee: 0.22, ih: 0, oh: 0.53, ou: 0 },
  ʌ: { aa: 0.79, ee: 0, ih: 0, oh: 0.27, ou: 0 },
  ɔ: { aa: 0, ee: 0, ih: 0.41, oh: 1, ou: 0 },
  æ: { aa: 0.57, ee: 0.45, ih: 0.31, oh: 0, ou: 0 },
  a: { aa: 1, ee: 0, ih: 0, oh: 0.26, ou: 0 },
  ɶ: { aa: 0.5, ee: 0, ih: 0, oh: 0, ou: 0.18 },
  ɑ: { aa: 0, ee: 0.63, ih: 0, oh: 0, ou: 0 },
  ɒ: { aa: 0.38, ee: 0, ih: 0, oh: 0.56, ou: 0.27 },
  p: { aa: 0, ee: 0, ih: 0, oh: 0, ou: 0 },
  b: { aa: 0, ee: 0, ih: 0, oh: 0, ou: 0 },
  t: { aa: 0, ee: 0, ih: 0, oh: 0, ou: 0.33 },
  d: { aa: 0, ee: 0, ih: 0, oh: 0, ou: 0.33 },
  ʈ: { aa: 0.28, ee: 0, ih: 0, oh: 0.24, ou: 0.27 },
  ɖ: { aa: 0.28, ee: 0, ih: 0, oh: 0.24, ou: 0.27 },
  c: { aa: 0.28, ee: 0, ih: 0.23, oh: 0.13, ou: 0.18 },
  ɟ: { aa: 0.13, ee: 0, ih: 0.15, oh: 0.07, ou: 0.12 },
  k: { aa: 0.37, ee: 0, ih: 0, oh: 0, ou: 0.29 },
  ɡ: { aa: 0.08, ee: 0, ih: 0, oh: 0.19, ou: 0 },
  q: { aa: 0.08, ee: 0, ih: 0, oh: 0.19, ou: 0 },
  ɢ: { aa: 0.08, ee: 0, ih: 0, oh: 0.19, ou: 0 },
  ʔ: { aa: 0.15, ee: 0, ih: 0, oh: 0.15, ou: 0 },
  m: { aa: 0, ee: 0, ih: 0, oh: 0, ou: 0 },
  ɱ: { aa: 0, ee: 0, ih: 0, oh: 0.03, ou: 0.08 },
  n: { aa: 0, ee: 0, ih: 0, oh: 0.03, ou: 0.41 },
  ɳ: { aa: 0, ee: 0, ih: 0, oh: 0.03, ou: 0.88 },
  ɲ: { aa: 0, ee: 0, ih: 0, oh: 0.02, ou: 0.74 },
  ŋ: { aa: 0, ee: 0, ih: 0, oh: 0, ou: 0.53 },
  ɴ: { aa: 0, ee: 0, ih: 0, oh: 0, ou: 0.38 },
  ʙ: { aa: 0, ee: 0, ih: 0, oh: 0.15, ou: 0.52 },
  r: { aa: 0, ee: 0, ih: 0, oh: 0, ou: 0.38 },
  ʀ: { aa: 0.16, ee: 0, ih: 0, oh: 0.06, ou: 0.71 },
  ⱱ: { aa: 0.16, ee: 0.05, ih: 0.06, oh: 0, ou: 0 },
  ɾ: { aa: 0.05, ee: 0, ih: 0.14, oh: 0.11, ou: 0.14 },
  ɽ: { aa: 0.09, ee: 0, ih: 0, oh: 0.09, ou: 0.44 },
  ɸ: { aa: 0, ee: 0, ih: 0, oh: 0, ou: 0.45 },
  β: { aa: 0, ee: 0, ih: 0, oh: 0, ou: 0.34 },
  f: { aa: 0, ee: 0, ih: 0, oh: 0.05, ou: 0.35 },
  v: { aa: 0, ee: 0, ih: 0, oh: 0, ou: 0.31 },
  θ: { aa: 0, ee: 0.07, ih: 0.27, oh: 0, ou: 0.47 },
  ð: { aa: 0.03, ee: 0, ih: 0.19, oh: 0, ou: 0.3 },
  s: { aa: 0, ee: 0, ih: 0.85, oh: 0, ou: 0.12 },
  z: { aa: 0, ee: 0, ih: 0.46, oh: 0, ou: 0.3 },
  ʃ: { aa: 0, ee: 0.16, ih: 0.4, oh: 0, ou: 0.51 },
  ʒ: { aa: 0.05, ee: 0.08, ih: 0.39, oh: 0, ou: 0.42 },
  ʂ: { aa: 0, ee: 0, ih: 0.49, oh: 0.1, ou: 0.05 },
  ʐ: { aa: 0, ee: 0, ih: 1, oh: 0.05, ou: 0.17 },
  ç: { aa: 0, ee: 0.16, ih: 1, oh: 0, ou: 0.18 },
  ʝ: { aa: 0, ee: 0.17, ih: 1, oh: 0, ou: 0.28 },
  x: { aa: 0.23, ee: 0, ih: 0.21, oh: 0, ou: 0 },
  ɣ: { aa: 0.11, ee: 0, ih: 0.2, oh: 0, ou: 0.15 },
  χ: { aa: 0, ee: 0.2, ih: 0, oh: 0.18, ou: 0.46 },
  ʁ: { aa: 0, ee: 0, ih: 0.55, oh: 0, ou: 0.4 },
  ħ: { aa: 0.07, ee: 0, ih: 0, oh: 0.16, ou: 0.32 },
  ʕ: { aa: 0, ee: 0, ih: 0.16, oh: 0, ou: 0.44 },
  h: { aa: 0.26, ee: 0, ih: 0, oh: 0.17, ou: 0 },
  ɦ: { aa: 0, ee: 0, ih: 0, oh: 0.28, ou: 0 },
  ɬ: { aa: 0, ee: 0.19, ih: 0.42, oh: 0, ou: 0.3 },
  ɮ: { aa: 0, ee: 0.19, ih: 0.3, oh: 0, ou: 0.26 },
  ʋ: { aa: 0, ee: 0, ih: 0, oh: 0, ou: 0.14 },
  ɹ: { aa: 0, ee: 0.08, ih: 0, oh: 0.1, ou: 0.09 },
  ɻ: { aa: 0, ee: 0, ih: 0, oh: 0.22, ou: 0.22 },
  j: { aa: 0.11, ee: 0, ih: 0.94, oh: 0, ou: 0 },
  ɰ: { aa: 0, ee: 0.15, ih: 0.21, oh: 0, ou: 0 },
  l: { aa: 0.01, ee: 0.22, ih: 0.08, oh: 0, ou: 0 },
  ɭ: { aa: 0.1, ee: 0.34, ih: 0.24, oh: 0, ou: 0 },
  ʎ: { aa: 0.02, ee: 0.24, ih: 0.22, oh: 0, ou: 0 },
  ʟ: { aa: 0, ee: 0.25, ih: 0.0, oh: 0, ou: 0 },
  ʘ: { aa: 0, ee: 0.0, ih: 0.0, oh: 0, ou: 0.14 },
  ɓ: { aa: 0, ee: 0.0, ih: 0.0, oh: 0, ou: 0 },
  ǀ: { aa: 0, ee: 0.0, ih: 0.0, oh: 0, ou: 0.27 },
  ɗ: { aa: 0, ee: 0.09, ih: 0.1, oh: 0, ou: 0.28 },
  ǃ: { aa: 0, ee: 0.0, ih: 0.04, oh: 0.09, ou: 0.06 },
  ʄ: { aa: 0, ee: 0.0, ih: 0.42, oh: 0, ou: 0.35 },
  ǂ: { aa: 0, ee: 0.0, ih: 0.57, oh: 0.15, ou: 0.07 },
  ɠ: { aa: 0.09, ee: 0.0, ih: 0.0, oh: 0.11, ou: 0 },
  ǁ: { aa: 0, ee: 0.0, ih: 0.0, oh: 0.15, ou: 0.19 },
  ʛ: { aa: 0, ee: 0.13, ih: 0.0, oh: 0.15, ou: 0.03 },
  ʍ: { aa: 0, ee: 0.0, ih: 0.0, oh: 0.25, ou: 0.34 },
  ʑ: { aa: 0, ee: 0.3, ih: 0.22, oh: 0.0, ou: 0.0 },
  ɕ: { aa: 0, ee: 0.31, ih: 0.34, oh: 0.0, ou: 0.0 },
  w: { aa: 0, ee: 0.0, ih: 0.0, oh: 0.0, ou: 1 },
  ɺ: { aa: 0, ee: 0.08, ih: 0.18, oh: 0.0, ou: 0.19 },
  ɥ: { aa: 0, ee: 0, ih: 0, oh: 0.22, ou: 0.86 },
  ɧ: { aa: 0, ee: 0, ih: 0, oh: 0.22, ou: 0.27 },
  ʜ: { aa: 0, ee: 0, ih: 0, oh: 0.16, ou: 0.23 },
  ʢ: { aa: 0, ee: 0, ih: 0, oh: 0.16, ou: 0.17 },
  ʡ: { aa: 0, ee: 0, ih: 0, oh: 0.13, ou: 0.16 },
  //VRM Model Reference: https://vrm-viewer-48655.web.app/
  //IPA Reference: https://www.seeingspeech.ac.uk/ipa-charts/
} as const;

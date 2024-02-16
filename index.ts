// index.ts
export { text2expression } from "./text2expression";

export type {
  T2IPASupportedLanguages,
  IPATextExpressions,
} from "./text2expression";

export type { VRMMouthExpression } from "./ipa2VRMMouthExpression";

export {
  pauseDuration,
  wordBreakDuration,
  characterDuration,
  ipa2mouth,
  emptyVRMMouthExpression,
} from "./ipa2VRMMouthExpression";

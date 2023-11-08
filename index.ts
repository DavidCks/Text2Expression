// index.ts
export { text2expression } from "./text2expression";

export type {
  T2IPASupportedLanguages,
  IPATextExpressions,
} from "./text2expression";

export type {
  VRMMouthExpression,
  emptyVRMMouthExpression,
  ipa2mouth,
} from "./ipa2VRMMouthExpression";

export {
  pauseDuration,
  wordBreakDuration,
  characterDuration,
} from "./ipa2VRMMouthExpression";

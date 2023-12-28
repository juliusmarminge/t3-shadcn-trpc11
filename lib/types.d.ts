/**
 * New Config System for ESLint "requires" better type definitions.
 * Since the ecosystem is still in transition, we'll define some ourselves.
 */

declare module "eslint-config-prettier" {
  import type { Rule } from "eslint";
  export const rules: Record<string, Rule>;
}

declare module "eslint-plugin-import" {
  import type { Rule } from "eslint";
  export const rules: Record<string, Rule>;
}

declare module "@typescript-eslint/eslint-plugin" {
  import type { ClassicConfig } from "@typescript-eslint/utils/ts-eslint";
  type Configs =
    | "all"
    | "base"
    | "disable-type-checked"
    | "eslint-recommended"
    | "recommended"
    | "recommended-type-checked"
    | "strict"
    | "strict-type-checked"
    | "stylistic"
    | "stylistic-type-checked";
  export const configs: Record<Configs, ClassicConfig.Config>;
}

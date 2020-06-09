// Type definitions for redux-allow-deny
// Definitions by: rnsloan https://github.con/rnsloan

import * as Redux from "redux";

export function allowlist(
  actions: string[],
  callback: () => void
): Redux.Middleware;
export function denylist(
  actions: string[],
  callback: () => void
): Redux.Middleware;

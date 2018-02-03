// Type definitions for redux-white-black
// Definitions by: rnsloan https://github.con/rnsloan

import * as Redux from "redux";

export function whitelist(
  actions: string[],
  callback: () => void
): Redux.Middleware;
export function blacklist(
  actions: string[],
  callback: () => void
): Redux.Middleware;

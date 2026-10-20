import { defineRouting } from "next-intl/routing";

// Adding a language = add its code here + messages/<code>.json.
export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

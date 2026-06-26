"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

/**
 * Static path to the terms-of-use document served from the public directory.
 * The corresponding HTML file is expected at `public/policies/terms-of-use.html`.
 */
const TERMS_OF_USE_HREF = "/policies/terms-of-use.html";

/**
 * Static path to the privacy-policy document served from the public directory.
 * The corresponding HTML file is expected at `public/policies/privacy-policy.html`.
 */
const PRIVACY_POLICY_HREF = "/policies/privacy-policy.html";

type PolicyLinksProps = {
  /**
   * next-intl translation namespace used to resolve the agreement text parts:
   * `agreePrefix`, `userAgreement`, `agreeConjunction`, `privacyPolicy`,
   * `agreeSuffix`. The link labels (`userAgreement`, `privacyPolicy`) are also
   * reused by other policy-related UI.
   */
  namespace: string;
  className?: string;
};

/**
 * Renders the "by continuing you agree to our policies" notice with inline
 * links that open the terms-of-use and privacy-policy pages in a new tab.
 *
 * The surrounding text is split into translatable parts so each locale can
 * control its own punctuation (e.g. Chinese uses 《》 around link labels).
 */
export function PolicyLinks({ namespace, className }: PolicyLinksProps) {
  const t = useTranslations(namespace);

  return (
    <p className={cn("text-center text-xs leading-5 text-muted-foreground", className)}>
      {t("agreePrefix")}
      <a
        href={TERMS_OF_USE_HREF}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
      >
        {t("userAgreement")}
      </a>
      {t("agreeConjunction")}
      <a
        href={PRIVACY_POLICY_HREF}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
      >
        {t("privacyPolicy")}
      </a>
      {t("agreeSuffix")}
    </p>
  );
}

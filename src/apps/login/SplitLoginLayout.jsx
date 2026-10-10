import { Box, Link } from "@mui/material";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  ISTO_PRIMARY,
  CTA_LIGHT_BG,
  CTA_LIGHT_GRAD_GREEN,
  CTA_LIGHT_GRAD_CREAM,
  CTA_LIGHT_BORDER,
  RP_TEXT,
  RP_TEXT_SOFT,
  CHIP_UPGRADING_TEXT,
  RULE_LIGHT,
  GOLD_BRIGHT,
  GOLD_DEEP,
} from "./colors";

// Shared responsive breakpoints for the login shell. Single-sourced here so the
// short-viewport tuning in both columns (and CandidateLoginForm) stays in sync.
export const SHORT_VP = "@media (max-height:700px)";
const TALL_VP = "@media (min-height:700px)";
const SHORT_VP_TALLISH = "@media (max-height:700px) and (min-height:561px)";
// Compact CTA panel for ~125%+ zoom on laptop screens, so the whole panel
// fits above the fold in every locale.
const COMPACT_VP = "@media (max-height:600px)";
const HEADER_H = 64; // fixed app header (sm+)
// Footer wraps to 2 lines on narrow md widths in long locales (ru).
const NARROW_MD = "@media (max-width:1023px)";

/**
 * SplitLoginLayout — two-column login shell with a left-column slot (passed
 * as `children`) and an optional marketing CTA panel on the right (topbar +
 * announcement + standards card + stats + tagline + footer).
 *
 * The left column is a slot so callers can pass their own form component —
 * the portal passes <CandidateLoginForm>, but this layout does not reach into
 * the form itself. DefaultLoginForm stays untouched for the exam repo.
 *
 * All user-facing copy in the CTA panel + footer is driven by i18n keys
 * passed via props. Brand/standard identifiers (e.g. "ISO 9001") are passed
 * as plain strings because they are identical across locales.
 *
 * If `ctaPanel` is omitted the right side is not rendered and the form is
 * centered — the safe fallback for narrow viewports.
 */
export const SplitLoginLayout = ({
  children,
  ctaPanel,
  footer,
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={styles.root}>
      <Box sx={[styles.split, !ctaPanel && styles.splitCentered]}>
        <Box sx={styles.loginSide}>
          <Box sx={styles.loginFormWrap}>{children}</Box>
        </Box>

        {ctaPanel && <CtaPanel ctaPanel={ctaPanel} />}
      </Box>

      {footer && <PageFooter footer={footer} t={t} />}
    </Box>
  );
};

const CtaPanel = ({ ctaPanel }) => {
  const { t } = useTranslation();
  const {
    eyebrowKey,
    headlineKey,
    headlineAccentKey,
    announcement,
    standardsList,
    stats = [],
    taglineKey,
    taglineAccentKey,
  } = ctaPanel;

  return (
    <Box sx={styles.ctaSide}>
      <Box sx={styles.ctaContent}>
        {eyebrowKey && <Box sx={styles.ctaEyebrow}>{t(eyebrowKey)}</Box>}
        {headlineKey && (
          <Box component="h2" sx={styles.ctaHeadline}>
            {t(headlineKey)}
            {headlineAccentKey && (
              <>
                <br />
                <Box component="span" sx={styles.headlineAccent}>{t(headlineAccentKey)}</Box>
              </>
            )}
          </Box>
        )}

        {announcement && (
          <Box component="p" sx={styles.announcement}>
            <Trans
              i18nKey={announcement.textKey}
              values={announcement.values}
              components={{ b: <Box component="b" sx={styles.announcementCode} /> }}
            />
          </Box>
        )}

        {standardsList && (
          <>
            <Box sx={styles.spacerSm} />
            <StandardsCard standardsList={standardsList} t={t} />
          </>
        )}

        {stats.length > 0 && (
          <>
            <Box sx={styles.spacerMd} />
            <Box sx={styles.proofBar}>
              {stats.map((stat) => (
                <Box key={stat.labelKey} sx={styles.proofItem}>
                  <Box sx={styles.proofNum}>{stat.num}</Box>
                  <Box sx={styles.proofLabel}>{t(stat.labelKey)}</Box>
                </Box>
              ))}
            </Box>
          </>
        )}

        {taglineKey && (
          <>
            <Box sx={styles.spacerLg} />
            <Box sx={styles.ctaTagline}>
              {t(taglineKey)}
              {taglineAccentKey && (
                <>
                  <Box component="span" sx={styles.taglineSep}>·</Box>
                  <Box component="span" sx={styles.taglineAccent}>{t(taglineAccentKey)}</Box>
                </>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

const StandardsCard = ({ standardsList, t }) => {
  const { headingKey, newBadgeKey, items = [] } = standardsList;
  return (
    <Box sx={styles.standardsCard}>
      {headingKey && (
        <Box component="h4" sx={styles.standardsHeading}>{t(headingKey)}</Box>
      )}
      <Box component="ul" sx={styles.standardsRows}>
        {items.map((item) => (
          <Box component="li" key={item.code} sx={styles.standardsRow}>
            <Box component="span" sx={styles.standardsCode}>
              {item.code}
              {item.edition}
            </Box>
            {item.isNew && newBadgeKey && (
              <Box component="span" sx={styles.newEditionPill}>{t(newBadgeKey)}</Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const PageFooter = ({ footer, t }) => (
  <Box sx={styles.footer}>
    <Box sx={styles.footerLinks}>
      {footer.links?.map((link) => (
        <Link
          key={link.labelKey}
          href={link.href}
          underline="none"
          sx={{
            fontSize: 10,
            color: "#9AA0A6",
          }}
        >
          {t(link.labelKey)}
        </Link>
      ))}
    </Box>
    {footer.copyKey && (
      <Box sx={styles.footerCopy}>
        {footer.seal && (
          <Box component="span" sx={styles.footerSeal}>
            <Box component="b" sx={styles.footerSealNum}>25</Box>
          </Box>
        )}
        {t(footer.copyKey)}
      </Box>
    )}
  </Box>
);

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    // Clear the app's fixed top header (position:fixed, 64px) so login content
    // never sits under it. box-sizing:border-box keeps total height = 100dvh.
    boxSizing: "border-box",
    pt: { xs: "56px", sm: "64px" },
    minHeight: "100dvh",
  },
  split: {
    display: "flex",
    flex: 1,
  },
  splitCentered: {
    justifyContent: "center",
  },
  loginSide: {
    flex: 1,
    display: "flex",
    // Top-align so the form's first line lines up with the CTA panel's first
    // line at every zoom (shared top offset below).
    alignItems: "flex-start",
    justifyContent: "center",
    px: { xs: "20px", sm: "32px", md: "48px" },
    pt: { xs: "32px", md: "56px" },
    pb: { xs: "24px", md: "48px" },
    [SHORT_VP]: { pt: "24px", pb: "12px" },
    [SHORT_VP_TALLISH]: { pt: "44px" },
    bgcolor: "#fff",
  },
  loginFormWrap: {
    width: "100%",
    maxWidth: 380,
  },
  ctaSide: {
    width: 445,
    flexShrink: 0,
    display: { xs: "none", md: "flex" },
    flexDirection: "column",
    // Top-align to the SAME top offset as the form column so both panels'
    // first line sits on the same horizon at every zoom level.
    justifyContent: "flex-start",
    px: "48px",
    pt: { xs: "32px", md: "56px" },
    pb: { xs: "24px", md: "48px" },
    [SHORT_VP]: { pt: "24px", pb: "12px" },
    [SHORT_VP_TALLISH]: { pt: "44px" },
    position: "relative",
    overflow: "hidden",
    color: RP_TEXT,
    background: `radial-gradient(at 4% 2%, ${CTA_LIGHT_GRAD_GREEN} 0%, transparent 40%), radial-gradient(at 98% 99%, ${CTA_LIGHT_GRAD_CREAM} 0%, transparent 44%), ${CTA_LIGHT_BG}`,
    borderLeft: `1px solid ${CTA_LIGHT_BORDER}`,
  },
  ctaEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: RP_TEXT_SOFT,
    mb: "14px",
    fontWeight: 700,
    alignSelf: "flex-start",
    zIndex: 1,
  },
  ctaHeadline: {
    fontSize: 23,
    fontWeight: 700,
    lineHeight: 1.16,
    letterSpacing: "-0.01em",
    mb: "6px",
    m: 0,
    [COMPACT_VP]: { fontSize: 19 },
    zIndex: 1,
  },
  headlineAccent: { color: ISTO_PRIMARY },
  // Sized to the visible viewport (minus header, footer and ctaSide padding)
  // so the spacers only grow into on-screen space, never past the fold when
  // the form column makes the panel taller. min-content keeps it from
  // squashing the content on short viewports.
  ctaContent: {
    "--footer-h": "33px",
    [NARROW_MD]: { "--footer-h": "52px" },
    display: "flex",
    flexDirection: "column",
    // viewport − header − footer − ctaSide padding (pt + pb per breakpoint)
    height: `calc(100dvh - ${HEADER_H}px - var(--footer-h) - 104px)`,
    [SHORT_VP]: { height: `calc(100dvh - ${HEADER_H}px - var(--footer-h) - 36px)` },
    [SHORT_VP_TALLISH]: { height: `calc(100dvh - ${HEADER_H}px - var(--footer-h) - 56px)` },
    minHeight: "min-content",
  },
  // Flexible gap between panel sections: grows into free panel height up to
  // its maxHeight, collapses to 0 when the viewport is tight.
  spacerSm: { flex: "1 1 0", minHeight: 0, maxHeight: 12 },
  spacerMd: { flex: "1 1 0", minHeight: 0, maxHeight: 40 },
  spacerLg: { flex: "1 1 0", minHeight: 0, maxHeight: 48 },
  announcement: {
    mt: "12px",
    mb: 0,
    [TALL_VP]: { mt: "16px" },
    [SHORT_VP]: { mt: "6px" },
    fontSize: 14,
    [COMPACT_VP]: { fontSize: 13 },
    fontWeight: 400,
    lineHeight: 1.4,
    color: RP_TEXT,
    zIndex: 1,
  },
  announcementCode: {
    fontWeight: 700,
    color: ISTO_PRIMARY,
    whiteSpace: "nowrap",
  },
  standardsCard: {
    mt: "12px",
    width: "fit-content",
    maxWidth: "100%",
    boxSizing: "border-box",
    bgcolor: "#fff",
    border: "1px solid rgba(12,63,38,0.08)",
    borderRadius: "8px",
    boxShadow: "0 1px 2px rgba(12,63,38,0.06), 0 10px 28px -12px rgba(12,63,38,0.22)",
    px: "14px",
    py: "12px",
    [SHORT_VP]: { mt: "8px", py: "8px" },
    [COMPACT_VP]: { py: "6px" },
    zIndex: 1,
  },
  standardsHeading: {
    fontSize: 11,
    fontWeight: 700,
    m: 0,
    mb: "4px",
    [COMPACT_VP]: { mb: "2px" },
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    color: ISTO_PRIMARY,
  },
  standardsRows: {
    listStyle: "none",
    m: 0,
    p: 0,
  },
  standardsRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) auto",
    gap: "0 24px",
    alignItems: "center",
    py: "7px",
    [SHORT_VP]: { py: "3px" },
    [COMPACT_VP]: { py: "2px" },
    borderTop: "1px solid rgba(12,63,38,0.12)",
    "&:first-of-type": { borderTop: 0 },
  },
  standardsCode: {
    fontSize: 13,
    fontWeight: 500,
    color: RP_TEXT,
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
  },
  newEditionPill: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.3px",
    color: CHIP_UPGRADING_TEXT,
    bgcolor: "rgba(236,188,22,0.10)",
    border: "1px solid rgba(176,127,26,0.45)",
    px: "7px",
    py: "1px",
    borderRadius: "999px",
    whiteSpace: "nowrap",
  },
  proofBar: {
    display: "flex",
    borderTop: `1px solid ${RULE_LIGHT}`,
    mt: "16px",
    pt: "16px",
    [TALL_VP]: { mt: "8px" },
    [SHORT_VP]: { mt: "10px", pt: "10px" },
    [COMPACT_VP]: { mt: "8px", pt: "8px" },
    zIndex: 1,
  },
  proofItem: {
    flex: 1,
    textAlign: "center",
    "& + &": {
      borderLeft: `1px solid ${RULE_LIGHT}`,
    },
  },
  proofNum: {
    fontSize: 22,
    fontWeight: 800,
    lineHeight: 1,
    mb: "5px",
    [COMPACT_VP]: { fontSize: 19, mb: "3px" },
    color: ISTO_PRIMARY,
  },
  proofLabel: {
    fontSize: 9,
    color: RP_TEXT_SOFT,
    textTransform: "uppercase",
    letterSpacing: "0.7px",
    fontWeight: 600,
  },
  ctaTagline: {
    mt: "14px",
    [TALL_VP]: { mt: "8px" },
    [SHORT_VP]: { mt: "18px" },
    [COMPACT_VP]: { mt: "10px" },
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.2px",
    textAlign: "center",
    color: RP_TEXT,
    zIndex: 1,
  },
  taglineSep: { mx: "10px", color: RP_TEXT_SOFT, fontWeight: 300 },
  taglineAccent: { color: GOLD_BRIGHT },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "4px 16px",
    px: "28px",
    py: "8px",
    bgcolor: "#fff",
    borderTop: "1px solid #F0F1F3",
    flexShrink: 0,
    mt: "auto",
  },
  footerLinks: {
    display: "flex",
    gap: "16px",
  },
  footerCopy: {
    fontSize: 10,
    color: "#9AA0A6",
    letterSpacing: "0.3px",
  },
  footerSeal: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    mr: "5px",
    verticalAlign: "middle",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      bgcolor: GOLD_DEEP,
      clipPath: "polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%)",
      transform: "rotate(22.5deg)",
    },
  },
  footerSealNum: {
    position: "relative",
    color: "#fff",
    fontSize: 8,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: "-0.02em",
  },
};

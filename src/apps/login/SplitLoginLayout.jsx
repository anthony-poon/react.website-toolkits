import { Box, Link } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ISTO_PRIMARY,
  CTA_LIGHT_BG,
  CTA_LIGHT_GRAD_GREEN,
  CTA_LIGHT_GRAD_CREAM,
  CTA_LIGHT_BORDER,
  RP_TEXT,
  RP_TEXT_SOFT,
  CHIP_LIGHT_BG,
  CHIP_LIGHT_BORDER,
  CHIP_UPGRADING_BG,
  CHIP_UPGRADING_BORDER,
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

/**
 * SplitLoginLayout — two-column login shell with a left-column slot (passed
 * as `children`) and an optional marketing CTA panel on the right (topbar +
 * ISO standards timeline + stats + tagline + footer).
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
    timeline = [],
    stats = [],
    taglineKey,
    taglineAccentKey,
  } = ctaPanel;

  return (
    <Box sx={styles.ctaSide}>
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

      {timeline.length > 0 && (
        <Box sx={styles.timeline}>
          {timeline.map((item, idx) => (
            <TimelineItem
              key={item.dateKey}
              item={item}
              isLast={idx === timeline.length - 1}
              t={t}
            />
          ))}
        </Box>
      )}

      {stats.length > 0 && (
        <Box sx={styles.proofBar}>
          {stats.map((stat) => (
            <Box key={stat.labelKey} sx={styles.proofItem}>
              <Box sx={styles.proofNum}>{stat.num}</Box>
              <Box sx={styles.proofLabel}>{t(stat.labelKey)}</Box>
            </Box>
          ))}
        </Box>
      )}

      {taglineKey && (
        <Box sx={styles.ctaTagline}>
          {t(taglineKey)}
          {taglineAccentKey && (
            <>
              <Box component="span" sx={styles.taglineSep}>·</Box>
              <Box component="span" sx={styles.taglineAccent}>{t(taglineAccentKey)}</Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

const TimelineItem = ({ item, isLast, t }) => {
  const { status, dateKey, tagKey, tagVariant, standards = [], descriptionKey } = item;
  return (
    <Box sx={styles.timelineItem}>
      <Box sx={styles.timelineDotCol}>
        <Box sx={[styles.timelineDot, status === "live" ? styles.dotLive : styles.dotSoon]} />
        {!isLast && <Box sx={styles.timelineLine} />}
      </Box>
      <Box sx={styles.timelineContent}>
        <Box component="h4" sx={[styles.timelineHeading, status !== "live" && styles.timelineHeadingSoon]}>
          {t(dateKey)}
          {tagKey && (
            <Box
              component="span"
              sx={[styles.tag, tagVariant === "coming" ? styles.tagComing : styles.tagNew]}
            >
              {t(tagKey)}
            </Box>
          )}
        </Box>
        {standards.length > 0 && (
          <Box sx={styles.stdChips}>
            {standards.map((std, idx) =>
              std.break ? (
                <Box key={idx} sx={{ flexBasis: "100%", height: 0 }} />
              ) : (
                <Box
                  key={idx}
                  component="span"
                  sx={[styles.stdChip, std.upgrading && styles.stdChipUpgrading]}
                >
                  {std.label}
                  {std.badgeKey && (
                    <Box component="span" sx={styles.badgeNew}>{t(std.badgeKey)}</Box>
                  )}
                </Box>
              )
            )}
            {descriptionKey && (
              <Box component="span" sx={styles.stdDescription}>{t(descriptionKey)}</Box>
            )}
          </Box>
        )}
        {standards.length === 0 && descriptionKey && (
          <Box component="p" sx={styles.timelineDesc}>{t(descriptionKey)}</Box>
        )}
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
    zIndex: 1,
  },
  headlineAccent: { color: ISTO_PRIMARY },
  timeline: {
    display: "flex",
    flexDirection: "column",
    mt: "16px",
    mb: "6px",
    [TALL_VP]: { mt: "42px" },
    [SHORT_VP]: { mt: "10px" },
    zIndex: 1,
  },
  timelineItem: { display: "flex", gap: "14px" },
  timelineDotCol: { display: "flex", flexDirection: "column", alignItems: "center", alignSelf: "stretch", mb: "-5px" },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    flexShrink: 0,
    mt: "5px",
  },
  dotLive: {
    bgcolor: ISTO_PRIMARY,
    boxShadow: "0 0 0 4px rgba(0,119,59,0.14)",
  },
  dotSoon: {
    bgcolor: GOLD_BRIGHT,
    boxShadow: "0 0 0 4px rgba(236,188,22,0.20)",
  },
  timelineLine: {
    width: "2px",
    flex: 1,
    bgcolor: RULE_LIGHT,
    minHeight: "12px",
  },
  timelineContent: { flex: 1, pb: "13px", [SHORT_VP]: { pb: "7px" } },
  timelineHeading: {
    fontSize: 11,
    fontWeight: 700,
    m: 0,
    mb: "7px",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    color: ISTO_PRIMARY,
  },
  timelineHeadingSoon: { color: CHIP_UPGRADING_TEXT },
  tag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    fontSize: 11,
    fontWeight: 700,
    ml: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
    verticalAlign: "middle",
    "&::before": {
      content: '""',
      width: 6,
      height: 6,
      borderRadius: "50%",
      display: "inline-block",
    },
  },
  tagNew: {
    color: ISTO_PRIMARY,
    "&::before": { bgcolor: ISTO_PRIMARY },
  },
  tagComing: {
    color: GOLD_DEEP,
    "&::before": { bgcolor: GOLD_DEEP },
  },
  // Liquid-glass "New" badge perched on a chip's top-right corner.
  badgeNew: {
    position: "absolute",
    top: "-10px",
    right: "-22px",
    px: "5px",
    py: "2px",
    borderRadius: "6px",
    background: "linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.12) 100%)",
    border: "1px solid rgba(255,255,255,0.7)",
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: RP_TEXT,
    boxShadow: "0 4px 12px rgba(10,107,62,0.16), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(10,107,62,0.05)",
  },
  stdChips: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
    mt: "2px",
    alignItems: "center",
  },
  stdChip: {
    position: "relative",
    fontSize: 11,
    fontWeight: 600,
    px: "9px",
    py: "4px",
    borderRadius: 0,
    bgcolor: CHIP_LIGHT_BG,
    border: `1px solid ${CHIP_LIGHT_BORDER}`,
    color: ISTO_PRIMARY,
    letterSpacing: "0.2px",
  },
  stdChipUpgrading: {
    bgcolor: CHIP_UPGRADING_BG,
    border: `1px solid ${CHIP_UPGRADING_BORDER}`,
    color: CHIP_UPGRADING_TEXT,
    fontWeight: 600,
  },
  stdDescription: { fontSize: 11, color: RP_TEXT, ml: "4px" },
  timelineDesc: { fontSize: 11, color: RP_TEXT_SOFT, m: 0 },
  proofBar: {
    display: "flex",
    borderTop: `1px solid ${RULE_LIGHT}`,
    mt: "16px",
    pt: "16px",
    [TALL_VP]: { mt: "42px" },
    [SHORT_VP]: { mt: "10px", pt: "10px" },
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
    [TALL_VP]: { mt: "64px" },
    [SHORT_VP]: { mt: "18px" },
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

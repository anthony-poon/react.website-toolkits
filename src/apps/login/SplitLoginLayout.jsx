import { Box, Link } from "@mui/material";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { ISTO_PRIMARY, ISTO_DARK, ISTO_DARKER, ISTO_GOLD } from "./colors";

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
    backgroundImage,
  } = ctaPanel;

  return (
    <Box sx={styles.ctaSide}>
      {backgroundImage && (
        <Box sx={[styles.ctaOctagon, { backgroundImage: `url(${backgroundImage})` }]} />
      )}
      {eyebrowKey && <Box sx={styles.ctaEyebrow}>{t(eyebrowKey)}</Box>}
      {headlineKey && (
        <Box component="h2" sx={styles.ctaHeadline}>
          {t(headlineKey)}
          {headlineAccentKey && (
            <>
              <br />
              <Box component="span" sx={styles.gold}>{t(headlineAccentKey)}</Box>
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
              <Box component="span" sx={styles.taglineSep}>|</Box>
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
        <Box component="h4" sx={styles.timelineHeading}>
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
        <Trans
          i18nKey={footer.copyKey}
          components={{
            1: (
              <Link
                href={footer.istoUrl || "https://www.isto.ch"}
                target="_blank"
                rel="noreferrer"
                underline="none"
                sx={{ color: "inherit" }}
              />
            ),
          }}
        />
      </Box>
    )}
  </Box>
);

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: "100%",
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
    alignItems: "center",
    justifyContent: "center",
    p: "48px",
    bgcolor: "#fff",
  },
  loginFormWrap: {
    width: 380,
    maxWidth: "100%",
  },
  ctaSide: {
    width: 560,
    flexShrink: 0,
    display: { xs: "none", md: "flex" },
    flexDirection: "column",
    justifyContent: "flex-start",
    px: { md: "63px" },
    pt: "clamp(32px, 14vh, 130px)",
    pb: "40px",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
    background: `linear-gradient(160deg, ${ISTO_PRIMARY} 0%, ${ISTO_DARK} 45%, ${ISTO_DARKER} 100%)`,
  },
  ctaOctagon: {
    position: "absolute",
    top: 0,
    right: "-120px",
    width: 480,
    height: 480,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
    opacity: 0.03,
    pointerEvents: "none",
    filter: "brightness(0) invert(1)",
    zIndex: 0,
  },
  ctaEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "1.8px",
    color: "#fff",
    mb: "18px",
    fontWeight: 700,
    alignSelf: "flex-start",
    zIndex: 1,
  },
  ctaHeadline: {
    fontSize: 31,
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
    mb: "14px",
    m: 0,
    zIndex: 1,
  },
  gold: { color: ISTO_GOLD },
  timeline: {
    display: "flex",
    flexDirection: "column",
    mt: 4,
    mb: 1,
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
    bgcolor: "#4ADE80",
    boxShadow: "0 0 0 4px rgba(74,222,128,0.18)",
  },
  dotSoon: { bgcolor: ISTO_GOLD },
  timelineLine: {
    width: "2px",
    flex: 1,
    bgcolor: "rgba(255,255,255,0.12)",
    minHeight: "12px",
  },
  timelineContent: { flex: 1, pb: "40px" },
  timelineHeading: {
    fontSize: 12,
    fontWeight: 700,
    m: 0,
    mb: "7px",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
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
    color: "#4ADE80",
    "&::before": { bgcolor: "#4ADE80" },
  },
  tagComing: {
    color: ISTO_GOLD,
    "&::before": { bgcolor: ISTO_GOLD },
  },
  stdChips: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
    mt: "2px",
    alignItems: "center",
  },
  stdChip: {
    fontSize: 11,
    fontWeight: 500,
    px: "14px",
    py: "4px",
    borderRadius: "20px",
    bgcolor: "rgba(255,255,255,0.12)",
    letterSpacing: "0.2px",
  },
  stdChipUpgrading: {
    bgcolor: "transparent",
    color: "#D4A84B",
    fontWeight: 700,
    border: "1px solid #D4A84B",
    boxShadow: "0 0 14px rgba(212,168,75,0.3)",
  },
  stdDescription: { fontSize: 11, opacity: 0.85, ml: "4px" },
  timelineDesc: { fontSize: 11, opacity: 0.5, m: 0 },
  proofBar: {
    display: "flex",
    borderTop: "1px solid rgba(255,255,255,0.14)",
    pt: "18px",
    zIndex: 1,
  },
  proofItem: {
    flex: 1,
    textAlign: "center",
    "& + &": {
      borderLeft: "1px solid rgba(255,255,255,0.14)",
    },
  },
  proofNum: {
    fontSize: 24,
    fontWeight: 800,
    lineHeight: 1,
    mb: "4px",
    color: "#fff",
  },
  proofLabel: {
    fontSize: 9,
    opacity: 0.6,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: 600,
  },
  ctaTagline: {
    mt: "auto",
    pt: "20px",
    pb: "24px",
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: "0.2px",
    textAlign: "center",
    color: "#fff",
    zIndex: 1,
  },
  taglineSep: { mx: "10px", opacity: 0.4, fontWeight: 300 },
  taglineAccent: { color: ISTO_GOLD },
  footer: {
    textAlign: "center",
    px: "20px",
    py: "8px",
    bgcolor: "#fff",
    borderTop: "1px solid #F0F1F3",
    flexShrink: 0,
    mt: "auto",
  },
  footerLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    mb: "3px",
  },
  footerCopy: {
    fontSize: 10,
    color: "#9AA0A6",
    letterSpacing: "0.3px",
  },
};

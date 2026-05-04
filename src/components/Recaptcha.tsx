import React, { useEffect } from "react";

import ENV from "../../../ENV";

const RecaptchaV3 = (): null => {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "recaptcha-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${ENV.RECAPTCHA_V3_CLIENT_KEY}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    const badge = document.querySelector<HTMLElement>(".grecaptcha-badge");
    if (badge) badge.style.visibility = "visible";

    return () => {
      const badge = document.querySelector<HTMLElement>(".grecaptcha-badge");
      if (badge) badge.style.visibility = "hidden";
      document.getElementById("recaptcha-script")?.remove();
    };
  }, []);

  return null;
};

const RecaptchaV2 = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "recaptcha-script";
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      grecaptcha.ready(() => {
        grecaptcha.render(document.getElementById("recaptcha-render"), {
          sitekey: ENV.RECAPTCHA_V2_CLIENT_KEY,
        });
      });
    };
    document.body.appendChild(script);

    const badge = document.querySelector<HTMLElement>(".grecaptcha-badge");
    if (badge) badge.style.visibility = "visible";

    return () => {
      const badge = document.querySelector<HTMLElement>(".grecaptcha-badge");
      if (badge) badge.style.visibility = "hidden";
      document.getElementById("recaptcha-script")?.remove();
    };
  }, []);

  return <div id="recaptcha-render" />;
};

type RecaptchaProps = {
  v2: boolean;
};

export const Recaptcha = (props: RecaptchaProps) => {
  if (props.v2) {
    return <RecaptchaV2 />;
  }
  return <RecaptchaV3 />;
};

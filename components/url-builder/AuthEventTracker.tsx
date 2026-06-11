"use client";

import { useEffect } from "react";
import { flushAuthEvent } from "@/lib/url-builder/authEvent";

// Pushes the sign_up/login event GoogleSignInButton stored before the
// redirect. Plain reloads find no flag and push nothing. Renders nothing.
const AuthEventTracker = () => {
  useEffect(() => {
    flushAuthEvent();
  }, []);

  return null;
};

export default AuthEventTracker;

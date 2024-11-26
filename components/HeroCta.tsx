"use client";
import React from "react";
import ButtonLink from "./ButtonLink";
import { usePathname } from "next/navigation";

const HeroCta = () => {
  let path = usePathname();
  let auditCta = "Unlock Your Data's Potential";
  let consultationCta = "Start Your Success Story";

  return (
    <ButtonLink link={"#cta"}>
      {path === "/consultation" ? consultationCta : auditCta}
    </ButtonLink>
  );
};

export default HeroCta;

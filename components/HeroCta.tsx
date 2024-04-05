"use client";
import React from 'react'
import ButtonLink from './ButtonLink'
import { usePathname } from 'next/navigation';

const HeroCta = () => {
    let path = usePathname()
    let auditCta = "Get your free audit";
    let consultationCta = "Start Your Success Story";

  return (
    <ButtonLink link={"#cta"}>{path === "/audit" ? auditCta : consultationCta}</ButtonLink>
  )
}

export default HeroCta;
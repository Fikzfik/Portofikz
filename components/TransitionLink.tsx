"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useTransitionSnapshot } from "./TransitionSnapshotProvider";

interface TransitionLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  href: string;
}

export default function TransitionLink({ 
  children, 
  href, 
  className, 
  ...props 
}: TransitionLinkProps) {
  const router = useRouter();
  const { triggerTransition } = useTransitionSnapshot();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Pengecekan cerdas: Jangan lakukan animasi untuk link `#anchor` di halaman yang sama
    const targetUrl = new URL(href, window.location.origin);
    if (targetUrl.pathname === window.location.pathname) {
      return; // Biarkan navigasi scroll standar berjalan
    }

    e.preventDefault();
    
    // Tangkap "foto" dari halaman saat ini sebelum kita memberitahu Next.js untuk pindah halaman
    const contentNode = document.getElementById("page-active-content");
    if (contentNode) {
      triggerTransition(contentNode.innerHTML, window.scrollY);
    }
    
    // Lanjutkan perpindahan halaman
    router.push(href);
  };

  return (
    <a {...props} href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

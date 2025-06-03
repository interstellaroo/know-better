"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

const Logo = () => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // unikamy problemów z SSR
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <div>
      <Image
        src={isDark ? "/knowbetter-light.svg" : "/knowbetter-dark.svg"}
        alt="Logo"
        width={124}
        height={32}
        priority
      />
    </div>
  );
};

export default Logo;
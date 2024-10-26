"use client";

import useAuth from "@/hooks/useAuth";
import React, { FC, useEffect, useState } from "react";

interface Props {
  user: any;
  children: React.ReactNode;
}

const LayoutWrapper: FC<Props> = ({ children, user }) => {
  const { setAuthState } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setAuthState!({
        authenticated: true,
        username: user?.email,
        id: user?.userId,
        roles: user?.roles,
        error: null,
      });
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default LayoutWrapper;

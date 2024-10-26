import React, { FC } from "react";

import { Button as UIButton } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  label: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button: FC<Props> = ({
  label,
  loading,
  onClick = () => null,
  disabled,
}) => {
  return (
    <UIButton
      variant="outline"
      onClick={onClick}
      className="w-full bg-primary text-white hover:bg-primary-dark transition-all duration-300 ease-in-out"
      disabled={disabled || loading}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </UIButton>
  );
};

export default Button;

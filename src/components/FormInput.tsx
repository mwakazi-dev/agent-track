import React, { FC } from "react";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { InputType } from "@/types/enums";

interface Props {
  label: string;
  name: string;
  type?: InputType;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const FormInput: FC<Props> = ({
  label,
  name,
  type = InputType.TEXT,
  placeholder = "",
  value = "",
  onChange = () => null,
  error = "",
  required = false,
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor={name}>
        {label} {required && <span className="text-error text-sm mb-1">*</span>}
      </Label>
      <Input
        type={type}
        id={name}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full focus:ring-0 focus:outline-none ring-0 border-0 bg-muted"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        autoSave="off"
        required
      />
      {error && <p className="text-error text-xs">{error}</p>}
    </div>
  );
};

export default FormInput;

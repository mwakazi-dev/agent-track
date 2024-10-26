import { InputType } from "./enums";

export interface InputField {
  name: string;
  type?: InputType;
  placeholder?: string;
  label: string;
  required?: boolean;
}

export interface FormInputState {
  values: { [key: string]: string };
  errors: { [key: string]: string | null };
}

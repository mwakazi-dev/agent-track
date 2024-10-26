import { InputType } from "@/types/enums";
import { InputField } from "@/types/input";

export const INPUTS: InputField[] = [
  {
    name: "email",
    type: InputType.EMAIL,
    placeholder: "Email",
    label: "Email",
    required: true,
  },
  {
    name: "password",
    type: InputType.PASSWORD,
    placeholder: "Password",
    label: "Password",
    required: true,
  },
];

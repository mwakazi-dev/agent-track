import { useCallback, useEffect, useState } from "react";

import { FormInputState } from "@/types/input";
import useDebounce from "./useDebounce";
import { LoginFormSchema } from "@/lib/definitions";

type FormFields = any;

const useForm = (initialValues: any, delay = 300) => {
  const [formValues, setFormValues] = useState<FormInputState>(initialValues);
  const [inputValue, setInputValue] = useState<{ [key: string]: string }>({});

  // Debounced input values, only updated after delay which increases performance
  const debouncedValue = useDebounce(inputValue, delay);

  const changeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target as {
        name: FormFields;
        value: string;
      };

      setInputValue((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));

      const validatedFields = LoginFormSchema.safeParse({
        ...formValues.values,
        [name]: value,
      });

      setFormValues((prevValues) => {
        const fieldErrors =
          (validatedFields as any)?.error?.flatten()?.fieldErrors || {};
        return {
          values: {
            ...prevValues.values,
            [name]: value,
          },
          errors: {
            ...prevValues.errors,
            [name]: validatedFields.success ? null : fieldErrors[name]?.[0],
          },
        };
      });
    },
    [formValues.values]
  );

  useEffect(() => {
    if (debouncedValue) {
      setFormValues((prevValues) => ({
        values: {
          ...prevValues.values,
          ...Object.keys(debouncedValue).reduce((acc, key) => {
            acc[key] = debouncedValue[key];
            return acc;
          }, {} as { [key: string]: string }),
        },
        errors: {
          ...prevValues.errors,
          ...Object.keys(debouncedValue).reduce((acc, key) => {
            return acc;
          }, {} as { [key: string]: string | null }),
        },
      }));
    }
  }, [debouncedValue]);

  return { formValues, changeHandler };
};

export default useForm;

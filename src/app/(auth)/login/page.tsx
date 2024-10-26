"use client";

import React, { FC, useMemo } from "react";
import { BriefcaseBusiness } from "lucide-react";

import { INPUTS } from "@/constants/data";
import { InputField } from "@/types/input";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import useForm from "@/hooks/useForm";
import useAuth from "@/hooks/useAuth";

const LoginPage: FC = () => {
  const { isAuthenticating, onLogin, authState } = useAuth();
  const { formValues, changeHandler } = useForm({
    values: {},
    errors: {},
  });

  const isFormValid = useMemo(() => {
    return (
      !Boolean((formValues?.errors?.email as string)?.length) &&
      !Boolean((formValues.errors.password as string)?.length) &&
      Boolean(formValues?.values?.email) &&
      Boolean(formValues?.values?.password)
    );
  }, [formValues.errors, formValues?.values?.email]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      // submit form
      return;
    }

    onLogin!(formValues?.values?.email, formValues?.values?.password) as any;
  };

  return (
    <section className="flex flex-col items-center justify-center h-[100vh]">
      <div className="flex flex-col gap-4 items-center justify-center w-full  md:w-[50%] p-4">
        <div className="flex flex-col gap-3 items-center justify-center">
          <BriefcaseBusiness className="w-12 h-12" />
          <h2 className="text-xl font-black">Sign in</h2>
        </div>
        <form
          className="flex flex-col items-center  justify-center w-full gap-4"
          onSubmit={submitHandler}
        >
          {INPUTS.map((inputData: InputField) => (
            <FormInput
              key={inputData.name}
              label={inputData.label}
              name={inputData.name}
              type={inputData.type}
              required={inputData.required}
              value={formValues.values[inputData.name] ?? ""}
              onChange={changeHandler}
              error={formValues.errors[inputData.name] ?? ""}
            />
          ))}
          {authState?.error && (
            <p className="text-error text-xs text-center">{authState?.error}</p>
          )}
          <div className="grid w-full max-w-sm items-center mt-2">
            <Button
              label="Sign in"
              disabled={!Boolean(isFormValid)}
              loading={isAuthenticating}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;

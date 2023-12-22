import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "antd";

const TextField = ({ name }) => {
  const { register, formState, control } = useFormContext();
  const { errors } = formState;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Input {...field} />}
    />
  );
};

export default TextField;

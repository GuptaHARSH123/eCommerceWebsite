import React from "react";
import { useField } from "formik";

function Input({ name, label, id, placeholder, type = "text" }) {
  const [field, meta] = useField(name);
  const { onChange, onBlur, value } = field;
  const { error, touched } = meta;
  const borderClass = error && touched ? "border-red-500" : "border-white";

  return (
    <div className="mb-4">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-lg text-white placeholder-white bg-blue-900 ${borderClass}`}
      />
      {touched && error && <div className="text-red-500">{error}</div>}
    </div>
  );
}

export default Input;

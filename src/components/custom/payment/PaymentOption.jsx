import React from "react";
import { Field } from "formik";
import Image from "next/image";



const PaymentOption= ({
  name,
  value,
  label,
  description,
  icons,
  onChange,
}) => (
  <label className="text-sm flex gap-2 border p-2 rounded-md cursor-pointer">
    <Field type="checkbox" name={name} value={value} onChange={onChange} />
    <div className="flex gap-2">
      <div>
        <p>{label}</p>
        <span className="text-xs text-gray-400">{description}</span>
      </div>
      <div className="flex gap-2">
        {icons.map((icon, index) => (
          <div
            key={index}
            className="border p-1 rounded-md min-w-[50px] h-[30px] flex items-center justify-center"
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={icon.width}
              height={icon.height}
            />
          </div>
        ))}
      </div>
    </div>
  </label>
);

export default PaymentOption;

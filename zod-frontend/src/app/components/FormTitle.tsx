import React, { FC } from "react";
import { TitleProps } from "../types/types";

const FormTitle: FC<TitleProps> = ({ title, subTitle }) => {
  return (
    <div className="bg-gradient-to-r from-gray-500 to-slate-600 p-8">
      <h1 className="text-center text-3xl font-bold text-white">{title}</h1>
      {subTitle && <p className="mt-2 text-center text-white/80">{subTitle}</p>}
    </div>
  );
};

export default FormTitle;

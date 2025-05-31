"use client";
import React, { FC, useActionState, useState } from "react";
import { UserState, TitleProps } from "../types/types";
import FormTitle from "@/app/components/FormTitle";
import { ArrowRightIcon, EnvelopeIcon, LockClosedIcon, UserIcon } from "@/app/components/icons";
import { createUser } from "@/app/helpers/actions";
import Link from "next/link";

const Form: FC<TitleProps> = ({ title, subTitle }) => {
  const [formData, setFormData] = useState<Omit<UserState, "id">>({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [state, formAction] = useActionState(createUser, formData);

  return (
    <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
      <FormTitle title={title} subTitle={subTitle} />
      <form className="space-y-6 p-8" action={formAction}>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nombre completo
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <UserIcon className="h-[18px] w-[18px]" />
            </div>
            <input
              id="name"
              name="name"
              placeholder="Tu nombre"
              className={`w-full rounded-md border px-4 py-2 pl-10 outline-none ring-offset-2 focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-violet-500"
              }`}
            />
          </div>
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Correo electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <EnvelopeIcon className="h-[18px] w-[18px]" />
            </div>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="tu@email.com"
              className={`w-full rounded-md border px-4 py-2 pl-10 outline-none ring-offset-2 focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-violet-500"
              }`}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <LockClosedIcon className="h-[18px] w-[18px]" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña segura"
              className={`w-full rounded-md border px-4 py-2 pl-10 outline-none ring-offset-2 focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-violet-500"
              }`}
            />
          </div>
          {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="group flex w-full items-center justify-center rounded-md bg-gradient-to-r from-gray-500 to-slate-600 px-4 py-2 font-medium text-white transition-all hover:from-gray-600 hover:to-slate-600 cursor-pointer"
        >
          <span>Crear cuenta</span>
          <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
        <p className="text-center text-sm text-gray-500">
          <Link href="/users" className="font-medium text-slate-600 hover:text-gray-800">
            Lista de Usuarios
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Form;

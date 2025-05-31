import { ArrowRightIcon } from "@/app/components/icons";
import UserList from "@/app/components/userList";
import Link from "next/link";
import { Suspense } from "react";

const Users = () => {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-gray-500 to-slate-600 text-white p-6">
        <h2 className="text-2xl font-semibold">Lista de Usuarios</h2>
        <p className="text-slate-200">Administra los usuarios de la comunidad</p>
      </div>
      <Suspense fallback="Cargando!!!">
        <UserList />
      </Suspense>

      <div className="p-4 border-t border-slate-200 bg-white">
        <Link
          href="/"
          className="group flex w-full items-center justify-center rounded-md bg-gradient-to-r from-gray-500 to-slate-600 px-4 py-2 font-medium text-white transition-all hover:from-gray-600 hover:to-slate-600 cursor-pointer"
        >
          <span>Agregar nuevo usuario</span>
          <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default Users;

import { EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon } from "@/app/components/icons";
import { deleteUser } from "@/app/helpers/actions";
import { fetchUsers } from "@/app/helpers/api";
import Link from "next/link";

const UserList = async () => {
  const users = await fetchUsers();

  return (
    <div className="p-6 bg-white">
      {!users || users.length === 0 ? (
        <div className="text-center py-8 text-slate-500">No hay usuarios para mostrar</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-700">Nombre</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Correo electrónico</th>
                <th className="text-right py-3 px-4 font-medium text-slate-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-800">{user.name}</td>
                  <td className="py-3 px-4 text-slate-800">{user.email}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/users/${user.id}/profile/view`}
                        className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100"
                        aria-label="Editar usuario"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/users/${user.id}/profile/edit`}
                        className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100"
                        aria-label="Editar usuario"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </Link>
                      <form action={deleteUser}>
                        <input type="hidden" value={user.id} name="userId" />
                        <button className="p-1.5 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50" aria-label="Eliminar usuario">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;

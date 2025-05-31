import { FC } from "react";
import { UserIcon, CalendarIcon, MapPinIcon, PhoneIcon, TagIcon, MoonIcon, SunIcon, PencilIcon } from "@/app/components/icons";
import { UserState } from "../types/types";
import Link from "next/link";

const formatDate = (date: Date | undefined) => {
  if (!date) return "No especificado";
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

const ProfileView: FC<{ user: UserState | undefined }> = async ({ user }) => {

  return (
    <div className="w-full md:w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-slate-600 text-white p-6">
        <h2 className="text-2xl font-semibold">Perfil de Usuario</h2>
        <p className="text-slate-200">Información personal</p>
      </div>

      {user && (
        <div className="p-6 space-y-6">
          {/* Profile Picture and Theme Toggle */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden mb-4 border-2 border-slate-200">
                {user?.profile?.profilePicture ? (
                  <img
                    src={user.profile.profilePicture || "/placeholder.svg"}
                    alt={`Foto de perfil de ${user.profile.userName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon size={48} className="text-slate-400" />
                )}
              </div>
              <h3 className="text-lg font-medium text-slate-900">{user?.profile?.userName || "Usuario"}</h3>
            </div>

            <button
              className={`p-2 rounded-full ${user?.profile?.theme === "dark" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-800"}`}
              aria-label={`Switch to ${user?.profile?.theme === "light" ? "dark" : "light"} mode`}
            >
              {user?.profile?.theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
            </button>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Age */}
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-slate-500">Edad</h4>
                <p className="text-slate-900">{user?.profile?.age || "No especificada"}</p>
              </div>

              {/* Birthday */}
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Fecha de nacimiento</span>
                </h4>
                <p className="text-slate-900">{formatDate(user?.profile?.birthday)}</p>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <PhoneIcon className="h-4 w-4" />
                  <span>Teléfono</span>
                </h4>
                <p className="text-slate-900">{user?.profile?.phone || "No especificado"}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Address */}
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-slate-500 flex items-center gap-2">
                  <MapPinIcon className="h-4 w-4" />
                  <span>Dirección</span>
                </h4>
                <p className="text-slate-900">{user?.profile?.address || "No especificada"}</p>
              </div>

              {/* City and Country */}
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-slate-500">Ubicación</h4>
                <p className="text-slate-900">
                  {user?.profile?.city && user.profile.country
                    ? `${user.profile.city}, ${user.profile.country}`
                    : user?.profile?.city || user?.profile?.country || "No especificada"}
                </p>
              </div>
            </div>
          </div>

          {/* Hobbies */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <TagIcon className="h-4 w-4" />
              <span>Pasatiempos</span>
            </h4>
            {user?.profile?.hoobies && user.profile.hoobies.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.profile.hoobies.map((hobby, index) => (
                  <span key={index} className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm">
                    {hobby}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No se han especificado pasatiempos</p>
            )}
          </div>

          {/* About */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-500">Acerca de mí</h4>
            <div className="bg-slate-50 p-4 rounded-md">
              <p className="text-slate-800 whitespace-pre-line">{user?.profile?.about || "No hay información disponible."}</p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="pt-4">
            <Link
              href={`/users/${user.profile?.userID}/profile/edit`}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 px-4 rounded flex items-center justify-center transition-colors gap-2"
            >
              <PencilIcon size={18} />
              <span>Editar perfil</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;

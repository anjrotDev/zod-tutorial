"use client";

import { useState, useRef, type ChangeEvent, FC, useActionState } from "react";
import { UserIcon, CalendarIcon, MapPinIcon, PhoneIcon, TagIcon, ImageIcon, MoonIcon, SunIcon, XIcon } from "./icons";
import { State, UserProfile } from "../types/types";
import { createUserProfile } from "@/app/helpers/actions";

const ProfileForm: FC<{ id: string }> = ({ id }) => {
  const [profile, setProfile] = useState<UserProfile>({
    userName: "",
    age: undefined,
    address: "",
    city: "",
    country: "",
    phone: undefined,
    birthday: undefined,
    hoobies: [],
    about: "",
    profilePicture: "",
    theme: "light",
    errorMessage: null
  });

  const [currentHobby, setCurrentHobby] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddHobby = () => {
    if (currentHobby.trim() && !profile.hoobies?.includes(currentHobby.trim())) {
      setProfile(prev => ({
        ...prev,
        hoobies: [...(prev.hoobies || []), currentHobby.trim()]
      }));
      setCurrentHobby("");
    }
  };

  const handleRemoveHobby = (hobby: string) => {
    setProfile(prev => ({
      ...prev,
      hoobies: prev.hoobies?.filter(h => h !== hobby)
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setImagePreview(reader.result as string);
        setProfile(prev => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThemeToggle = () => {
    setProfile(prev => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light"
    }));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const [state, formAction] = useActionState(createUserProfile, { message: "" });
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-slate-600 text-white p-6">
        <h2 className="text-2xl font-semibold">Perfil de Usuario</h2>
        <p className="text-slate-200">Completa tu información personal</p>
      </div>

      <form className="p-6 space-y-6" action={formAction}>
        {/* Profile Picture */}
        <input type="hidden" value={id} name="userID" />
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden mb-4 border-2 border-slate-200 cursor-pointer"
            onClick={triggerFileInput}
          >
            {imagePreview ? (
              <img src={imagePreview || "/placeholder.svg"} alt="Profile preview" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon size={48} className="text-slate-400" />
            )}
          </div>
          <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" name="profilePicture" />
          <button type="button" onClick={triggerFileInput} className="text-sm text-slate-600 hover:text-slate-800">
            Cambiar foto de perfil
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="flex justify-end">
          <input type="hidden" value={profile.theme} name="theme" />
          <button
            type="button"
            onClick={handleThemeToggle}
            className={`p-2 rounded-full ${profile.theme === "dark" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-800"}`}
            aria-label={`Switch to ${profile.theme === "light" ? "dark" : "light"} mode`}
          >
            {profile.theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button>
        </div>

        {/* User Name */}
        <div className="space-y-2">
          <label htmlFor="userName" className="block text-sm font-medium text-slate-700">
            Nombre de usuario
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              id="userName"
              name="userName"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder="Tu nombre de usuario"
            />
          </div>
        </div>

        {/* Age */}
        <div className="space-y-2">
          <label htmlFor="age" className="block text-sm font-medium text-slate-700">
            Edad
          </label>
          <input
            type="number"
            id="age"
            name="age"
            min="0"
            className="block w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            placeholder="Tu edad"
          />
        </div>

        {/* Birthday */}
        <div className="space-y-2">
          <label htmlFor="birthday" className="block text-sm font-medium text-slate-700">
            Fecha de nacimiento
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="date"
              id="birthday"
              name="birthday"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-medium text-slate-700">
            Dirección
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPinIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              id="address"
              name="address"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder="Tu dirección"
            />
          </div>
        </div>

        {/* City and Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-medium text-slate-700">
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="block w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder="Tu ciudad"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="country" className="block text-sm font-medium text-slate-700">
              País
            </label>
            <input
              type="text"
              id="country"
              name="country"
              className="block w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder="Tu país"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            Teléfono
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PhoneIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder="Tu número de teléfono"
            />
          </div>
        </div>

        {/* Hobbies */}
        <div className="space-y-2">
          <label htmlFor="hobbies" className="block text-sm font-medium text-slate-700">
            Pasatiempos
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TagIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              id="hobbies"
              value={currentHobby}
              onChange={e => setCurrentHobby(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddHobby();
                }
              }}
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
              placeholder="Añadir pasatiempo y presionar Enter"
            />
          </div>

          {/* Hobby Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            <input type="hidden" name="hoobies" value={profile.hoobies} />
            {profile.hoobies?.map((hobby, index) => (
              <div key={index} className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full flex items-center gap-1">
                <span>{hobby}</span>
                <button type="button" onClick={() => handleRemoveHobby(hobby)} className="text-slate-500 hover:text-slate-700">
                  <XIcon size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="space-y-2">
          <label htmlFor="about" className="block text-sm font-medium text-slate-700">
            Acerca de mí
          </label>
          <textarea
            id="about"
            name="about"
            rows={4}
            className="block w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            placeholder="Cuéntanos sobre ti..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-slate-600 hover:bg-slate-700 text-white py-3 px-4 rounded flex items-center justify-center transition-colors"
          >
            Guardar perfil
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;

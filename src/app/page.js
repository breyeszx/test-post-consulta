"use client";
import React, { useState } from 'react';
import LoginPage from "@/components/login";
import RoleSelection from "@/components/rol";

export default function Home() {
  const [role, setRole] = useState(''); // Guardar el rol seleccionado

  // Función que se pasa a RoleSelection para elegir el rol
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div>
      {role ? (
        // Si el rol ya está seleccionado, mostrar el formulario de Login
        <LoginPage role={role} />
      ) : (
        // Si no hay rol seleccionado, mostrar el selector de roles
        <RoleSelection onRoleSelect={handleRoleSelect} />
      )}
    </div>
  );
}

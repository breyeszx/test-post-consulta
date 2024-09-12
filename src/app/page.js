"use client";
import React, { useState } from "react";
import EnhancedLogin from "./components/login";

export default function Home() {
  const [role, setRole] = useState(""); // Guardar el rol seleccionado

  // Función que se pasa a RoleSelection para elegir el rol
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div>
      <EnhancedLogin />
    </div>
  );
}

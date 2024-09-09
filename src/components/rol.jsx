import React, { useState } from 'react';

const RoleSelection = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      onRoleSelect(selectedRole); // Llamamos a la función que se pasó desde el componente Home
    } else {
      alert('Por favor selecciona un rol.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-xl font-bold mb-4 text-black">Selecciona tu Rol</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="p-2 border border-gray-300 rounded text-black"
        >
          <option value="">--Seleccionar Rol--</option>
          <option value="Paciente">Paciente</option>
          <option value="Trabajador">Trabajador</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded font-medium hover:bg-blue-600 transition duration-300"
        >
          Seleccionar Rol
        </button>
      </form>
    </div>
  );
};

export default RoleSelection;

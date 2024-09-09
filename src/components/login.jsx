"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de importar useRouter
import { ChevronLeft, ChevronDown } from 'lucide-react';

const Login = ({ role }) => { // Ya no necesitas recibir router como prop
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [rut, setRut] = useState('');
  const [diagnostico, setDiagnostico] = useState('Peritonitis');

  const router = useRouter(); // Usamos useRouter para la redirección

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nombre,
      telefono,
      direccion,
      rut,
      diagnostico,
      role, // Incluimos el rol que viene como prop
    };

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role); // Guarda el token en localStorage

      // Redirige dependiendo del rol
      if (role === 'Trabajador') {
        router.push('/home-hospital'); // Redirige al home de trabajadores
      } else if (role === 'Paciente') {
        router.push('/home-pacient'); // Redirige al home de pacientes
      }
    } else {
      alert('Error en el inicio de sesión');
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col">
      <div className="bg-white flex-grow flex flex-col">
        <div className="p-4 bg-blue-500 text-white flex items-center">
          <ChevronLeft className="w-6 h-6" />
          <div className="text-white flex items-center">Login - {role}</div> {/* Mostramos el rol */}
        </div>

        <form onSubmit={handleSubmit} className="flex-grow flex flex-col p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Braulio Reyes"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="+569-4567890"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="Puente Alto"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">RUT</label>
            <input
              type="text"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-black"
              placeholder="12.345.678-9"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diagnostico</label>
            <div className="relative">
              <select
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
                className="w-full p-2 border border-gray-300 text-black rounded appearance-none"
              >
                <option>Peritonitis</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex-grow"></div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded font-medium hover:bg-blue-600 transition duration-300"
          >
            Ingresar como {role}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

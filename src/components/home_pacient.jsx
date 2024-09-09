"use client";
import React, { useState } from "react";
import { Search, ChevronDown, Home, List, Bell, User } from "lucide-react";

const HomePatient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reaction, setReaction] = useState(null); // Estado para almacenar la reacción

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para manejar la selección de un emoji
  const handleReaction = async (selectedReaction) => {
    setReaction(selectedReaction); // Almacena la reacción seleccionada
    console.log("Reacción enviada:", selectedReaction, "por", "Lia Rebolledo");
    closeModal(); // Cierra el modal
  
    try {
      const response = await fetch("/api/send-reaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reaction: selectedReaction,
          patient: "Lia Rebolledo", // Asegúrate de que el nombre del paciente sea correcto
        }),
      });
  
      if (response.ok) {
        console.log("Reacción enviada correctamente");
      } else {
        console.error("Error al enviar la reacción");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 flex items-center">
        <span className="font-semibold">Lia Rebolledo</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6 ml-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </header>

      {/* Main content */}
      <main className="flex-grow p-4">
        {/* Search bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full p-2 pl-10 pr-4 border rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Sort dropdown */}
        <div className="mb-4 flex items-center">
          <span className="mr-2 text-gray-600">Filtrar por fecha</span>
          <button className="bg-white border rounded p-2 flex items-center">
            <ChevronDown className="text-gray-400" />
          </button>
          <button className="ml-auto">
            <img
              src="/api/placeholder/24/24"
              alt="Filter"
              className="w-6 h-6"
            />
          </button>
        </div>

        {/* Patient card */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-3">
            <img
              src="/api/placeholder/50/50"
              alt="Doctor"
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <h2 className="font-bold">Peritonitis</h2>
              <p className="text-sm text-gray-600">
                ¿Cómo se siente después de su alta?
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="bg-red-500 text-white px-4 py-2 rounded-full flex-grow">
              Ayuda urgente
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-full flex-grow"
              onClick={openModal}
            >
              Califique aquí
            </button>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-center">
              ¿Cómo te sientes hoy?
            </h2>

            {/* Emojis para seleccionar */}
            <div className="grid grid-cols-2 gap-6 justify-items-center">
              <div
                onClick={() => handleReaction("😊")}
                className="cursor-pointer animate-bounce"
              >
                <span className="text-6xl">😊</span>
              </div>
              <div
                onClick={() => handleReaction("😞")}
                className="cursor-pointer animate-bounce"
              >
                <span className="text-6xl">😞</span>
              </div>
              <div
                onClick={() => handleReaction("😐")}
                className="cursor-pointer animate-bounce"
              >
                <span className="text-6xl">😐</span>
              </div>
              <div
                onClick={() => handleReaction("😠")}
                className="cursor-pointer animate-bounce"
              >
                <span className="text-6xl">😠</span>
              </div>
            </div>

            {/* Botón para cerrar el modal */}
            <button
              className="bg-red-500 text-white px-4 py-2 mt-6 rounded hover:bg-red-600 w-full"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default HomePatient;

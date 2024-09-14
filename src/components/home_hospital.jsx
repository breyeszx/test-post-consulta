"use client";

import React, { useEffect, useState } from "react";
import { Search, ChevronDown, List } from "lucide-react";

// Componente para la tarjeta del paciente
const PatientCard = ({
  name,
  condition,
  lastReport,
  diagnosis,
  status,
  reaction,
}) => (
  <div className="flex w-full items-center p-2 border-b">
    <div className="w-12 h-12 bg-gray-500 rounded-full mr-3"></div>
    <div className="flex-grow">
      <h3 className="font-semibold text-black">
        {name} <span className="font-normal">({condition})</span>
      </h3>
      <p className="text-sm text-gray-900">
        Paciente con {condition} dado de alta el {lastReport}
      </p>
      <div className="flex justify-between mt-1">
        <span className="text-sm text-black">Último reporte</span>
        <span className="text-sm text-black">Diagnóstico</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm font-semibold text-black">{lastReport}</span>
        <span
          className={`text-sm px-2 py-1 rounded ${
            status === "bien"
              ? "bg-green-200 text-green-800"
              : status === "estable"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {diagnosis}
        </span>
      </div>
      {/* Mostrar la reacción del paciente */}
      {reaction && (
        <div className="mt-2">
          <span className="text-lg">{reaction.reaction}</span>{" "}
          {/* Mostramos el emoji */}
          <span className="text-sm text-gray-600 ml-2">
            Reacción enviada: {new Date(reaction.timestamp).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  </div>
);

const HomeComponent = () => {
  const [patients, setPatients] = useState([
    {
      name: "Robert Williams",
      condition: "Peritonitis",
      lastReport: "04/09/2024",
      diagnosis: "Se encuentra bien",
      status: "bien",
    },
    {
      name: "Luis Alcalde",
      condition: "Rinofaringitis",
      lastReport: "04/09/2024",
      diagnosis: "Está estable",
      status: "estable",
    },
    {
      name: "Álvaro Pérez",
      condition: "Post Cirugía",
      lastReport: "04/09/2024",
      diagnosis: "Atención urgente",
      status: "urgente",
    },
    {
      name: "Lia Rebolledo",
      condition: "Peritonitis",
      lastReport: "04/09/2024",
      diagnosis: "Se encuentra bien",
      status: "bien",
    },
  ]);

  const [reactions, setReactions] = useState({});

  // Obtener reacciones del backend
  const fetchReactions = async (patientName) => {
    try {
      const response = await fetch(
        `/api/send-reaction?patient=${encodeURIComponent(patientName)}`
      );
      const data = await response.json();
      return data.length > 0 ? data[data.length - 1] : null; // Devolver la última reacción si existe
    } catch (error) {
      console.error("Error al obtener reacciones:", error);
      return null;
    }
  };

  // Long polling para obtener las reacciones continuamente
  useEffect(() => {
    const loadReactions = async () => {
      const updatedPatients = await Promise.all(
        patients.map(async (patient) => {
          const reaction = await fetchReactions(patient.name);
          return { ...patient, reaction }; // Agregar la reacción al objeto del paciente
        })
      );
      setPatients(updatedPatients);
    };

    loadReactions();

    // Repetir cada 5 segundos
    const intervalId = setInterval(loadReactions, 60000);

    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
  }, [patients]);

  return (
    <div className="w-full min-h-screen mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full p-2 text-black border rounded-lg pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-white" size={20} />
        </div>
        <div className="flex justify-between items-center mb-4">
          <button className="flex items-center bg-gray-600 px-3 py-1 rounded">
            Sort by time
            <ChevronDown size={20} className="ml-2" />
          </button>
          <button className="bg-gray-600 p-1 rounded">
            <List size={20} />
          </button>
        </div>
        {patients.map((patient, index) => (
          <PatientCard key={index} {...patient} />
        ))}
      </div>
    </div>
  );
};

export default HomeComponent;

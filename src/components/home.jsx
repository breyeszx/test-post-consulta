import React from 'react';
import { Search, ChevronDown, Home, List, Bell, User } from 'lucide-react';

const PatientCard = ({ name, condition, lastReport, diagnosis, status }) => (
  <div className="flex items-center p-2 border-b">
    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
    <div className="flex-grow">
      <h3 className="font-semibold">{name} <span className="font-normal">({condition})</span></h3>
      <p className="text-sm text-gray-600">Paciente con {condition} dado de alta el {lastReport}</p>
      <div className="flex justify-between mt-1">
        <span className="text-sm">Ultimo reporte</span>
        <span className="text-sm">Diagnostico</span>
      </div>
      <div className="flex justify-between">
        <span className="text-sm font-semibold">{lastReport}</span>
        <span className={`text-sm px-2 py-1 rounded ${
          status === 'bien' ? 'bg-green-200 text-green-800' :
          status === 'estable' ? 'bg-yellow-200 text-yellow-800' :
          'bg-red-200 text-red-800'
        }`}>
          {diagnosis}
        </span>
      </div>
    </div>
  </div>
);

const HomeComponent = () => {
  const patients = [
    { name: 'Robert Williams', condition: 'Peritonitis', lastReport: '04/09/2024', diagnosis: 'Se encuentra bien', status: 'bien' },
    { name: 'Luis Alcalde', condition: 'Rinofaringitis', lastReport: '04/09/2024', diagnosis: 'Esta estable', status: 'estable' },
    { name: 'Álvaro Pérez', condition: 'Post Cirugía', lastReport: '04/09/2024', diagnosis: 'Atencion urgente', status: 'urgente' },
    { name: 'Robert Williams', condition: 'Peritonitis', lastReport: '04/09/2024', diagnosis: 'Se encuentra bien', status: 'bien' },
  ];

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-semibold">Reportería</h2>
      </div>
      <div className="p-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full p-2 border rounded-lg pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="flex justify-between items-center mb-4">
          <button className="flex items-center bg-gray-100 px-3 py-1 rounded">
            Sort by time
            <ChevronDown size={20} className="ml-2" />
          </button>
          <button className="bg-gray-100 p-1 rounded">
            <List size={20} />
          </button>
        </div>
        {patients.map((patient, index) => (
          <PatientCard key={index} {...patient} />
        ))}
      </div>
      <div className="flex justify-around py-3 bg-gray-100">
        <Home size={24} />
        <List size={24} />
        <Search size={24} />
        <Bell size={24} />
        <User size={24} />
      </div>
    </div>
  );
};

export default HomeComponent;
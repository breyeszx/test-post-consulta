"use client";

import React, { useState } from "react";
import { Search, ChevronDown, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import { patients } from "@/lib/patients";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const PatientCard = ({
  id,
  name,
  condition,
  lastReport,
  diagnosis,
  status,
  reaction,
}) => (
  <Link href={`/patient/${id}`} className="block w-full">
    <div className="flex w-full items-start p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 mb-4 bg-white">
      <Avatar className="h-16 w-16 rounded-full mr-6">
        <AvatarImage
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
          alt={name}
          className="rounded-full"
        />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-grow space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{condition}</p>
          </div>
          <Badge
            className={`${
              status === "bien"
                ? "bg-green-100 text-green-800"
                : status === "estable"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {status}
          </Badge>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Último reporte:{" "}
            <span className="font-medium text-gray-900">{lastReport}</span>
          </span>
          <span className="text-gray-600">
            Diagnóstico:{" "}
            <span className="font-medium text-gray-900">{diagnosis}</span>
          </span>
        </div>
        {reaction && (
          <div className="mt-2 p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-900">
              Última reacción:
            </p>
            <p className="text-base text-gray-800">{reaction.reaction}</p>
            <p className="text-xs text-gray-500 mt-1">
              Enviada: {new Date(reaction.timestamp).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  </Link>
);

const diseases = [
  "Peritonitis",
  "Rinofaringitis",
  "Post Cirugía",
  "Diabetes",
  "Hipertensión",
  "Asma",
  "Artritis",
];

export function AddPatientModal({ onAddPatient }) {
  const [newPatient, setNewPatient] = useState({
    name: "",
    lastName: "",
    rut: "",
    phone: "",
    email: "",
    disease: "",
    significantPerson: {
      name: "",
      lastName: "",
      phone: "",
      email: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("significantPerson.")) {
      const field = name.split(".")[1];
      setNewPatient((prev) => ({
        ...prev,
        significantPerson: { ...prev.significantPerson, [field]: value },
      }));
    } else {
      setNewPatient((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDiseaseChange = (value) => {
    setNewPatient((prev) => ({ ...prev, disease: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPatient(newPatient);
    setNewPatient({
      name: "",
      lastName: "",
      rut: "",
      phone: "",
      email: "",
      disease: "",
      significantPerson: {
        name: "",
        lastName: "",
        phone: "",
        email: "",
      },
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4 bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Agregar Usuario
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white shadow-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Agregar Nuevo Usuario
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              name="name"
              value={newPatient.name}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              Apellido
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={newPatient.lastName}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rut" className="text-right">
              RUT
            </Label>
            <Input
              id="rut"
              name="rut"
              value={newPatient.rut}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Teléfono
            </Label>
            <Input
              id="phone"
              name="phone"
              value={newPatient.phone}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Correo
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={newPatient.email}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="disease" className="text-right">
              Enfermedad
            </Label>
            <Select
              value={newPatient.disease}
              onValueChange={handleDiseaseChange}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccione una enfermedad" />
              </SelectTrigger>
              <SelectContent>
                {diseases.map((disease) => (
                  <SelectItem key={disease} value={disease}>
                    {disease}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-6 mb-2">
            <h3 className="text-lg font-semibold">Persona Significativa</h3>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="significantPerson.name" className="text-right">
              Nombre
            </Label>
            <Input
              id="significantPerson.name"
              name="significantPerson.name"
              value={newPatient.significantPerson.name}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="significantPerson.lastName" className="text-right">
              Apellido
            </Label>
            <Input
              id="significantPerson.lastName"
              name="significantPerson.lastName"
              value={newPatient.significantPerson.lastName}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="significantPerson.phone" className="text-right">
              Teléfono
            </Label>
            <Input
              id="significantPerson.phone"
              name="significantPerson.phone"
              value={newPatient.significantPerson.phone}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="significantPerson.email" className="text-right">
              Correo
            </Label>
            <Input
              id="significantPerson.email"
              name="significantPerson.email"
              type="email"
              value={newPatient.significantPerson.email}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <Button type="submit" className="ml-auto">
            Guardar Paciente
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const HomeComponent = () => {
  const [patientList, setPatientList] = useState(patients);

  const handleAddPatient = (newPatient) => {
    setPatientList((prevPatients) => [
      ...prevPatients,
      {
        id: prevPatients.length + 1,
        name: `${newPatient.name} ${newPatient.lastName}`,
        condition: newPatient.disease,
        lastReport: new Date().toLocaleDateString(),
        diagnosis: "Pendiente",
        status: "estable",
        significantPerson: newPatient.significantPerson,
      },
    ]);
  };

  return (
    <div className="w-full min-h-screen mx-auto bg-gray-50 shadow-lg  overflow-hidden pb-12">
      <header className="bg-blue-600 text-primary-foreground p-4 flex items-center">
        <span className="font-semibold">Usuario</span>
      </header>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Lista de Pacientes
          </h1>
          <AddPatientModal onAddPatient={handleAddPatient} />
        </div>
        <div className="space-y-4">
          {patientList.map((patient) => (
            <PatientCard key={patient.id} {...patient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;

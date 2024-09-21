"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { patients } from "@/lib/patients";
import {
  ArrowLeft,
  Calendar,
  Clipboard,
  HeartPulse,
  MessageCircle,
  User,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PatientProfile = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newSignificantPerson, setNewSignificantPerson] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editPersonIndex, setEditPersonIndex] = useState(null);
  const [editPersonData, setEditPersonData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "bien":
        return "bg-green-100 text-green-800";
      case "estable":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  // Find the corresponding patient
  const patientData = patients.find((patient) => patient.id === parseInt(id));
  const [patient, setPatient] = useState(patientData);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Paciente no encontrado
        </h1>
        <Button
          onClick={() => router.push("/home-hospital")}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la lista de pacientes
        </Button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSignificantPerson((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditPersonData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPatient((prevPatient) => ({
      ...prevPatient,
      significantPerson: [
        ...(prevPatient.significantPerson || []),
        newSignificantPerson,
      ],
    }));
    setNewSignificantPerson({
      name: "",
      email: "",
      phone: "",
    });
    setIsModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedPersons = [...patient.significantPerson];
    updatedPersons[editPersonIndex] = editPersonData;
    setPatient((prevPatient) => ({
      ...prevPatient,
      significantPerson: updatedPersons,
    }));
    setEditPersonData({ name: "", email: "", phone: "" });
    setIsEditModalOpen(false);
  };

  const openEditModal = (index) => {
    setEditPersonIndex(index);
    setEditPersonData(patient.significantPerson[index]);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 pb-16">
      <Button
        onClick={() => router.push("/home-hospital")}
        className="mb-6 bg-blue-600 text-white hover:bg-blue-700"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la lista de pacientes
      </Button>

      <div className="max-w-3xl mx-auto">
        <Card className="bg-white rounded-lg shadow-lg mb-6">
          <CardHeader className="flex items-center space-x-4 py-4 border-b border-gray-200">
            <Avatar className="h-16 w-16 rounded-full">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${patient.name}`}
                alt={patient.name}
                className="rounded-full"
              />
              <AvatarFallback>
                {patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {patient.name}
              </CardTitle>
              <CardDescription className="text-gray-500">
                {patient.condition}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-sm">
                  Último reporte: {patient.lastReport}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clipboard className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-sm">Diagnóstico:</span>
                <Badge
                  variant="outline"
                  className={`ml-2 px-2 py-1 rounded-md text-sm ${getStatusColor(
                    patient.status
                  )}`}
                >
                  {patient.diagnosis}
                </Badge>
              </div>
              <div className="flex items-center text-gray-600">
                <HeartPulse className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-sm">Estado: {patient.status}</span>
              </div>
              {patient.reaction && (
                <Card className="bg-gray-50 border border-gray-200 rounded-lg">
                  <CardHeader className="py-4 px-6 border-b border-gray-200">
                    <CardTitle className="text-lg font-semibold text-gray-700">
                      Última Reacción
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-4 px-6">
                    <div className="flex items-center">
                      <MessageCircle className="mr-2 h-4 w-4 opacity-70" />
                      <span className="text-2xl font-medium text-gray-900">
                        {patient.reaction.reaction}
                      </span>
                      <span className="ml-4 text-sm text-gray-500">
                        {new Date(patient.reaction.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CardContent>
        </Card>

        {patient.significantPerson && patient.significantPerson.length > 0 ? (
          <Card className="mb-6 bg-white rounded-lg shadow-lg">
            <CardHeader className="flex items-center space-x-4 py-4 border-b border-gray-200">
              <User className="h-8 w-8 text-gray-500" />
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Persona Significativa
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {patient.significantPerson.map((person, index) => (
                <div key={index} className="grid gap-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Nombre:</span>
                    <span>{person.name}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Correo:</span>
                    <span>{person.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium mr-2">Teléfono:</span>
                    <span>{person.phone}</span>
                  </div>
                  <Button
                    onClick={() => openEditModal(index)}
                    className="mt-2 flex items-center bg-blue-600 hover:bg-blue-700 text-sm"
                  >
                    <Edit className="mr-2 h-4 w-4 " /> Editar
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}

        {/* Add Person Modal */}
        {/* <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="mt-6 pb-2 mx-auto block">
              Añadir Persona Significativa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white text-black">
            <DialogHeader>
              <DialogTitle className="text-black">
                Añadir Persona Significativa
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-black">
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newSignificantPerson.name}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 text-black"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-black">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newSignificantPerson.email}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 text-black"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-black">
                  Número de Teléfono
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={newSignificantPerson.phone}
                  onChange={handleInputChange}
                  required
                  className="border-gray-300 text-black"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 text-primary-foreground hover:bg-primary/90"
              >
                Guardar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
 */}
        {/* Edit Person Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white text-black">
            <DialogHeader>
              <DialogTitle className="text-black">
                Editar Persona Significativa
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-black">
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={editPersonData.name}
                  onChange={handleEditInputChange}
                  required
                  className="border-gray-300 text-black"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-black">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editPersonData.email}
                  onChange={handleEditInputChange}
                  required
                  className="border-gray-300 text-black"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-black">
                  Número de Teléfono
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={editPersonData.phone}
                  onChange={handleEditInputChange}
                  required
                  className="border-gray-300 text-black"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600  text-primary-foreground hover:bg-blue-700"
              >
                Guardar Cambios
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PatientProfile;

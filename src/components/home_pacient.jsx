"use client";

import React, { useState } from "react";
import { Search, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function HomePatient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [reactions, setReactions] = useState({});
  const [comments, setComments] = useState({});
  const [showThankYou, setShowThankYou] = useState(false);

  const questions = [
    "¿Cómo te sientes hoy?",
    "¿Cómo calificarías tu dolor?",
    "¿Cómo ha sido tu sueño?",
    "¿Cómo es tu nivel de energía?",
  ];

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentQuestion(0);
    setReactions({});
    setComments({});
    setShowThankYou(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowThankYou(false);
  };

  const handleReaction = (selectedReaction) => {
    setReactions({ ...reactions, [currentQuestion]: selectedReaction });
  };

  const handleCommentChange = (event) => {
    setComments({ ...comments, [currentQuestion]: event.target.value });
  };

  const handleNextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      try {
        // Save data to local storage
        const data = {
          reactions: reactions,
          comments: comments,
          patient: "Lia Rebolledo",
          timestamp: new Date().toISOString(),
        };
        const existingData = JSON.parse(
          localStorage.getItem("patientReactions") || "[]"
        );
        existingData.push(data);
        localStorage.setItem("patientReactions", JSON.stringify(existingData));

        // Call API for consistency (optional)
        await fetch("/api/send-reactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        console.log("Reacciones y comentarios guardados correctamente");
        setShowThankYou(true);
      } catch (error) {
        console.error("Error al guardar las reacciones y comentarios:", error);
      }
    }
  };

  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-primary-foreground p-4 flex items-center">
        <span className="font-semibold"></span>
        <User className="ml-auto h-6 w-6" />
      </header>

      <main className="flex-grow p-4">
        <div className="relative mb-4">
          <Input type="text" placeholder="Search here..." className="pl-10" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="mb-4 flex items-center">
          <span className="mr-2 text-gray-600">Filtrar por fecha</span>
          <Button variant="outline" size="icon">
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="ml-auto">
            <img
              src="/placeholder.svg?height=24&width=24"
              alt="Filter"
              className="w-6 h-6"
            />
          </Button>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <img
                src="/placeholder.svg?height=50&width=50"
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
              <Button variant="destructive" className="flex-grow">
                Ayuda urgente
              </Button>
              <Button
                variant="primary"
                className="flex-grow bg-blue-600 text-white"
                onClick={openModal}
              >
                Califique aquí
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-lg">
          {!showThankYou ? (
            <>
              <DialogHeader>
                <DialogTitle>{questions[currentQuestion]}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-6 justify-items-center mb-4">
                {["😊", "😐", "😞", "😠"].map((emoji) => (
                  <div
                    key={emoji}
                    onClick={() => handleReaction(emoji)}
                    className={`cursor-pointer p-2 rounded-full transition-all ${
                      reactions[currentQuestion] === emoji
                        ? "outline outline-4 outline-primary animate-pulse"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-6xl">{emoji}</span>
                  </div>
                ))}
              </div>
              {isLastQuestion && (
                <Textarea
                  placeholder="Ingrese sus comentarios aquí (opcional)"
                  value={comments[currentQuestion] || ""}
                  onChange={handleCommentChange}
                  className="w-full mb-4"
                />
              )}
              <DialogFooter>
                <Button variant="outline" onClick={closeModal}>
                  Cerrar
                </Button>
                <Button
                  variant="default"
                  className="bg-blue-600"
                  onClick={handleNextQuestion}
                >
                  {!isLastQuestion ? "Siguiente" : "Finalizar"}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>¡Gracias por sus respuestas!</DialogTitle>
              </DialogHeader>
              <p className="text-center py-4">
                Apreciamos su tiempo y feedback. Sus respuestas nos ayudan a
                mejorar nuestro servicio.
              </p>
              <DialogFooter>
                <Button variant="default" onClick={closeModal}>
                  Cerrar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

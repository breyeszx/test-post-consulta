"use client";

import React, { useState } from "react";
import { User, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [reactions, setReactions] = useState({});
  const [comment, setComment] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const questions = [
    "¿Siente dolor de cabeza?",
    "¿Siente dolor corporal?",
    "¿Tiene fiebre?",
    "¿Tiene malestar estomacal?",
    "Déjanos un comentario",
  ];

  const emojis = ["😢", "😕", "😐", "🙂", "😄"];

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentQuestion(0);
    setReactions({});
    setComment("");
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
    setComment(event.target.value);
  };

  const handleNextQuestion = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      try {
        // Save data to local storage
        const data = {
          reactions: reactions,
          comment: comment,
          patient: "Lia Rebolledo",
          timestamp: new Date().toISOString(),
        };
        const existingData = JSON.parse(
          localStorage.getItem("patientReactions") || "[]"
        );
        existingData.push(data);
        localStorage.setItem("patientReactions", JSON.stringify(existingData));

        console.log("Reacciones y comentario guardados correctamente");
        setShowThankYou(true);
      } catch (error) {
        console.error("Error al guardar las reacciones y comentario:", error);
      }
    }
  };

  const handleUrgentHelp = () => {
    setIsAlertModalOpen(true);
  };

  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-primary-foreground p-4 flex items-center">
        <span className="font-semibold">Usuario</span>
      </header>

      <main className="flex-grow p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Peritonitis</h2>
                <p className="text-lg text-gray-600">
                  ¿Cómo se siente después de su alta?
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="destructive"
                className="flex-grow text-lg py-6"
                onClick={handleUrgentHelp}
              >
                Ayuda urgente
              </Button>
              <Button
                variant="primary"
                className="flex-grow bg-blue-600 text-white text-lg py-6"
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
                <DialogTitle className="text-xl">
                  {questions[currentQuestion]}
                </DialogTitle>
              </DialogHeader>
              {!isLastQuestion ? (
                <div className="flex justify-between mb-4">
                  {emojis.map((emoji, index) => (
                    <div
                      key={index}
                      onClick={() => handleReaction(emoji)}
                      className={`cursor-pointer p-2 w-16 h-16 border-2 rounded-full transition-all flex items-center justify-center ${
                        reactions[currentQuestion] === emoji
                          ? "bg-blue-100 border-blue-600"
                          : "border-gray-300 hover:border-blue-600"
                      }`}
                    >
                      <span
                        className="text-3xl"
                        role="img"
                        aria-label={`Reacción ${index + 1}`}
                      >
                        {emoji}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <Textarea
                  placeholder="Ingrese su comentario aquí"
                  value={comment}
                  onChange={handleCommentChange}
                  className="w-full mb-4"
                  rows={5}
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
                <DialogTitle className="text-xl">
                  ¡Gracias por sus respuestas!
                </DialogTitle>
              </DialogHeader>
              <p className="text-center py-4 text-lg">
                Apreciamos su tiempo y feedback. Sus respuestas nos ayudan a
                mejorar nuestro servicio.
              </p>
              <DialogFooter>
                <Button
                  variant="default"
                  onClick={closeModal}
                  className="w-full"
                >
                  Cerrar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAlertModalOpen} onOpenChange={setIsAlertModalOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-6 w-6" />
              Alerta de Ayuda Urgente
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-lg mb-4">
              Se ha notificado al hospital y a su persona significativa sobre su
              solicitud de ayuda urgente.
            </p>
            <p className="text-center text-lg">
              Un equipo médico se pondrá en contacto con usted a la brevedad.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="default"
              onClick={() => setIsAlertModalOpen(false)}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

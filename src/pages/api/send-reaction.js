let reactions = []; // Almacenamos las reacciones temporalmente en memoria

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { reaction, patient } = req.body;

    if (!reaction || !patient) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    // Guardamos la reacción en memoria
    reactions.push({ reaction, patient, timestamp: new Date() });
    console.log('Reacciones almacenadas:', reactions); // Verifica que las reacciones se estén almacenando
    return res.status(200).json({ message: 'Reacción recibida correctamente' });
  }

  if (req.method === 'GET') {
    const { patient } = req.query;

    if (patient) {
      // Filtrar por paciente específico
      const patientReactions = reactions.filter(r => r.patient === patient);
      console.log('Reacciones filtradas para el paciente:', patientReactions); // Verifica qué reacciones se están filtrando
      return res.status(200).json(patientReactions);
    }

    return res.status(200).json(reactions); // Devuelve todas las reacciones si no se pasa ningún paciente
  }

  return res.status(405).json({ message: 'Método no permitido' });
}

let messages = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Devolver todos los mensajes cuando se haga una solicitud GET
    res.status(200).json(messages);
  } else if (req.method === 'POST') {
    // Añadir un mensaje nuevo cuando se haga una solicitud POST
    const { user, text } = req.body;
    const newMessage = { id: Date.now(), user, text };
    messages.push(newMessage);

    // Limitar los mensajes a los últimos 100 para evitar desbordamiento de memoria
    if (messages.length > 100) messages = messages.slice(-100);

    res.status(201).json(newMessage);
  }
}

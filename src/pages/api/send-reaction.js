export default function handler(req, res) {
  if (req.method === "POST") {
    // In a real application, you might want to do some server-side processing here
    // For now, we'll just send a success response
    res.status(200).json({ message: "Reactions received" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default function handler(req, res) {
  if (req.method === "POST") {
    const { role, ...userData } = req.body;

    // In a real application, you would validate the data and save it to a database here
    // For this example, we'll just generate a mock token
    const token = Buffer.from(JSON.stringify({ role, ...userData })).toString(
      "base64"
    );

    res.status(200).json({ token, role });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

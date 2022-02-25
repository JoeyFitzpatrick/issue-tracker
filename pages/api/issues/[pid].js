export default function handler(req, res) {
  const { pid } = req.query;
  res.status(200).json({ name: pid })
}

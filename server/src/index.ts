import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`MANORAMA AI DESK — BACKEND ENGINE ACTIVE`);
  console.log(`Listening on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Configured (Live Mode)' : 'None (Deterministic Demo Mode Active)'}`);
  console.log(`===============================================`);
});

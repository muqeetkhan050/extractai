import React, { useState } from "react";
import  extractText  from "./ocrService";

const Text = () => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setExtractedText("");
  };

  const handleExtract = async () => {
    if (!image) return;
    setLoading(true);
    setProgress(0);
    try {
      const text = await extractText(image, (m) => {
        if (m.status === "recognizing text") {
          setProgress(Math.round(m.progress * 100));
        }
      });
      setExtractedText(text);
    } catch {
      setExtractedText("Error extracting text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="FrontContent">
      <h1>Snap. Scan. Read.</h1>
      <p>Upload your image and extract text instantly.</p>

      <input type="file" accept="image/*" onChange={handleUpload} />
      <br />
      <button
        onClick={handleExtract}
        style={{ marginTop: "15px", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer" }}
      >
        {loading ? `Extracting... ${progress}%` : "Extract Text"}
      </button>

      {image && (
        <div style={{ marginTop: "20px" }}>
          <img src={image} alt="preview" style={{ maxWidth: "250px", borderRadius: "10px" }} />
        </div>
      )}

      {extractedText && (
        <textarea
          value={extractedText}
          readOnly
          rows={10}
          style={{ marginTop: "20px", width: "100%", padding: "10px", borderRadius: "8px" }}
        />
      )}
    </div>
  );
};

export default Text;


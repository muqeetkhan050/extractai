// import React, { useState } from "react";
// import  extractText  from "./ocrService";

// const Text = () => {
//   const [image, setImage] = useState(null);
//   const [extractedText, setExtractedText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const handleUpload = (e) => {
//     setImage(URL.createObjectURL(e.target.files[0]));
//     setExtractedText("");
//   };

//   const handleExtract = async () => {
//     if (!image) return;
//     setLoading(true);
//     setProgress(0);
//     try {
//       const text = await extractText(image, (m) => {
//         if (m.status === "recognizing text") {
//           setProgress(Math.round(m.progress * 100));
//         }
//       });
//       setExtractedText(text);
//     } catch {
//       setExtractedText("Error extracting text.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="FrontContent">
//       <h1>Snap. Scan. Read.</h1>
//       <p>Upload your image and extract text instantly.</p>

//       <input type="file" accept="image/*" onChange={handleUpload} />
//       <br />
//       <button
//         onClick={handleExtract}
//         style={{ marginTop: "15px", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer" }}
//       >
//         {loading ? `Extracting... ${progress}%` : "Extract Text"}
//       </button>

//       {image && (
//         <div style={{ marginTop: "20px" }}>
//           <img src={image} alt="preview" style={{ maxWidth: "250px", borderRadius: "10px" }} />
//         </div>
//       )}

//       {extractedText && (
//         <textarea
//           value={extractedText}
//           readOnly
//           rows={10}
//           style={{ marginTop: "20px", width: "100%", padding: "10px", borderRadius: "8px" }}
//         />
//       )}
//     </div>
//   );
// };

// export default Text;


 
import React, { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";

// Mock extractText function since we don't have the actual service
const extractText = async (image, onProgress) => {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.1;
      onProgress({ status: "recognizing text", progress });
      if (progress >= 1) {
        clearInterval(interval);
        resolve("This is sample extracted text from the image. In a real application, this would be the actual OCR result from the image processing service.");
      }
    }, 100);
  });
};

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

      <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
        <Upload size={20} />
        <span>Choose Image</span>
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </label>
      
      <br />
      
      <button
        onClick={handleExtract}
        disabled={loading}
        className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all duration-300 transform shadow-lg ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:scale-105 hover:shadow-xl text-white"
        }`}
        style={{ marginTop: "15px" }}
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Extracting... {progress}%</span>
          </>
        ) : (
          <>
            <FileText size={20} />
            <span>Extract Text</span>
          </>
        )}
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
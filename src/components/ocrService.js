import Tesseract from 'tesseract.js';

 const extractText = async (image, onProgress) => {
  try {
    const result = await Tesseract.recognize(image, "eng", {
      logger: (m) => {
        if (onProgress) onProgress(m);
      },
    });
    return result.data.text;
  } catch (err) {
    console.error("OCR error:", err);
    throw new Error("Failed to extract text");
  }
};


export default extractText;
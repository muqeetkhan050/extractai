
import React, { useState } from 'react';

const Text = () => {

    const [image, setImage] = useState(null)
    const [extractedText, setExtractedText] = useState("")
    const [loading, setLoading] = useState(false)
    const [Progress, setProgress] = useState(0)

    const handleUpload=(e)=>{
        const file=e.target.file[0]
        setImage(URL.createObjectURL(file))
        setExtractedText("Extracting text...")
        setLoading(true)
    }
    return (
        <div>
            <div className="literata">
                Images Speak. We Translate
                <p />
                Print('Paste,wait,COpy')

            </div>
            <input type='file' onClick={handleUpload}></input>
            <button >
                Get Started
            </button>

            {image && (<img src={image} alt="Uploaded" />)}

            {extractedText && (<textarea
                value={extractedText}
                readOnly
                rows={10}
                style={{ marginTop: "20px", width: "100%", padding: "10px", borderRadius: "8px" }}
            />)}


        </div>
    )
}

export default Text;




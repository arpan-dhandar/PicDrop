import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");

  // Your Live Render URL
  const API_BASE_URL = "https://picdrop-nm43.onrender.com";

  const handleFile = (file) => {
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);
  const handleBrowse = () => fileInputRef.current?.click();
  const handleFileChange = (e) => handleFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (!selectedFile) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("caption", caption);

    // FIXED: Using backticks for the variable and pointing to root "/"
    axios
      .post(`${API_BASE_URL}/`, formData) 
      .then((res) => {
        console.log("Upload Success:", res.data);
        navigate("/feed");
      })
      .catch((err) => {
        console.error("Upload Error:", err);
        alert("Error creating post. The server might be waking up—try again in 30 seconds.");
      });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-sans">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-10 w-full max-w-lg flex flex-col gap-5">
        <div className="text-center mb-2">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">PicDrop</h1>
          <p className="text-neutral-500 text-sm mt-2">Drop your moment into the vault</p>
        </div>

        <div
          onClick={handleBrowse}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-xl min-h-52 flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden transition-colors duration-200
            ${dragging ? "border-neutral-500 bg-neutral-800" : "border-neutral-700 bg-neutral-950"}`}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
          ) : (
            <>
              <svg className="text-neutral-600" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <span className="text-neutral-300 font-medium">Drop your image here</span>
              <span className="text-neutral-600 text-sm">or click to browse</span>
            </>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>

        <input
          type="text"
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 text-neutral-300 text-sm placeholder-neutral-600 outline-none focus:border-neutral-600 transition-colors w-full"
        />

        <button onClick={handleSubmit} className="bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-900 border border-neutral-700 hover:border-neutral-600 text-white font-bold text-sm tracking-widest rounded-xl py-4 w-full transition-colors duration-200">
          Drop
        </button>

        <button onClick={() => navigate("/feed")} className="text-neutral-500 hover:text-neutral-300 text-sm text-center transition-colors duration-200 bg-transparent border-none cursor-pointer">
          View Vault →
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
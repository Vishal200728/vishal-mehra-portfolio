import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [targetSize, setTargetSize] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [originalSize, setOriginalSize] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setOriginalSize((selectedFile.size / 1024).toFixed(2));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setStatus('');
    } else {
      setStatus('❌ Please select a valid image file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setStatus('Please select an image file');
      return;
    }
    
    const size = parseInt(targetSize);
    if (!size || size < 1 || size > 1024) {
      setStatus('Please enter a valid size between 1-1024 KB');
      return;
    }
    
    setLoading(true);
    setStatus('⏳ Converting...');
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('size', size);
    
    try {
     const res = await fetch('https://vishal-mehra-portfolio.onrender.com/api/convert', {
        method: 'POST',
        body: formData
      });
      
      if (!res.ok) {
        throw new Error('Conversion failed');
      }
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `compressed-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      URL.revokeObjectURL(url);
      setStatus('✅ Download Ready!');
      setFile(null);
      setPreview(null);
      setOriginalSize(null);
      setTargetSize('');
      e.target.reset();
      
    } catch (error) {
      setStatus('❌ Conversion failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white opacity-5 rounded-full animate-ping"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 animate-bounce-in">
          <div className="inline-block p-4 bg-white bg-opacity-20 rounded-full backdrop-blur-lg mb-4">
            <span className="text-6xl">🎨</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">
            Image Size Compressor
          </h1>
          <p className="text-white text-opacity-90 text-lg">
            Compress your images to exact size with magic ✨
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1">
            <div className="bg-white p-8">
              <form onSubmit={handleSubmit}>
                {/* File Upload Area */}
                <div
                  className={`relative border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer ${
                    dragActive 
                      ? 'border-purple-500 bg-purple-50 scale-105' 
                      : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={(e) => handleFile(e.target.files[0])}
                    className="hidden"
                  />
                  
                  {preview ? (
                    <div className="animate-fade-in">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="max-h-48 mx-auto rounded-lg shadow-lg mb-4"
                      />
                      <p className="text-green-600 font-semibold">
                        ✅ {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </p>
                    </div>
                  ) : (
                    <div className="animate-fade-in">
                      <div className="text-6xl mb-4">📸</div>
                      <p className="text-gray-600 font-medium mb-2">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-gray-400 text-sm">
                        Supports: JPG, PNG, WEBP (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>

                {/* Target Size Input */}
                {preview && (
                  <div className="mt-6 animate-slide-up">
                    <label className="block text-gray-700 font-semibold mb-2">
                      🎯 Target Size (KB)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Enter size (1 - 1024 KB)"
                        value={targetSize}
                        onChange={(e) => setTargetSize(e.target.value)}
                        min="1"
                        max="1024"
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300 pl-12"
                        required
                      />
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        📏
                      </span>
                    </div>
                    {originalSize && (
                      <p className="text-sm text-gray-500 mt-2">
                        Original size: {originalSize} KB
                      </p>
                    )}
                  </div>
                )}

                {/* Convert Button */}
                {preview && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-8 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform active:scale-95"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Compressing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        🚀 Compress & Download
                      </span>
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className={`mt-6 animate-slide-up text-center p-4 rounded-xl backdrop-blur-lg ${
            status.includes('✅') 
              ? 'bg-green-500 bg-opacity-20 text-green-100' 
              : status.includes('❌')
              ? 'bg-red-500 bg-opacity-20 text-red-100'
              : 'bg-blue-500 bg-opacity-20 text-blue-100'
          }`}>
            <p className="font-semibold text-lg">{status}</p>
          </div>
        )}

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 text-center text-white">
            <div className="text-3xl mb-2">⚡</div>
            <p className="font-semibold">Fast Compression</p>
            <p className="text-sm text-white text-opacity-75">Instant results</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 text-center text-white">
            <div className="text-3xl mb-2">🎯</div>
            <p className="font-semibold">Exact Size Control</p>
            <p className="text-sm text-white text-opacity-75">1-1024 KB target</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 text-center text-white">
            <div className="text-3xl mb-2">🔒</div>
            <p className="font-semibold">Privacy First</p>
            <p className="text-sm text-white text-opacity-75">Auto file deletion</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
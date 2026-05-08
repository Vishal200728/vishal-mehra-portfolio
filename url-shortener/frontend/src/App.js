import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentUrls, setRecentUrls] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await axios.get('/api/urls');
      
      // ✅ FIX 1: Ensure response.data is an array before using .slice()
      const urls = Array.isArray(response.data) ? response.data : [];
      setRecentUrls(urls.slice(0, 5));
      
    } catch (error) {
      console.error('Error fetching URLs:', error);
      setRecentUrls([]); // ✅ FIX 2: Set empty array on error
      toast.error('Failed to fetch recent URLs');
    }
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      new URL(url);
    } catch {
      toast.error('Please enter a valid URL (include http:// or https://)');
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post('/api/shorten', { originalUrl: url });
      
      // ✅ FIX 3: Safely extract shortUrl
      const newShortUrl = response.data?.shortUrl || response.data?.data?.shortUrl;
      setShortUrl(newShortUrl);
      
      toast.success('URL shortened successfully! 🎉');
      fetchUrls();
      setUrl('');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shortUrl) return; // ✅ FIX 4: Don't copy if no URL
    
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success('Copied to clipboard! 📋');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '10px',
          },
        }}
      />
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        
        {/* Floating Bubbles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-10 animate-float"
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">
        
        {/* Header */}
        <div className="text-center mb-12 animate-slide-down">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-2xl animate-float">
            <span className="text-5xl">🔗</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent animate-gradient">
            URL Shortener
          </h1>
          <p className="text-gray-300 mt-4 text-lg max-w-2xl mx-auto">
            Shorten your long URLs instantly with our fast and secure link shortener
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-4xl animate-slide-up">
          <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-1 shadow-2xl">
            <div className="bg-gray-900/50 rounded-2xl p-8">
              
              {/* Input Form */}
              <form onSubmit={handleShorten} className="mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter your long URL (https://example.com/very/long/url)"
                      className="w-full px-6 py-4 bg-gray-800 border-2 border-purple-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-all duration-300 pl-14"
                    />
                    <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl">🔗</span>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Shortening...
                      </>
                    ) : (
                      <>
                        <span>⚡</span> Shorten URL
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Result */}
              {shortUrl && (
                <div className="mt-6 p-6 bg-gray-800 rounded-xl border-2 border-purple-500 animate-scale-up">
                  <label className="text-gray-400 text-sm mb-2 block">Your Short URL:</label>
                  <div className="flex flex-col md:flex-row gap-3 items-center">
                    <div className="flex-1">
                      <div className="bg-gray-900 p-3 rounded-lg">
                        <code className="text-purple-400 break-all">{shortUrl}</code>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={copyToClipboard}
                        className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                      >
                        {copied ? '✅' : '📋'}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                      >
                        🔗 Visit
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full animate-fadeIn">
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 group">
            <div className="inline-block p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-4 group-hover:rotate-6 transition-transform">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Fast & Reliable</h3>
            <p className="text-gray-400 text-sm">Instant URL shortening with 99.9% uptime</p>
          </div>
          
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 group">
            <div className="inline-block p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg mb-4 group-hover:rotate-6 transition-transform">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Secure & Safe</h3>
            <p className="text-gray-400 text-sm">All your links are safe and secure</p>
          </div>
          
          <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 text-center hover:scale-105 transition-all duration-300 group">
            <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mb-4 group-hover:rotate-6 transition-transform">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Analytics</h3>
            <p className="text-gray-400 text-sm">Track clicks and performance</p>
          </div>
        </div>

        {/* Recent URLs - ✅ FIXED: Always show even if empty */}
        <div className="mt-12 max-w-4xl w-full animate-slide-up">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🕒</span> Recent Shortened URLs
          </h2>
          
          {/* ✅ FIX 5: Show message if no URLs */}
          {recentUrls.length === 0 ? (
            <div className="backdrop-blur-lg bg-white/5 rounded-lg p-8 text-center">
              <p className="text-gray-400">No URLs shortened yet. Try shortening one above! 🚀</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentUrls.map((item, index) => (
                <div key={item._id || index} className="backdrop-blur-lg bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-purple-400 font-mono text-sm break-all">
                        {item.shortUrl}
                      </p>
                      <p className="text-gray-500 text-xs truncate mt-1">
                        {item.originalUrl}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const copyUrl = item.shortUrl;
                          if (copyUrl) {
                            navigator.clipboard.writeText(copyUrl);
                            toast.success('Copied!');
                          }
                        }}
                        className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        📋
                      </button>
                      <a
                        href={item.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        🔗
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-400 text-sm">
          <p>© 2024 URL Shortener | Shorten your links instantly</p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-scale-up { animation: scale-up 0.4s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-gradient { background-size: 200% auto; animation: gradient 3s linear infinite; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}

export default App;
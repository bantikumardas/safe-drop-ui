import React, { useState } from "react";
import Lodder from "../component/Lodder";
import Header from "../component/Header";

const Download = () => {
  const [key, setKey] = useState("");
  const [code, setCode] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowsuccessModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [uploadTime, setUploadTime] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleViewFile = (e) => {
    e.preventDefault();
    if (fileLink) {
      window.location.href =
        "https://file-share-backend-api.onrender.com/" + fileLink; // Opens in same tab
    } else {
      alert("File link not available");
    }
  };

  const handleDownloadFile = async (e) => {
    e.preventDefault();
    if (!fileLink) {
      alert("File link not available");
      return;
    }

    try {
      const response = await fetch(fileLink);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "downloaded-file"; // Fallback name
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Failed to download file");
      console.error(error);
    }
  };

  const formateFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const size = (bytes / Math.pow(k, i)).toFixed(2); // keep 2 decimal places
    return `${size} ${sizes[i]}`;
  };

  const formatEpochToDateTime = (epoch) => {
    // Convert to milliseconds if it's in seconds
    if (epoch.toString().length === 10) {
      epoch *= 1000;
    }

    const date = new Date(epoch);

    const pad = (n) => n.toString().padStart(2, "0");

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // months are 0-indexed
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // convert 0 to 12 for 12 AM
    hours = pad(hours);

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const handleDownload = (e) => {
    e.preventDefault();

    // Simulated validation (replace with actual API logic)
    if (key.trim() === "" || code.trim().length !== 4) {
      setErrorMsg("Invalid key or code. Please check your inputs.");
      setShowErrorModal(true);
      return;
    }
    setLoading(true);
    fetch(`http://localhost:8080/file/api/view?key=${key}&code=${code}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        setShowsuccessModal(true);
        setFileName(result.fileName);
        setFileLink(result.fileUrl);
        setFileSize(formateFileSize(result.fileSize));
        setUploadTime(formatEpochToDateTime(result.uploadTime));
      })
      .catch((error) => {
        setLoading(false);
        setShowErrorModal(true);
        setErrorMsg(error);
      });
    // Simulate download success (replace with real download logic)
    console.log("Initiating download for", { key, code });
    setCode("");
    setKey("");

    // For example: fetch file URL from backend and trigger download
    // window.open(fileUrl);
  };

  return (
    <>
      <Header></Header>
      {loading && <Lodder></Lodder>}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md relative">
          <h2 className="text-2xl font-semibold text-center mb-2">
            🔐 SafeDrop
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Enter your code and key to download the file.
          </p>

          <form onSubmit={handleDownload} className="space-y-4">
            {/* Code Input */}
            <div>
              <label className="block mb-1 font-medium">Code (4-digit)</label>
              <input
                type="text"
                maxLength={4}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="e.g. 1234"
                required
              />
            </div>

            {/* Key Input */}
            <div>
              <label className="block mb-1 font-medium">Key</label>
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter your secret key"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!code || !key}
              className={`w-full py-2 rounded text-white transition ${
                code && key
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Download File
            </button>
          </form>

          {/* ERROR MODAL */}
          {showErrorModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center relative">
                <h3 className="text-xl font-bold mb-2 text-red-600">
                  ❌ Error
                </h3>
                <p className="text-gray-700 mb-4">{errorMsg}</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => setShowErrorModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Success Modal */}
          {showSuccessModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center relative">
                {/* ❌ Close Button */}
                <button
                  onClick={() => setShowsuccessModal(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
                  aria-label="Close"
                >
                  &times;
                </button>

                <h3 className="text-xl font-bold mb-2 text-blue-600">
                  Your file is secure with us
                </h3>

                <p className="text-gray-700 mb-4">
                  <span className="font-semibold text-black">File Name:</span>{" "}
                  {fileName}
                </p>

                <p className="text-gray-700 mb-4">
                  <span className="font-semibold text-black">File Size:</span>{" "}
                  {fileSize}
                </p>

                <p className="text-gray-700 mb-6">
                  <span className="font-semibold text-black">
                    File Upload Time:
                  </span>{" "}
                  {uploadTime}
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleViewFile}
                  >
                    View File
                  </button>
                  <a
                    href={fileLink}
                    download={fileName || "downloaded-file"}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 inline-block text-center"
                  >
                    Download File
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Download;

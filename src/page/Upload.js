import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");
  const [maxDownloads, setMaxDownloads] = useState(1);
  const [email, setEmail] = useState(null);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [expiry, setExpiry] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);

  // Formats date to "YYYY-MM-DDTHH:MM" (datetime-local format)
  const formatDateTimeLocal = (date) => {
    return date.toISOString().slice(0, 16);
  };

  const onClickDone = (e) => {
    e.preventDefault();
    setShowModal(false);
    navigate("/");
  };

  // Calculate current time and max (4 months later)
  const now = new Date();
  const fourMonthsLater = new Date();
  fourMonthsLater.setMonth(fourMonthsLater.getMonth() + 4);

  // These values go in the input field
  const minDateTime = formatDateTimeLocal(now);
  const maxDateTime = formatDateTimeLocal(fourMonthsLater);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file || !key || !expiry) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    setLoading(true);
    setUploadProgress(0); // reset

    const dt = new Date(expiry);
    const expiryEpoch = Math.floor(dt.getTime() / 1000);

    const formData = new FormData();
    const jsonBlob = new Blob(
      [
        JSON.stringify({
          uniqueKey: key,
          expiryTime: expiryEpoch,
          maxDownloads: maxDownloads,
          emailId: email,
          senderName: name,
        }),
      ],
      { type: "application/json" }
    );

    formData.append("file", jsonBlob);
    formData.append("multipartFile", file);
    const baseUrl = process.env.REACT_APP_BACKEND_BASE_URL;
    console.log("base url is " + baseUrl);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${baseUrl}/file/api/upload`, true);

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    };

    // Handle response
    xhr.onload = () => {
      setLoading(false);
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        setGeneratedCode(result.code);
        setKey(result.uniqueKey);
        setShowModal(true);
        setIsEmailSent(result.isEmailSend);
      } else {
        alert("Upload failed.");
      }
    };

    xhr.onerror = () => {
      setLoading(false);
      alert("Network error.");
    };
    xhr.send(formData);
  };

  return (
    <>
      <Header></Header>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
        <div className="bg-white shadow-md rounded-md p-4 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Upload Your File to Safe Drop 🔐
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* File Input */}
            <div>
              <label className="block mb-1 font-medium">
                File <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                required
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* Key Input */}
            <div>
              <label className="block mb-1 font-medium">
                Key <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Enter a secret key"
              />
            </div>

            {/* Max Downloads Input */}
            <div>
              <label className="block mb-1 font-medium">Max Downloads</label>
              <input
                type="number"
                min={1}
                value={maxDownloads}
                onChange={(e) => setMaxDownloads(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            {/* Expiry Date & Time */}
            <div>
              <label className="block mb-1 font-medium">
                File Expiry Date & Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                min={minDateTime}
                max={maxDateTime}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            {/* Checkbox to show email/name fields */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showEmailFields"
                checked={showEmailFields}
                onChange={(e) => setShowEmailFields(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="showEmailFields" className="text-sm font-medium">
                Notify via Email
              </label>
            </div>

            {showEmailFields && (
              <>
                {/* Email Input */}
                <div>
                  <label className="block mb-1 font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter recipient email"
                    required
                  />
                </div>

                {/* Name Input */}
                <div>
                  <label className="block mb-1 font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter Your name"
                    required
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!file || !key}
              className={`w-full py-2 rounded text-white transition ${
                file && key
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Upload
            </button>
          </form>

          {/* MODAL */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center relative">
                <h3 className="text-xl font-bold mb-2">🔐 SafeDrop</h3>
                <p className="text-gray-700 mb-4">
                  Your file is ready to be downloaded securely.
                </p>
                <div className="relative text-left text-sm bg-gray-100 rounded-md px-4 py-3 mb-3">
                  {/* Copy Button */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `Key: ${key}, Code: ${generatedCode}`
                      );
                      alert("Copied to clipboard!");
                    }}
                    className="absolute top-2 right-2 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Copy
                  </button>

                  <p>
                    <strong>Key:</strong>{" "}
                    <code className="text-blue-600">{key}</code>
                  </p>
                  <p>
                    <strong>Code:</strong>{" "}
                    <code className="text-green-600">{generatedCode}</code>
                  </p>
                </div>

                {email && isEmailSent && (
                  <p
                    className={`text-sm mb-4 ${
                      isEmailSent ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    📧{" "}
                    {isEmailSent
                      ? "Email sent successfully to"
                      : "Failed to send email to"}{" "}
                    <strong>{email}</strong>
                  </p>
                )}

                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={onClickDone}
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-90 flex items-center justify-center">
          <div className="text-center">
            {/* You can use any loader GIF or animation here */}
            <img
              src="/lodder.gif" // Place a loader.gif inside public folder
              alt="Loading..."
              className="w-24 h-24 mx-auto mb-4 animate-spin"
            />
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <p className="text-sm text-gray-600">{uploadProgress}%</p>
            </div>
            <br></br>
            <p className="text-lg font-semibold text-gray-700">
              Uploading your file securely...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Upload;

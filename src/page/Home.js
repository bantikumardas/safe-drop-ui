import React from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <Header></Header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-2xl bg-white shadow-2xl rounded-2xl p-10">
          <img
            src="/safedrop.png" // Place a visual icon/image in public folder
            alt="Secure Upload"
            className="w-20 mx-auto mb-4"
          />
          <h2 className="text-4xl font-bold text-blue-800 mb-4">
            Welcome to SafeDrop
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Securely upload and share files with a secret key, expiry time, and
            download limits.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/upload"
              className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition duration-200"
            >
              Upload File
            </Link>
            <Link
              to="/download"
              className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md transition duration-200"
            >
              Download File
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="mt-10 grid sm:grid-cols-3 gap-6 text-left">
            <div>
              <h3 className="text-blue-700 font-bold">🔐 Secure</h3>
              <p className="text-gray-600 text-sm">
                Your file is encrypted and locked with a secret key.
              </p>
            </div>
            <div>
              <h3 className="text-blue-700 font-bold">⏰ Expiry</h3>
              <p className="text-gray-600 text-sm">
                Set a time limit — we’ll take care of the rest.
              </p>
            </div>
            <div>
              <h3 className="text-blue-700 font-bold">📥 Limited Downloads</h3>
              <p className="text-gray-600 text-sm">
                Restrict how many times your file can be downloaded.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6">
        &copy; {new Date().getFullYear()} SafeDrop. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

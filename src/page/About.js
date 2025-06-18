import React from "react";
import Header from "../component/Header";

const About = () => {
  return (
    <>
      <Header></Header>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4 flex justify-center items-start">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full">
          <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
            🔐 About SafeDrop
          </h1>

          <p className="text-gray-700 text-lg mb-6 text-center">
            SafeDrop is a simple and secure platform that enables you to share
            files confidently. Your privacy and control are our top priorities.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <h2 className="font-semibold text-blue-700 text-lg mb-2">
                💡 What is SafeDrop?
              </h2>
              <p className="text-gray-600 text-sm">
                SafeDrop allows users to upload files and generate a unique
                download code, protected with a secret key, download limits, and
                expiry times. It's a secure alternative for temporary file
                sharing without any login.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <h2 className="font-semibold text-blue-700 text-lg mb-2">
                🔒 Key Features
              </h2>
              <ul className="text-gray-600 text-sm list-disc pl-5 space-y-1">
                <li>Secret key protection</li>
                <li>Expiry time setup</li>
                <li>Download limit restriction</li>
                <li>Email notification support</li>
                <li>Real-time progress tracking</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded sm:col-span-2">
              <h2 className="font-semibold text-blue-700 text-lg mb-2">
                🚀 Our Mission
              </h2>
              <p className="text-gray-600 text-sm">
                We aim to simplify the way people exchange sensitive or
                temporary files while ensuring full control over who can access
                them and for how long. No logins, no trackers — just safe,
                simple file sharing.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded sm:col-span-2">
              <h2 className="font-semibold text-blue-700 text-lg mb-2">
                📬 Get in Touch
              </h2>
              <p className="text-gray-600 text-sm">
                Have feedback, feature requests, or found a bug? Feel free to
                contact us at{" "}
                <a
                  href="mailto:support@safedrop.app"
                  className="text-blue-600 font-medium underline"
                >
                  bkd957811@gmail.com
                </a>
                .
              </p>
            </div>
          </div>

          <footer className="mt-10 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SafeDrop. All rights reserved.
          </footer>
        </div>
      </div>
    </>
  );
};

export default About;

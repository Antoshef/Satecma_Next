"use client";

import { useState } from "react";
import { User } from "./api/auth/[auth0]/types";

export default function VerifyEmailModal({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResendVerification = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Имейлът за потвърждение е изпратен. Моля, проверете пощата си.",
        );
      } else {
        setMessage(
          data.message || "Грешка при изпращане на имейл за потвърждение.",
        );
      }
    } catch (error) {
      setMessage("Грешка при изпращане на имейл за потвърждение.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        !user.email_verified ? "block" : "hidden"
      }`}
      aria-labelledby="verify-email-modal"
    >
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold" id="verify-email-modal">
          Моля, потвърдете имейла си
        </h2>
        <p className="mt-4">
          Здравейте {user?.name}, моля, потвърдете имейла си, за да продължите.
          Проверете пощата си за връзка за потвърждение.
        </p>
        <p className="mt-2 text-sm">
          След като потвърдите имейла си, това съобщение ще изчезне и ще можете
          да продължите да използвате приложението.
        </p>
        <button
          onClick={handleResendVerification}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? "Изпращане..." : "Изпрати имейл за потвърждение"}
        </button>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { sendEmail } from "./actions";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const formData = new FormData(e.target);

    try {
      const result = await sendEmail(formData);
      if (result.success) {
        setStatus("Email sent successfully!");
        e.target.reset();
      } else {
        setStatus(`Error: ${result.message}`);
      }
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        Contact Us
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div>
          <label
            htmlFor="name"
            style={{ display: "block", fontSize: "14px", fontWeight: "medium" }}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            style={{ display: "block", fontSize: "14px", fontWeight: "medium" }}
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div>
          <label
            htmlFor="information"
            style={{ display: "block", fontSize: "14px", fontWeight: "medium" }}
          >
            Message
          </label>
          <textarea
            id="information"
            name="information"
            required
            rows="4"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: isSubmitting ? "#b0b0b0" : "#3b82f6",
            color: "white",
            borderRadius: "4px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
      {status && (
        <p style={{ marginTop: "16px", textAlign: "center" }}>{status}</p>
      )}
    </div>
  );
}

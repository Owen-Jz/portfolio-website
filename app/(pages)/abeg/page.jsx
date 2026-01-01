"use client";

import React, { useState } from "react";
import ContactSection from "@/app/components/ContactSection";
import FooterSection from "@/app/components/FooterSection";
import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import Button from "@/app/components/ui/Button";

const accounts = [
  {
    id: 1,
    name: "Brume Egbagba Owen",
    accountNumber: "0916471375",
    bank: "OPay",
  },
  {
    id: 2,
    name: "Brume Egbagba Owen",
    accountNumber: "0824064604",
    bank: "Access Bank",
  },
];

export default function Page() {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = async (text, id) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0A0A0A", color: "#F5F5F5" }}
    >
      <NavbarDemo />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Heading */}
        <section className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Send <span style={{ color: "#DC2626" }}>Owen</span> Funds Today
          </h1>
          <p className="mt-3 mx-auto max-w-2xl" style={{ color: "#9CA3AF" }}>
            Below are my accounts, please support this brethren in the lord.
            <br></br>Thank you—and God bless you...
            <br />
            ABEG!
          </p>
        </section>

        {/* Accounts Section */}
        <section className="mx-auto max-w-3xl">
          <div
            className="rounded-2xl shadow-md"
            style={{ backgroundColor: "#111111", border: "1px solid #1F1F1F" }}
          >
            <div style={{ borderBottom: "1px solid #1F1F1F" }} className="p-6">
              <h2
                className="text-lg font-semibold"
                style={{ color: "#FFFFFF" }}
              >
                Transfer Accounts
              </h2>
              <p className="text-sm mt-1" style={{ color: "#A3A3A3" }}>
                Tap{" "}
                <span style={{ fontWeight: "600", color: "#E5E5E5" }}>
                  Copy
                </span>{" "}
                to paste into your banking app.
              </p>
            </div>

            <ul>
              {accounts.map((account) => (
                <li
                  key={account.id}
                  className="p-6 transition"
                  style={{ borderBottom: "1px solid #1F1F1F" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p style={{ fontWeight: "500", color: "#FFFFFF" }}>
                          {account.name}
                        </p>
                        <span
                          style={{
                            backgroundColor: "#1A1A1A",
                            border: "1px solid #2C2C2C",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            color: "#CCCCCC",
                          }}
                        >
                          {account.bank}
                        </span>
                      </div>
                      <p
                        className="mt-1 text-2xl font-semibold tracking-wider"
                        style={{ color: "#F5F5F5" }}
                      >
                        {account.accountNumber}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>
                        Reference:{" "}
                        <span style={{ fontWeight: "500", color: "#E5E5E5" }}>
                          “Support Owen”
                        </span>
                      </p>
                    </div>

                    <div>
                      <Button
                        onClick={() =>
                          copyToClipboard(
                            `${account.accountNumber}`,
                            account.id
                          )
                        }
                        variant="primary"
                        className="hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        {copiedId === account.id ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-6 pb-6">
              <div
                className="mt-4 rounded-xl p-4 text-sm"
                style={{ backgroundColor: "#1A1A1A", color: "#D1D5DB" }}
              >
                <p className="font-medium mb-1" style={{ color: "#FFFFFF" }}>
                  Notes
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Please confirm the recipient name shows{" "}
                    <span style={{ fontWeight: "600" }}>
                      Brume Egbagba Owen
                    </span>
                    .
                  </li>
                  <li>
                    If you make a transfer, kindly send a receipt via the
                    contact form below.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <div className="mt-12">
          <ContactSection />
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

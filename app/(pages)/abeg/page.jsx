'use client'

import ContactSection from "@/app/components/ContactSection";
import FooterSection from "@/app/components/FooterSection";
import { NavbarDemo } from "@/app/components/ui/ResizableNavbar";
import React from "react";

const accounts = [
  { id: 1, name: "John Doe", accountNumber: "1234567890", bank: "Bank A" },
  { id: 2, name: "Jane Smith", accountNumber: "0987654321", bank: "Bank B" },
];

const page = () => {
  return (
    <div>
      <NavbarDemo />
      <div className="flex flex-col space-y-3.5 items-center justify-center mt-[100px]">
        <h1>Send Owen Funds Today</h1>
        <p>
          Below is a list of fundable account numbers, thank you and God bless
          you
        </p>
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Transfer Accounts</h2>
          <ul className="space-y-3">
            {accounts.map((account) => (
              <li
                key={account.id}
                className="p-3 border rounded hover:bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-gray-600">
                      {account.accountNumber}
                    </p>
                    <p className="text-sm text-gray-600">{account.bank}</p>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${account.accountNumber} - ${account.bank}`
                      )
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Copy
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <ContactSection />
        <FooterSection />
      </div>
    </div>
  );
};

export default page;

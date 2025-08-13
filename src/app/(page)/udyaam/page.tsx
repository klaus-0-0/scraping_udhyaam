"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface InputField {
  id?: string;
  name?: string;
  type?: string;
  maxlength?: string;
  placeholder?: string;
}

function Udyaam() {
  const [data, setData] = useState<InputField[]>([]);
  const [addharNumber, setAddharNumber] = useState("");
  const [addharName, setAddharName] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchAndParse() {
      try {
        const res = await fetch("/api/index");
        // const res = await fetch("http://localhost:3000/api/index");
        if (!res.ok) throw new Error("Network response was not ok");
        const json = await res.json();
        setData(json.input || []);
      } catch (err) {
        console.error("Error loading:", err);
      }
    }
    fetchAndParse();
  }, []);

  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/addharDemoApi", {
        addhar_Number: addharNumber,
        addhar_Name: addharName,
      });
      console.log("Response from API:", res.data);
      if (res) router.push("/signup");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start px-4 py-8 sm:px-6 lg:px-20">
      <header className="sticky top-0 w-full z-50 bg-blue-900 p-4 flex flex-wrap gap-3 justify-center sm:justify-start items-center shadow-md">
        <div className="text-white font-bold mr-auto text-lg sm:text-xl">Ministry Logo</div>
        {["Home", "NIC code", "Update Details", "Login"].map((item) => (
          <button
            key={item}
            className="bg-teal-500 text-white font-semibold px-4 py-2 rounded cursor-pointer hover:bg-cyan-800 transition duration-300 ease-in-out text-sm sm:text-base"
          >
            {item}
          </button>
        ))}
      </header>

      <h1 className="font-bold text-black text-2xl sm:text-3xl md:text-4xl text-center max-w-4xl mt-8 mb-10 px-2">
        UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME
      </h1>

      <form
        className="w-full max-w-lg bg-transparent p-6 rounded-md shadow-md space-y-6 text-black"
        onSubmit={handleForm}
      >
        {data
          .filter(
            (val) =>
              val.id === "ctl00_ContentPlaceHolder1_txtadharno" ||
              val.id === "ctl00_ContentPlaceHolder1_txtownername"
          )
          .map((val) => {
            let value = "";
            let onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void = () => { };

            if (val.id === "ctl00_ContentPlaceHolder1_txtadharno") {
              value = addharNumber;
              onChangeHandler = (e) => setAddharNumber(e.target.value);
            } else if (val.id === "ctl00_ContentPlaceHolder1_txtownername") {
              value = addharName;
              onChangeHandler = (e) => setAddharName(e.target.value);
            }

            return (
              <div key={val.id} className="flex flex-col">
                <label
                  htmlFor={val.id || val.name}
                  className="mb-2 font-semibold text-gray-700 text-sm sm:text-base"
                >
                  {val.placeholder || val.name || "Input"}
                </label>
                <input
                  id={val.id}
                  name={val.name}
                  type={val.type || "text"}
                  maxLength={val.maxlength ? parseInt(val.maxlength) : undefined}
                  placeholder={val.placeholder}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  value={value}
                  onChange={onChangeHandler}
                />
              </div>
            );
          })}

        <ul className="space-y-2 p-5 list-disc text-xs sm:text-sm text-black max-w-md mx-auto">
          <li>Aadhaar number shall be required for Udyam Registration.</li>
          <li>
            The Aadhaar number shall be of the proprietor in the case of a proprietorship firm,
            managing partner in partnership firm, and karta in Hindu Undivided Family (HUF).
          </li>
          <li>
            For Companies, LLP, Cooperative Societies, Societies, or Trusts, provide GSTIN, PAN,
            and Aadhaar number as applicable.
          </li>
        </ul>

        <button
          className="bg-cyan-800 text-white px-6 py-2 rounded mx-auto block cursor-pointer text-base sm:text-lg hover:bg-cyan-900 transition duration-300"
          type="submit"
        >
          Validate & Generate OTP
        </button>
      </form>
    </div>
  );
}

export default Udyaam;

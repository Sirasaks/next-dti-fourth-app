"use client";

import React, { useState } from "react";
import Link from "next/link"; // ✅ เพิ่มการ import Link จาก next/link

// SVG icon for BMI (a person's silhouette with weight scale)
const bmiIconSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    className="w-10 h-10 text-white"
    fill="currentColor"
  >
    <path d="M576 256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64c0-35.3 28.7-64 64-64h448c35.3 0 64 28.7 64 64v192zm-288 32c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64zM224 448c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-26.5 21.5-48 48-48s48 21.5 48 48zM448 448c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-26.5 21.5-48 48-48s48 21.5 48 48z" />
  </svg>
);

export default function BmiCalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<string>("0.00");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");

  const calculateBmi = (): void => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setError(
        "โปรดกรอกส่วนสูงและน้ำหนักให้ครบถ้วนและถูกต้อง (ตัวเลขที่เป็นบวกเท่านั้น)"
      );
      setBmi("0.00");
      setStatus("");
      return;
    }

    const hInMeters = h / 100;
    const calculatedBmi = (w / (hInMeters * hInMeters)).toFixed(2);

    setBmi(calculatedBmi);
    setError("");

    const bmiValue = parseFloat(calculatedBmi);

    if (bmiValue < 18.5) {
      setStatus("น้ำหนักต่ำกว่าเกณฑ์");
    } else if (bmiValue >= 18.5 && bmiValue <= 22.9) {
      setStatus("สมส่วน");
    } else if (bmiValue >= 23 && bmiValue <= 24.9) {
      setStatus("น้ำหนักเกิน");
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setStatus("อ้วนระดับ 1");
    } else {
      setStatus("อ้วนระดับ 2 (อันตราย)");
    }
  };

  const clearFields = (): void => {
    setHeight("");
    setWeight("");
    setBmi("0.00");
    setStatus("");
    setError("");
  };

  return (
    <div className="bg-gradient-to-br from-sky-50 to-indigo-100 min-h-screen flex items-center justify-center p-4 font-sans text-gray-800">
      <div className="container mx-auto max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-gray-200 backdrop-blur-md bg-opacity-80">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="bg-sky-600 p-3 rounded-full shadow-lg flex items-center justify-center">
            {bmiIconSvg}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-sky-800">
            BMI Calculator
          </h1>
        </div>
        <p className="text-center text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          ดัชนีมวลกาย (Body Mass Index) ใช้ประเมินความสมส่วนของร่างกาย
        </p>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 text-center shadow-sm animate-pulse"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="weight"
              className="text-lg text-gray-700 font-medium mb-2"
            >
              น้ำหนัก (กิโลกรัม)
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-all duration-300 shadow-sm"
              placeholder="เช่น 65"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="height"
              className="text-lg text-gray-700 font-medium mb-2"
            >
              ส่วนสูง (เซนติเมตร)
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-all duration-300 shadow-sm"
              placeholder="เช่น 170"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={calculateBmi}
            className="w-full sm:w-1/2 bg-sky-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-sky-700 transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-sky-300"
          >
            <span>คำนวณ</span>
          </button>
          <button
            onClick={clearFields}
            className="w-full sm:w-1/2 bg-gray-300 text-gray-800 font-bold py-3 rounded-xl shadow-lg hover:bg-gray-400 transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            <span>ล้างค่า</span>
          </button>
        </div>

        {/* ✅ ปุ่มกลับหน้าหลัก */}
        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-indigo-700 transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-center"
          >
            กลับหน้าหลัก
          </Link>
        </div>

        <div className="mt-8 text-center bg-sky-50 rounded-2xl p-6 shadow-inner border border-sky-100 animate-fade-in-up">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            ผลลัพธ์:
          </h2>
          <p className="text-4xl sm:text-5xl font-extrabold text-sky-600">
            {bmi}
          </p>
          <p className="text-lg text-gray-700 font-medium mt-2">
            สถานะ: <span className="text-sky-700 font-bold">{status}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

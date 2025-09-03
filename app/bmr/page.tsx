"use client";

import React, { useState } from "react";
import Link from "next/link"; // ✅ import Link

// ข้อมูลสำหรับไอคอน BMR (รูปคน) ในรูปแบบ SVG
const bmrIconSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    className="w-10 h-10 text-white"
    fill="currentColor"
  >
    <path d="M544 32c-39.7 0-72 32.3-72 72s32.3 72 72 72 72-32.3 72-72-32.3-72-72-72zm-72 232v96H320V264c0-22.1-17.9-40-40-40s-40 17.9-40 40v96H56c-22.1 0-40 17.9-40 40s17.9 40 40 40h120v40c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8v-40h104v40c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8v-40h120c22.1 0 40-17.9 40-40s-17.9-40-40-40z" />
  </svg>
);

export default function BmrCalculator() {
  const [gender, setGender] = useState<string>("male");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const [bmr, setBmr] = useState<string>("0.00");
  const [error, setError] = useState<string>("");

  const calculateBmr = (): void => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a <= 0) {
      setError(
        "โปรดกรอกข้อมูลให้ครบถ้วนและถูกต้อง (ตัวเลขที่เป็นบวกเท่านั้น)"
      );
      setBmr("0.00");
      return;
    }

    let calculatedBmr: number;
    if (gender === "male") {
      calculatedBmr = 66 + 13.7 * w + 5 * h - 6.8 * a;
    } else {
      calculatedBmr = 655 + 9.6 * w + 1.8 * h - 4.7 * a;
    }

    setBmr(calculatedBmr.toFixed(2));
    setError("");
  };

  const clearFields = (): void => {
    setGender("male");
    setWeight("");
    setHeight("");
    setAge("");
    setBmr("0.00");
    setError("");
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center min-h-screen p-4 font-sans text-gray-800">
      <div className="container mx-auto max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-gray-200 backdrop-blur-md bg-opacity-80">
        {/* ส่วนหัวของโปรแกรม */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="bg-blue-600 p-3 rounded-full shadow-lg flex items-center justify-center">
            {bmrIconSvg}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            BMR Calculator
          </h1>
        </div>
        <p className="text-center text-gray-600 mb-8 max-w-md mx-auto">
          คำนวณอัตราการเผาผลาญพลังงานขั้นพื้นฐานในแต่ละวัน
        </p>

        {/* แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาด */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 text-center shadow-sm animate-pulse"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* ช่องเลือกเพศ */}
          <div className="flex flex-col">
            <label className="text-lg text-gray-700 font-medium mb-2">เพศ</label>
            <div className="flex flex-wrap gap-3">
              <label
                className={`flex items-center space-x-2 cursor-pointer p-3 rounded-xl transition-colors duration-200 ${
                  gender === "male"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="hidden"
                />
                <span className="font-semibold">ชาย</span>
              </label>
              <label
                className={`flex items-center space-x-2 cursor-pointer p-3 rounded-xl transition-colors duration-200 ${
                  gender === "female"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="hidden"
                />
                <span className="font-semibold">หญิง</span>
              </label>
            </div>
          </div>

          {/* น้ำหนัก */}
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
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-sm"
              placeholder="เช่น 65"
            />
          </div>

          {/* ส่วนสูง */}
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
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-sm"
              placeholder="เช่น 170"
            />
          </div>

          {/* อายุ */}
          <div className="flex flex-col">
            <label
              htmlFor="age"
              className="text-lg text-gray-700 font-medium mb-2"
            >
              อายุ (ปี)
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-sm"
              placeholder="เช่น 30"
            />
          </div>
        </div>

        {/* ปุ่มคำนวณและล้างค่า */}
        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={calculateBmr}
            className="w-full sm:w-1/2 bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>คำนวณ</span>
          </button>
          <button
            onClick={clearFields}
            className="w-full sm:w-1/2 bg-gray-300 text-gray-800 font-bold py-3 rounded-xl shadow-lg hover:bg-gray-400 transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
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

        {/* แสดงผลลัพธ์ */}
        <div className="mt-8 text-center bg-gray-100 rounded-2xl p-6 shadow-inner animate-fade-in-up">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            BMR ของคุณ:
          </h2>
          <p className="text-5xl font-extrabold text-blue-600">
            {bmr}
            <span className="text-2xl font-normal text-gray-600 ml-2">
              kcal/วัน
            </span>
          </p>
          <p className="text-lg text-gray-700 font-medium mt-2">
            นี่คือพลังงานขั้นต่ำที่ร่างกายคุณต้องการ
          </p>
        </div>
      </div>
    </div>
  );
}

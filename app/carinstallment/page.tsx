"use client";

import React, { useState } from 'react';
import Link from "next/link"; // ✅ import Link
// ข้อมูลสำหรับไอคอนรถยนต์ในรูปแบบ SVG
const carIconSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    className="w-10 h-10 text-white"
    fill="currentColor"
  >
    <path d="M144 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 640a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM240 128H88c-22.1 0-40 17.9-40 40v304c0 22.1 17.9 40 40 40h152c17.7 0 32-14.3 32-32s-14.3-32-32-32H88c-6.6 0-12-5.4-12-12V168c0-6.6 5.4-12 12-12h152c17.7 0 32-14.3 32-32s-14.3-32-32-32zM368 128h152c22.1 0 40 17.9 40 40v304c0 22.1-17.9 40-40 40H368c-17.7 0-32-14.3-32-32s14.3-32 32-32h152c6.6 0 12-5.4 12-12V168c0-6.6-5.4-12-12-12H368c-17.7 0-32-14.3-32-32s14.3-32 32-32zM560 384c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H280c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32h280zM352 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM448 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
  </svg>
);

const loanTerms = [12, 24, 36, 48, 60, 72, 84];
const downPaymentPercentages = ['15', '20', '25', '30', '35'];

export default function App() {
  // สถานะสำหรับเก็บข้อมูลที่ผู้ใช้ป้อน
  const [userName, setUserName] = useState<string>('');
  const [carPrice, setCarPrice] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [selectedLoanTerm, setSelectedLoanTerm] = useState<number>(48); // ค่าเริ่มต้น 48 เดือน
  const [downPaymentPercentage, setDownPaymentPercentage] = useState<string>('20'); // ค่าเริ่มต้น 20%
  
  // สถานะสำหรับผลลัพธ์และการแจ้งเตือน
  const [monthlyPayment, setMonthlyPayment] = useState<string>('0.00');
  const [error, setError] = useState<string>('');

  // ฟังก์ชันคำนวณค่างวดต่อเดือน
  const calculateMonthlyPayment = (): void => {
    const price = parseFloat(carPrice);
    const rate = parseFloat(interestRate);
    const term = selectedLoanTerm;

    // ตรวจสอบความถูกต้องของข้อมูล
    if (isNaN(price) || isNaN(rate) || price <= 0 || rate < 0 || term <= 0) {
      setError('โปรดกรอกข้อมูลราคาและดอกเบี้ยให้ถูกต้อง');
      setMonthlyPayment('0.00');
      return;
    }

    const percentage = parseFloat(downPaymentPercentage);
    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      setError('โปรดเลือกเปอร์เซ็นต์เงินดาวน์ที่ถูกต้อง');
      setMonthlyPayment('0.00');
      return;
    }
    const downPaymentAmount = price * (percentage / 100);

    // คำนวณยอดจัดไฟแนนซ์
    const loanAmount = price - downPaymentAmount;

    // คำนวณดอกเบี้ยทั้งหมด (แบบดอกเบี้ยคงที่)
    const totalInterest = (loanAmount * rate / 100) * (term / 12);
    
    // คำนวณยอดรวมที่ต้องชำระคืน
    const totalPayment = loanAmount + totalInterest;

    // คำนวณค่างวดต่อเดือน
    const monthlyPaymentResult = totalPayment / term;
    
    setMonthlyPayment(monthlyPaymentResult.toFixed(2));
    setError('');
  };

  // ฟังก์ชันล้างข้อมูลในช่องกรอกทั้งหมด
  const clearFields = (): void => {
    setUserName('');
    setCarPrice('');
    setInterestRate('');
    setSelectedLoanTerm(48);
    setDownPaymentPercentage('20');
    setMonthlyPayment('0.00');
    setError('');
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center min-h-screen p-4 font-sans text-gray-800">
      <div className="container mx-auto max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-gray-200 backdrop-blur-md bg-opacity-80">
        
        {/* ส่วนหัวของโปรแกรม */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="bg-blue-600 p-3 rounded-full shadow-lg flex items-center justify-center">
            {carIconSvg}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            Car Installment Calculator
          </h1>
        </div>
        <p className="text-center text-gray-600 mb-8 max-w-md mx-auto">
          คำนวณ Car installment
        </p>

        {/* แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาด */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 text-center shadow-sm animate-pulse" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* ช่องป้อนชื่อ */}
          <div className="flex flex-col">
            <label htmlFor="userName" className="text-lg text-gray-700 font-medium mb-2">ชื่อของคุณ</label>
            <input 
              type="text" 
              id="userName" 
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-sm"
              placeholder="เช่น สมชาย"
            />
          </div>

          {/* ช่องป้อนราคารถ */}
          <div className="flex flex-col">
            <label htmlFor="carPrice" className="text-lg text-gray-700 font-medium mb-2">ราคารถ (บาท)</label>
            <input 
              type="number" 
              id="carPrice" 
              value={carPrice} 
              onChange={(e) => setCarPrice(e.target.value)} 
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-sm"
              placeholder="เช่น 800,000"
            />
          </div>

          {/* ช่องป้อนดอกเบี้ย */}
          <div className="flex flex-col">
            <label htmlFor="interestRate" className="text-lg text-gray-700 font-medium mb-2">อัตราดอกเบี้ยต่อปี (%)</label>
            <input 
              type="number" 
              id="interestRate" 
              value={interestRate} 
              onChange={(e) => setInterestRate(e.target.value)} 
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-sm"
              placeholder="เช่น 2.5"
            />
          </div>

          {/* ช่องเลือกเงินดาวน์ (radio buttons) */}
          <div className="flex flex-col">
            <label className="text-lg text-gray-700 font-medium mb-2">เงินดาวน์</label>
            <div className="flex flex-wrap gap-3">
              {downPaymentPercentages.map((percentage) => (
                <label 
                  key={percentage} 
                  className={`
                    flex items-center space-x-2 cursor-pointer p-3 rounded-xl 
                    transition-colors duration-200
                    ${downPaymentPercentage === percentage 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                  `}
                >
                  <input
                    type="radio"
                    name="downPayment"
                    value={percentage}
                    checked={downPaymentPercentage === percentage}
                    onChange={() => setDownPaymentPercentage(percentage)}
                    className="hidden"
                  />
                  <span className="font-semibold">{percentage}%</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Dropdown สำหรับจำนวนเดือน */}
          <div className="flex flex-col">
            <label htmlFor="loanTerm" className="text-lg text-gray-700 font-medium mb-2">ระยะเวลาผ่อนชำระ (เดือน)</label>
            <select
              id="loanTerm"
              value={selectedLoanTerm}
              onChange={(e) => setSelectedLoanTerm(parseInt(e.target.value))}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-sm appearance-none bg-white pr-8"
            >
              {loanTerms.map(term => (
                <option key={term} value={term}>
                  {term} เดือน ({Math.floor(term / 12)} ปี)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ปุ่มคำนวณและล้างค่า */}
        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={calculateMonthlyPayment} 
            className="w-full sm:w-1/2 bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
            <span>คำนวณ</span>
          </button>
          <button 
            onClick={clearFields} 
            className="w-full sm:w-1/2 bg-gray-300 text-gray-800 font-bold py-3 rounded-xl shadow-lg hover:bg-gray-400 transform transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
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

        {/* ส่วนแสดงผลลัพธ์ */}
        <div className="mt-8 text-center bg-gray-100 rounded-2xl p-6 shadow-inner animate-fade-in-up">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">ค่างวดต่อเดือน:</h2>
          <p className="text-5xl font-extrabold text-blue-600">
            {monthlyPayment}
            <span className="text-2xl font-normal text-gray-600 ml-2">บาท</span>
          </p>
        </div>

      </div>
    </div>
  );
}

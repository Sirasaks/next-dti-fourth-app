import React from 'react'

export default function Home() {
  return (
   <div className="bg-blue-400 flex items-center justify-center min-h-screen p-4 md:p-8">
            <div className="container mx-auto max-w-5xl">
                {/* Minimalist Logo SVG */}
                <div className="flex justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-light text-center text-white mb-12">เครื่องคำนวนต่างๆ ✨</h1>
                
                {/* Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1: BMI Calculator */}
                    <Card 
                        title="คำนวณ BMI"
                        description="ตรวจสอบดัชนีมวลกายเพื่อประเมินน้ำหนักที่เหมาะสม"
                        imageSrc="https://placehold.co/600x400/805ad5/ffffff?text=BMI"
                        imageAlt="BMI Calculation"
                        link="/bmi"
                    />
                    
                    {/* Card 2: BMR Calculator */}
                    <Card 
                        title="คำนวณ BMR"
                        description="หาอัตราการเผาผลาญพลังงานพื้นฐานในแต่ละวัน"
                        imageSrc="https://placehold.co/600x400/68d391/ffffff?text=BMR"
                        imageAlt="BMR Calculation"
                        link="/bmr"
                    />
                    
                    {/* Card 3: Car Installment Calculator */}
                    <Card 
                        title="คำนวณผ่อนรถ"
                        description="วางแผนการเงินด้วยเครื่องคำนวณค่างวดรถยนต์"
                        imageSrc="https://placehold.co/600x400/4299e1/ffffff?text=CAR+LOAN"
                        imageAlt="Car Installment Calculation"
                        link="/carinstallment"
                    />
                </div>
            </div>
        </div>
    );
}

// Reusable Card Component
const Card = ({ title, description, imageSrc, imageAlt, link }) => {
    return (
        <a href={link} className="card bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer flex flex-col items-center p-6 transform transition-all duration-300 hover:scale-105">
            <img 
                src={imageSrc} 
                alt={imageAlt} 
                className="w-full h-40 md:h-48 object-cover rounded-xl mb-4"
            />
            <div className="w-full text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
                <p className="text-gray-500 text-sm">{description}</p>
            </div>
        </a>
    );
};

import React from "react";

export default function BrandLogo() {
  return (
    <div className="flex items-center justify-start h-16 sm:h-20 mb-2 md:mb-3">
      <img 
        src="https://www.em.co.za/landmark-img/Global/logo/logo1.png" 
        alt="ElectroMechanica Logo" 
        className="h-full w-auto object-contain transition-all duration-300 dark:invert dark:brightness-200"
      />
    </div>
  );
}
"use client"
import { signOut } from "next-auth/react"
import { LogOut } from 'lucide-react';
import React from 'react';

const BtnLogout = () => {
  return (
    <button
  onClick={() => signOut({redirectTo: "/"})}
  type="button"
  className="w-full flex items-center justify-between p-2 
                    hover:bg-primary  
                    rounded-lg transition-colors duration-200"
>
  <div className="flex items-center gap-2 hover:text-white">
    <LogOut className="w-4 h-4" />
    <span className="text-sm font-medium ">Logout</span>
  </div>
</button>
  );
};

export default BtnLogout;

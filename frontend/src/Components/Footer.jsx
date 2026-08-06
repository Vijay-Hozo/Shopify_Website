import React from "react";
import { ShoppingBag, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="text-xl font-black text-white uppercase tracking-wider">
            Shopify
          </span>
        </div>

        <p className="text-sm text-slate-400 text-center flex items-center gap-1">
          © {new Date().getFullYear()} Shopify. Built with <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" /> for an extraordinary shopping experience.
        </p>

        <div className="flex gap-6 text-sm text-slate-400 font-medium">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Help Center</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

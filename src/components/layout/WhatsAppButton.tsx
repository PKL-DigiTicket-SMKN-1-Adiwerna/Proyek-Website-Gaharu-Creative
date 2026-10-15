"use client";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/6281234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#047857] hover:bg-[#10b981] text-white p-3.5 rounded-full shadow-lg hover:scale-105 transition-all z-50 flex items-center justify-center"
      aria-label="Chat WhatsApp"
    >
      💬
    </a>
  );
}
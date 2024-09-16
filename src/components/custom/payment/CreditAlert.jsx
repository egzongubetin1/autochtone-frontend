import React from "react";
import { Box } from "lucide-react";

const CreditAlert = () => (
  <div className="flex gap-2 p-2 border border-l-red-500 border-l-4 rounded-md">
    <div className="flex items-center justify-center w-6 h-6 rounded-md border-red bg-red-100">
      <Box size={12} color="red" />
    </div>
    <div>
      <p className="text-sm">Game Credits are not enough.</p>
      <span className="text-xs text-gray-400">You need to pay more.</span>
    </div>
  </div>
);

export default CreditAlert;

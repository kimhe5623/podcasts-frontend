import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({canClick, loading, actionText}) => <button
  className={`text-white font-semibold py-4 transition-colors text-xl
              ${canClick ? "bg-violet-600 hover:bg-violet-700" : "bg-gray-300 pointer-events-none"}`}>
  {loading ? "Loading..." : actionText}
</button>
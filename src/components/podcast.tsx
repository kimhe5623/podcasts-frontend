import React from "react";
import { Link } from "react-router-dom";

interface IPodcastProps {
  id: string;
  coverImage: string;
  title: string;
  categoryName?: string | null;
  className?: string;
}

export const Podcast: React.FC<IPodcastProps> = ({ coverImage, title: name, categoryName, id, className }) => (
  <Link to={`/podcast/${id}`}>
    <div className={`flex flex-col ${className}`}>
      <div className="bg-cover bg-center py-32 mb-2" style={{ backgroundImage: `url(${coverImage})` }}></div>
      <h3 className="font-bold text-lg">{name}</h3>
      <span className=" border-t mt-3 pt-3 text-xs opacity-50 border-gray-400">{categoryName}</span>
    </div>
  </Link>
);
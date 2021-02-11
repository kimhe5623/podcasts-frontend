import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { UpdatePodcast } from "../modals/update-podcast.modal";
import { DeletePodcast } from "../modals/delete-podcast.modal";
import { UserRole } from "../__generated__/globalTypes";

interface IPodcastProps {
  id: string;
  coverImage: string;
  title: string;
  categoryName?: string | null;
  className?: string;
  hostId: number;
}

export const Podcast: React.FC<IPodcastProps> = ({ coverImage, title: name, categoryName, id, className, hostId }) => {
  const meData = useMe();
  return (
    <div className={`flex flex-col ${className}`}>
      <Link to={`/podcast/${id}`}>
        <div className="bg-cover bg-center py-32 mb-2" style={{ backgroundImage: `url(${coverImage})` }}></div>
      </Link>
      <div className="flex flex-row justify-between">
        <h3 className="font-bold text-lg">{name}</h3>
        {
          meData.data?.me.role === UserRole.Host &&
          meData.data.me.id === hostId && (
            <div className="flex">
              <DeletePodcast
                id={id}
                btnClassName="text-red-600 mx-2"
              />
              <UpdatePodcast
              id={id}
              title={name}
              coverImage={coverImage}
              categoryName={categoryName} />
            </div>
          )
        }
      </div>
      <span className="mt-3 pt-3 text-xs opacity-50 border-t border-gray-400">{categoryName}</span>
    </div>
  )
};
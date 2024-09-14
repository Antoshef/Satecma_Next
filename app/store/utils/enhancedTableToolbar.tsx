import PencilIcon from "/public/assets/svg/pencil.svg";
import TrashIcon from "/public/assets/svg/trash.svg";
import FilterIcon from "/public/assets/svg/filterHorizontal.svg";
import { FC } from "react";
import Image from "next/image";
import Tooltip from "@/components/tooltip";

interface EnhancedTableToolbarProps {
  title: string;
  isSelected: boolean;
  onEdit?: (edit: boolean) => void;
  onDelete?: () => void;
}

export const EnhancedTableToolbar: FC<EnhancedTableToolbarProps> = ({
  title,
  isSelected,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className={`flex items-center justify-between p-2 ${
        isSelected ? "bg-blue-100" : ""
      }`}
    >
      <div className="flex-1">
        <h2
          className={`${
            isSelected ? "text-white" : "text-gray-900"
          } text-lg font-medium`}
        >
          {title}
        </h2>
      </div>
      <div className="flex items-center space-x-2">
        {isSelected ? (
          <>
            <button
              onClick={() => onEdit?.(true)}
              className="p-2 rounded-full hover:bg-gray-200 relative group"
            >
              <Tooltip text="Edit">
                <Image src={PencilIcon} alt="Edit" />
              </Tooltip>
            </button>
            <button
              onClick={onDelete}
              className="p-2 rounded-full hover:bg-gray-200 relative group"
            >
              <Tooltip text="Delete">
                <Image src={TrashIcon} alt="Delete" />
              </Tooltip>
            </button>
          </>
        ) : (
          <button className="p-2 rounded-full hover:bg-gray-200 relative group">
            <Tooltip text="Filter list">
              <Image src={FilterIcon} alt="Filter" />
            </Tooltip>
          </button>
        )}
      </div>
    </div>
  );
};

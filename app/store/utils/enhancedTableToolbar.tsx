import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";
import { Tooltip } from "@mui/material";

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
            <Tooltip title="Edit">
              <button
                onClick={() => onEdit?.(true)}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip title="Delete">
              <button
                onClick={onDelete}
                className="p-2 rounded-full hover:bg-gray-200"
              >
                <DeleteIcon />
              </button>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Filter list">
            <button className="p-2 rounded-full hover:bg-gray-200">
              <FilterListIcon />
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

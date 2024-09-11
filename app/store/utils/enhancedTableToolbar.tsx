import { alpha, IconButton, Tooltip, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";

interface EnhancedTableToolbarProps {
  title: string;
  isSelected: boolean;
  onEdit?: (edit: boolean) => void;
  onDelete?: () => void; // Add onDelete prop
}

export const EnhancedTableToolbar = ({
  title,
  isSelected,
  onEdit,
  onDelete, // Add onDelete prop
}: EnhancedTableToolbarProps) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(isSelected && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {isSelected ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {title}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {isSelected ? (
        <>
          <Tooltip title="Edit">
            <IconButton onClick={() => onEdit?.(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

import { alpha, IconButton, Tooltip, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";

interface EnhancedTableToolbarProps {
  title: string;
  isSelected: boolean;
  onEdit: (edit: boolean) => void;
}

export const EnhancedTableToolbar = ({
  title,
  isSelected,
  onEdit,
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
          Редактиране на продукт
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
        <Tooltip title="Edit">
          <IconButton onClick={() => onEdit(true)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
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

import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookIcon from "@mui/icons-material/Book";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import moduleContext, { ModuleContextType } from "@/context/module-context";

export default function Mainlist() {
  const { setModule }: ModuleContextType = React.useContext(moduleContext)!;

  return (
    <div>
      <ListItemButton
        onClick={() => {
          setModule("Books");
        }}
      >
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Books" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setModule("Orders");
        }}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setModule("Customers");
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>
    </div>
  );
}

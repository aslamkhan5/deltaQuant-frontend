import React, { useState } from "react";
import { Box, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { logo } from "../utils/images";
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/icons-material/Menu';
import CustomTextField from "./CustomTextField";
const Header = ({ toggleSidebar }) => {
  const [search, setSearch] = useState("");

  return (
    <Grid container sx={{ background: "#181818", paddingX: 4, paddingY: 1 }} direction="row" alignItems="center" justifyContent="space-between">
      <Grid item>
        <Box
          component="img"
          // sx={{
          //   height: 50,
          //   width: 150,
          // }}
          alt="Logo"
          src={logo}
        />
      </Grid>
      <Grid item xs={10} sm={8} md={8} lg={4} xl={3}>
        <CustomTextField
          fullWidth
          placeholder="Search here"
          backgroundColor="#2A2A2A"
          textColor="#FFFFFF"
          type="text"
          id="search" value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchIcon style={{ color: "white" }} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item xs={2} sm={2} display={{ xs: 'block', sm: 'none' }}>
        <IconButton edge="end" onClick={toggleSidebar}>
          <Menu style={{ color: "white" }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function SelectRole({ setRole, role }) {
  return (
    <>
      <FormControl
        variant="outlined"
        css={css`
          width: 30%;
          margin-bottom: 1rem;
        `}
      >
        <InputLabel id="role-label">Select Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          label="Role"
          name="role"
          value={role}
          onChange={(event) => {
            setRole(event.target.value);
          }}
        >
          <MenuItem value="" disabled>
            Select Role
          </MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default SelectRole;

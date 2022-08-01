import { Search } from '@mui/icons-material';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const SearchIconWrapper = styled.div`
  padding: 0, 2;
  height: '100%';
  position: 'absolute';
  pointer-events: 'none';
  display: 'flex';
  align-items: 'center';
  justify-content: 'center';
`;

const StyledInputBase = styled.InputBase`
  color: 'inherit';
  padding: 1, 1, 1, 0;
  padding-left: ${`calc(1em + 4)`};
  width: '100%';
`;

export default function SearchForm() {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
    </Search>
  );
}

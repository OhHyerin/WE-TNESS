import { styled as muiStyled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setKeyword, setIsSearch } from '../../features/room/RoomSlice';

const Search = muiStyled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  // [theme.breakpoints.up('sm')]: {
  marginLeft: theme.spacing(3),
  width: 'auto',
  // },
}));

const SearchIconWrapper = muiStyled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
    [theme.breakpoints.up('lg')]: {
      width: '60ch',
    },
    [theme.breakpoints.up('lx')]: {
      width: '70ch',
    },
  },
}));

export default function SearchForm() {
  const keyword = useSelector(state => state.room.keyword);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsSearch(!!keyword));
  }, [keyword]);

  const handelKeyword = e => {
    dispatch(setKeyword(e.target.value));
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        id="searchBar"
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handelKeyword}
      />
    </Search>
  );
}

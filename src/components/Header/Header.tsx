import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  MenuItem,
  Menu,
  Button
} from '@mui/material';
import { Person } from '@mui/icons-material';

import { useState } from 'react';
import { useFirebase, useNotifications } from '@/hooks';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import type { IRootState } from '@/store';

const MENU_ITEMS: string[] = [];

function Header() {
  const { signOut } = useFirebase();
  const { showNotification } = useNotifications();
  const navigate = useNavigate();

  const user = useSelector((state: IRootState) => state.auth.user);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const onLoginOut = async () => {
    try {
      await signOut();
      handleCloseUserMenu();
      showNotification('User was logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AppBar position="static" color="transparent" variant="outlined">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}>
            Scribo
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <div className="flex items-center">
                <Button onClick={handleOpenUserMenu} startIcon={<Person />} variant="outlined">
                  {user?.displayName}
                </Button>
              </div>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {MENU_ITEMS.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={onLoginOut}>
                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

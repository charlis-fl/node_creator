import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  MenuItem,
  sidebarClasses,
  menuClasses,
} from 'react-pro-sidebar';
import { linkPath } from 'common/constants';
import addUserIcon from 'assets/icons/account-multiple-plus.svg';
import settingsIcon from 'assets/icons/cog.svg';
import helpIcon from 'assets/icons/help-circle-outline.svg';
import SidebarLayout from '../SidebarLayout';

interface PropType {
    component: React.FC;
}

export const SidebarRoute: FC<PropType> = ({ component: Component }) => {
  const location = useLocation();
  const { pathname } = location;
  const [currentNav, setCurrentNav] = useState(0);

  useEffect(() => {
    switch (pathname) {
      case linkPath.nodeEditor:
        setCurrentNav(2);
        break;
      case linkPath.noteTaker:
        setCurrentNav(3);
        break;
      default:
        setCurrentNav(1);
    }
  }, [pathname]);
  return (
    <SidebarLayout>
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: 'var(--default-interface-white)',
            borderRight: '1px solid var(--default-interface-gray-300)',
            height: 'calc(100vh - 24px)',
            paddingTop: '24px',
            position: 'fixed',
            left: '0',
          },
        }}
        width="64px"
        breakPoint="xs"
      >
        <Menu>
          <MenuItem component={<Link to={linkPath.homePage} />} active={currentNav === 1}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity={currentNav === 1 ? 1 : 0.5}>
                <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="black" />
              </g>
            </svg>
          </MenuItem>
          <MenuItem component={<Link to={linkPath.nodeEditor} />} active={currentNav === 2}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillOpacity={currentNav === 2 ? 1 : 0.5}
                d="M18 11H14.82C14.4 9.84 13.3 9 12 9C10.7 9 9.6 9.84 9.18 11H6C5.67 11 4 10.9 4 9V8C4 6.17
                5.54 6 6 6H16.18C16.6 7.16 17.7 8 19 8C19.7956 8 20.5587 7.68393 21.1213 7.12132C21.6839
                6.55871 22 5.79565 22 5C22 4.20435 21.6839 3.44129 21.1213 2.87868C20.5587 2.31607 19.7956
                2 19 2C17.7 2 16.6 2.84 16.18 4H6C4.39 4 2 5.06 2 8V9C2 11.94 4.39 13 6 13H9.18C9.6 14.16
                10.7 15 12 15C13.3 15 14.4 14.16 14.82 13H18C18.33 13 20 13.1 20 15V16C20 17.83 18.46 18 18
                18H7.82C7.4 16.84 6.3 16 5 16C4.20435 16 3.44129 16.3161 2.87868 16.8787C2.31607 17.4413 2
                18.2044 2 19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22C6.3
                22 7.4 21.16 7.82 20H18C19.61 20 22 18.93 22 16V15C22 12.07 19.61 11 18 11ZM19 4C19.2652 4
                19.5196 4.10536 19.7071 4.29289C19.8946 4.48043 20 4.73478 20 5C20 5.26522 19.8946 5.51957
                19.7071 5.70711C19.5196 5.89464 19.2652 6 19 6C18.7348 6 18.4804 5.89464 18.2929 5.70711C18.1054
                5.51957 18 5.26522 18 5C18 4.73478 18.1054 4.48043 18.2929 4.29289C18.4804 4.10536 18.7348 4
                19 4ZM5 20C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19C4 18.7348
                4.10536 18.4804 4.29289 18.2929C4.48043 18.1054 4.73478 18 5 18C5.26522 18 5.51957 18.1054
                5.70711 18.2929C5.89464 18.4804 6 18.7348 6 19C6 19.2652 5.89464 19.5196 5.70711 19.7071C5.51957
                19.8946 5.26522 20 5 20Z"
                fill="black"
              />
            </svg>
          </MenuItem>
          <MenuItem component={<Link to={linkPath.noteTaker} />} active={currentNav === 3}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 5H18L16.5 7L15 5ZM5 2H19C20.11 2 21 2.9 21 4V20C21 21.11 20.11 22 19 22H5C3.9 22 3 21.11
                3 20V4C3 2.9 3.9 2 5 2ZM5 4V8H19V4H5ZM5 20H19V10H5V20ZM7 12H17V14H7V12ZM7 16H17V18H7V16Z"
                fill="black"
                fillOpacity={currentNav === 3 ? 1 : 0.5}
              />
            </svg>
          </MenuItem>
          <MenuItem
            rootStyles={{
              [`.${menuClasses.button}`]: {
                marginTop: 'calc(100vh - 325px)',
              },
            }}
          >
            <img src={addUserIcon} alt="add user" />
          </MenuItem>
          <MenuItem>
            <img src={settingsIcon} alt="settings" />
          </MenuItem>
          <MenuItem>
            <img src={helpIcon} alt="help" />
          </MenuItem>
        </Menu>
      </Sidebar>
      <Component />
    </SidebarLayout>
  );
};

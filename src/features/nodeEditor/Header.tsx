import searchIcon from 'assets/icons/magnify.svg';
import bellIcon from 'assets/icons/bell-badge.svg';
import userAvatarIcon from 'assets/icons/user-avatar.png';

import { HeaderStyled } from './Styled';
const Header = () => {
  return (
    <HeaderStyled>
      <div>
        <span className="directory">Workflows / editor / </span>
        <span className="current_flow">signup_v1</span>
        <span className="current_user">[DEV]</span>
      </div>
      <div className="actions">
        <span className="action-button">
          <img src={searchIcon} alt="search" />
        </span>
        <span className="action-button">
          <img src={bellIcon} alt="notification" />
        </span>
        <span className="action-button profile-icon">
          <img src={userAvatarIcon} alt="profile" />
        </span>
      </div>
    </HeaderStyled>
  );
};

export default Header;

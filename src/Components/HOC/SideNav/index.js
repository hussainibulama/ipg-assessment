import React, {useEffect} from 'react';
import '../../Styles/Sidenav.scss';
import LinkList from './LinkList';
import {useNavigate, useLocation} from 'react-router-dom';
import {removeStorage, getStorage} from '../../Utitlities/Storage';
const SideNav = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const handleNavigation = (link) => {
    navigate(link);
  };
  const handleLogOut = async () => {
    removeStorage('userInfo');
    removeStorage('isLogin');
    window.location.href = '/';
  };
  useEffect(() => {
    let isLogin = getStorage('isLogin');
    if (!isLogin) {
      handleLogOut();
    }
  }, []);
  return (
    <>
      <div data-testid='sidenav' className='side_nav'>
        <div className='logo_side'>Weather Inc</div>
        <div className='nav_list'>
          <ul className='list_parent'>
            {LinkList.map((item, index) => (
              <li key={index + 1000}>
                <span className='parent_link'>
                  <span
                    data-testid={item.title}
                    className={
                      String(location.pathname) === String(item.linkPath) ||
                      item?.childListList?.includes(String(location.pathname))
                        ? 'active_parent'
                        : ''
                    }
                    onClick={() =>
                      item.title === 'Logout'
                        ? handleLogOut()
                        : handleNavigation(item.linkPath)
                    }
                  >
                    <p>{item.title}</p>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default SideNav;

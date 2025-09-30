import { useState } from 'react';
import styles from './Navbar.module.scss';
import UserLogo from '../../assets/user-photo.svg';
import SocialSupportLogo from '../../assets/logo.png';
import { Tooltip } from 'antd';

const Navbar: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  const toggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <img width={70} height={45} src={SocialSupportLogo} alt="Logo" />
      </div>

      <div className={styles.right}>
        <Tooltip placement="bottomRight" title="عربي / English">
          <button className={styles.lang} onClick={toggleLang}>
            {lang === 'ar' ? 'عربي' : 'English'}
          </button>
        </Tooltip>
        <div className={styles.user}>
          <img src={UserLogo} alt="User Avatar" />
          <span className={styles.username}>Abdullah Al-Aziz</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

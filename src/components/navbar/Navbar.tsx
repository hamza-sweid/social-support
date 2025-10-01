import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import UserLogo from '../../assets/user-photo.svg';
import SocialSupportLogo from '../../assets/logo.png';

const Navbar: React.FC = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    return (localStorage.getItem('lang') as 'ar' | 'en') || 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang, i18n]);

  const toggleLang = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('lang', newLang);
    setLang(newLang);

    window.location.reload();
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <img width={70} height={45} src={SocialSupportLogo} alt="Logo" />
      </div>

      <div className={styles.right}>
        <Tooltip placement="bottomRight" title="English / عربي">
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

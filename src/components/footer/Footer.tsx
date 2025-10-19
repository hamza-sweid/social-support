import { useTranslation } from 'react-i18next';
import style from './Footer.module.scss';

const CurrentYear = new Date().getFullYear();
const AppFooter = () => {
  const { t } = useTranslation();
  return (
    <footer className={style.appFooter}>
      <p>
        © {CurrentYear} {t('settings.applicationRights')}
      </p>
    </footer>
  );
};
export default AppFooter;

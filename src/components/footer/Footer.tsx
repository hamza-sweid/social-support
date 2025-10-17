import style from './Footer.module.scss';

const CurrentYear = new Date().getFullYear();
const AppFooter = () => {
  return (
    <footer className={style.appFooter}>
      <p>© {CurrentYear} My Application. All rights reserved.</p>
    </footer>
  );
};
export default AppFooter;

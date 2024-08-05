import styles from './TitleIcon.module.scss';

const TitleIcon = ({ icon, text = '', link }) => {
   return (
      <div className={styles.titleIconRoot}>
         <div className={styles.icon}>{icon}</div>
         <h2 className="title-2">{text}</h2>
         {link && <a href={link.href} className={styles.link}>{link.name}</a>}
      </div>
   );
};

export default TitleIcon;

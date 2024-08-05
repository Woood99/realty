import styles from './Button.module.scss';

const Button = props => {
   const { children, className = '', variant = 'primary', size = '', onClick = () => {}, Selector = 'button', href, active } = props;
   const classNames = `${styles.ButtonMain} ${size ? styles[`size${size}`] : ''} ${styles[variant]} ${className} ${active ? styles.ButtonActive : ''}`;
   if (Selector === 'a') {
      return (
         <a href={href} className={classNames}>
            {children}
         </a>
      );
   }
   return (
      <Selector onClick={onClick} className={classNames}>
         {children}
      </Selector>
   );
};

export default Button;

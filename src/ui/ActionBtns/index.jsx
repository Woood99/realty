import styles from './ActionBtns.module.scss';

export const BtnAction = props => {
   const { className = '' } = props;
   return (
      <button {...props} className={`${styles.BtnAction} ${className}`}>
         {props.children}
      </button>
   );
};
export const BtnActionText = props => {
   const { className = '' } = props;
   return (
      <button {...props} className={`${styles.BtnActionText} ${className}`}>
         {props.children}
      </button>
   );
};

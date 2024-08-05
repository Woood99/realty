import React from 'react';
import Tooltip from '../Tooltip';

import styles from './Badges.module.scss';

import { IconBank, IconBudget, IconDollar, IconBolt, IconCalc, IconInitialFee } from '../Icons';

export const Badges = ({ data, className = '' }) => {
   if (!data || data.length === 0) return;
   return (
      <div className={`${styles.List} ${className}`}>
         {data.map((item, index) => {
            switch (item) {
               case 'mortgage':
                  return <BadgeMortgage key={index} />;
               case 'cash':
                  return <BadgeCash key={index} />;
               case 'certificate':
                  return <BadgeCertificate key={index} />;
               case 'urgently':
                  return <BadgeUrgently key={index} />;
               case 'monthlyPayment':
                  return <BadgeMonthlyPayment key={index} />;
               case 'noDownPayment':
                  return <BadgeNoDownPayment key={index} />;
               default:
                  return '';
            }
         })}
      </div>
   );
};

export const Badge = ({ text, Icon, variant }) => {
   return (
      <Tooltip variant="text" text={text} event="move" gap={10} position="top">
         <button className={`${styles.Badge} ${styles[variant]}`}>
            <Icon />
         </button>
      </Tooltip>
   );
};

export const BadgeMortgage = () => {
   return <Badge variant="BadgeMortgage" text="Ипотека, есть одобрения от банка" Icon={IconBank}></Badge>;
};

export const BadgeCash = () => {
   return <Badge variant="BadgeCash" text="Наличные" Icon={IconBudget}></Badge>;
};

export const BadgeCertificate = () => {
   return <Badge variant="BadgeCertificate" text="В сделке используется сертификат" Icon={IconDollar}></Badge>;
};

export const BadgeUrgently = () => {
   return <Badge variant="BadgeUrgently" text="Срочно" Icon={IconBolt}></Badge>;
};
export const BadgeMonthlyPayment = () => {
   return <Badge variant="BadgeMonthlyPayment" text="Поиск квартиры по ежемесячному платежу" Icon={IconCalc}></Badge>;
};

export const BadgeNoDownPayment = () => {
   return <Badge variant="BadgeNoDownPayment" text="Без первоначального взноса" Icon={IconInitialFee}></Badge>;
};

import React, { useEffect, useRef, useState } from 'react';

import Modal from '../../ui/Modal';

import styles from './RecordViewing.module.scss';
import { IconChecked } from '../../ui/Icons';
import { NavBtnNext, NavBtnPrev } from '../../ui/NavBtns';
import Input from '../../uiForm/Input';
import Button from '../../uiForm/Button';

const maps = {
   daysOfWeek: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
   months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
   months2: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
};

function getBusyDays() {
   if (false) {
      return JSON.parse(inputDate.value);
   }
}

function checkCurrentDay(data, date) {
   if (date && data) {
      for (let i = 0; i < data.length; i++) {
         const element = data[i];
         if (element.date === date) {
            return element;
         }
      }
   }
}

function getStringDate(date) {
   return `${date.getFullYear()}-${date.getMonth() < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
}

const RecordViewing = ({ condition, set }) => {
   const newDate = new Date();

   const daysRef = useRef(null);
   const timeRef = useRef(null);

   const [daysScrollLeft, setDaysScrollLeft] = useState(0);
   const [timeScrollLeft, setTimeScrollLeft] = useState(0);

   const [valueForm, setValueForm] = useState({
      day: '',
      time: '',
      name: '',
      phone: '',
   });
   
   const [timeFields, setTimeFields] = useState([]);

   const inputDateValue = getBusyDays();

   useEffect(() => {
      const date = new Date(newDate.setDate(newDate.getDate()));
      onChangeDay(getStringDate(date));
   }, [daysRef]);

   useEffect(() => {
      if (daysRef.current) {
         daysRef.current.scrollLeft = daysScrollLeft;
      }
      if (timeRef.current) {
         timeRef.current.scrollLeft = timeScrollLeft;
      }
   }, [valueForm]);

   const createTime = (hour, currentDay, currentDayValue) => {
      const timeArr = currentDayValue
         ? currentDayValue.time
              .replace(/[\[\]']/g, '')
              .replace(/\,\s/g, ',')
              .split(',')
         : null;
      const currentHour = new Date().getHours();
      const convertHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      if (currentHour < hour && currentDay) {
         return convertHour;
      } else if (!currentDay) {
         return convertHour;
      }
   };

   const onChangeDay = stringDate => {
      setValueForm({ ...valueForm, day: stringDate, time: '' });

      if (daysRef.current) {
         const currentScrollLeft = daysRef.current.scrollLeft;
         setDaysScrollLeft(currentScrollLeft);
      }

      const currentDay = new Date().getDate();
      const itemDay = new Date(stringDate).getDate();

      const timesArr = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

      const timesResult = timesArr.map(hour => {
         return createTime(hour, currentDay === itemDay, false);
      });
      setTimeFields(timesResult.filter(item => item));
   };

   const DayCreate = ({ date, stringDate }) => {
      return (
         <li className={`${styles.RecordViewingDayItem} ${valueForm.day === stringDate ? styles.RecordViewingActive : ''}`}>
            <div className={styles.RecordViewingDayCheck} aria-hidden="true">
               <IconChecked />
            </div>
            <input
               type="radio"
               name="record-day"
               value={`${stringDate}`}
               checked={valueForm.day === stringDate}
               onChange={() => onChangeDay(stringDate)}
               className={styles.RecordViewingDayInput}
            />
            <span className={styles.RecordViewingDayWeek}>{maps.daysOfWeek[date.getDay()]}</span>
            <span className={styles.RecordViewingDayMonth}>{date.getDate()}</span>
            <span className={styles.RecordViewingMonth}>{maps.months[date.getMonth()]}</span>
         </li>
      );
   };

   const DaysLayout = () => {
      return (
         <div className={styles.RecordViewingDays} ref={daysRef}>
            {[...new Array(14)].map((_, index) => {
               const date = new Date(newDate.setDate(newDate.getDate() + (index === 0 ? 0 : 1)));
               const stringDate = getStringDate(date);

               let inputCurrentDay = checkCurrentDay(inputDateValue, stringDate);
               return <DayCreate key={index} date={date} stringDate={stringDate} />;
            })}
         </div>
      );
   };

   const TimesLayout = () => {
      return (
         <div className={styles.RecordViewingDays} ref={timeRef}>
            {timeFields.map((time, index) => {
               return (
                  <li key={index} className={`${styles.RecordViewingTime} ${valueForm.time === time ? styles.RecordViewingActive : ''}`}>
                     <div className={styles.RecordViewingDayCheck} aria-hidden="true">
                        <IconChecked />
                     </div>
                     <input
                        type="radio"
                        name="record-day"
                        value={time}
                        checked={valueForm.time === time}
                        onChange={() => {
                           setValueForm({ ...valueForm, time: time });
                           if (timeRef.current) {
                              const currentScrollLeft = timeRef.current.scrollLeft;
                              setTimeScrollLeft(currentScrollLeft);
                           }
                        }}
                        className={styles.RecordViewingDayInput}
                     />
                     <span>{time}</span>
                  </li>
               );
            })}
         </div>
      );
   };

   const onScrollHandler = (ref, action, offset) => {
      const el = ref.current;
      if (!el) return;

      el.scrollTo({
         left: action === '+' ? el.scrollLeft + offset : el.scrollLeft - offset,
         behavior: 'smooth',
      });
   };

   return (
      <Modal options={{ overlayClassNames: '_full', modalContentClassNames: styles.RecordViewingRoot }} set={set} condition={condition}>
         <div className="container !max-w-[1104px]">
            <h2 className="title-2 mb-2">Записаться на просмотр</h2>
            <p>Выберите удобное время и дождитесь подтверждения от застройщика</p>
            <div className="mt-8">
               <h3 className="title-3 mb-4">Выберите день</h3>
               <div className="relative">
                  <NavBtnPrev onClick={() => onScrollHandler(daysRef, '-', 300)} variant="Secondary" className="!absolute centered-y -left-12" />
                  <DaysLayout />
                  <NavBtnNext onClick={() => onScrollHandler(daysRef, '+', 300)} variant="Secondary" className="!absolute centered-y -right-12" />
               </div>
            </div>
            <div className="mt-8">
               <h3 className="title-3 mb-4">Выберите время</h3>
               <div className="relative">
                  <NavBtnPrev onClick={() => onScrollHandler(timeRef, '-', 300)} variant="Secondary" className="!absolute centered-y -left-12" />
                  <TimesLayout />
                  <NavBtnNext onClick={() => onScrollHandler(timeRef, '+', 300)} variant="Secondary" className="!absolute centered-y -right-12" />
               </div>
            </div>
            <div className="mt-8">
               <h3 className="title-3 mb-4">Контактные данные</h3>
               <div className="grid grid-cols-2 gap-4">
                  <Input before="Ваше имя" value={valueForm.name} onChange={value => setValueForm({ ...valueForm, name: value })} />
                  <Input
                     before="Номер телефона"
                     value={valueForm.phone}
                     onChange={value => setValueForm({ ...valueForm, phone: value })}
                     mask="phone"
                  />
               </div>
            </div>
            <Button className="w-full mt-8">Отправить</Button>
         </div>
      </Modal>
   );
};

export default RecordViewing;

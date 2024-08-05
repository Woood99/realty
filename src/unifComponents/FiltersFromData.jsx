import React from 'react';
import FieldRow from '../uiForm/FieldRow';
import MultiSelect from '../uiForm/MultiSelect';
import FieldInput from '../uiForm/FieldInput';
import Input from '../uiForm/Input';
import SelectTag from '../uiForm/SelectTag';
import isEmptyArrObj from '../helpers/isEmptyArrObj';

const FiltersFromData = props => {
   const { data, filtersSelector } = props;

   if (data.type === 'list-multiple' && !isEmptyArrObj(data.options)) {
      return (
         <FieldRow name={data.nameLabel || data.label} widthName={180} widthChildren={460}>
            <MultiSelect options={data.options} value={data.value} onChange={value => props.handleChange(data.name, value)} search btnsActions />
         </FieldRow>
      );
   }
   if (data.type === 'tags-single' && !isEmptyArrObj(data.options)) {
      return (
         <FieldRow name={data.nameLabel || data.label} widthName={180} widthChildren={460}>
            <SelectTag onChange={value => props.handleChange(data.name, value)} value={data.value} options={data.options} />
         </FieldRow>
      );
   }
   if (data.type === 'tags-multiple' && !isEmptyArrObj(data.options)) {
      return (
         <FieldRow name={data.nameLabel || data.label} widthName={180} widthChildren={99999}>
            <SelectTag type="multiple" onChange={value => props.handleChange(data.name, value)} value={data.value} options={data.options} />
         </FieldRow>
      );
   }
   if (data.type === 'field-fromTo' && !isEmptyArrObj(data.options)) {
      const { from, to } = data;
      return (
         <FieldRow name={data.nameLabel || data.label} widthName={180} widthChildren={460}>
            <FieldInput>
               <Input
                  value={filtersSelector[data.name].value[from.name]}
                  onChange={value => props.handleChangeInput(data.name, from.name, value)}
                  before={from.label}
                  variant="Left"
                  convertNumber
                  onlyNumber
                  maxLength={3}
               />
               <Input
                  value={filtersSelector[data.name].value[to.name]}
                  onChange={value => props.handleChangeInput(data.name, to.name, value)}
                  before={to.label}
                  after={data.postfix}
                  variant="Right"
                  convertNumber
                  onlyNumber
                  maxLength={3}
               />
            </FieldInput>
         </FieldRow>
      );
   }
};

export default FiltersFromData;

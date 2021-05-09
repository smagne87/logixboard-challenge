import React, { useState } from 'react';
import { Calendar as CalendarComponent, OnChangeProps } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

type CalendarProps = {
  onChange: (date: Date) => void;
  date: Date;
};

export default function Calendar(props: CalendarProps): JSX.Element {
  const { onChange, date } = props;
  const [dateValue, setDateValue] = useState<Date>(date || null);

  const handleOnchange = (valueDate: OnChangeProps) => {
    if (onChange) {
      onChange(valueDate as Date);
      setDateValue(valueDate as Date);
    }
  };
  return <CalendarComponent date={dateValue} onChange={handleOnchange} />;
}

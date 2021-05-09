import React, { useState } from 'react';
import format from 'date-fns/format';
import Calendar from 'components/Calendar/Calendar';

type CalendarInputProps = {
  value?: string;
  closeOnChange: boolean;
  onChange?: (date: Date) => void;
  id: string;
  className: string;
};

export default function CalendarInput(props: CalendarInputProps): JSX.Element {
  const { value, onChange, closeOnChange, id, className } = props;
  const stringDate =
    typeof value === 'string' && value !== '' ? new Date(value) : value;
  const [calendarInputValue, setCalendarInputValue] = useState(
    stringDate || new Date()
  );
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleInputClick = () => setCalendarOpen(!calendarOpen);

  const handleCalendarValueChange = (date: Date) => {
    setCalendarInputValue(date);
    if (onChange) {
      onChange(date);
    }
    if (closeOnChange) {
      setCalendarOpen(false);
    }
  };

  return (
    <>
      <input
        id={id}
        placeholder="01/01/2021"
        value={format(calendarInputValue, 'MM/dd/yyyy')}
        onClick={handleInputClick}
        className={className}
      />
      {calendarOpen && (
        <Calendar
          date={calendarInputValue}
          onChange={handleCalendarValueChange}
        />
      )}
    </>
  );
}

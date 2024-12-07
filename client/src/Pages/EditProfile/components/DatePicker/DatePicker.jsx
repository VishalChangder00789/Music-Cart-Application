import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

const DatePickerComponent = ({
  dateOfBirth,
  setDateOfBirth,
  isDatePickerOpen,
  setIsDatePickerOpen,
  datePickerRef,
}) => {
  return (
    <DatePicker
      selected={dateOfBirth}
      className="outline-none custom-datepicker-input"
      onChange={(date) => {
        setDateOfBirth(date);
        setIsDatePickerOpen(false); // Close the date picker on date selection
      }}
      open={isDatePickerOpen} // Control visibility
      onClickOutside={() => setIsDatePickerOpen(false)} // Close when clicking outside
      placeholderText="Select Date"
    />
  );
};

export default DatePickerComponent;

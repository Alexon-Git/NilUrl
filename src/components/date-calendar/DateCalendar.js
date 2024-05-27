import React from "react";
import "./dateCalendar.css";

const arrMonth = {
  Январь: 31,
  Февраль: 28,
  Март: 31,
  Апрель: 30,
  Май: 31,
  Июнь: 30,
  Июль: 31,
  Август: 31,
  Сентябрь: 30,
  Октябрь: 31,
  Ноябрь: 30,
  Декабрь: 31,
};

const arrDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState(props.initialDate);
  }

  getSelectedDate = () => {
    const { year, month, day } = this.state;
    const formattedMonth = (month + 1).toString().padStart(2, '0'); 
    const formattedDay = day.toString().padStart(2, '0'); 
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  getInitialState(initialDate) {
    const today = new Date();
    let year, month, day, day_today;

    if (initialDate) {
      const dateParts = initialDate.split('-');
      year = parseInt(dateParts[0], 10);
      month = parseInt(dateParts[1], 10) - 1; 
      day = parseInt(dateParts[2], 10);
      day_today = today.getDate();
      console.log("Добытый");
      console.log(year,month,day);
    } else {
      year = today.getFullYear();
      month = today.getMonth();
      day = today.getDate();
      day_today = day;
      console.log("Изначальный");
      console.log(year,month,day);
    }
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = arrMonth[Object.keys(arrMonth)[month]];

    return {
      year: year,
      month: month,
      day: day,
      today: day_today,
      firstDay: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1,
      strMonth: Object.keys(arrMonth)[month],
      strMonthValue: daysInMonth,
    };
  }

  onItemClick = (event) => {
    event.preventDefault();
    const selectedDate = new Date(this.state.year, this.state.month, parseInt(event.currentTarget.dataset.id));
    const today = new Date();
    if (selectedDate < today) {
        return; // Do nothing if clicked date is before today
    }
    this.props.onDateChange(selectedDate);
    this.setState({ day: parseInt(event.currentTarget.dataset.id) }, () => {
      this.getDateData(selectedDate);
    });
};

  getDateData = (selectedDate) => {
    const day = selectedDate.getDate().toString().padStart(2, '0');
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = selectedDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    console.log('Selected date:', formattedDate);
    return formattedDate;
  };

  previousMonth = () => {
    const today = new Date();
    let newMonth = this.state.month - 1;
    let newYear = this.state.year;
    if (newMonth < today.getMonth() || newYear < today.getFullYear()) {
        return; // Do nothing if trying to go to past months
    }
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    this.updateCalendar(newMonth, newYear);
};

  nextMonth = () => {
    let newMonth = this.state.month + 1;
    let newYear = this.state.year;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    this.updateCalendar(newMonth, newYear);
  };

  updateCalendar = (newMonth, newYear) => {
    const firstDayOfMonth = new Date(newYear, newMonth, 1).getDay();
    const daysInMonth = arrMonth[Object.keys(arrMonth)[newMonth]];

    this.setState({
      year: newYear,
      month: newMonth,
      day: this.state.today,
      firstDay: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1,
      strMonth: Object.keys(arrMonth)[newMonth],
      strMonthValue: daysInMonth,
    });
  };

  handleWeekClick = (e) => {
    e.preventDefault();
    const selectedDate = new Date(this.state.year, this.state.month, this.state.day);
    const today = new Date();
    const nextWeek = new Date(selectedDate);
    nextWeek.setDate(selectedDate.getDate() + 7);
    if (nextWeek < today) {
        return; // Do nothing if the resulting week is before today
    }
    this.props.onDateChange(nextWeek);
    this.setState({
      year: nextWeek.getFullYear(),
      month: nextWeek.getMonth(),
      day: nextWeek.getDate(),
      firstDay: new Date(nextWeek.getFullYear(), nextWeek.getMonth(), 1).getDay() === 0 ? 6 : new Date(nextWeek.getFullYear(), nextWeek.getMonth(), 1).getDay() - 1,
      strMonth: Object.keys(arrMonth)[nextWeek.getMonth()],
      strMonthValue: arrMonth[Object.keys(arrMonth)[nextWeek.getMonth()]],
    });
};

handleMonthClick = (e) => {
    e.preventDefault();
    const selectedDate = new Date(this.state.year, this.state.month, this.state.day);
    const today = new Date();
    const nextMonth = new Date(selectedDate);
    nextMonth.setMonth(selectedDate.getMonth() + 1);
    if (nextMonth.getDate() !== this.state.day) {
      nextMonth.setDate(0);
    }
    if (nextMonth < today) {
        return; // Do nothing if the resulting month is before today
    }
    this.props.onDateChange(nextMonth);
    this.setState({
      year: nextMonth.getFullYear(),
      month: nextMonth.getMonth(),
      day: nextMonth.getDate(),
      firstDay: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1).getDay() === 0 ? 6 : new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1).getDay() - 1,
      strMonth: Object.keys(arrMonth)[nextMonth.getMonth()],
      strMonthValue: arrMonth[Object.keys(arrMonth)[nextMonth.getMonth()]],
    });
};

  render() {
    return (
      <div className="date-picker">
        <div className="date-left">
          <h2>Today</h2>
          <h1>{this.state.today}</h1>
        </div>
        <div className="date-right" id="col-right">
          <div className="date-right-top" id="title">
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                this.previousMonth();
              }}
            >
              {"<"}
            </button>
            <div className="month-year">{`${this.state.strMonth} ${this.state.year}`}</div>
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                this.nextMonth();
              }}
            >
              {">"}
            </button>
          </div>
          <table className="date-table">
          {this.createTable()}
          </table>
          <div className="date-right-footer">
            <button
              type="button"
              className="date-right-footer-button"
              onClick={this.handleWeekClick}
            >
              На неделю
            </button>
            <button
              type="button"
              className="date-right-footer-button"
              onClick={this.handleMonthClick}
            >
              На месяц
            </button>
          </div>
        </div>
      </div>
    );
  }

  createTable = () => {
    let table = [];
    let count = 1 - this.state.firstDay;
    let children = [];
    for (let i = 0; i < 7; i++) {
      children.push(<td key={i}>{arrDays[i].substring(0, 3)}</td>);
    }
    children = this.pushTable(table, children);
    while (count <= this.state.strMonthValue) {
      for (let j = 0; j < 7; j++) {
        count <= this.state.strMonthValue && count > 0
          ? children.push(
              <td
                key={count}
                onClick={this.onItemClick}
                className={`item-block ${
                  this.state.day === count ? "active" : "inactive"
                }`}
                data-id={count}
              >
                {count}
              </td>
            )
          : children.push(<td key={count}></td>);
        count++;
      }
      children = this.pushTable(table, children);
    }
    return table;
  };

  pushTable = (table, children) => {
    table.push(
      <tbody key={table}>
        <tr key={children}>{children}</tr>
      </tbody>
    );
    return [];
  };
}

export default Calendar;
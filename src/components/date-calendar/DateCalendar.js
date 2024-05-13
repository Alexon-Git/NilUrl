import React from 'react';
import "./dateCalendar.css";


function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const arrMonth = {
  January: 30,
  February: 27,
  March: 30,
  April: 29,
  May: 30,
  June: 29,
  July: 30,
  August: 30,
  September: 29,
  October: 30,
  November: 29,
  December: 30
};

const arrDays = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье"
];

class Calendar extends React.Component {
  constructor() {
    super();
    _defineProperty(this, "pushTable",
      (table, children) => {
        table.push(
          <tbody key={table}>
            <tr key={children}>{children}</tr>
          </tbody>
        );
        return [];
      });
    _defineProperty(this, "createTable", () => {
      let table = [];
      let count = 1 - this.state.firstDay;
      let children = [];
      for (let i = 0; i < 7; i++) {
        children.push(<td key={i}>{arrDays[i].substring(0, 3)}</td>);
      }
      children = this.pushTable(table, children);
      while (count <= this.state.strMonthValue + 1) {
        for (let j = 0; j < 7; j++) {
          count <= this.state.strMonthValue + 1 && count > 0 ?
            children.push(
              <td
                key={count}
                onClick={this.onItemClick.bind(this)}
                className={`item-block ${
                  this.state.day === count ? "active" : "inactive"
                  }`}
                data-id={count}
              >
                {count}
              </td>
            ) :
            children.push(<td key={count}></td>);
          count += 1;
        }
        children = this.pushTable(table, children);
      }
      return table;
    });
    _defineProperty(this, "previousMonth", () => {
      let lastDay = this.state.firstDay - 1 < 0 ? 6 : this.state.firstDay - 1;
      if (this.state.month - 1 < 0) {
        this.setState({ year: this.state.year - 1, month: 11 }, () => {
          let newMonth = this.state.month;
          let newYear = this.state.year;
          this.calcPrevMonth(lastDay, newMonth, newYear);
        });
      } else {
        this.setState({ month: this.state.month - 1 }, () => {
          let newMonth = this.state.month;
          this.calcPrevMonth(lastDay, newMonth, this.state.year);
        });
      }
      return this.createTable();
    });
    _defineProperty(this, "nextMonth", () => {
      let lastDay = this.state.firstDay + this.state.strMonthValue % 7;
      let firstDay = lastDay + 1 > 6 ? lastDay - 6 : lastDay + 1;
      if (this.state.month + 1 > 11) {
        this.setState(
          { year: this.state.year + 1, month: 0, firstDay: firstDay },
          () => {
            let newMonth = this.state.month;
            let newYear = this.state.year;
            this.calcNextMonth(newMonth, newYear);
          }
        );
      } else {
        this.setState({ month: this.state.month + 1, firstDay: firstDay }, () => {
          let newMonth = this.state.month;
          this.calcNextMonth(newMonth, this.state.year);
        });
      }
      return this.createTable();
    });
    this.today = new Date();
    let year = parseInt(this.today.toJSON().slice(0, 4));
    let month = parseInt(this.today.toJSON().slice(5, 7)) - 1;
    this.dayToday = parseInt(this.today.toJSON().slice(8, 10)) - 1;
    this.weekdayToday = this.today.getDay() === 0 ? 6 : this.today.getDay() - 1;
    let _firstDay = this.weekdayToday - this.dayToday % 7;
    _firstDay = _firstDay < 0 ? 6 - _firstDay : _firstDay;
    let strMonth = Object.keys(arrMonth)[month];
    let strMonthValue = Object.values(arrMonth)[month];
    if (month === 1 && year % 4 === 0) {
      strMonthValue = 28;
    }
    this.state = {
      year: year,
      month: month,
      day: this.dayToday + 1,
      firstDay: _firstDay,
      strMonth: strMonth,
      strMonthValue: strMonthValue
    };
  }
  onItemClick(event) {
    this.setState({ day: parseInt(event.currentTarget.dataset.id) });
  }
  calcPrevMonth(lastDay, newMonth, newYear) {
    let newMonthValue = Object.values(arrMonth)[newMonth];
    if (this.state.month === 1 && newYear % 4 === 0) {
      newMonthValue = 28;
    }
    let first = lastDay - newMonthValue % 7;
    first = first < 0 ? 7 + first : first;
    this.setState({
      strMonth: Object.keys(arrMonth)[newMonth],
      strMonthValue: newMonthValue,
      firstDay: first,
      day: newMonthValue + 1
    });
  }
  calcNextMonth(newMonth, newYear) {
    let newMonthValue = Object.values(arrMonth)[newMonth];
    if (this.state.month === 1 && newYear % 4 === 0) {
      newMonthValue = 28;
    }
    this.setState({
      strMonth: Object.keys(arrMonth)[newMonth],
      strMonthValue: newMonthValue,
      day: 1
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-4" id="col-left">
          <div className="row" id="part-1">
            <div className="col">
              <h2>Today</h2>
              <h1>{this.dayToday + 1}</h1>
              <h5>{arrDays[this.weekdayToday]}</h5>
            </div>
          </div>
        </div>
        <div className="col-8" id="col-right">
          <div className="row on-top" id="title">
            <div className="col-3 my-auto" id="l-arrow">
              <button className="btn" onClick={this.previousMonth}>{"<"}</button>
            </div>
            <div className="col-6" id="title-date">{`${this.state.strMonth} ${this.state.year}`}</div>
            <div className="col-3 my-auto" id="r-arrow">
              <button className="btn" onClick={this.nextMonth}>{">"}</button>
            </div>
          </div>
          <div className="row">
            <div className="col date-picker">
              <table className="table date-picker">
                {this.createTable()}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
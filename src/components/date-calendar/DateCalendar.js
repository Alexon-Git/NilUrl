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
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = arrMonth[Object.keys(arrMonth)[month]];

    return {
      year: year,
      month: month,
      day: today.getDate(),
      today: today.getDate(), // Сохраняем сегодняшнее число
      firstDay: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1,
      strMonth: Object.keys(arrMonth)[month],
      strMonthValue: daysInMonth,
    };
  }

  onItemClick = (event) => {
    this.setState({ day: parseInt(event.currentTarget.dataset.id) });
  };

  previousMonth = () => {
    let newMonth = this.state.month - 1;
    let newYear = this.state.year;
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
      day: this.state.today, // Возвращаем сегодняшнее число
      firstDay: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1,
      strMonth: Object.keys(arrMonth)[newMonth],
      strMonthValue: daysInMonth,
    });
  };

  render() {
    return (
      <div className="date-picker">
        <div className="date-left">
          <h2>Сегодня</h2>
          <h1>{this.state.today}</h1>
        </div>
        <div className="date-right" id="col-right">
          <div className="date-right-top" id="title">
            <button
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
        </div>
      </div>


      /*  <div className="date-picker">
        <div className="row">
          <div className="col-4" id="col-left">
            <div className="row left-center" id="part-1">
              <div className="col">
                <h2>Сегодня</h2>
                <h1>{this.state.today}</h1>
              </div>
            </div>
          </div>
          <div className="col-8" id="col-right">
            <div className="row on-top" id="title">
              <div className="col-3 my-auto" id="l-arrow">
                <button
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    this.previousMonth();
                  }}
                >
                  {"<"}
                </button>
              </div>
              <div
                className="col-6"
                id="title-date"
              >{`${this.state.strMonth} ${this.state.year}`}</div>
              <div className="col-3 my-auto" id="r-arrow">
                <button
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    this.nextMonth();
                  }}
                >
                  {">"}
                </button>
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
      </div> */
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

let monthArr = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December", "January"];

let date = {
    initial: new Date(),

    get selectedDate() {
        let selectedDate = document.getElementById('selected-month').innerHTML;
        let stringArr = selectedDate.split(" ");
        return new Date(stringArr[1], monthArr.indexOf(stringArr[0]));
    },

    get nextMonthDate() {
        return new Date(this.selectedDate.setMonth(this.selectedDate.getMonth() + 1));
    },

    get lastMonthDate() {
        return new Date(this.selectedDate.setMonth(this.selectedDate.getMonth() - 1));
    },

    set nextMonthDate(date) {
        return new Date(this.nextMonthDate.setMonth(date.getMonth() + 1));
    },

    set lastMonthDate(date) {
        return new Date(this.lastMonthDate.setMonth(date.getMonth() - 1));
    }
};

function setBackground(element, color) {
    return element.style.background = color;
}

function selectElements(element, color) {
    let targetArr = [];
    for (let i = 0; i < element.length; i++) {
        element[i].addEventListener('click', (event) => {
            let target = event.target;

            targetArr.push(target);
            for (let i = 0; i < targetArr.length; i++) {
                setBackground(targetArr[i], 'lightgray');
            }

            setBackground(target, color);
        })
    }
}


function clearElementBackground(clickElement, elementArr, color) {
    clickElement.addEventListener('click', () => {
        for (let i = 0; i < elementArr.length; i++) {
            setBackground(elementArr[i], color);
        }
    })
}

function getSelectedDayFullDate(element) {
    for (let i = 0; i < element.length; i++) {
        element[i].addEventListener('click', (event) => {
            let dayFullDate = new Date(date.selectedDate.getFullYear(), date.selectedDate.getMonth(), event.target.innerHTML);
            let dayNumber = dayFullDate.getDay();
                for (let i = 0; i < element.length; i++){
                    clearElementBackground(element[i], dayNameElementArr, "#F7817E");
                }
            setBackground(dayNameElementArr[dayNumber], 'blue');
        })
    }
}


function changeSelectedMonthFromNextMonth() {
    let selectedMonthElement = document.getElementById('selected-month');
    let nextMonthElement = document.getElementById('next-month');
    let lastMonthElement = document.getElementById('last-month');

    nextMonthElement.addEventListener('click', () => {
        let newSelectedMonth = date.nextMonthDate;

        if (newSelectedMonth.getMonth() === 0) {
            lastMonthElement.innerHTML = monthArr[11];
        } else {
            lastMonthElement.innerHTML = monthArr[newSelectedMonth.getMonth() - 1];
        }
        selectedMonthElement.innerHTML = monthArr[newSelectedMonth.getMonth()] + " " + newSelectedMonth.getFullYear();

        let newNextMonth = date.nextMonthDate = newSelectedMonth;
        nextMonthElement.innerHTML = monthArr[newNextMonth.getMonth() + 1];

        setDaysForMonth(date.selectedDate);

        return newSelectedMonth;
    });
}

function changeSelectedMonthFromLastMonth() {
    let selectedMonthElement = document.getElementById('selected-month');
    let nextMonthElement = document.getElementById('next-month');
    let lastMonthElement = document.getElementById('last-month');

    lastMonthElement.addEventListener('click', () => {
        let newSelectedMonth = date.lastMonthDate;

        if (newSelectedMonth.getMonth() === 0) {
            lastMonthElement.innerHTML = monthArr[11];
        } else {
            lastMonthElement.innerHTML = monthArr[newSelectedMonth.getMonth() - 1];
        }
        selectedMonthElement.innerHTML = monthArr[newSelectedMonth.getMonth()] + " " + newSelectedMonth.getFullYear();

        let newNextMonth = date.nextMonthDate = newSelectedMonth;
        nextMonthElement.innerHTML = monthArr[newNextMonth.getMonth() + 1];

        setDaysForMonth(date.selectedDate);

        return newSelectedMonth;
    })
}

//todo would this be better in my custom date object?
function daysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function setDaysForMonth(date) {
    let monthDays = daysInMonth(date);
    let dayNumberForFirstOfMonth = new Date(date.getFullYear(), date.getMonth()).getDay();
    let htmlDateArr = document.getElementsByClassName("day");

    for (let i = 0; i < monthDays; i++) {
        htmlDateArr[dayNumberForFirstOfMonth + i].innerHTML = i + 1;
    }
}

// function getFullDateForEachDay() {
//     htmlDateArr[dayNumberForFirstOfMonth + i].addEventListener('click', () => {
//         let eachDayFullDate = new Date(monthFullDate.getFullYear(), monthFullDate.getMonth(), i + 1);
//         console.log(eachDayFullDate);
//     });
// }


//     let htmlDateArr = document.getElementsByClassName("day");
//     let targetArr = [];
//     for (let i = 0; i < htmlDateArr.length; i++) {
//         htmlDateArr[i].addEventListener('click', (event) => {
//             let selectedDayNumber = htmlDateArr[i];
//             // targetArr.push(target);
//
//             let dayNumberForSelectedDate = new Date(this.getInitialDate().getFullYear(), this.getInitialDate().getMonth()).getDay(selectedDayNumber);
//             console.log(dayNumberForSelectedDate);
//         })
//     }
//
//
// }

//todo move into my date object?
let dayElementArr = document.getElementsByClassName('day');
let dayNameElementArr = document.getElementsByClassName('day-name');
let selectedDate = document.getElementById('selected-month');
let nextMonth = document.getElementById('next-month');
let lastMonth = document.getElementById('last-month');

selectedDate.innerHTML = monthArr[date.initial.getMonth()] + " " + date.initial.getFullYear();
nextMonth.innerHTML = monthArr[date.nextMonthDate.getMonth()];
lastMonth.innerHTML = monthArr[date.lastMonthDate.getMonth()];


selectElements(dayElementArr, "blue");
clearElementBackground(nextMonth, dayElementArr, 'lightgray');
clearElementBackground(lastMonth, dayElementArr, 'lightgray');

changeSelectedMonthFromLastMonth();
changeSelectedMonthFromNextMonth();

daysInMonth(date.lastMonthDate);

setDaysForMonth(date.selectedDate, dayElementArr);

getSelectedDayFullDate(dayElementArr);


// date.selectDayOfTheWeekFromDate();


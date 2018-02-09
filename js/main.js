let monthArr = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December", "January"];

function applyListener(element, type = 'click', callback) {
    return element.addEventListener(type, callback);
}

function setBackground(element, color) {
    return element.style.background = color;
}

function setElementClassName(element, className) {
    return element.classList.add(className);
}

function selectElements(element, newElementBackground = 'blue', newElementClass) {
    let targetArr = [];
    for (let i = 0; i < element.length; i++) {
        applyListener(element[i], 'click', (event) => {
            let target = event.target;

            targetArr.push(target);
            for (let i = 0; i < targetArr.length; i++) {
                setBackground(targetArr[i], 'lightgray');
            }

            setBackground(event.target, newElementBackground);
            setElementClassName(target, newElementClass);

        })

    }
}


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


// function getInitialDate() {
//     // this.setDaysForSelectedMonth(getInitialDate);
//     return new Date();
// }
//
// function getSelectedDate() {
//     let selectedDate = document.getElementById('selected-month').innerHTML;
//     let stringArr = selectedDate.split(" ");
//     return new Date(stringArr[1], monthArr.indexOf(stringArr[0]));
// }
//
// function getNextMonthDate(date) {
//     return new Date(getSelectedDate().setMonth(date.getMonth() + 1)); //return full date object
// }
//
// function getLastMonthDate(date) {
//     return new Date(date.setMonth(date.getMonth() - 1));
//
// }

function changeSelectedMonthFromNextMonth() {

    let selectedMonth = document.getElementById('selected-month');
    let nextMonth = document.getElementById('next-month');
    let lastMonth = document.getElementById('last-month');

    nextMonth.addEventListener('click', () => {
        let newSelectedMonth = date.nextMonthDate;

        if (newSelectedMonth.getMonth() === 0) {
            lastMonth.innerHTML = monthArr[11];
        } else {
            lastMonth.innerHTML = monthArr[newSelectedMonth.getMonth() - 1];
        }
        selectedMonth.innerHTML = monthArr[newSelectedMonth.getMonth()] + " " + newSelectedMonth.getFullYear();

        let newNextMonth = date.nextMonthDate = newSelectedMonth;
        nextMonth.innerHTML = monthArr[newNextMonth.getMonth() + 1];

        return newSelectedMonth;
    });
}

function changeSelectedMonthFromLastMonth() {

    let selectedMonth = document.getElementById('selected-month');
    let nextMonth = document.getElementById('next-month');
    let lastMonth = document.getElementById('last-month');

    lastMonth.addEventListener('click', () => {
        let newSelectedMonth = date.lastMonthDate;

        if (newSelectedMonth.getMonth() === 0) {
            lastMonth.innerHTML = monthArr[11];
        } else {
            lastMonth.innerHTML = monthArr[newSelectedMonth.getMonth() - 1];
        }
        selectedMonth.innerHTML = monthArr[newSelectedMonth.getMonth()] + " " + newSelectedMonth.getFullYear();

        let newNextMonth = date.nextMonthDate = newSelectedMonth;
        nextMonth.innerHTML = monthArr[newNextMonth.getMonth() + 1];

        return newSelectedMonth;
    })
}

function setDaysForSelectedMonth(date) {
    let selectedMonthFullDate = date ? date : this.getInitialDate();
    let daysInSelectedMonth = new Date(selectedMonthFullDate.getFullYear(), selectedMonthFullDate.getMonth() + 1, 0).getDate();
    let dayNumberForFirstOfMonth = new Date(selectedMonthFullDate.getFullYear(), selectedMonthFullDate.getMonth()).getDay();
    for (let i = 0; i < daysInSelectedMonth; i++) {
        let htmlDateArr = [];
        htmlDateArr = document.getElementsByClassName("day");

        htmlDateArr[dayNumberForFirstOfMonth + i].innerHTML = i + 1;
        htmlDateArr[dayNumberForFirstOfMonth + i].addEventListener('click', () => {
            let eachDayFullDate = new Date(selectedMonthFullDate.getFullYear(), selectedMonthFullDate.getMonth(), i + 1);
            console.log(eachDayFullDate);
        })
    }

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


}


let dayElement = document.getElementsByClassName('day');
let selectedDate = document.getElementById('selected-month');
let nextMonth = document.getElementById('next-month');
let lastMonth = document.getElementById('last-month');

// selectElements(dayElement, '', 'current');
selectedDate.innerHTML = monthArr[date.initial.getMonth()] + " " + date.initial.getFullYear();
nextMonth.innerHTML = monthArr[date.nextMonthDate.getMonth()];
lastMonth.innerHTML = monthArr[date.lastMonthDate.getMonth()];


changeSelectedMonthFromLastMonth();
changeSelectedMonthFromNextMonth();


// date.setDaysForSelectedMonth();
// date.selectDayOfTheWeekFromDate();


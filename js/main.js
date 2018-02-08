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
    current: new Date(),

    get selected() {
        return this.current;
    },

    get selectedMonth() {
        return this.selected.getMonth();
    },

    get selectedYear() {
        return this.selected.getFullYear();
    },

    set selectedYear(year) {
        return this.selected.setFullYear(year);
    },

    set selectedMonth(month) {
        return this.selected.setMonth(month);
    },

    set selectedFullDate(arr) {
        return this.selected.setFullYear(arr[0], arr[1]);
    }

};

// function setSelectedDate(year = getSelectedDate().getFullYear(),
//                          month = getSelectedDate().getMonth(),
//                          day = getSelectedDate().getDate()) {
//     let date = getSelectedDate();
//     date.setFullYear(year);
//     date.setMonth(month);
//     date.setDate(day);
//     return date;
// }

function getSelectedDate(date = new Date()) {
    // this.setDaysForSelectedMonth(getSelectedDate);
    return date;
}


function getNextMonthDate() {
    // return new Date(getSelectedDate().getFullYear(), getSelectedDate().getMonth() + 1);
    return new Date (date.selectedYear, date.selectedMonth + 1);

}

function getLastMonthDate() {
    // return new Date(getSelectedDate().getFullYear(), getSelectedDate().getMonth() - 1);
    return new Date (date.selectedYear, date.selectedMonth - 1);

}

//todo - after selecting lastMonth a few times, then selecting next month, it jumps far ahead
function changeSelectedMonthFromNextMonth() {
    let selectedMonthFullDate = getSelectedDate();
    let nextMonthFullDate = getNextMonthDate();

    nextMonth.addEventListener('click', () => {
        nextMonthFullDate.setMonth(selectedMonthFullDate.getMonth() + 1);
        selectedMonthFullDate.setMonth(selectedMonthFullDate.getMonth() + 1);
        if (selectedMonthFullDate.getMonth() === 0) {
            lastMonth.innerHTML = monthArr[11];
        } else {
            lastMonth.innerHTML = monthArr[selectedMonthFullDate.getMonth() - 1];
        }
        selectedMonth.innerHTML = monthArr[nextMonthFullDate.getMonth()] + " " + selectedMonthFullDate.getFullYear();
        nextMonth.innerHTML = monthArr[nextMonthFullDate.getMonth() + 1];

        console.log(selectedMonthFullDate);
        console.log(nextMonthFullDate);
        return selectedMonthFullDate;
    });
}

function changeSelectedMonthFromLastMonth() {
    let lastMonthFullDate = getLastMonthDate();
    let selectedMonthFullDate = getSelectedDate();

    lastMonth.addEventListener('click', () => {
        lastMonthFullDate.setMonth(selectedMonthFullDate.getMonth() - 1);
        selectedMonthFullDate.setMonth(selectedMonthFullDate.getMonth() - 1);
        if (selectedMonthFullDate.getMonth() === 0) {
            lastMonth.innerHTML = monthArr[11];
        } else {
            lastMonth.innerHTML = monthArr[lastMonthFullDate.getMonth() - 1];
        }
        selectedMonth.innerHTML = monthArr[lastMonthFullDate.getMonth()] + " " + selectedMonthFullDate.getFullYear();
        nextMonth.innerHTML = monthArr[lastMonthFullDate.getMonth() + 1];

        console.log(selectedMonthFullDate);
        console.log(lastMonthFullDate);
        return selectedMonthFullDate;
    })
}

function setDaysForSelectedMonth(date) {
    let selectedMonthFullDate = date ? date : this.getSelectedDate();
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
    //             let dayNumberForSelectedDate = new Date(this.getSelectedDate().getFullYear(), this.getSelectedDate().getMonth()).getDay(selectedDayNumber);
    //             console.log(dayNumberForSelectedDate);
    //         })
    //     }
    //
    //
    // }


}


let dayElement = document.getElementsByClassName('day');
let selectedMonth = document.getElementById('selected-month');
let nextMonth = document.getElementById('next-month');
let lastMonth = document.getElementById('last-month');


selectElements(dayElement, '', 'selected');
selectedMonth.innerHTML = monthArr[date.selectedMonth] + " " + date.selectedYear;
nextMonth.innerHTML = monthArr[getNextMonthDate().getMonth()];
lastMonth.innerHTML = monthArr[getLastMonthDate().getMonth()];

changeSelectedMonthFromNextMonth();
changeSelectedMonthFromLastMonth();

// date.setDaysForSelectedMonth();
// date.selectDayOfTheWeekFromDate();


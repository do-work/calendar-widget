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

function addClassToElement(element, className) {
    element.classList.add(className);
}

function setBackground(element, color) {
    return element.style.background = color;
}

function clearElementArrBackground(elementArr, color) {
    for (let i = 0; i < elementArr.length; i++) {
        setBackground(elementArr[i], color);
    }
}

function selectElements(element, color) {
    let targetArr = [];
    for (let i = 0; i < element.length; i++) {
        element[i].addEventListener('click', (event) => {
            let target = event.target;
            let dayFullDate = new Date(date.selectedDate.getFullYear(), date.selectedDate.getMonth(), event.target.innerHTML);
            // let dayNumber = dayFullDate.getDay();

            if ((target.classList.contains('last-month-overflow') || target.classList.contains('next-month-overflow')) === false)
            targetArr.push(target);
            for (let i = 0; i < targetArr.length; i++) {
                setBackground(targetArr[i], 'lightgray');
            }

            selectDayOfWeek(dayFullDate);
            setBackground(target, color);
        })
    }
}

function selectDayOfWeek(date) {
    let dayNumber = date.getDay();
    clearElementArrBackground(dayNameElementArr, '#F7817E');
    setBackground(dayNameElementArr[dayNumber], "blue");

}

function changeSelectedMonthFromNextMonth(selectedMonthElement, nextMonthElement, lastMonthElement, dayElementArr) {

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

        clearElementArrBackground(dayElementArr, 'lightgray');
        clearElementArrBackground(dayNameElementArr, '#F7817E');

        setDaysForMonth(date.selectedDate);
        setOverflowDaysForLastMonth();

        return newSelectedMonth;
    });
}

function changeSelectedMonthFromLastMonth(clickElement) {
    clickElement.addEventListener('click', lastMonthHandler);
}

function lastMonthHandler() {
    let newSelectedMonth = date.lastMonthDate;

    if (newSelectedMonth.getMonth() === 0) {
        lastMonthElement.innerHTML = monthArr[11];
    } else {
        lastMonthElement.innerHTML = monthArr[newSelectedMonth.getMonth() - 1];
    }
    selectedMonthElement.innerHTML = monthArr[newSelectedMonth.getMonth()] + " " + newSelectedMonth.getFullYear();

    let newNextMonth = date.nextMonthDate = newSelectedMonth;
    nextMonthElement.innerHTML = monthArr[newNextMonth.getMonth() + 1];

    lastMonthOverflowAction(lastMonthOverflowDays);
    clearElementArrBackground(dayElementArr, 'lightgray');
    clearElementArrBackground(dayNameElementArr, '#F7817E');

    setDaysForMonth(date.selectedDate);
    setOverflowDaysForLastMonth();
    lastMonthOverflowAction(lastMonthOverflowDays);
    setClassForCurrentMonth();

    return newSelectedMonth;
}

function lastMonthOverflowAction(elementArr) {
    for (let i = 0; i < elementArr.length; i++) {
        changeSelectedMonthFromLastMonth(elementArr[i]);
    }
}


function daysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getDayNumberForFirstOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth()).getDay()
}

function setDaysForMonth(date) {
    let monthDays = daysInMonth(date);
    let dayNumberForFirstOfMonth = getDayNumberForFirstOfMonth(date);
    let htmlDateArr = document.getElementsByClassName("day");

    for (let i = 0; i < htmlDateArr.length; i++) {
        htmlDateArr[i].innerHTML = '';
    }

    for (let i = 0; i < monthDays; i++) {
        htmlDateArr[dayNumberForFirstOfMonth + i].innerHTML = i + 1;
    }
}

function setClassForCurrentMonth() {
    let htmlDateArr = document.getElementsByClassName("day");

    for (let i = 0; i < htmlDateArr.length; i++) {
        if (htmlDateArr[i].innerHTML !== '')
            htmlDateArr[i].classList.add("selected-day");
        }
    }



function setOverflowDaysForLastMonth() {
    let monthFirstDay = getDayNumberForFirstOfMonth(date.selectedDate);
    let monthFullDate = date.selectedDate;

    for (let i = 0; i < dayElementArr.length; i++) {
        dayElementArr[i].className = "day";
        dayElementArr[i].removeEventListener('click', lastMonthHandler);
    }

    if (monthFirstDay !== 0) {
        let lastMonthDaysArr = [];
        let grabFirstFillDateOfLastMonth = new Date(monthFullDate.getFullYear(), monthFullDate.getMonth(), -monthFirstDay + 1);

        for (let i = 0; i < monthFirstDay; i++) {
            let nextDate = new Date(grabFirstFillDateOfLastMonth.getFullYear(), grabFirstFillDateOfLastMonth.getMonth(), grabFirstFillDateOfLastMonth.getDate() + (i));
            lastMonthDaysArr.push(nextDate);
            dayElementArr[i].innerHTML = lastMonthDaysArr[i].getDate();
            setBackground(dayElementArr[i], 'darkgray');
            addClassToElement(dayElementArr[i], 'last-month-overflow');
        }
    }
}

function setOverflowDaysForNextMonth() {
    let thisMonthFirstDay = getDayNumberForFirstOfMonth(date.selectedDate);
    let currentMonthDate = date.selectedDate;

    if (thisMonthFirstDay !== 0) {
        let lastMonthDaysArr = [];
        let grabFirstFillDateOfLastMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), -thisMonthFirstDay + 1);

        for (let i = 0; i < thisMonthFirstDay; i++) {
            let nextDate = new Date(grabFirstFillDateOfLastMonth.getFullYear(), grabFirstFillDateOfLastMonth.getMonth(), grabFirstFillDateOfLastMonth.getDate() + (i));
            lastMonthDaysArr.push(nextDate);
            dayElementArr[i].innerHTML = lastMonthDaysArr[i].getDate();
            setBackground(dayElementArr[i], 'darkgray');
            addClassToElement(dayElementArr[i], 'last-month-overflow');
        }
    }
}


//todo move into my date object?
let dayElementArr = document.getElementsByClassName('day');
let dayNameElementArr = document.getElementsByClassName('day-name');
let dayElementsSelectedMonth = document.getElementsByClassName('selected-day');
let selectedMonthElement = document.getElementById('selected-month');
let nextMonthElement = document.getElementById('next-month');
let lastMonthElement = document.getElementById('last-month');
let lastMonthOverflowDays = document.getElementsByClassName('last-month-overflow');


// set initial info and allow all day elements to be selected
selectedMonthElement.innerHTML = monthArr[date.initial.getMonth()] + " " + date.initial.getFullYear();
nextMonthElement.innerHTML = monthArr[date.nextMonthDate.getMonth()];
lastMonthElement.innerHTML = monthArr[date.lastMonthDate.getMonth()];

setDaysForMonth(date.selectedDate, dayElementArr);
selectElements(dayElementArr, "blue");
setOverflowDaysForLastMonth(date.lastMonthDate);
lastMonthOverflowAction(lastMonthOverflowDays);
setClassForCurrentMonth();



changeSelectedMonthFromNextMonth(selectedMonthElement, nextMonthElement, lastMonthElement, dayElementArr);
changeSelectedMonthFromLastMonth(lastMonthElement);







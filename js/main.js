function addDayListener() {
    let daysArr = document.getElementsByClassName('day');
    let targetArr = [];
    for (let i = 0; i < daysArr.length; i++) {
        daysArr[i].addEventListener('click', (event) => {
            let target = event.target;
            targetArr.push(target);

            for (let i = 0; i < targetArr.length; i++) {
                targetArr[i].style.background = "lightgray";
            }

            target.style.background = "blue";
            target.classList.add("selected");

        });
    }
}


class Dates {
    constructor() {
        this.selectedMonth = document.getElementById('selected-month');
        this.nextMonth = document.getElementById('next-month');
        this.lastMonth = document.getElementById('last-month');

        this.month = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        this.todayDate = new Date();
        this.monthNum = this.todayDate.getMonth();
        this.thisYear = this.todayDate.getFullYear();

    }

    selectedMonthInitial() {
        this.selectedMonth.innerHTML = this.month[this.monthNum] + " " + this.thisYear;
    }


    nextMonthInitial() {
        let nextMonth = this.todayDate.getMonth() + 1;
        if (nextMonth === 12) {
            this.nextMonth.innerHTML = this.month[0];
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            month.setMonth(0);
            let day = date.getDate();
            return new Date(year + 1, month, day);
        } else {
            this.nextMonth.innerHTML = this.month[nextMonth];
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth();
            let day = date.getDate();
            return new Date(year, month + 1, day);
        }
    }

    changeSelectedMonthToNextMonth() {
        this.nextMonth.addEventListener('click', () => {
            let nextMonthDate = this.nextMonthInitial();
            this.selectedMonth.innerHTML = this.month[nextMonthDate.getMonth()] + " " + nextMonthDate.getFullYear();
        })
    }

    setNextMonth() {
        if (this.month[this.monthNum + 1] < 12) {
            this.nextMonth.innerHTML = this.month[this.monthNum + 1];
        } else if (this.month[this.monthNum + 1] === 12) {
            let nextYear = this.nextMonth.innerHTML = this.month[0];
            this.thisYear = this.thisYear + 1;

        }

    }

    displayLastMonth() {
        this.lastMonth.innerHTML = this.month[this.monthNum - 1];

    }
}


addDayListener();
date = new Dates();
date.selectedMonthInitial();
date.nextMonthInitial();
date.displayLastMonth();
date.changeSelectedMonthToNextMonth();



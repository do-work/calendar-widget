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
            "August", "September", "October", "November", "December", "January"];
        this.todayDate = new Date();
        this.monthNum = this.todayDate.getMonth();
        this.thisYear = this.todayDate.getFullYear();
    }

    selectedMonthInitial() {
        this.selectedMonth.innerHTML = this.month[this.monthNum] + " " + this.thisYear;
        return new Date();
    }

    nextMonthInitial() {
        let nextMonth = this.todayDate.getMonth() + 1;

        if (nextMonth === 12) {
            this.nextMonth.innerHTML = this.month[0];
            this.monthNum.setMonth(0);
            return new Date(this.thisYear + 1);
        } else {
            this.nextMonth.innerHTML = this.month[nextMonth];
            return new Date(this.thisYear, this.monthNum);
        }
    }

    lastMonthInitial() {
        let lastMonth = this.todayDate.getMonth() - 1;
        if (lastMonth === -1) {
            this.lastMonth.innerHTML = this.month[11];
            this.monthNum.setMonth(11);
            return new Date(this.thisYear - 1);
        } else {
            this.lastMonth.innerHTML = this.month[lastMonth];
            return new Date(this.thisYear, this.monthNum);
        }

    }

    changeSelectedMonth() {
        let nextMonthFullDate = this.nextMonthInitial();
        let selectedMonthFullDate = this.selectedMonthInitial();
        let lastMonthFullDate = this.lastMonthInitial();

        this.nextMonth.addEventListener('click', () => {
            nextMonthFullDate.setMonth(selectedMonthFullDate.getMonth() + 1);
            selectedMonthFullDate.setMonth(selectedMonthFullDate.getMonth() + 1);
            if (selectedMonthFullDate.getMonth() === 0) {
                this.lastMonth.innerHTML = this.month[11];
            } else {
                this.lastMonth.innerHTML = this.month[selectedMonthFullDate.getMonth() - 1];
            }

            this.selectedMonth.innerHTML = this.month[nextMonthFullDate.getMonth()] + " " + selectedMonthFullDate.getFullYear();
            this.nextMonth.innerHTML = this.month[nextMonthFullDate.getMonth() + 1];
            return selectedMonthFullDate;

        });

        this.lastMonth.addEventListener('click', () => {
            lastMonthFullDate.setMonth(selectedMonthFullDate.getMonth() - 1);
            selectedMonthFullDate.setMonth(selectedMonthFullDate.getMonth() - 1);
            if (selectedMonthFullDate.getMonth() === 0) {
                this.lastMonth.innerHTML = this.month[11];
            } else {
                this.lastMonth.innerHTML = this.month[lastMonthFullDate.getMonth() - 1];
            }
            this.selectedMonth.innerHTML = this.month[lastMonthFullDate.getMonth()] + " " + selectedMonthFullDate.getFullYear();
            this.nextMonth.innerHTML = this.month[lastMonthFullDate.getMonth() + 1];
            return selectedMonthFullDate;


        })
    }


}


addDayListener();
date = new Dates();
date.selectedMonthInitial();
date.nextMonthInitial();
date.lastMonthInitial();
date.changeSelectedMonth();


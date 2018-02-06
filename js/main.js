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
        this.selectedMonthFullDate = this.selectedMonthInitial();
    }

    selectDay() {
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

    changeSelectedMonthFromNextMonth() {
        let nextMonthFullDate = this.nextMonthInitial();
        let selectedMonthFullDate = this.selectedMonthFullDate;
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

            this.setDaysForSelectedMonth();
            return selectedMonthFullDate;
        });
    }

    changeSelectedMonthFromLastMonth() {
        let lastMonthFullDate = this.lastMonthInitial();
        let selectedMonthFullDate = this.selectedMonthFullDate;

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

            this.setDaysForSelectedMonth();
            return selectedMonthFullDate;
        })
    }

    setDaysForSelectedMonth() {
        let htmlDateArr = document.getElementsByClassName("day");
        let daysInSelectedMonth = new Date(this.selectedMonthFullDate.getFullYear(), this.selectedMonthFullDate.getMonth() + 1, 0).getDate();
        let dayNumberForFirstOfMonth = new Date(this.selectedMonthFullDate.getFullYear(), this.selectedMonthFullDate.getMonth()).getDay();

            for (let i = 0; i < daysInSelectedMonth; i++) {
                htmlDateArr[dayNumberForFirstOfMonth + i].innerHTML = i + 1;
                htmlDateArr[dayNumberForFirstOfMonth + i].addEventListener('click', () => {
                    console.log(new Date(this.selectedMonthFullDate.getFullYear(), this.selectedMonthFullDate.getMonth(), i + 1));
                })
            }
    }


}

date = new Dates();
date.selectDay();
date.selectedMonthInitial();
date.nextMonthInitial();
date.lastMonthInitial();
date.changeSelectedMonthFromNextMonth();
date.changeSelectedMonthFromLastMonth();
date.setDaysForSelectedMonth();


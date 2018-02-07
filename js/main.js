class Dates {
    constructor() {
        this.selectedMonth = document.getElementById('selected-month');
        this.nextMonth = document.getElementById('next-month');
        this.lastMonth = document.getElementById('last-month');

        this.month = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December", "January"];
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

    selectedDate(date = new Date()) {
        let selectedDate = date;
        this.selectedMonth.innerHTML = this.month[selectedDate.getMonth()] + " " + selectedDate.getFullYear();
        //todo runs 7 times because everything else is calling this...runs once in global though
        // this.setDaysForSelectedMonth(selectedDate);
        return selectedDate;
    }

    nextMonthDate() {
        let selectedMonth = this.selectedDate();
        let nextMonthFullDate = new Date (selectedMonth.getFullYear(), selectedMonth.getMonth() + 1);
        let nextMonth = nextMonthFullDate.getMonth();
        this.nextMonth.innerHTML = this.month[nextMonth];
        return nextMonthFullDate;
    }

    lastMonthDate() {
        let selectedMonth = this.selectedDate();
        let lastMonthFullDate = new Date (selectedMonth.getFullYear(), selectedMonth.getMonth() - 1);
        let lastMonth = lastMonthFullDate.getMonth();
        this.lastMonth.innerHTML = this.month[lastMonth];
        return lastMonthFullDate;
    }

    //todo fix month on clicks to jump in sequence
    changeSelectedMonthFromNextMonth() {
        let lastMonthFullDate = this.lastMonthDate();
        let selectedMonthFullDate = this.selectedDate();
        let nextMonthFullDate = this.nextMonthDate();

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

            this.setDaysForSelectedMonth(selectedMonthFullDate);
            return selectedMonthFullDate;
        });
    }

    changeSelectedMonthFromLastMonth() {
        let lastMonthFullDate = this.lastMonthDate();
        let selectedMonthFullDate = this.selectedDate();
        let nextMonthFullDate = this.nextMonthDate();


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

            this.setDaysForSelectedMonth(selectedMonthFullDate);
            return selectedMonthFullDate;
        })
    }

    setDaysForSelectedMonth(date) {
        let selectedMonthFullDate = date ? date : this.selectedDate();
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
    }

    //     let htmlDateArr = document.getElementsByClassName("day");
    //     let targetArr = [];
    //     for (let i = 0; i < htmlDateArr.length; i++) {
    //         htmlDateArr[i].addEventListener('click', (event) => {
    //             let selectedDayNumber = htmlDateArr[i];
    //             // targetArr.push(target);
    //
    //             let dayNumberForSelectedDate = new Date(this.selectedDate().getFullYear(), this.selectedDate().getMonth()).getDay(selectedDayNumber);
    //             console.log(dayNumberForSelectedDate);
    //         })
    //     }
    //
    //
    // }


}

date = new Dates();
date.selectDay();
date.selectedDate();
date.nextMonthDate();
date.lastMonthDate();
date.changeSelectedMonthFromNextMonth();
date.changeSelectedMonthFromLastMonth();
// date.setDaysForSelectedMonth();
// date.selectDayOfTheWeekFromDate();


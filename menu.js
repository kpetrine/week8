// Years and Months in those years
class Month {
    constructor(name, phase) {
    this.name = name;
    this.phase = phase;
    }
    
    describe() {
    //console.log(`${this.month} the moon is ${this.phase}`)
    return `${this.month} the moon is ${this.phase}`;
    }
    }
    class Year {
    constructor(name) {
    this.name = name;
    this.months = [];
    }
    
    addMonth(month) {
    if (month instanceof month) {
    this.months.push(month);
    } else {
    throw new Error(`You can only add an instance of month. 
    argument is not a month: ${month}`);
    }
    }
    
    describe() {
    return `${this.name} has ${this.months.length} months.`;
    }
    }
    class Menu { // what drives the application and our choices
    constructor() {
    this.years = [];
    this.selectedYear = null; // manage one year at a time
    }
    
    start() { // entry point to application
    let selection = this.showMainMenuOptions(); 
    while (selection != 0) {
    switch(selection) {
    case '1' :
    this.createYear();
    break;
    case '2' :
    this.viewYear();
    break;
    case '3' :
    this.deleteYear();
    break;
    case '4' :
    this.displayYears();
    break;
    default:
    selection = 0;
    }
    selection = this.showMainMenuOptions();
    }
    alert('Goodbye!');
    }
    
    
    showMainMenuOptions() {
    return prompt(`
    0) exit
    1) create a new year
    2) view a year
    3) delete a year
    4) display all year
    `);
    }
    
    showYearMenuOptions(yearInfo) {
    return prompt(`
    0) back
    1) add a new month
    2) delete a month
    -----------------
    ${yearInfo}
    `);
    }
    
    displayYears() {
    let yearString = '';
    for (let i = 0; i < this.years.length; i++) {
    YearString += i+ ') ' + this.years[i].name + '\n';
    }
    alert(yearString);
    }
    
    createYear() {
    let name = prompt('Enter name for new year: ');
    this.years.push(new Year(name));
    }
    
    viewYear() {
    let index = prompt("Enter the index of the year that you want to view:");
    if (index > -1 && index < this.years.length) {
    this.selectedYear = this.years[index];
    let description = 'Year: ' + this.selectedYear.name + '\n';
    description += ' ' + this.selectedYear.describe() + '\n ';
    
    for (let i = 0; i < this.selectedYear.months.length; i++) {
    // description += i + ') ' + this.selectedYear.months[i].name + ' - '
    // + this.selectedYear.months[i].phase + '\n';
    description += i + ') ' + this.selectedYear.months[i].describe() + '\n';
    }
    let selection1 = this.showYearMenuOptions(description);
    switch (selection1) {
    case '1' :
    this.createMonth();
    break;
    case '2' :
    this.deleteMonth();
    }
    } // validate user input
    }
    
    deleteYear() {
    let index = prompt('Enter the index of the year that you wish to delete: ');
    if (index > -1 && index < this.years.length) {
    this.years.splice(index,1);
    }
    }
    
    
    createMonth() {
    let name = prompt('Enter name for new month: ');
    let phase = prompt('Enter phase for new month: ');
    //this.selectedYear.months.push(new Month(name, phase));
    this.selectedYear.addMonth(new Month(name, phase));
    }
    
    deleteMonth() {
    let index = prompt('Enter the index of the month that you wish to delete: ');
    if (index > -1 && index < this.selectedYear.months.length) { this.selectedYear.months.splice(index,1);
    }
    }
    }
    let menu = new Menu();
    menu.start();
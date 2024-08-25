function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}
const employeeArray = ["Ruben", "Salazar", "Big/Bean/Daddy", "All/the/bucks","0900","1300"]
const employeeRecord = createEmployeeRecord(employeeArray)

console.log(employeeRecord)

function createEmployeeRecords(length){

}

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records
function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, dateStamp) {
    // Split the dateStamp into date and hour
    const [date, time] = dateStamp.split(' ');
    const hour = parseInt(time, 10); // Convert hour from string to integer

    // Create the event object
    const timeInEvent = {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    employeeRecord.timeInEvents.push(timeInEvent);

    // Return the updated employee record
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    // Split the dateStamp into date and hour
    const [date, time] = dateStamp.split(' ');
    const hour = parseInt(time, 10); // Convert hour from string to integer

    // Create the event object
    const timeOutEvent = {
        type: "TimeOut",
        hour: hour,
        date: date
    };

    // Add the event object to the timeOutEvents array
    employeeRecord.timeOutEvents.push(timeOutEvent);

    // Return the updated employee record
    return employeeRecord;
}


function hoursWorkedOnDate(employeeRecord, date) {
    // Find the time-in event for the given date
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    // Find the time-out event for the given date
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    // Calculate the number of hours worked
    if (timeInEvent && timeOutEvent) {
        // Extract the hour from time-in and time-out events
        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
        return hoursWorked;
    } else {
        // Return 0 if either event is not found
        return 0;


        
    }
}

function wagesEarnedOnDate(employeeRecord, date) {
    // Calculate the hours worked on the given date
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    
    // Calculate the pay owed by multiplying hours worked by the pay rate
    const payRate = employeeRecord.payPerHour;
    const payOwed = hoursWorked * payRate;
    
    // Return the calculated pay amount
    return payOwed;
}

function allWagesFor(employeeRecord) {
    // Retrieve all unique dates from timeInEvents
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    
    // Calculate the total wages by summing up the wages for each date
    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    
    // Return the total pay
    return totalWages;
}

function calculatePayroll(employeeRecords) {
    // Calculate total payroll by summing up the wages for all employees
    const totalPayroll = employeeRecords.reduce((total, record) => {
        return total + allWagesFor(record);
    }, 0);
    
    // Return the total payroll amount
    return totalPayroll;
}
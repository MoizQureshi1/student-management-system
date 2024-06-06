#! /usr/bin/env node
import inquirer from "inquirer";
const randomNumber = Math.floor(10000 + Math.random() * 90000);
let myBalance = 0;
let answer = await inquirer.prompt([
    {
        name: "students",
        type: "input",
        message: "Enter Student name: ",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        },
    },
    {
        name: "courses",
        type: "list",
        message: "select the course to enroll",
        choices: [
            "Graphic Design",
            "Website Development",
            "Python",
            "Microsoft Office",
            "Spoken English",
        ],
    },
]);
const tutionFee = {
    "Graphic Design": 5000,
    "Website Development": 7000,
    "Python": 6000,
    "Microsoft Office": 3000,
    "Spoken English": 4000,
};
console.log(`\nTution Fees: ${tutionFee[answer.courses]}/-\n`);
console.log(`Balance: ${myBalance}\n`);
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select payment method",
        choices: ["Bank Transfer", "Easypaisa", "Jasscash"],
    },
    {
        name: "amount",
        type: "input",
        message: "Transfer Money: ",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please Enter a non-empty value.";
        },
    },
]);
console.log(`\nYou select payment method ${paymentType.payment}\n`);
const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);
if (tutionFees === paymentAmount) {
    console.log(`Congratulations, you have successfully enrolled in ${answer.courses}.\n`);
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "what would you like to do next?",
            choices: ["View Status", "Exit"],
        },
    ]);
    if (ans.select === "View Status") {
        console.log("\n********** Status **********\n");
        console.log(`Student ID: ${randomNumber}`);
        console.log(`Student Name: ${answer.students}`);
        console.log(`Course: ${answer.courses}`);
        console.log(`Tution Fees Paid: ${paymentAmount}`);
        console.log(`Balance: ${(myBalance += paymentAmount)}`);
    }
    else {
        console.log("\nExiting Student Management System\n");
    }
}
else {
    console.log("Invalid amount due to course\n");
}

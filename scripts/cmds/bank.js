const fs = require("fs");

module.exports = {
config: {
		name: "bank",
		version: "1.9",
		author: "DRG",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: "virtual bank system"
		},
		longDescription: {
			vi: "",
			en: "full bank system"
		},
		category: "banking",
		guide: {
			vi: "",
			en: ""
		}
},

  onStart: async function ({ args, message, event, usersData }) {
    const { getPrefix } = global.utils;
  const p = getPrefix(event.threadID);
    const userMoney = await usersData.get(event.senderID, "money");
    const user = parseInt(event.senderID);
    const bankData = JSON.parse(fs.readFileSync("bank.json", "utf8"));

    if (!bankData[user]) {
       bankData[user] = { bank: 0, lastInterestClaimed: Date.now() };
      fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;
      });
    }
 const command = args[0];
    const amount = parseInt(args[1]);
    const recipientUID = parseInt(args[2]);



  if (command === "top") {
  let page = parseInt(args[1]);

  if (isNaN(page) || page <= 0) {
    page = 1; // Set the default page to 1 if not a valid number
  }

  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const entries = Object.entries(bankData);
  const totalEntries = entries.length;

  const topTen = entries
    .sort((a, b) => b[1].bank - a[1].bank)
    .slice(start, end);

  const messageText = `🏆Top 10 Richest🏆\n\n\n\n${(await Promise.all(
    topTen.map(async ([userID, data], index) => {
      const userData = await usersData.get(userID);
      return `${index + start + 1}. ${userData.name}:\n Bal: $${data.bank}`;
    })
  )).join("\n\n")}`;

  const totalPages = Math.ceil(totalEntries / pageSize);
  const currentPage = Math.min(page, totalPages);

  const nextPage = currentPage + 1;
  const nextPageMessage = nextPage <= totalPages ? `type top ${nextPage} to view the next page\n` : "";
  const pageInfo = `page ${currentPage}/${totalPages}`;

  return message.reply(`${messageText}\n\n${nextPageMessage}${pageInfo}`);
}


    if (command === "deposit") {
      if (isNaN(amount) || amount <= 0) {
        return message.reply("Please enter the amount you wish to deposit in the bank.");
      }
      if (userMoney < amount) {
        return message.reply("You don't have enough money.");
      }

      bankData[user].bank += amount;
      await usersData.set(event.senderID, {
        money: userMoney - amount
      });

      fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;
      });
      return message.reply(`${amount} $ has been deposited into your bank account.`);
    } else if (command === "withdraw") {
      const balance = bankData[user].bank || 0;

      if (isNaN(amount) || amount <= 0) {
        return message.reply("Please enter the amount you wish to withdraw from your bank account.");
      }
      if (amount > balance) {
        return message.reply("The amount you want to withdraw is not available in your bank account.");
      }
      bankData[user].bank = balance - amount;
      const userMoney = await usersData.get(event.senderID, "money");
      await usersData.set(event.senderID, {
        money: userMoney + amount
   });
       fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;

      });
      return message.reply(`${amount} $ has been withdrawn from your bank account.`);

    } else if (command === "show") {

      const balance = bankData[user].bank !== undefined && !isNaN(bankData[user].bank) ? bankData[user].bank :0;

  return message.reply(`Your bank account balance is ${balance} $.`);

} else if (command === "interest") {

  const interestRate = 0.00004; 

  const lastInterestClaimed = bankData[user].lastInterestClaimed || Date.now();

  const currentTime = Date.now();

  const timeDiffInSeconds = (currentTime - lastInterestClaimed) / 1000;
 

  const interestEarned = bankData[user].bank * (interestRate / 365) * timeDiffInSeconds;


bankData[user].lastInterestClaimed = currentTime;

  bankData[user].bank += interestEarned;



  fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {

    if (err) throw err;

  });
  return message.reply(`Interest has been added to your bank account balance. The interest earned is ${interestEarned.toFixed(2)} $.`);
        } else if (command === "transfer") {
  const balance = bankData[user].bank || 0;
  if (isNaN(amount) || amount <= 0) {
    return message.reply("Please enter the amount you wish to transfer to the recipient.");
  }
  if (balance < amount) {
    return message.reply("The amount you wish to transfer is greater than your bank account balance.");
  }
  if (isNaN(recipientUID)) {
    return message.reply("Please enter the correct recipient ID.");
  }
  if (!bankData[recipientUID]) {
    bankData[recipientUID] = { bank: 0, lastInterestClaimed: Date.now() };
    fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
      if (err) throw err;
    });
  }
  bankData[user].bank -= amount;
  bankData[recipientUID].bank += amount;
  fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
    if (err) throw err;
  });
  return message.reply(`${amount} converted to the recipient with id ${recipientUID}.`);
    } else if (command === "loan") {
 if (isNaN(amount) || amount <= 0) {
 return message.reply("Please enter the amount you wish to borrow.");
 }
 if (bankData[user].loan > 0) {
 return message.reply("You already have an existing loan.");
 }
 if (amount > 100000) {
 return message.reply("The maximum loan amount is 100000.");
 }
 bankData[user].loan = amount;
 bankData[user].loanDueDate = Date.now() + 7 * 24 * 60 * 60 * 1000; // due date after 1 week
 bankData[user].bank += amount;
 await usersData.set(event.senderID, {
 money: userMoney + amount
 });
 fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
 if (err) throw err;
 });
 return message.reply(`You have borrowed ${amount} $. The loan amount will be deducted from your bank account balance after 1 week.`);
} else if (command === "payloan") {
 const loan = bankData[user].loan || 0;
 const loanDueDate = bankData[user].loanDueDate || 0;

 if (loan <= 0 || loanDueDate <= 0) {
 return message.reply("You don't have an existing loan.");
 }
 const daysLate = Math.ceil((Date.now() - loanDueDate) / (24 * 60 * 60 * 1000));
 const interestRate = 0.0001; // 0.01% per day
 const interest = loan * interestRate * daysLate;
 const totalAmountDue = loan + interest;


 if (isNaN(amount) || amount <= 0) {
 return message.reply(`Please enter the amount you wish to pay. The total amount due is ${totalAmountDue} $.`);
 }
 if (amount > userMoney) {
 return message.reply("You don't have enough money to pay the loan.");
 }
 if (amount < totalAmountDue) {
 return message.reply(`The amount you entered is less than the total amount due (${totalAmountDue} $). Please pay the full amount.`);
 }
 bankData[user].loan = 0;
 bankData[user].loanDueDate = 0;
 bankData[user].bank -= loan;
 await usersData.set(event.senderID, {
 money: userMoney - amount
 });
 fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
 if (err) throw err;
 });
 return message.reply(`You have paid your loan of ${loan} $ plus interest of ${interest.toFixed(2)} $. The total amount paid is ${totalAmountDue} $.`);
} else {
 return message.reply(`Bank Available Commands:\n\n\n${p}Bank Deposit [Amount]: Deposit money into your bank account\n\n${p}Bank Withdraw [Amount]: Withdraw money from your bank account\n\n${p}Bank Show: Check your bank account balance\n\n${p}Bank Interest: Claim your interest\n\n${p}Bank Transfer [Amount] [Recipient's UID]: Transfer money to another user\n\n${p}Bank Richest: See the top 10 richest users\n\n${p}Bank Loan [Amount]: Borrow money from the bank\n\n${p}Bank PayLoan [Amount]: Repay your loan`);
} 
}
}


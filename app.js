require("dotenv").config();
const mongoose = require("mongoose");
const prompt = require("prompt-sync")();
const Customer = require("./models/customer");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    showMenu();
  })
  .catch(err => console.error("❌ Connection error:", err));

function showMenu() {
  console.log(`
Welcome to the CRM
1. Create customer
2. View customers
3. Update customer
4. Delete customer
5. Quit
  `);

  const choice = prompt("Enter number: ");

  if (choice === "1") createCustomer();
  else if (choice === "2") viewCustomers();
  else if (choice === "3") updateCustomer();
  else if (choice === "4") deleteCustomer();
  else if (choice === "5") {
    console.log("Exiting...");
    mongoose.connection.close();
  } else {
    console.log("Invalid choice");
    showMenu();
  }
}

function createCustomer() {
  const name = prompt("Name: ");
  const age = parseInt(prompt("Age: "));
  new Customer({ name, age }).save().then(() => {
    console.log("✅ Customer created");
    showMenu();
  });
}

function viewCustomers() {
  Customer.find().then(customers => {
    customers.forEach(c => console.log(`id: ${c._id} -- Name: ${c.name}, Age: ${c.age}`));
    showMenu();
  });
}

function updateCustomer() {
  Customer.find().then(customers => {
    customers.forEach(c => console.log(`id: ${c._id} -- Name: ${c.name}, Age: ${c.age}`));
    const id = prompt("Enter id to update: ");
    const name = prompt("New name: ");
    const age = parseInt(prompt("New age: "));
    Customer.findByIdAndUpdate(id, { name, age }).then(() => {
      console.log("✅ Customer updated");
      showMenu();
    });
  });
}

function deleteCustomer() {
  Customer.find().then(customers => {
    customers.forEach(c => console.log(`id: ${c._id} -- Name: ${c.name}, Age: ${c.age}`));
    const id = prompt("Enter id to delete: ");
    Customer.findByIdAndDelete(id).then(() => {
      console.log("✅ Customer deleted");
      showMenu();
    });
  });
}

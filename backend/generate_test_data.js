import xlsx from "xlsx";
import fs from "fs";

const data = [
  {
    uniqueId: "INT001",
    name: "John Doe",
    email: "john.doe@example.com",
    domain: "Web Development",
    joiningDate: "2026-01-15",
    status: "Active"
  },
  {
    uniqueId: "INT002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    domain: "AI & Machine Learning",
    joiningDate: "2026-02-01",
    status: "Active"
  },
  {
    uniqueId: "INT003",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    domain: "App Development",
    joiningDate: "2026-03-10",
    status: "Inactive"
  },
  {
    uniqueId: "INT004",
    name: "Tanmay Wagh",
    email: "tanmay@example.com",
    domain: "Full Stack",
    joiningDate: "2026-04-05",
    status: "Active"
  }
];

// Convert data to a worksheet
const ws = xlsx.utils.json_to_sheet(data);

// Create a new workbook and append the worksheet
const wb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, ws, "Interns");

// Save the workbook to a file
xlsx.writeFile(wb, "test_interns.xlsx");

console.log("Successfully created test_interns.xlsx in the backend folder!");

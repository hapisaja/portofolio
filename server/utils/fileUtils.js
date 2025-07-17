const fs = require("fs");
const path = require("path");

const projectsPath = path.join(__dirname, "../data/projects.json");
const contactsPath = path.join(__dirname, "../data/contacts.json");
const messagesPath = path.join(__dirname, '../data/messages.json');

// Baca semua project dari file
function readProjects() {
  try {
    const data = fs.readFileSync(projectsPath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading projects:", err);
    return [];
  }
}

// Simpan semua project ke file
function writeProjects(projects) {
  try {
    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  } catch (err) {
    console.error("Error writing projects:", err);
  }
}

function readMessages() {
    if (!fs.existsSync(messagesPath)) return [];
    const data = fs.readFileSync(messagesPath);
    return JSON.parse(data);
  }
  
  function writeMessages(messages) {
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2));
  }
  

function readContacts() {
    if (!fs.existsSync(contactsPath)) return [];
    return JSON.parse(fs.readFileSync(contactsPath, "utf8"));
  }
  function writeContacts(data) {
    fs.writeFileSync(contactsPath, JSON.stringify(data, null, 2));
  }
  
  module.exports = {
    readProjects,
    writeProjects,
    readContacts,
    writeContacts,
    readMessages,  
  writeMessages
  };
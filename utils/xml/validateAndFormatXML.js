const fs = require("fs");
const { DOMParser, XMLSerializer } = require("xmldom");
const formatter = require("xml-formatter");

// Read the XML file
const xmlString = fs.readFileSync("./modified-full.xml", "utf-8");

// Parse the XML string to validate it
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "text/xml");

// Check for parsing errors
const parseError = xmlDoc.getElementsByTagName("parsererror");
if (parseError.length > 0) {
  console.error("Error parsing XML:", parseError[0].textContent);
  process.exit(1);
}

// Function to sort column elements by their 'name' attribute
const desiredOrder = [
  "code",
  "name",
  "packing",
  "unit",
  "quantity",
  "color",
  "percentage_increase",
  "price",
  "category",
];

function sortColumns(xmlDoc) {
  const tables = xmlDoc.getElementsByTagName("table");
  const newTables = [];
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const columns = Array.from(table.getElementsByTagName("column"));

    // Create a map of current columns by name for easy lookup
    const columnMap = {};
    columns.forEach(col => {
      columnMap[col.getAttribute("name")] = col;
    });

    // Clear existing columns
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }

    // Append columns in the desired order, create empty elements if not present
    desiredOrder.forEach(columnName => {
      if (columnMap[columnName]) {
        table.appendChild(columnMap[columnName]);
      } else {
        const emptyColumn = xmlDoc.createElement("column");
        emptyColumn.setAttribute("name", columnName);
        table.appendChild(emptyColumn);
      }
    });
    newTables.push(table);
  }
  return newTables;
}

// Sort the columns
const newXmlDoc = sortColumns(xmlDoc);

// Serialize the DOM object back into an XML string
const serializer = new XMLSerializer();
const newXmlString = serializer.serializeToString(newXmlDoc);

// Format the XML string
const formattedXml = formatter(newXmlString, {
  indentation: "  ",
  collapseContent: true,
});

// Write the formatted XML to a file
fs.writeFileSync("formattedFile.xml", formattedXml);

console.log("The XML file has been formatted, sorted, and saved!");

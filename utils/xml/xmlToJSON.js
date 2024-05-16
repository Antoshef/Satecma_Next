const fs = require("fs");
const xml2js = require("xml2js");
const js2xmlparser = require("js2xmlparser");

const structure = {
  code: "",
  name: "",
  packing: "",
  unit: "",
  quantity: "",
  color: "",
  percentage_increase: "",
  price: "",
  category: "",
};

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

// Path to your XML file
const xmlFilePath = "utils/xml/modified-full.xml";
const xmlString = fs.readFileSync(xmlFilePath, "utf-8");

// Function to convert XML to JSON
function convertXmlToJson(xmlString) {
  const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
  parser.parseString(xmlString, (err, result) => {
    if (err) {
      throw err;
    }

    const modified = modifyJson(result);
    fs.writeFileSync(
      "./output.json",
      JSON.stringify(modified, null, 2),
      "utf-8",
    );
  });
}

// Function to modify JSON data
function modifyJson(jsonData) {
  const data = jsonData.pma_xml_export;
  const result = [];
  if (data.database && data.database.table) {
    const tables = Array.isArray(data.database.table)
      ? data.database.table
      : [data.database.table];
    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      table.columns = structure;
      for (let j = 0; j < table.column.length; j++) {
        const column = table.column[j];
        table.columns[column.name] = column._;
      }
      result.push(table.columns);
    }
  }

  // Convert the modified JSON back to XML
  const newXmlString = js2xmlparser.parse("pma_xml_export", jsonData);
  fs.writeFileSync("./modified_new.xml", newXmlString, "utf-8");
  console.log("New XML has been saved!");
  return result;
}

// Start the conversion process
convertXmlToJson(xmlString);

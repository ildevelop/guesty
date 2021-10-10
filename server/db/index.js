const fs = require("fs");
const DB_File = "./db/definitions.json";
const FORMAT_UTF8 = "utf8";
const definitions = require("./definitions.json");
const init = require("./init.json");

const WEEKLY_DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const getAllDefinitions = () => {
  return definitions;
};

const writeFile = (json) =>
  new Promise((resolve, reject) => {
    fs.writeFile(DB_File, json, FORMAT_UTF8, (err, data) => {
      if (err) {
        reject({ status: "ERROR", message: `error read file ${DB_File}` });
      }
      resolve(json);
    });
  });

const getDefinitionsByRecurrence = () => {
  const today = new Date().getDay();
  const definitionsToday = definitions.filter((def) => def.recurrence.days.includes(WEEKLY_DAYS[today - 1]));
  return definitionsToday;
};
const updateDefinitions = async (list) => {
  let updatedDefinitions = [];
  const isNeedUpdate = definitions.some((def) => !def.status.treated && list.includes(def.id));
  if (isNeedUpdate) {
    updatedDefinitions = definitions.map((def) => {
      const updatedDef = { ...def };
      if (list.includes(def.id)) {
        updatedDef.status.treated = new Date().toUTCString();
      }
      return updatedDef;
    });
    const json = JSON.stringify(updatedDefinitions); //convert it back to json
    const res = await writeFile(json);
    return res;
  } else {
    return { status: "ERROR", message: "No data for update" };
  }
};
const resetDefinitions = async () => {
  const json = JSON.stringify(init);
  const res = await writeFile(json);
  return res;
};

module.exports = {
  getAllDefinitions,
  getDefinitionsByRecurrence,
  updateDefinitions,
  resetDefinitions,
};

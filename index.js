import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (x, y) => {
  // Start: Jan 1, 2024 in EAT, End: Jun 21, 2025 in EAT
  const startDate = moment("2024-01-01T00:00:00+03:00");
  const endDate = moment("2025-06-21T23:59:59+03:00");
  
  // Calculate total days in range
  const totalDays = endDate.diff(startDate, 'days');
  const randomDays = random.int(0, totalDays);
  
  const date = startDate.add(randomDays, 'days').format();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if(n===0) return simpleGit().push();
  
  // Start: Jan 1, 2024 in EAT, End: Jun 21, 2025 in EAT
  const startDate = moment("2024-01-01T00:00:00+03:00");
  const endDate = moment("2025-06-21T23:59:59+03:00");
  
  // Calculate total days in range
  const totalDays = endDate.diff(startDate, 'days');
  const randomDays = random.int(0, totalDays);
  
  const date = startDate.add(randomDays, 'days').format();

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(198);
const app = require("./app");
const { exec } = require("child_process");
const { PORT = 3000 } = process.env;

exec("npm run setup-dbs", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running setup script: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Setup script stderr: ${stderr}`);
    return;
  }
  console.log(`Setup script stdout: ${stdout}`);

  app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
});
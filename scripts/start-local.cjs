const { spawn } = require("child_process");
const path = require("path");

const root = path.resolve(__dirname, "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const processes = [
  spawn(npmCommand, ["start"], { cwd: path.join(root, "EVENT-BACKEND-NODEJS"), stdio: "inherit", shell: true }),
  spawn(npmCommand, ["run", "dev", "--", "--host", "127.0.0.1", "--port", "5173"], { cwd: root, stdio: "inherit", shell: true }),
  spawn(npmCommand, ["run", "dev", "--", "--host", "127.0.0.1", "--port", "5174"], { cwd: path.join(root, "event-admin-ui"), stdio: "inherit", shell: true }),
];

function stopAll() {
  processes.forEach((child) => child.kill());
  process.exit();
}

process.on("SIGINT", stopAll);
process.on("SIGTERM", stopAll);

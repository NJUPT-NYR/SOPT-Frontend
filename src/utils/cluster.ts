import * as cluster from "cluster";
import * as os from "os";

export function run(worker: () => void) {
  if (ENALBE_SERVER_CLUSTER) {
    const cpuNum = os.cpus().length;
    if (cluster.isMaster) {
      for (let i = 0; i < cpuNum; i++) {
        cluster.fork();
      }
      console.log(`start ${cpuNum} process`);
      cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} exited`);
      });
    } else {
      worker();
    }
  } else {
    worker();
  }
}

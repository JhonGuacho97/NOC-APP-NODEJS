import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  public static start() {
    console.log("server started.....");

    CronService.createJob("*/3 * * * * *", () => {
      new CheckService(
        () => console.log("Sucess"),
        (error) => console.log(error)
      ).execute("https://google.com");
    });
  }
}

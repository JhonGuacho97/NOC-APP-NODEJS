import fs from "fs";

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FyleSystemDataSource implements LogDataSource {
  private readonly loghPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFile();
  }

  private createLogsFile = () => {
    if (!fs.existsSync(this.loghPath)) {
      fs.mkdirSync(this.loghPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, "");
      }
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    
    const logAsJson = `${ JSON.stringify(newLog) }\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);
    
    if (newLog.level === LogSeverityLevel.low) return;
    
    const logPath = (newLog.level === LogSeverityLevel.medium) 
    ? this.mediumLogsPath 
    : this.highLogsPath;
    fs.appendFileSync(logPath, logAsJson);

  }
  getLog(sverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
}

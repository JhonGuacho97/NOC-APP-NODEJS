import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository {
    
    abstract saveLog( log: LogEntity ) : Promise<void>;
    abstract getLog( sverityLevel: LogSeverityLevel): Promise<LogEntity[]>;

}
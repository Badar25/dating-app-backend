import { User } from "src/user/schemas/user.schema";

export interface MatchResponse {
    statusCode: number;
    message: string; 
    data?: {
        initiator?: User | null;
        acceptor?: User | null;
        matchTimestamp?: Date;
    }
}

export class ResponseDto implements MatchResponse {
    constructor(
        public statusCode: number,
        public message: string, 
        public data?: {
            acceptor?: User | null;
            matchTimestamp?: Date;
            initiator?: User | null;
        }
    ) { }
}
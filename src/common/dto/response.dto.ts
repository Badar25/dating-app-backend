export interface MatchResponse {
    statusCode: number;
    message: string;
    isMatch: boolean;
}

export class ResponseDto implements MatchResponse {
    constructor(
        public statusCode: number,
        public message: string,
        public isMatch: boolean,
    ) { }
}
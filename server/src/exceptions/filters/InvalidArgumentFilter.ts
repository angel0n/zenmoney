import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { InvalidArgumentException } from "../InvalidArgumentException";

@Catch(InvalidArgumentException)
export class InvalidArgumentFilter implements ExceptionFilter {
    catch(exception: InvalidArgumentException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>()
        return response.status(409).json({
            message: exception.message,
            error: "InvalidArgumentException",
            statusCode: 409
        })
    }
}
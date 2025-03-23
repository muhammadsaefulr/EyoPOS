import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception'
import { ContentfulStatusCode, StatusCode } from 'hono/utils/http-status'
import { z } from 'zod';


export class ApiError extends HTTPException {
    public readonly code?: StatusCode

    constructor({ code, message }: {code?: StatusCode; message: string}){
        const allowedCodes: ContentfulStatusCode[] = [200, 400, 403, 404, 500];
        const statusCode: ContentfulStatusCode = 
            code !== undefined && allowedCodes.includes(code as ContentfulStatusCode)
                ? (code as ContentfulStatusCode)
                : 500;

        super(statusCode, {message})
        this.code = code
    }
}

export function handleError(err: Error, c: Context): Response {
    if(err instanceof z.ZodError){
        const firstError = err.errors[0]

        return c.json({ code: 400, message: `\`${firstError.path}\`: ${firstError.message}` })
    }

    return c.json({
        code: 500,
        message: "Internal Server Error"
    }, 500)
}
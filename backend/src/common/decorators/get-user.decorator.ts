import { createParamDecorator, ExecutionContext } from "@nestjs/common";

const getCurrentUserByContext = (context: ExecutionContext) =>
    context.switchToHttp().getRequest().user;

export const GetUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
        getCurrentUserByContext(context),
);
import { RestRequest, PathParams, ResponseComposition, DefaultBodyType, RestContext } from "msw";

export type MockProps = (req: RestRequest<never, PathParams<string>>, res: ResponseComposition<DefaultBodyType>, ctx: RestContext) => any;
export const errorHandlerMaker = (res: ResponseComposition<DefaultBodyType>, ctx: RestContext) => (message: string) => res(ctx.status(403), ctx.json({ errorMessage: message }));
export * from "./teamHandler";
export * from "./validationHandler";
export * from "./chatHandler";
export * from "./userHandler";
export * from "./requestHandler";

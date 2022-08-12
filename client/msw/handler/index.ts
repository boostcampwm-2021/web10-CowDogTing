import { RestRequest, PathParams, ResponseComposition, DefaultBodyType, RestContext } from "msw";

export type MockProps = (req: RestRequest<never, PathParams<string>>, res: ResponseComposition<DefaultBodyType>, ctx: RestContext) => any;
export * from "./teamHandler";
export * from "./validationHandler";
export * from "./chatHandler";
export * from "./userHandler";
export * from "./requestHandler";

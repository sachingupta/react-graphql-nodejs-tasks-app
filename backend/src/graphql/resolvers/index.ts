import { authResolver } from "./auth";
import { bookingResolver } from "./booking";
import { eventsResolver } from "./events";

export const rootResolver = {
    ...authResolver,
    ... bookingResolver,
    ...eventsResolver
}
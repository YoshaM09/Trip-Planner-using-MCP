import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";
import { env } from "@/app/config/env";
import { exaSearch, summarizeTripDetails } from "../utils/tripPlanning";
import { extractTripDetails } from "../utils/tripPlanning";

const handler = createMcpHandler(
  async (server) => {
    server.tool(
      "trip-planner",
      "Use this tool to find flight, hotels, car detals and ativities for a trip. It will return a summary of the trip.",
      {
        tripPlannerDetails: z.string(),
      },
      async ({ tripPlannerDetails }) => {
        const result = await extractTripDetails(tripPlannerDetails);

        const [flightDetails, hotelDetails, carDetails, activityDetails] = await Promise.all([
          exaSearch(`find me the cheapest flights from ${result.current_location} to ${result.destination} from ${result.start_date} to ${result.end_date}`),
          exaSearch(`find me the cheapest hotels in ${result.destination} from ${result.start_date} to ${result.end_date}`),
          exaSearch(`find me the cheapest cars in ${result.destination} from ${result.start_date} to ${result.end_date}`),
          exaSearch(`find me the cheapest activities in ${result.destination} from ${result.start_date} to ${result.end_date}`)
        ]);

        console.log(flightDetails, hotelDetails, carDetails, activityDetails);  
        const summary = await summarizeTripDetails(flightDetails, hotelDetails, carDetails, activityDetails);
        
        return {content: [{ type: "text", text: summary }]


        //return {content: [{ type: "text", text: summary }, { type: "text", text: `Flight info: ${JSON.stringify(flightDetails)}` }, { type: "text", text: `Hotel info: ${JSON.stringify(hotelDetails)}` }, { type: "text", text: `Car info: ${JSON.stringify(carDetails)}` }, { type: "text", text: `Activity info: ${JSON.stringify(activityDetails)}` }]
      }}
    );
    // server.tool(
    //   "hotel-info",
    //   "use this tool to get information about hotels in a city",
    //   {
    //     hotelDetails: z.string(),
    //   },
    //   async ({ hotelDetails }) => {
    //     const result = await exaSearch(hotelDetails);
    //     return {content: [{ type: "text", text: `Hotel info: ${JSON.stringify(result)}` }]
    //   }}
    // );
  },
  {
    capabilities: {
      tools: {
        "trip-planner": {
          description: "Use this tool to find flight, hotels, car detals and ativities for a trip. It will return a summary of the trip.",
          parameters: z.object({
            query: z.string(),
          }),
        },
      },
    },
  },
  {
    redisUrl: env.REDIS_URL,
    basePath: "",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export { handler as GET, handler as POST, handler as DELETE };

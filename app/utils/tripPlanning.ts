import Exa from "exa-js"
import { env } from "@/app/config/env";
import OpenAI from "openai";
import { Logger } from "@/app/utils/logger";

const logger = new Logger("TripPlanning");

const exa = new Exa(env.EXA_API_KEY);

const geminiClient = new OpenAI({
  apiKey: env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

interface TripDetails {
  current_location: string;
  destination: string;
  start_date: string;
  end_date: string;
  number_of_people: number;
  trip_budget: number;
  type_of_trip: string;
}

export const exaSearch = async (query: string) => {
  const result = await exa.searchAndContents(
    query,
    {
      text: true,
      context: true,
      summary: true
    }
  )
  return result || "No results found";
}


export const extractTripDetails = async (query: string) => {
    const prompt = `you are a trip planner. You are given a query and you need to extract the trip details from the query and return it in a json format.
    The query is: ${query}
    The trip details are:
    - The current location
    - The destination
    - The start date
    - The end date
    - The number of people
    - The trip budget
    - The type of trip

    return the JSON object only, no other text.

    <user query>
    ${query}
    </user query>

    <response format>
    {
      "current_location": "San Francisco",
      "destination": "New York",
      "start_date": "2024-01-01",
      "end_date": "2024-01-05",
      "number_of_people": 2,
      "trip_budget": 1000,
      "type_of_trip": "business"
    }
    </response format>
    `

    const response = await geminiClient.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    })

    logger.info("Trip details:", { response: response.choices[0].message.content })
     
    return JSON.parse(response.choices[0].message.content || "{}") as TripDetails;
  }


  export const summarizeTripDetails = async (flightDetails: any, hotelDetails: any, carDetails: any, activityDetails: any): Promise<string> => {
    const prompt = `
    you are a trip planner. You are given the flight details, hotel details, car details, and activity details.
    You need to summarize the trip details and return it in a json format.
    <flight details>
    The flight details are: ${JSON.stringify(flightDetails)}
    </flight details>
    <hotel details>
    The hotel details are: ${JSON.stringify(hotelDetails)}
    </hotel details>
    <car details>
    The car details are: ${JSON.stringify(carDetails)}
    </car details>
    <activity details>
    The activity details are: ${JSON.stringify(activityDetails)}
    </activity details>
    `

    const response = await geminiClient.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    })

    logger.info("Trip details:", { response: response.choices[0].message.content })
     
    return response.choices[0].message.content || "No results found";
  }
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. Create server
// This is the main interface for the MCP protocol. It handles communication between client and server

const server = new McpServer({
    name: 'MCP-Weather',
    version: '1.0.0'
})

// 2. Define tools
// These allow the server to perform actions

server.tool(
    'fetch-weather', // Tool name
    'Tool to fetch the weather of a city', // Tool description
    {
        city: z.string().describe('City name'), // Parameters the tool accepts
    },
    async({ city }) => {
        // Tool implementation - fetches weather data for the specified city
        try {
            // First, get coordinates for the city using geocoding API
            const geocodingResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
            const geocodingData = await geocodingResponse.json();

            // Check if we found the city
            if (!geocodingData.results || geocodingData.results.length === 0) {
                return {
                    content: [{
                        type: 'text',
                        text: `No information found for city: ${city}`
                    }]
                };
            }

            // Extract coordinates
            const { latitude, longitude } = geocodingData.results[0];
            const cityName = geocodingData.results[0].name;
            const country = geocodingData.results[0].country;
            
            // Get weather data using the coordinates
            const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,is_day,rain,apparent_temperature,relative_humidity_2m`);
            const weatherData = await weatherResponse.json();

            // Format the response in a readable way
            const currentWeather = weatherData.current;
            
            return {
                content: [
                    {
                        type: 'text',
                        text: `Current weather for ${cityName}, ${country}:\n` +
                              `- Temperature: ${currentWeather.temperature_2m}°C (Feels like: ${currentWeather.apparent_temperature}°C)\n` +
                              `- Humidity: ${currentWeather.relative_humidity_2m}%\n` +
                              `- Precipitation: ${currentWeather.precipitation}mm\n` +
                              `- Rain: ${currentWeather.rain}mm\n` +
                              `- Time of day: ${currentWeather.is_day ? 'Day' : 'Night'}`
                    }
                ]
            };
        } catch (error) {
            return {
                content: [{
                    type: 'text',
                    text: `Error fetching weather data: ${error.message}`
                }]
            };
        }
    }
)

// 3. Listen for client connections
const transport = new StdioServerTransport();
await server.connect(transport);

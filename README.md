# MCP-Weather

A Model Context Protocol (MCP) tool that allows you to query the weather for any city.

## Overview

MCP-Weather is a simple implementation of the Model Context Protocol, which enables AI assistants to access real-time weather data. The tool connects to the Open-Meteo API to fetch current weather conditions and forecasts for specified locations.

## Features

- Get current weather conditions for any city
- Retrieve temperature, precipitation, humidity and other weather data
- Seamless integration with any AI assistant that supports MCP

## How It Works

The tool provides a simple interface for AI assistants to query weather data:

1. The AI sends a request with a city name
2. The tool geocodes the city name to get coordinates using Open-Meteo Geocoding API
3. Weather data is fetched from the Open-Meteo Weather API
4. The data is returned to the AI in a structured format

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-weather.git

# Navigate to the project directory
cd mcp-weather

# Install dependencies
pnpm install
```

## Usage

To run the MCP-Weather service:

```bash
# Using pnpm
pnpm start

# Or directly with Node.js
node main.js
```

## Development

The project is built with:

- TypeScript
- Model Context Protocol SDK (@modelcontextprotocol/sdk)
- Zod for schema validation
- Open-Meteo APIs for weather data

## Structure

- `main.ts` - The main entry point that sets up the MCP server and defines the weather tool

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for providing free weather API access
- [Model Context Protocol](https://github.com/anthropics/model-context-protocol) for the MCP SDK

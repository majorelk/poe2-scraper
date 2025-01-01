# Path of Exile 2 Scraper

This project is a **web scraper** designed to collect and analyze data from *Path of Exile 2* trade listings. The goal is to parse data from trade sites, match item modifiers to in-game values, normalize the data, and generate useful insights about item modifier distributions.

This scraper can be used by the **Path of Exile Wiki team** to get up-to-date data on item mods and distributions. The tool is designed to be easily extendable and provides a way to track the weight and prevalence of various modifiers in the game's economy.

## Features
- Scrapes data from trade sites for items and their modifiers.
- Normalizes the modifiers based on their occurrence in the game.
- Provides insight into the distribution and prevalence of various modifiers.
- Simple, easy-to-use Node.js setup.

## Technologies Used
- **Node.js**: JavaScript runtime used to build the scraping tool.
- **Axios**: HTTP client to make requests to the trade site.
- **Cheerio**: Fast, flexible, and lean implementation of core jQuery designed for the server.
- **Puppeteer** (optional): For scraping dynamic content if needed.
- **MongoDB** (optional): To store scraped data in a local database.

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/my-poe-scraper.git
cd my-poe-scraper
```
2. Install dependencies:
Ensure you have Node.js installed. If not, you can install it from Node.js official site.
Install the project dependencies using npm:
```bash
npm install
```

3. Create a `.env` file in the root directory (for example, if you are using MongoDB or storing sensitive information):
```bash
touch .env
```
Add environment variables like database URLs or API keys inside the .env file.

4.  Run the scraper:
    ```bash
    npm start
    ```
## Running the Project

To start scraping data, simply run the following command:
```bash
npm start
```

This will run the `scraper.js` script that will connect to the specified trade sites, parse the data, and process it as needed.
Sample Output

The scraper will output the items it has scraped, including item base types and their associated modifiers, and it will store this data in the database (if configured).

## Contributing
- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Commit your changes (git commit -am 'Add new feature').
- Push to your branch (git push origin feature-branch).
- Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://) file for details.
# Typescript/Astro Custom Lighthouse Reports

simply edit `src/lighthouse/websites.json` array with the websites you want to lighthouse test, then commit your repo and push to github.
Github actions will automatically be triggered to run the lighthouse tests then generate the website.

## How to run locally

1. Clone the repo
2. Run `pnpm install`
3. Run `pnpm create:report`
4. Run `pnpm dev`

## How to add more websites to test

1. Edit `src/lighthouse/websites.json` array with the websites you want to lighthouse test
2. Run `pnpm create:report`
3. Run `pnpm dev`
4. Check the `public` folder for the generated website
5. Commit your changes and push to github
6. Github actions will automatically be triggered to run the lighthouse tests then generate the website.

## Contributing

Feel free to contribute to this project by creating a pull request.

## License

MIT
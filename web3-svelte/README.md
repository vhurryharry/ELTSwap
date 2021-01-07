*Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)*

# Table of Contents
TODO: add MD table of tontents here 
1. Current Dev Disqs 
2. Svelte App ( Build steps )


# Current Dev Diqs



TODO:

***urgent:***
- [ ] fix typography to same as hodldao.xyz [issue](https://github.com/HODL-DAO/Ethereum-Contracts/issues/24)
- [ ] test and handle corner-cases for the swapButton [issue](https://github.com/HODL-DAO/Ethereum-Contracts/issues/25)
- [ ] define visual feedback for .pending (spinner or such) [issue](https://github.com/HODL-DAO/Ethereum-Contracts/projects/1#card-52354075)
- [ ] investigate header values being `undefined` [issue](https://github.com/HODL-DAO/Ethereum-Contracts/projects/1#card-52354127)

***after publishing in Beta***
- [ ] switch to new repository with .submodules [issue]()
- [ ] cleanup styling; the rules are all mixed up and in wrong file; KISS;DRY; [issue]()

***after splitting in submodule***
- [ ] add test coverage; it's 2021 o'clock and you should *always* use A coverage ;) [issue]()
- [ ] move Bulma cosmetic (other that structural) classes from attributes to @extend for easy theming [issue]()
- [ ] extract components from markup; duplicate markup is unacceptable; [issue]()
- [ ] gather and define scss variables [issue]()

# TESTs
As of now, I'm the only one who's familiar with the details of the flow.
Please build and run this locally so we can make sure there's no major breakage when the curtain falls.

Please revise and extend the following list at your discretion.
Will move to their own issues after curation.

-[] let's talk about this... [epic]() 

---

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript
### ***update:*** it has been removed

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

## Deploying to the web
-[] who?when?how? [issue](https://github.com/HODL-DAO/Ethereum-Contracts/projects/1#card-52353958)

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```

# Pure React Forms

This repo exists to demonstrate forms built with pure React.

## Project Goals

The project has extremely simple goals:

1. Use pure React, with no dependencies (only 2 dependencies are currently required, React Router to handle routing and classnames to handle easy building of classes for components).
2. Follow React best practices.
3. Allow for maximum flexibility with the least possible repetition or complexity.
4. Multi-page forms by default.
5. Local and server-side validation.
6. Build with "combo" forms (dynamic chaining of fieldsets) in mind for the future.

## Install

1. Clone repo.
2. Install Yarn if not already installed `brew install yarn`.
3. cd into folder and install dependencies `yarn install`.
4. Run with `yarn start`.
5. Run tests with `yarn test`.

## Outline

The forms rely on two basic premises for most of their functionality:

1. [Higher order components](https://reactjs.org/docs/higher-order-components.html) to handle props and keep repetition low.
2. [React Context](https://reactjs.org/docs/context.html) for passing props and functions, to avoid [prop drilling](https://blog.kentcdodds.com/prop-drilling-bb62e02cb691) and prop spreading.

With a general understanding of React and the two concepts above, anyone should be able to work with the forms.

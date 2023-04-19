# Podcaster APP
> INDITEX project

![](https://github.com/alvaro17f/podcaster/blob/main/public/podcaster.gif)

:star: Star me up!

## Table of contents[![](https://raw.githubusercontent.com/aregtech/areg-sdk/master/docs/img/pin.svg)](#table-of-contents)
- [Podcaster APP](#podcaster-app)
  - [Table of contents](#table-of-contents)
  - [How can I run this project?](#how-can-i-run-this-project)
    - [Step 1: Install](#step-1-install)
    - [Step 2: Choose your flavour!](#step-2-choose-your-flavour)
  - [Testing](#testing)
    - [Run tests!](#run-tests)
    - [Run coverage report!](#run-coverage-report)
  - [Folder Structure](#folder-structure)
  - [Libraries](#libraries)



## How can I run this project?
It's actually very easy! 😉👌

### Step 1: Install
```sh
pnpm install
```

### Step 2: Choose your flavour!
- Development mode:
```sh
pnpm dev --open
```
- Production mode:
```sh
pnpm build && pnpm preview --open
```

## Testing
![](https://github.com/alvaro17f/podcaster/blob/main/public/coverage.png)

### Run tests!
```sh
pnpm test
```

### Run coverage report!
```sh
pnpm coverage
```

## Folder Structure
```sh
.
├── __tests__
├── public
└── src
    ├── components
    ├── hooks
    ├── layout
    ├── mocks
    ├── pages
    ├── router
    └── utils
```

## Libraries
- [react](https://react.dev/)
- [react router](https://reactrouter.com/)
- [vite](https://vitejs.dev/)
- [tailwind](https://tailwindcss.com/)
- [rome](https://rome.tools/)
- [isomorphic-dompurify](https://github.com/kkomelin/isomorphic-dompurify)
- [html-react-parser](https://github.com/remarkablemark/html-react-parser)
- [vitest](https://vitest.dev/)
- [testing library](https://testing-library.com/)
- [MSW](https://mswjs.io/)

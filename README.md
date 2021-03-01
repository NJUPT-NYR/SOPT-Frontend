# SOPT-Frontend

![CI](https://github.com/NJUPT-NYR/SOPT-Frontend/workflows/CI/badge.svg) ![Language](https://img.shields.io/badge/language-typescript-blue.svg?label=language)

User Interface and frontend framework for SOPT.

## How To Run

```sh
# Recommend to use yarn as package manager

#For development
cp .env.example .env.development
yarn install
yarn dev

#For production
cp .env.example .env.production
yarn install
yarn start
```

## Common Question

### `npm install`/`yarn install` did not work

It is highly recommanded to use `yarn` as package manager. If you quite sure that you're using yarn, run `yarn install --ignore-scripts` to bypass check.

### Some Issue About `sharp` package

See [https://sharp.pixelplumbing.com/install#custom-prebuilt-binaries](https://sharp.pixelplumbing.com/install#custom-prebuilt-binaries).

## Roadmap

- [x] HomePage
  - [x] Search
  - [x] Pagination
  - [x] Table
- [ ] Profile
- [ ] Uploading
- [ ] Help
- [x] NotFound
- [x] Login
- [ ] SignUp

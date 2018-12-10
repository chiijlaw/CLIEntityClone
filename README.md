# CLI Entity Clone

This CLI tool allows you to clone entities connected to an entity specified by an input id. Will output a JSON file containing the original with changes.

## Table of Contents

1. [Getting Started](#getting-started)
1. [Prerequisites](#prerequisites)
1. [Installing](#installing)
1. [Usage](#usage)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This assumes you are using [npm](https://www.npmjs.com/) as your package manager.

### Installing

```
npm install
```
> CLI Entity Clone can be used without linking.
```
npm link
```

## Usage

To clone :
```
node clone.js cloneEntity <inputfile> <entityid>
```
If linked:
```
cli-entity-clone cloneEntity <inputfile> <entityid>
```

## Built With

* [Node.js](https://nodejs.org/en/)

## Authors

* **Chii-Jones Law** - *Initial work* - [chiijlaw](https://github.com/chiijlaw)


## License

This project is licensed under the MIT License

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## How to use

- Install and run the repo as said above
- To make a request for updating certain package, please select POST method
- Add JSON body as below
```
{
    "name": "package_name",
    "version": "desired_package_version",
    "repoDetails": {
        "owner": "owner_of_a_repo",
        "repo": "certain_repo"
    }
}
```
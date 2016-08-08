# batch-ricoh-counter

Node command line tool to fetch RICOH printer counter data in batch.

Uses [ricoh-counter](http://github.com/ADFDiesel/ricoh-counter) module for data.

Currently outputs csv data.

## Installation

```
npm install -g batch-ricoh-counter
```

## Usage

```
> batch-ricoh-counter -c /full/config/path/config.json
```

Output to file:

```
> batch-ricoh-counter -c /full/config/path/config.json >> counters.csv
```

Replace config path by the full config path.

## Config

For now, the config file consist of a simple json file with an array of printer host/ip string:

Example config:

```json
[
  "10.0.0.1",
  "printer.host.com"
]
```

## Known issues

None for now.

## Author

Jacques Lareau, ADF Diesel Inc. <jacques.lareau@adfdiesel.com>
# Load Test

Uses [siege](https://github.com/JoeDog/siege) to test concurrent request handling across all three emissions endpoints.

## Prerequisites

**macOS**
```bash
brew install siege
```

**Linux**
```bash
sudo apt-get install siege
```

## Usage

```bash
bun run load-test
```

## Configuration

| Variable     | Default                 | Description                     |
| ------------ | ----------------------- | ------------------------------- |
| `BASE_URL`   | `http://localhost:3000` | Target server URL               |
| `CONCURRENT` | `5`                     | Number of concurrent users      |
| `DURATION`   | `5S`                    | Test duration (e.g. `5S`, `1M`) |

```bash
CONCURRENT=25 DURATION=60S bun run load-test
```

## Endpoints Tested

| Endpoint           | Params                             |
| ------------------ | ---------------------------------- |
| `/emissions/day`   | `domain=yahoo.com&date=2025-08-04` |
| `/emissions/week`  | `domain=yahoo.com&date=2025-08-04` |
| `/emissions/month` | `domain=yahoo.com&date=2025-08`    |

## Example Output
Without cache
```
Transactions:                 247    hits
Availability:                 100.00 %
Elapsed time:                   5.71 secs
Data transferred:               0.05 MB
Response time:                114.49 ms
Transaction rate:              43.26 trans/sec
Throughput:                     0.01 MB/sec
Concurrency:                    4.95
Successful transactions:      247
Failed transactions:            0
Longest transaction:          440.00 ms
Shortest transaction:          70.00 ms
```

With cache
```
Transactions:                 606    hits
Availability:                 100.00 %
Elapsed time:                   5.94 secs
Data transferred:               0.08 MB
Response time:                 29.19 ms
Transaction rate:             102.02 trans/sec
Throughput:                     0.01 MB/sec
Concurrency:                    2.98
Successful transactions:      606
Failed transactions:            0
Longest transaction:          150.00 ms
Shortest transaction:           0.00 ms
```
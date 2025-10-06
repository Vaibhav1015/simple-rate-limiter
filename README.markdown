# Simple Rate Limiter

A lightweight, dependency-free rate limiter for Node.js using a sliding window algorithm. Supports both CommonJS and ES Modules.

## Installation

```bash
npm install simple-rate-limiter
```

## Usage

### CommonJS
```javascript
const RateLimiter = require('simple-rate-limiter');

// Create a rate limiter: max 5 actions per 60 seconds
const limiter = new RateLimiter({ limit: 5, windowMs: 60 * 1000 });

console.log(limiter.check('user1')); // true
console.log(limiter.check('user1')); // true
// ... after 5 calls
console.log(limiter.check('user1')); // false
limiter.reset('user1');
console.log(limiter.check('user1')); // true
```

### ES Modules
```javascript
import RateLimiter from 'simple-rate-limiter';

// Create a rate limiter: max 5 actions per 60 seconds
const limiter = new RateLimiter({ limit: 5, windowMs: 60 * 1000 });

console.log(limiter.check('user1')); // true
console.log(limiter.check('user1')); // true
// ... after 5 calls
console.log(limiter.check('user1')); // false
limiter.reset('user1');
console.log(limiter.check('user1')); // true
```

## API

### `new RateLimiter({ limit, windowMs })`
- **limit**: Maximum number of actions allowed in the time window.
- **windowMs**: Time window in milliseconds.

### `limiter.check(identifier)`
- **identifier**: A string to identify the entity (e.g., user ID, IP address).
- Returns `true` if the action is allowed, `false` if the limit is exceeded.

### `limiter.reset(identifier)`
- Resets the rate limit for the given identifier.

### `limiter.resetAll()`
- Resets all rate limits.

## License
MIT
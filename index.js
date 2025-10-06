class RateLimiter {
    constructor({ limit, windowMs }) {
        this.limit = limit; // Max actions allowed in window
        this.windowMs = windowMs; // Time window in milliseconds
        this.actions = new Map(); // Store actions per identifier
    }

    check(identifier) {
        const now = Date.now();
        let timestamps = this.actions.get(identifier) || [];

        // Remove timestamps older than the window
        timestamps = timestamps.filter((ts) => now - ts <= this.windowMs);

        // Check if action is allowed
        if (timestamps.length >= this.limit) {
            return false; // Rate limit exceeded
        }

        // Record new action
        timestamps.push(now);
        this.actions.set(identifier, timestamps);
        return true; // Action allowed
    }

    reset(identifier) {
        this.actions.delete(identifier); // Clear actions for identifier
    }

    resetAll() {
        this.actions.clear(); // Clear all actions
    }
}

// Export for CommonJS
module.exports = RateLimiter;

// Export for ES Modules
export default RateLimiter;
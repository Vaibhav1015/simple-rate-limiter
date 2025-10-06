import RateLimiter from '../dist/index.esm.js';

describe('RateLimiter (ES Modules)', () => {
    let limiter;

    beforeEach(() => {
        limiter = new RateLimiter({ limit: 3, windowMs: 1000 });
    });

    test('should allow actions within limit', () => {
        expect(limiter.check('user1')).toBe(true);
        expect(limiter.check('user1')).toBe(true);
        expect(limiter.check('user1')).toBe(true);
        expect(limiter.check('user1')).toBe(false);
    });

    test('should reset limit for an identifier', () => {
        limiter.check('user1');
        limiter.check('user1');
        limiter.check('user1');
        expect(limiter.check('user1')).toBe(false);
        limiter.reset('user1');
        expect(limiter.check('user1')).toBe(true);
    });

    test('should reset all limits', () => {
        limiter.check('user1');
        limiter.check('user2');
        limiter.resetAll();
        expect(limiter.check('user1')).toBe(true);
        expect(limiter.check('user2')).toBe(true);
    });

    test('should handle sliding window', (done) => {
        limiter.check('user1');
        setTimeout(() => {
            expect(limiter.check('user1')).toBe(true);
            done();
        }, 1100);
    });
});
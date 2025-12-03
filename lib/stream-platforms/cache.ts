interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

class SimpleCache {
    private cache: Map<string, CacheEntry<any>> = new Map();
    private ttl: number;

    constructor(ttlMinutes: number = 5) {
        this.ttl = ttlMinutes * 60 * 1000; // Convert to milliseconds
    }

    get<T>(key: string): T | null {
        const entry = this.cache.get(key);

        if (!entry) {
            return null;
        }

        const isExpired = Date.now() - entry.timestamp > this.ttl;

        if (isExpired) {
            this.cache.delete(key);
            return null;
        }

        return entry.data as T;
    }

    set<T>(key: string, data: T): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
        });
    }

    clear(): void {
        this.cache.clear();
    }
}

export const streamStatusCache = new SimpleCache(5); // 5-minute TTL

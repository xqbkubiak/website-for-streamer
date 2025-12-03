"use client"

import { useState, useEffect } from 'react';
import { StreamStatus } from '@/lib/stream-platforms/types';

interface UseStreamStatusReturn {
    status: StreamStatus | null;
    loading: boolean;
    error: string | null;
}

export function useStreamStatus(pollingInterval: number = 60000): UseStreamStatusReturn {
    const [status, setStatus] = useState<StreamStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        let intervalId: NodeJS.Timeout;

        async function fetchStatus() {
            try {
                const response = await fetch('/api/stream-status');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (mounted) {
                    setStatus(data);
                    setError(null);
                    setLoading(false);
                }
            } catch (err) {
                if (mounted) {
                    setError(err instanceof Error ? err.message : 'Failed to fetch stream status');
                    setLoading(false);
                }
            }
        }

        // Initial fetch
        fetchStatus();

        // Set up polling
        intervalId = setInterval(fetchStatus, pollingInterval);

        return () => {
            mounted = false;
            clearInterval(intervalId);
        };
    }, [pollingInterval]);

    return { status, loading, error };
}

'use client';

export function getNextAppReact<T>(reactInstance: T): T {
	(globalThis as any).__HOST_REACT__ ||= reactInstance;
	return (globalThis as any).__HOST_REACT__;
}

import { describe, it, expect } from 'vitest';
import rewriteFunction from './rewrite';

describe('rewriteFunction', () => {
  it('should redirect to /edge/australia if country code is AU', async () => {
    const mockRequest = { url: 'https://example.com/edge' };
    const mockContext = { geo: { country: { code: 'AU' } } };

    const response = await rewriteFunction(mockRequest as any, mockContext as any);
    expect(response.headers.get('Location')).toBe('https://example.com/edge/australia');
  });

  it('should redirect to /edge/not-australia if country code is not AU', async () => {
    const mockRequest = { url: 'https://example.com/edge' };
    const mockContext = { geo: { country: { code: 'US' } } };

    const response = await rewriteFunction(mockRequest as any, mockContext as any);
    expect(response.headers.get('Location')).toBe('https://example.com/edge/not-australia');
  });

  it('should redirect to /edge/not-australia if country code is undefined', async () => {
    const mockRequest = { url: 'https://example.com/edge' };
    const mockContext = { geo: { country: { code: undefined } } };

    const response = await rewriteFunction(mockRequest as any, mockContext as any);
    expect(response.headers.get('Location')).toBe('https://example.com/edge/not-australia');
  });
});

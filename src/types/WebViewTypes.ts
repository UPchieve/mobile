export interface WebViewEvent {
  eventType: 'tool-changed' | 'connected';
}
export interface CustomWebViewEvent<T> {
  eventType: 'tool-changed';
  eventValue: T;
}

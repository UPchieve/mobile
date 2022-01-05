export interface WebViewEvent {
  eventType: 'tool-changed' | 'connected';
}
export interface CustomWebViewEvent<T> {
  eventType: 'tool-changed';
  eventValue: T;
}

interface QuillEditorTextChangeEvent {
  eventValue: {
    delta: any;
    source: string;
    oldDelta: any;
  };
  eventType: 'text-change'
}

interface QuillEditorSelectionChangeEvent {
  eventValue: {
    range: any;
    source: string;
  };
  eventType: 'selection-change'
}

export type QuillEditorEvent = QuillEditorTextChangeEvent | QuillEditorSelectionChangeEvent;

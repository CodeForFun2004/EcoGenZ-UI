export interface RecycleImageResponse {
  detectedItem: string;
  recycleTip: string;
}

export interface AIState {
  loading: boolean;
  error: string | null;
  recycledImage: RecycleImageResponse | null;
}

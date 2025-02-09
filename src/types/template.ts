export interface BusinessTemplate {
  id: string;
  type: string;
  label: string;
  components: Array<{
    type: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
  }>;
}
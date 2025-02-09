export type Complexity = 'Low' | 'Medium' | 'High';

export interface TechFeature {
  id: string;
  name: string;
  description: string;
  scenario: string;
  technicalName: string;
  complexity: Complexity;
  requirements?: string[];
  visualExample: string;
}

export interface FeatureCategory {
  id: string;
  name: string;
  features: TechFeature[];
}
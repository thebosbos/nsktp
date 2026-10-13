export interface ProjectResult {
  label: string;
  value: string;
}

export interface Project {
  _id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  results: ProjectResult[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceMethodologyStep {
  title: string;
  text: string;
}

export interface ServiceBenefit {
  highlight: string;
  text: string;
}

export interface Service {
  _id: string;
  slug: string;
  badge: string;
  title: string;
  problem: string;
  solutionIntro: string;
  features: string[];
  methodology: ServiceMethodologyStep[];
  benefits: ServiceBenefit[];
  ctaText: string;
  order: number;
}

export type StatGroup = "home" | "projects" | "team";

export interface Stat {
  _id: string;
  group: StatGroup;
  value: string;
  label: string;
  order: number;
}

export interface Feature {
  _id: string;
  title: string;
  text: string;
  order: number;
}

export type LeadStatus = "new" | "contacted" | "closed";

export interface Lead {
  _id: string;
  projectType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
}

export interface SiteSettings {
  email: string;
  hoursWeekdays: string;
  hoursEmergency: string;
  zonesText: string;
  copyrightText: string;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

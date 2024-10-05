import { Injectable } from '@angular/core';
export interface Inspection {
  examiner_id: string; // Adjust the type as necessary
  date: string; // Adjust the type if needed (Date, string, etc.)
}

export interface Report {
  id: number; // Assuming ID is a number
  description: string; // Add other fields as needed
  inspections: Inspection[]; // Assuming each report has an array of inspections
}
@Injectable({
  providedIn: 'root'
})
export class LandInspectionService {

  constructor() { }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Treatment } from '../model/treatment.model';

@Injectable()
export class TreatmentsService {
    constructor(private http: HttpClient) {}

    searchBy(treatmentCode: string = '') {
        return this.http.get<Treatment[]>(
            `${SERVER_API_URL}/api/treatments?treatmentCode_like=${treatmentCode}`
        );
    }
}

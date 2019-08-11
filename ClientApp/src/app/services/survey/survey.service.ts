import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BaseBackendService } from "../../shared/services/base-backend.service";
import { Observable } from "rxjs/Observable";
import { Survey } from "../../models/survey.models";
import { AppConfig } from "../../app.configuration";

@Injectable()
export class SurveyService extends BaseBackendService<any> {
  constructor(http: HttpClient, apiUrl: AppConfig) {
        super(http, 'Survey', apiUrl);
    }
    public getSurveyById(surveyCode:string): Observable<Survey> {
        return this.http.get<Survey>("assets//" + surveyCode+".json")
            .catch(this.handleError);
    }
    getSurveyDetails() {
        let surveydetails: Survey[] = [];
        var survey = new Survey();
        survey.surveyCode = "suv001";
        survey.surveyName = "Sample survey";
        surveydetails.push(survey);
        var survey2 = new Survey();
        survey2.surveyCode = "suv002";
        survey2.surveyName = "dynamic survey";
        surveydetails.push(survey2);
        for (var i = 0; i < 14; i++) {
            var mysurvey = new Survey();
            mysurvey.surveyCode = "suv_"+i;
            mysurvey.surveyName = "dynamic survey"+i;
            surveydetails.push(mysurvey);
        }
        return surveydetails;
    }
}

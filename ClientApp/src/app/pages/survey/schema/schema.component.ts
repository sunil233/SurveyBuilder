import { Component, Inject } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TabDirective } from "ngx-bootstrap/tabs";

import { Survey, Page, Question, Option, Pageflow } from "../../../models/survey.models";
import { SurveyService } from "../../../services/survey/survey.service";

@Component({
  selector: 'schema-builder',
  templateUrl: './schema.component.html',
  providers: [SurveyService],
  styles: [`
   .page-bottom-tab-container{
    background-color: #fff;
    display: inline-block;
    height: 35px
}  
.page-bottom-tab { 
    background-color:#e4e5e6;
    padding-left:15px;
    padding-right:15px;
    padding-top:5px;
   }
.page-bottom-tab-triangle {
    border-left: 35px solid transparent;
    border-bottom: 50px solid #e4e5e6;
    display: inline-block;   
}

.form-control.ng-invalid {
  border-left: 5px solid #a94442; /* green */
}

.form-control.ng-valid {
  border-left: 5px solid #42A948;
}

form-control.ng-valid[required], form-control.ng-valid.required {
  border-left: 5px solid #a94442;
}


`
  ],
})
export class SchemaBuilderComponent {
  /*** DECLARATIONS ******/
  public bsConfig: Partial<BsDatepickerConfig>;
  public survey: FormGroup;
  public questionFormGroup: FormGroup;
  public _survey: Survey;
  public pagedetails: any;
  public showPrev: boolean = false;
  public showNext: boolean = false;
  public currentIndex: number = 0;
  public isPreview: boolean = false;
  public isSchema: boolean = false;
  public pager: Pageflow[] = [];
  public prevPages: Array<number> = [];
  public surveyList: Array<Survey> = [];
  // survey grid
  columns: any[] = [
    { headertext: 'Survey Code', name: 'surveyCode', filter: 'text' },
    { headertext: 'Survey Name', name: 'surveyName', filter: 'text' },

  ];
  sorting: any = {
    column: 'surname',
    descending: true
  };
  public showSurveyPanel: boolean = false;
  public formdata: any[][] = [];
  /*** End of DECLARATIONS ******/
  constructor(private fb: FormBuilder, private surveyService: SurveyService) {
    this.bsConfig = Object.assign({}, {
      containerClass: 'theme-blue'
    });
    this.pagedetails = {};
    this.surveyList = this.surveyService.getSurveyDetails();
  }

  ngOnInit() {
    this.isSchema = true;
    this.survey = this.fb.group({
      surveyCode: ['', Validators.required],
      surveyName: ['', Validators.required],
      surveyDescription: [''],
      logoUrl: [''],
      headerUrl: [''],
      headerColor: [''],
      footerUrl: [''],
      footerColor: [''],
      pages: this.fb.array([
        this.initPage(),
      ]),
    });
    this._survey = new Survey();
    var pf = new Pageflow();
    pf.hasPageFlow = false;
    this._survey.pages.push(new Page(1, 0, "", "", [], pf))
    this.fillPager();
  }
  initPage() {
    return this.fb.group({
      pageId: [''],
      pageflowIndex: [''],
      title: [''],
      description: [''],
      hasPageFlow: [''],
      questions: this.fb.array([
      ])
    });
  }
  initQuestion() {
    return this.fb.group({
      questionCode: ['', Validators.required],
      questionTitle: ['', Validators.required],
      questionType: ['', Validators.required],
      pageflowmodifier: [''],
      options: new FormArray([
      ]),
      pageFlow: this.initPageFlow()
    });
  }
  initPageFlow() {
    return this.fb.group({
      pagid: [''],
      nextpage: [''],
      surid: [''],
      pagorder: [''],
      ofanswerid: ['']
    });
  }
  initOptions() {
    return this.fb.group({
      label: [''],
      key: [''],
      pageflowIndex: []
    });
  }
  createSurvey() {
    this.showSurveyPanel = true;
  }
  onTabSelect(data: TabDirective): void {
    if (!(data instanceof TabDirective)) return;
    if (data.id == "schemaeditor") {
      this.isSchema = true;
      this.isPreview = false;
    }
    else if (data.id == "schemapreview") {
      this.isSchema = false;
      this.isPreview = true;
      this.initQuestionFormGroup();
    }
  }
  initQuestionFormGroup() {
    this.pagedetails = this.survey.value.pages[this.currentIndex];
    if (this.pagedetails != null && this.pagedetails != undefined) {
      let fieldsCtrls: any = {};
      for (let f of this.pagedetails.questions) {
        if (f.questionType == 'checkbox') {
          let opts: any = {};
          for (let opt of f.options) {
            opts[opt.key] = new FormControl(opt.value);
          }
          fieldsCtrls[f.questionCode] = new FormGroup(opts)
        }
        else {
          fieldsCtrls[f.questionCode] = new FormControl('' || '', Validators.required);
        }
      }
      this.questionFormGroup = new FormGroup(fieldsCtrls);
    }
  }
  addPage() {
    const control = <FormArray>this.survey.get('pages');
    control.push(this.initPage());
    var page = new Page();
    page.PageId = this._survey.pages.length + 1;
    this._survey.pages.push(page);
    this.fillPager();
  }
  addQuestion(j: number) {
    console.log(j);
    const control = <FormArray>this.survey.get(['pages', j, 'questions']); // also try this new syntax
    control.push(this.initQuestion());
    this._survey.pages[j].Questions.push(new Question(1, "", "", "", [], false, false, "", "", []));

  }
  addOptions(i: number, j: number) {
    const control = <FormArray>this.survey.get(['pages', i, 'questions', j, 'options']); // also try this new syntax
    control.push(this.initOptions());
    this._survey.pages[i].Questions[j].options.push(new Option())

  }

  removeQuestion(i: number, j: number) {
    const control = <FormArray>this.survey.get(['pages', i, 'questions']); // also try this new syntax
    control.removeAt(j);
    this._survey.pages[i].Questions.splice(j, 1);

  }
  removePage(i: number) {
    const control = <FormArray>this.survey.get(['pages']);
    control.removeAt(i);
    this._survey.pages.splice(i, 1);
    this.fillPager();
  }
  removeOption(i: number, j: number, k: number) {
    const control = <FormArray>this.survey.get(['pages', i, 'questions', j, 'options']); // also try this new syntax
    control.removeAt(i);
    this._survey.pages[i].Questions[j].options.splice(k, 1);
  }

  /**
 * Advances to the next elements page
 * @param cPage the currrent elements page
 */
  nextPage(cPage: Page) {
    this.currentIndex++;
    if (!cPage.pageflow) {
      cPage.pageflow = this.pager[0];
      this.currentIndex = cPage.pageflow.pageorder;
    }
    else {
      if (cPage.pageflow.nextpage === 'true') {
        // advance to next page
        this.currentIndex++;
      } else if (cPage.pageflow.submitform === 'true') {
        // go to submit page
        this.currentIndex = this._survey.pages.length - 1;
      } else {
        // go to the set next page
        if (cPage.pageflow.pageorder != undefined) {
          this.currentIndex = cPage.pageflow.pageorder;
        }
      }
    }

    this.prevPages.push(cPage.PageId);
    this.initQuestionFormGroup();
  }

  /**
   * retracts back to the previous page
   * @param cPage the current elements page
   */
  previousPage() {
    if (this.currentIndex > 0) {
      if (this.prevPages.length > 0) {
        var cPageIndex = this.prevPages.pop();
        if (cPageIndex != undefined && cPageIndex != null) {
          this.currentIndex = cPageIndex;
          this.currentIndex--;
        }
        else {
          this.currentIndex--;
        }
      }
      else {
        this.currentIndex--;
      }
    }
    this.initQuestionFormGroup();
  }

  movePageUp(index: number) {
    if (index >= 1)
      this.swap(this._survey.pages, index, index - 1);
  }
  movePageDown(index: number) {
    if (index < this._survey.pages.length - 1)
      this.swap(this._survey.pages, index, index + 1);

  }
  private swap(array: any[], x: any, y: any) {
    var b = array[x];
    array[x] = array[y];
    array[y] = b;

  }
  fillPager() {
    this.pager = [];
    // next page
    if (this._survey.pages.length > 1) {
      var page = new Pageflow();
      page.nextpage = 'true';
      page.label = 'Continue to next page';
      page.surid = this._survey.ID;
      this.pager.push(page);
    }
    for (let i = 1; i <= this._survey.pages.length; i++) {
      var _pageflow = new Pageflow();
      _pageflow.pageid = i;
      _pageflow.nextpage = '';
      _pageflow.label = 'Go to page' + i;
      _pageflow.surid = this._survey.ID;
      _pageflow.pageorder = i - 1
      this.pager.push(_pageflow);
    }
    // submit form
    if (this._survey.pages.length > 1) {
      var _pageflow = new Pageflow();
      _pageflow.pageid = 0;
      _pageflow.nextpage = '';
      _pageflow.label = 'Submit form';
      _pageflow.surid = this._survey.ID;
      _pageflow.pageorder = null
      _pageflow.pageorder = 'true';
      this.pager.push(_pageflow);
    }
  }
  updateQuestionOptions(opt: Option, question: Question) {
    const optIndex = question.options.indexOf(opt);
    opt.pageflow = this.pager[opt.pageflowIndex];
  }
  gridaction(gridaction: any): void {
    switch (gridaction.action) {
      case "edit":
        this.showSurveyPanel = true;
        var surveyCode = gridaction.values[0].value.surveyCode;
        this.getSurveyByID(surveyCode);
        break;
    }
  }
  getSurveyByID(surveyCode: string) {
    this.surveyService.getSurveyById(surveyCode).subscribe(surveydata => {
    });
  }
  SaveSurvey() {
    this.formdata = new Array<Array<any>>();
    this._survey.pages.forEach(page => {
      var qData: any = {};
      page.Questions.forEach(question => {
        let pagerow: any[] = new Array<any>();
        if (question.answer != undefined && question.answer != null && question.answer != "") {
          qData[question.questionCode] = question.answer
          // pagerow.push(qData);
          pagerow[page.PageId] = question.answer;
        }
        if (question.answer != undefined && question.selectedAnswer != null && question.selectedAnswer != "") {
          qData[question.questionCode] = question.selectedAnswer
          // pagerow.push(qData);
          pagerow[page.PageId] = question.answer;
        }
        if (question.answer != undefined && question.selectedAnswers != null && question.selectedAnswers.length > 0) {
          qData[question.questionCode] = question.selectedAnswers
          // pagerow.push(qData);
          pagerow[page.PageId] = question.answer;
        }
        this.formdata.push(pagerow);
      });
    });
  }
}

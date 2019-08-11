export class Survey {
    constructor(
        public ID: number=0,      
        public surveyName: string = "",
        public surveyCode: string = "",
        public surveyDescription: string = "",
        public logoUrl: string="",  
        public headerUrl: string="",  
        public headerColor: string="",  
        public footerUrl: string="", 
        public footerColor: string="", 
        public pages: Page[] = []
    ) { }
}
export class Page {
    constructor(
        public PageId: number=0,
        public pageflowIndex: number=0,
        public Title: string="",
        public Description: string="",
        public Questions: Question[] = [],
        public pageflow: Pageflow = new Pageflow()

    ) { }
}
export class Question {
    constructor(
        public ID: number=0,
        public questionCode: string="",
        public questionType: string="",
        public questionTitle: string="",
        public options: Option[]=[],
        public Required: boolean = false,  
        public pageflowmodifier: boolean = false,         
        public answer: any=null,
        public selectedAnswer: any=null,
        public selectedAnswers: any[] = []
      
       
    ) { }
}
export class Option {
    constructor(
        public label: string="",
        public key: string = "",  
        public value: string = "",
        public isChecked: any = false,
        public pageflowIndex: number = 0,
        public pageflow: Pageflow = new Pageflow(),
    ) { }
}
export class Pageflow {

    public pageid: number;
    public nextpage: string;
    public label: string;
    public surid: number;
    public pageorder: any;
    public submitform: any;
    public ofanswerid: any;
    public id: number;
    public hasPageFlow: boolean; 
}


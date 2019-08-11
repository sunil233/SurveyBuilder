import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { InterceptorService } from '../shared/services/intercepter.service';
import { CustomHttpInterceptor } from '../shared/services/custom.httpinterceptor';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { UserHeaderComponent } from './user-header/user-header.component';

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
        InterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomHttpInterceptor,
            multi:true
        }
    ],
    declarations: [
        UserLayoutComponent,
        UserHeaderComponent
    ],
    exports: [
        UserLayoutComponent,
        UserHeaderComponent
    ]
})
export class LayoutModule { }

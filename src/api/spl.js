import {Group} from "@/models/group";
import {Question} from "@/models/question";
import {Menu} from "@/models/menu";

export class spl {
    static menu(menuId) {
        let menu = new Menu()
        menu.title = 'اطلاعات پرسنلی';
        let group1 = new Group();
        group1.title = 'اطلاعات خانواگی';
        group1.questions = [
            new Question('نام'),
            new Question('فامیل'),
            new Question('تاریخ تولد'),
            new Question('آدرس'),
        ];

        let group2 = new Group();
        group2.title = 'اطلاعات سازمانی';
        group2.questions = [
            new Question('محل'),
            new Question('سمت'),
            new Question('قرارداد'),
        ];

        menu.groups.push(group1);
        menu.groups.push(group2);
        return menu;
    }

}
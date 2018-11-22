import {GroupModel} from "@/models/GroupModel";
import {QuestionModel} from "@/models/QuestionModel";
import {MenuModel} from "@/models/MenuModel";

export class spl {
    static menu(menuId) {
        var m =
            {
                title:'منوی افراد',
                groups:[
                    {
                        title:'اطلاعات اولیه',
                        questions:[
                            {
                                title: 'نام',
                                fieldInfo:{
                                    name:'text',
                                    style:null,
                                    mask:''
                                },
                                validation:{
                                    script:'abc'
                                }
                            },{
                                title: 'فامیل',
                                fieldInfo:{
                                    name:'text',
                                    style:null,
                                    mask:''
                                },
                                validation:{
                                    script:'abc'
                                }
                            },{
                                title: 'تولد',
                                fieldInfo:{
                                    name:'date',
                                    style:null,
                                    mask:''
                                },
                                validation:{
                                    script:'abc'
                                }
                            },{
                                title: 'محل تولد',
                                fieldInfo:{
                                    name:'select',
                                    style:null,
                                    mask:''
                                },
                                validation:{
                                    script:'abc'
                                }
                            }
                        ]
                    },
                    {
                        title:'اطلاعات پرسنلی',
                        questions:[
                            {
                                title: 'شماره پرسنلی',
                                fieldInfo:{
                                    name:'text',
                                    style:null,
                                    mask:''
                                },
                                validation:{
                                    script:'abc'
                                }
                            },{
                                title: 'سمت',
                                fieldInfo:{
                                    name:'text',
                                    style:null,
                                    mask:''
                                },
                                validation:{
                                    script:'abc'
                                }
                            }
                        ]
                    }
                ]
            };
        let menu = new MenuModel().deserialize(m);
        menu.init();
        return menu;
    }

}
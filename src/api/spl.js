import {GroupModel} from "@/models/GroupModel";
import {QuestionModel} from "@/models/QuestionModel";
import {MenuModel} from "@/models/MenuModel";

export class spl {
    static menu(menuId) {
        var m =
            {
                title: 'منوی افراد',
                groups: [
                    {
                        title: 'اطلاعات اولیه',
                        groupInfo:{type:'form'},
                        questions: [
                            {
                                title: 'نام',
                                fieldInfo: {
                                    name: 'text',
                                    style: null,
                                    mask: ''
                                },
                                validation: {
                                    script: 'abc'
                                }
                            }, {
                                title: 'فامیل',
                                fieldInfo: {
                                    name: 'text',
                                    style: null,
                                    mask: ''
                                },
                                validation: {
                                    script: 'abc'
                                }
                            }, {
                                title: 'تولد',
                                fieldInfo: {
                                    name: 'date',
                                    style: null,
                                    mask: ''
                                },
                                validation: {
                                    script: 'abc'
                                }
                            }, {
                                title: 'محل تولد',
                                fieldInfo: {
                                    name: 'select',
                                    style: null,
                                    source: {
                                        url: 'http://localhost/countries'
                                    }
                                },
                                validation: {
                                    script: 'abc'
                                }
                            }
                        ]
                    },
                    {
                        title: 'اطلاعات پرسنلی',
                        groupInfo:{type:'form'},
                        questions: [
                            {
                                title: 'شماره پرسنلی',
                                fieldInfo: {
                                    name: 'text',
                                    style: null,
                                    mask: ''
                                },
                                validation: {
                                    script: 'abc'
                                }
                            }, {
                                title: 'سمت',
                                fieldInfo: {
                                    name: 'text',
                                    style: null,
                                    mask: ''
                                },
                                validation: {
                                    script: 'abc'
                                }
                            }
                        ]
                    },
                    {
                        title: 'خودرو',
                        groupInfo:{type:'table'},
                        questions: [
                            {
                                title: 'نام',
                                fieldInfo: {
                                    name: 'text',
                                    style: null,
                                    mask: ''
                                },
                                validation: {
                                    script: 'abc'
                                }
                            }, {
                                title: 'مدل',
                                fieldInfo: {
                                    name: 'text',
                                    style: null,
                                    mask: ''
                                },
                                validation: {
                                    script: 'abc'
                                }
                            }, {
                                title: 'سازنده',
                                fieldInfo: {
                                    name: 'text',
                                    style: null,
                                    mask: ''
                                },
                                validation: {
                                    script: 'abc'
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

    static getUrl(url) {
        return [{id: 1, name: "ایران"}, {id: 2, name: "آسیا"}, {id: 3, name: "اروپا"}];
    }
}
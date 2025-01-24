/*© 2021-2024, MaivenPoint Pte. Ltd. All rights reserved.*/
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
//

require('@4tw/cypress-drag-drop')
let moment = require('moment')
let cookieKey = ['TenantId', 'ESESSIONID', '.AspNetCore.Culture']

var cu_env_string = Cypress.env('current_Env')
var cu_ten_string = Cypress.env('current_ten')
var env = Cypress.env(cu_env_string)
var tenNode = env[cu_ten_string]
var EnvMsg = `${cu_env_string}[${cu_ten_string}]`
var api_url = env[cu_ten_string].Apiurl
var stu1 = env[cu_ten_string].Candidates[0]
var stu2 = env[cu_ten_string].Candidates[1]
var stu3 = env[cu_ten_string].Candidates[2]
var refer = Cypress.env('LoginShort')
var defaultPassword = '1qaz2wsxE'
if (tenNode.System.password) {
    var modifiedPassword = tenNode.System.password
}

/// Mix login method , pass true to the command, will login through local service 
Cypress.Commands.add('LoginExamAsSystem', () => {
    let login_Id = tenNode.System.userid
    cy.LoginByLocal(login_Id)
})
Cypress.Commands.add('LoginByLocal', (_username) => {
    Cypress.log({
        name: 'Login by local',
        message: `${EnvMsg} | ${_username}`,
    })
    // 进入ems登陆页面获取location
    cy.request({
        url: Cypress.env('LoginShort'),
        method: 'GET',
        followRedirect: false,
        headers: {
            Referer: refer,
            Cookie: '.AspNetCore.Culture=c%3Den-US%7Cuic%3Den-US; CacheUrl=true'
        },
    }).then((res) => {
        let location = res.headers.location
        getTokenfromEOS(location, _username)
    })
    cy.visit('/', {
        onBeforeLoad(win) {
            Cypress.Cookies.defaults({
                preserve: cookieKey
            })
        }
    })
    cy.waitLoading()
        .wait(1000)
})
function getTokenfromEOS(_location, _username) {
    Cypress.log({
        message: 'get token from EOS...'
    })
    let cu_env_string = Cypress.env("current_Env")
    let env = Cypress.env(cu_env_string)
    let eosUrl = env.EOSApi + Cypress.env('EOSLogin')
    let returnLocation = _location.split('authorize?')[0] + 'callback?' + _location.split('authorize?')[1]
    let password = defaultPassword
    if (_username === 'EduTechQA@avepointedutech.onmicrosoft.com' || _username === 'AUems@snapmail.cc' || _username === 'mos365tenant@v4b3s.onmicrosoft.com') {
        password = modifiedPassword
    }
    // 利用login api登录
    cy.request({
        url: eosUrl,
        method: 'POST',
        form: false,
        headers: {
            Origin: env.EOS,
            Referer: env.EOS
        },
        body: {
            userName: _username,
            password: password,
            rememberLogin: false,
            returnUrl: returnLocation
        }
    }).then((res) => {
        expect(res.status).to.eq(200)
    })
}

Cypress.Commands.add('LoginBy365', (_isLocal, _username) => {
    let cu_env_string = Cypress.env('current_Env')
    let envNode = Cypress.env(cu_env_string)
    let msloginUrl = 'https://login.microsoftonline.com'
    let _pwd = 'Avepoint1!'
    Cypress.log({
        name: 'Login by 365',
        message: `${EnvMsg} | ${_username}`,
    })
    cy.clearCookies({ domain: null });
    cy.clearLocalStorage()
    cy.request({
        url: envNode.EOS,
        method: 'GET'
    })
        .then(() => {
            cy.request(
                {
                    url: `${envNode.EOSApi}/account/aadlogin`,
                    method: 'GET',
                    qs: {
                        returnUrl: '%252fconnect%252fauthorize%252fcallback%253fclient_id%253dEOS%2526response_type%253did_token%252520token%2526response_mode%253dform_post%2526redirect_uri%253d' + envNode.EOS + '%2526state%253dhasredirectUrl110%253b%2526scope%253dopenid%252520profile%252520EosAPI%252520%2526nonce%253d13%2526x-client-SKU%253dID_NETSTANDARD1_4%2526x-client-ver%253d5.2.0.0%26referer%3D' + envNode.EOS + '%252f'
                    }
                }
            ).as('loginMS1')
                .then(() => {
                    cy.get("@loginMS1").then((res) => {
                        const flowToken1 = res.body.match(/"sFT":"([^\"]+?)"/)[1]
                        const ctx1 = res.body.match(/"sCtx":"([^\"]+?)"/)[1]
                        const canary1 = res.body.match(/"canary":"([^\"]+?)"/)[1]
                        const requestid = res.headers['x-ms-request-id']
                        const hash1 = res.body.match(/"hash":"([^\"]+?)"/)[1]
                        const nonce = res.body.match(/nonce=(\S*)\\u0026state=/)[1]
                        const state = res.body.match(/state=([^\\]+?)\\u0026estsfed=1\\u0026uaid=/)[1]
                        const client_id = res.body.match(/client_id=([^\\]+?)\\u0026redirect_uri=/)[1]
                        console.log("nonce is :" + canary1)
                        cy.request({
                            url: `${msloginUrl}/common/oauth2/authorize`,
                            method: 'GET',
                            qs: {
                                client_id: client_id,
                                redirect_uri: `${envNode.EOSApi}/signin-oidc`,
                                response_type: 'id_token',
                                scope: 'openid profile',
                                response_mode: "form_post",
                                nonce: nonce,
                                state: state,
                                "x-client-SKU": 'ID_NETSTANDARD2_0',
                                "x-client-ver": '6.8.0.0',
                                "sso_reload": true
                            },
                            headers: {
                                "Sec-Fetch-Mode": "navigate",
                                "Sec-Fetch-Site": "same-origin",
                                "Accept-Language": 'en-US,en;q=0.9',
                                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                                "sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
                                "sec-ch-ua-mobile": '?0',
                                "sec-ch-ua-platform": '"Windows"',
                                "Upgrade-Insecure-Requests": 1,
                                "Accept-Encoding": "gzip, deflate, br",
                                "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36',
                                "Sec-Fetch-Dest": "document"
                            }
                        }).then((res) => {
                            cy.request({
                                url: `${msloginUrl}/common/login`,
                                method: 'POST',
                                body: {
                                    login: _username,
                                    loginfmt: _username,
                                    passwd: _pwd,
                                    type: 11,
                                    i13: 0,
                                    LoginOptions: 3,
                                    lrt: "",
                                    lrtPartition: "",
                                    hisRegion: "",
                                    hisScaleUnit: "",
                                    ps: 2,
                                    psRNGCDefaultType: "",
                                    psRNGCEntropy: "",
                                    psRNGCSLK: "",
                                    canary: canary1,
                                    ctx: ctx1,
                                    hpgrequestid: requestid,
                                    flowToken: flowToken1,
                                    PPSX: "",
                                    NewUser: 1,
                                    FoundMSAs: "",
                                    fspost: 0,
                                    i21: 0,
                                    CookieDisclosure: 0,
                                    IsFidoSupported: 1,
                                    isSignupPost: 0,
                                    i19: 19514
                                },
                                headers: {
                                    Referer: `${msloginUrl}/common/oauth2/authorize?client_id=ab262453-7651-4fe4-97de-f757a12fdd5b&redirect_uri=https%3A%2F%2Feosisuat.dev.edutechonline.org%2Fsignin-oidc&response_type=id_token&scope=openid%20profile&response_mode=form_post&nonce=637889541132337382.NTgwYWY3ZTItYzMzZS00ZjUxLThiY2UtZWY1ODE4NTZhMjcwYmM5YjQ0MTktNWQzZS00N2JkLTkyZTMtM2MyYTk3NDcwYTM4&state=CfDJ8GdM0IQfcyVCk77W-y_12WB62mROaB_6d73SXy7AQA4Eqcp0LRXy3yn7Xy8yPAcz2pj-figCljLMOWCWx0rxIutfUqYQTu_kuv7v4P7c3Z47uMXJARuykRme0E3illhoVt98PSQK5Q__fSZJGHbMBKibbXctVQnVNnVCbNPc474nwzI4pj9nZzAHL_clItbjaRtB8-SRnW-wHwBva2yb7wLXoeX0R55rFeaEY-CjFDMLNTZHd_6dp4LvnR1dm7TtkbHOVb8lKVoOwOeszyB1rVVTWYatkleiQq_25xfMUWxA8BZkIkWjB3CVPHDC5Nnsec7ej7w5vloKtf17EniKU4PxE9HznHJNyrYeoq1pZypTjiujim4T1M9YZgf7D2I9Gh8GSN9zlYiSe9gvfY_2JtRLnV2woQdmWoA3nAFwn_5gkumHCjF34xc2mUjRlJ1qzZUNUTd3TpW7mm6sYgVKd3CBBn0Uox4FIGYakimLQYMV7YmGz8m5GbsZj7VsnFjLC1oRCKtTuceDrkmhZvKGpIwhe_wUw7_VJD2sP5boSQn_xVuePIrwuKJ1Ji2QxfC-eOEyP_aatuz1VReq_m4gXCjCNoqmCxUhdsy469FzIbaZJ2atMd16oUG-DcatX4_L4xI94MyR1K3GdENavLJYQ6VHwKDSnMqA0e-SdIkWBki-6Yc-wkZaFcrzYLtTUZv1KWKl5K8cyVt706wjovFI6v5WkPqvN16qApqIg-V8WI43hdxNHeIQFAe9iR_B5ot527xChIZcDqq7ZWh4YwgddXUrxbyh8TNg2I1KiIvxp_maE6x_u-AZdA5CCl3-B92Tnqcmteg-sC3EQx2zDDbf0xR_uEplMbJCdseoSJtjSt6mU9O6rcnblaCHGOc4nEREIQ&x-client-SKU=ID_NETSTANDARD2_0&x-client-ver=5.6.0.0&sso_reload=true`,
                                    Host: 'login.microsoftonline.com',
                                    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                                    "Content-Type": 'application/x-www-form-urlencode'
                                },
                                form: true
                            }).then((res) => {
                                const canary2 = res.body.match(/"canary":"([^\"]+?)"/)[1]
                                const ctx2 = res.body.match(/"sCtx":"([^\"]+?)"/)[1]
                                const flowToken2 = res.body.match(/"sFT":"([^\"]+?)"/)[1]
                                const hpgrequestid = res.headers['x-ms-request-id']
                                const hash2 = res.body.match(/"hash":"([^\"]+?)"/)[2]
                                cy.request({
                                    url: `${msloginUrl}/kmsi`,
                                    method: 'POST',
                                    form: true,
                                    body: {
                                        LoginOptions: 3,
                                        type: 28,
                                        ctx: ctx2,
                                        hpgrequestid: hpgrequestid,
                                        flowToken: flowToken2,
                                        canary: canary2,
                                        i19: 4132
                                    }
                                })
                                    .then((res) => {
                                        const id_token = res.body.match(/name="id_token" value="([^\"]+?)"/)[1]
                                        const state = res.body.match(/name="state" value="([^\"]+?)"/)[1]
                                        const session_state = res.body.match(/name="session_state" value="([^\"]+?)"/)[1]
                                        cy.request({
                                            url: `${envNode.EOSApi}/signin-oidc`,
                                            method: 'POST',
                                            form: true,
                                            body: {
                                                id_token: id_token,
                                                state: state,
                                                session_state: session_state,
                                            },
                                            headers: {
                                                Referer: msloginUrl,
                                                Origin: msloginUrl,
                                                Host: envNode.EOSApi.split('//')[1],
                                                Pragma: "no-cache",
                                                "Sec-Fetch-Site": "cross-site",
                                                "Sec-Fetch-Mode": "navigate",
                                                "Upgrade-Insecure-Requests": 1,
                                                'Cache-Control': 'no-cache'
                                            },
                                            followRedirect: false
                                        })
                                            .then((res) => {
                                                cy.request({
                                                    url: `${envNode.EOSApi}/account/externallogincallback`,
                                                    method: 'GET',
                                                    followRedirect: false
                                                })
                                                    .then(() => {
                                                        cy.request({
                                                            url: `${envNode.EOSApi}/connect/authorize/callback`,
                                                            method: 'GET',
                                                            qs:
                                                            {
                                                                client_id: "EOS",
                                                                response_type: "id_token%20token",
                                                                response_mode: 'form_post',
                                                                redirect_uri: envNode.EOS,
                                                                state: "hasredirectUrl110;",
                                                                scope: 'openid%20profile%20EosAPI%20',
                                                                nonce: 13,
                                                                'x-client-SKU': "ID_NETSTANDARD1_4",
                                                                "x-client-ver": "6.8.0.0",
                                                                referer: envNode.EOS
                                                            }
                                                        })
                                                    })
                                            })
                                    })
                            })
                        })
                    })
                })
        })

    cy.visit('/', {
        onBeforeLoad(win) {
            Cypress.Cookies.defaults({
                preserve: cookieKey
            })
        }
    })
    cy.waitLoading()
})

Cypress.Commands.add('logoutApi', () => {
    cy.request({
        url: '/account/Logout',
        method: 'POST',
        form: false,
    })
    cy.clearCookies()
    cy.wait(2000)
});

Cypress.Commands.add('waitLoading', (_num) => {
    // return cy.waitUntil(() => cy.window().then(
    //     win => (!!win.document.querySelector('.aui-loading') && win.document.querySelector('.aui-loading').style.display === 'none')
    // ), {
    //     errorMsg: 'This is a wait loading error message', // overrides the default error message
    //     timeout: 60000, // waits up to 60000 ms, default to 5000
    //     interval: 100 // performs the check every 500 ms, default to 200
    // });
    let num = 0
    if (_num) {
        num = _num
    }
    cy.get('aui-loading').eq(num).shadow().find('.aui-loading', { timeout: 60000, interval: 1000 })
        .should('not.be.visible')
});
Cypress.Commands.add('waitElement', (_element) => {
    return cy.waitUntil(() => cy.window().then(
        win => (win.document.querySelector(_element))
    ), {
        errorMsg: 'This is a wait loading error message', // overrides the default error message
        timeout: 150000, // waits up to 60000 ms, default to 5000
        interval: 100 // performs the check every 500 ms, default to 200
    }).wait(800);
});
Cypress.Commands.add('waitNoElement', (_element) => {
    return cy.waitUntil(() => cy.window().then(
        win => (!win.document.querySelector(_element))
    ), {
        errorMsg: 'This is a wait loading error message', // overrides the default error message
        timeout: 150000, // waits up to 60000 ms, default to 5000
        interval: 100 // performs the check every 500 ms, default to 200
    }).wait(300);
});
Cypress.Commands.add('is24HourFormat', () => {
    return () => {
        cy.window().then(win => {
            if (win.DefaultDateTimeFormat.Time.indexOf('HH') != -1) {
                return true
            }
            else {
                return false
            }
        })
    }
})
Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe, callback = () => { }) => {
    cy.log('Getting iframe body')

    return cy
        .wrap($iframe)
        .should(iframe => expect(iframe.contents().find('body')).to.exist)
        .then(iframe => cy.wrap(iframe.contents().find('body')))
        .within({}, callback)
})
Cypress.Commands.add('AddRichText', (i, _content) => {
    cy.log('Start AddRichText')
    cy.get('[title="Bold (Ctrl+B)"]').eq(i).click()
    cy.wait(500)
    cy.get('.cke_wysiwyg_frame').eq(i).then(function ($iframe) {
        const $body = $iframe.contents().find('body')
        cy.wrap($body).find('strong')
            .type(_content, { force: true })
    })
})

Cypress.Commands.add('CompareCardTimeWithForamt', (_card, _time) => {
    let userLangList = [
        { locale: ["default", "zh", "zh-CN", "zh-HK", "zh-au", "zh-TW"], index: 0 },
        { locale: ["en", "en-GB", "en-ID", "en-PH", "en-PK", 'en-DE'], index: 1 },
        { locale: ["en-US", "en-AS", "en-BI", "en-GU", 'en-MH', 'en-MP', 'en-PR', 'en-UM', 'en-VI'], index: 2 },
        { locale: ["en-au", 'en-HK', 'en-MY', 'en-ZW'], index: 3 },
        { locale: ["en-AU", 'en-NZ'], index: 4 },
        { locale: ["en-IN"], index: 5 },
        { locale: ["en-CA"], index: 6 },
    ]
    let formatList = [
        { format: 'DD MMM YYYY HH[:]mm', MS_format: 'Custom', eg: "03 Jan 2021 15:36" },
        { format: 'DD[/]MM[/]YYYY HH[:]mm', MS_format: 'dd/MM/yyyy', eg: "03/01/2021 15:36" },
        { format: 'M[/]D[/]YYYY HH[:]mm', MS_format: 'M/d/yyyy', eg: "1/3/2021 15:36" },
        { format: 'D[/]M[/]YYYY HH[:]mm', MS_format: 'd/M/yyyy', eg: "3/1/2021 15:36" },
        { format: 'D[/]MM[/]YYYY HH[:]mm', MS_format: 'd/MM/yyyy', eg: "3/01/2021 15:36" },
        { format: 'DD[-]MM[-]YYYY HH[:]mm', MS_format: 'dd-MM-yyyy', eg: "03-01-2021 15:36" },
        { format: 'YYYY[-]MM[-]DD HH[:]mm', MS_format: 'yyyy-MM-dd', eg: "2021-01-03 15:36" },
    ]

    let userLang = navigator.language || navigator.userLanguage;

    let pointer = 0, format = ''
    for (let i = 0; i < userLangList.length; i++) {

        let locals = userLangList[i].locale
        for (let n = 0; n < locals.length; n++) {
            if (userLang === locals[n]) {
                cy.log('Matched locales ' + userLangList[i].locale)
                pointer = userLangList[i].index
            }
        }
    }
    format = formatList[pointer].format
    let result = moment(_time).format(format)
    cy.log('User Lang :' + userLang + ', format ' + format)

    cy.get('.exam-card').then(($card) => {
        cy.get($card.eq(_card)).find('.exam-card-info-li').eq(1).find('span').eq(1).as('examTime')
        cy.get('@examTime').should('contain', result)
    })
})
Cypress.Commands.add('FormatTime', {
    prevSubject: true
}, (_subject, _time) => {
    let userLangList = [
        { locale: ["default", "zh", "zh-CN", "zh-HK", "zh-au", "zh-TW"], index: 0 },
        { locale: ["en", "en-GB", "en-ID", "en-PH", "en-PK", 'en-DE'], index: 1 },
        { locale: ["en-US", "en-AS", "en-BI", "en-GU", 'en-MH', 'en-MP', 'en-PR', 'en-UM', 'en-VI'], index: 2 },
        { locale: ["en-au", 'en-HK', 'en-MY', 'en-ZW'], index: 3 },
        { locale: ["en-AU", 'en-NZ'], index: 4 },
        { locale: ["en-IN"], index: 5 },
        { locale: ["en-CA"], index: 6 },
    ]
    let formatList = [
        { format: 'DD MMM YYYY HH[:]mm', MS_format: 'Custom', eg: "03 Jan 2021 15:36" },
        { format: 'DD[/]MM[/]YYYY HH[:]mm', MS_format: 'dd/MM/yyyy', eg: "03/01/2021 15:36" },
        { format: 'M[/]D[/]YYYY HH[:]mm', MS_format: 'M/d/yyyy', eg: "1/3/2021 15:36" },
        { format: 'D[/]M[/]YYYY HH[:]mm', MS_format: 'd/M/yyyy', eg: "3/1/2021 15:36" },
        { format: 'D[/]MM[/]YYYY HH[:]mm', MS_format: 'd/MM/yyyy', eg: "3/01/2021 15:36" },
        { format: 'DD[-]MM[-]YYYY HH[:]mm', MS_format: 'dd-MM-yyyy', eg: "03-01-2021 15:36" },
        { format: 'YYYY[-]MM[-]DD HH[:]mm', MS_format: 'yyyy-MM-dd', eg: "2021-01-03 15:36" },
    ]

    let userLang = navigator.language || navigator.userLanguage;

    let pointer = 0, format = ''
    for (let i = 0; i < userLangList.length; i++) {

        let locals = userLangList[i].locale
        for (let n = 0; n < locals.length; n++) {
            if (userLang === locals[n]) {
                cy.log('Matched locales ' + userLangList[i].locale)
                pointer = userLangList[i].index
            }
        }
    }
    format = formatList[pointer].format
    let result = moment(_time).format(format)
    cy.log('User Lang :' + userLang + ', format ' + format)
    cy.get(_subject).should('contain', result)
})
Cypress.Commands.add('compareEosDateFormat', {
    prevSubject: true
}, (_subject, _time) => {
    let formatList = [
        { eos_display: "d/M/yy", momentformat: 'D[/]M[/]YY', eg: "9/4/21" },
        { eos_display: "d/M/yyyy", momentformat: 'D[/]M[/]YYYY', eg: "9/4/2021" },
        { eos_display: "d MMM yyyy", momentformat: 'D MMM YYYY', eg: "3 Apr 2021" },
        { eos_display: "M/d/yyyy", momentformat: 'M[/]D[/]YYYY', eg: "4/9/2021" },
        { eos_display: "MM/dd/yyyy", momentformat: 'MM[/]DD[/]YYYY', eg: "04/09/2021" },
        { eos_display: "yy/M/d", momentformat: 'YY[/]M[/]D', eg: "21/4/9" },
        { eos_display: "yy/MM/dd", momentformat: 'YY[/]MM[/]DD', eg: "21/04/09" },
        { eos_display: "yyyy/M/d", momentformat: 'YYYY[/]M[/]D', eg: "2021/4/9" },
        { eos_display: "yyyy/MM/dd", momentformat: 'YYYY[/]MM[/]DD', eg: "2021/04/09" },
        { eos_display: "yyyy-MM-dd", momentformat: 'YYYY[-]MM[-]DD', eg: "2021-04-09" }
    ]

    cy.window().then(win => {
        let dateFormat = win.DefaultDateTimeFormat.Date
        cy.log(`eos setting ${dateFormat}`)
        for (let i = 0; i < formatList.length; i++) {
            if (dateFormat === formatList[i].eos_display) {
                let result = moment(_time).format(formatList[i].momentformat)
                cy.log(`transfer to ${formatList[i].momentformat}`)
                cy.get(_subject)
                    .should('contain', result)
            }
        }
    })
})
Cypress.Commands.add('compareEosTimeFormat', {
    prevSubject: true
}, (_subject, _time) => {
    let timeFormatlist = [
        { eos_display: "h:mm tt", momentformat: 'h[:]mm A', eg: "3:05 PM" },
        { eos_display: "hh:mm tt", momentformat: 'hh[:]mm A', eg: "03:05 PM" },
        { eos_display: "H:mm", momentformat: 'H[:]mm', eg: "5:05" },
        { eos_display: "HH:mm", momentformat: 'HH[:]mm', eg: "15:05" },
        { eos_display: "HH:mm", momentformat: 'HH[:]mm', eg: "15:09" },
    ]
    cy.window().then(win => {
        let timeformat = win.DefaultDateTimeFormat.Time
        cy.log(timeformat)
        for (let i = 0; i < timeFormatlist.length; i++) {
            if (timeformat === timeFormatlist[i].eos_display) {
                cy.log(`transfer to ${timeFormatlist[i].momentformat}`)
                let result = moment(_time).format(timeFormatlist[i].momentformat)
                cy.get(_subject)
                    .should('contain', result)
            }
        }
    })
})
Cypress.Commands.add('rewriteMockExamTime', (_path, _data) => {
    cy.log('rewriteMockExamTime')
    let data = _data
    let now = new Date()
    for (let i = 0; i < _data.result.length; i++) {
        let etime = assembleExamTime(now, 60)
        data.result[i].examStartDateOffset = etime.start
        data.result[i].examStartDate = etime.start
        data.result[i].examEndDateOffset = etime.end
        data.result[i].examEndDate = etime.end
        cy.log(data.result[i].examEndDate)
    }
    cy.writeFile('cypress/fixtures/' + _path, data)
})
function assembleExamTime(_start, _duration) {
    return {
        start: moment(_start).toJSON(),
        end: moment(_start).add(_duration, 'm').toJSON()
    }
}
function time2StartEndJSON(_offsetObj, _dur, _read, _deadlineDur) {
    let now = new Date()
    let yy = now.getFullYear(), mm = now.getMonth(), dd = now.getDate(),
        hh = now.getHours(), min = now.getMinutes(), ss = now.getSeconds()
    let _level = _offsetObj.level
    switch (_level) {
        case "hh":
            hh = hh + _offsetObj.off
            break;
        case "min":
            min = min + _offsetObj.off
            break;
    }
    if (_deadlineDur) {
        if (ss < 50) {
            var openst = new Date(yy, mm, dd, hh, min)
            var st = new Date(yy, mm, dd, hh, min + _read)
            var et = new Date(yy, mm, dd, hh, min + _deadlineDur)
            cy.log(`${st} | ${et}`)
        }
        else {
            var openst = new Date(yy, mm, dd, hh, min + 1)
            var st = new Date(yy, mm, dd, hh, min + 1 + _read)
            var et = new Date(yy, mm, dd, hh, min + 1 + _deadlineDur)
            cy.log(`${st} | ${et}`)
        }
        var result = {
            openJson: openst.toJSON(),
            startJson: st.toJSON(),
            endJson: et.toJSON()
        }
    }
    else {
        if (ss < 50) {
            var readst = new Date(yy, mm, dd, hh, min - _read)
            var st = new Date(yy, mm, dd, hh, min)
            var et = new Date(yy, mm, dd, hh, min + _dur)
            cy.log(`${st} | ${et}`)
        }
        else {
            var readst = new Date(yy, mm, dd, hh, min + 1 - _read)
            var st = new Date(yy, mm, dd, hh, min + 1)
            var et = new Date(yy, mm, dd, hh, min + 1 + _dur)
            cy.log(`${st} | ${et}`)
        }
        var result = {
            readJson: readst.toJSON(),
            startJson: st.toJSON(),
            endJson: et.toJSON()
        }
    }
    return result
}

Cypress.Commands.add('appendfixtureData', (_path, _data, _isAppend) => {
    let path = `cypress/fixtures/${_path}`
    cy.log(`appending data to ${_path}`)
    if (_isAppend) {
        cy.readFile(path).then(($contents) => {
            //cy.log($contents)
            $contents.push(_data)
            cy.writeFile(`cypress/fixtures/${_path}`, $contents)
            cy.wait(500)
        })
    } else {
        cy.writeFile(`cypress/fixtures/${_path}`, _data)
        cy.wait(500)
    }

})

Cypress.Commands.add('CreatePaperApi', (_courseCode, _paperName, _Section) => {
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    cy.log(cu_env_string, cu_ten_string)
    let user = env[cu_ten_string].System
    let api_url = env[cu_ten_string].Apiurl
    cy.log('get token of ', user.userid)
    let password = defaultPassword
    if (user.userid === 'EduTechQA@avepointedutech.onmicrosoft.com' || user.userid === 'AUems@snapmail.cc' || user.userid === 'mos365tenant@v4b3s.onmicrosoft.com') {
        password = modifiedPassword
    }
    cy.request({
        url: '/account/ApiLogin',
        method: 'POST',
        form: false,
        body: {
            userName: user.userid,
            Password: password,
            RegionHost: api_url,
            TenantId: user.tenantid
        }
    }).then((res) => {
        expect(res.status).to.eq(200)
        let paper = AssemblePaperBodyInfo(_paperName, _Section)
        let Auth = {
            _token: res.body.accessToken,
            _tenId: user.tenantid,
            _apiUrl: api_url
        }
        getCourseId(Auth, _courseCode, paper)
    })
})

function AssemblePaperBodyInfo(_name, _sections, _appendixFileContent) {
    let paperBody = {
        pName: _name,
        SectionCount: 0,
        QuestionCount: 0,
        FullMarks: 0,
        TotalMarks: 0,
        randomiseType: 0,
        Sections: _sections,
        AppendixFileContent: ''
    }

    let Qc = 0, fullMarks = 0, totalMarks = 0
    for (let i = 0; i < _sections.length; i++) {
        let temp_sec = _sections[i]
        let temp_items = temp_sec.questions
        Qc = Qc + temp_items.length
        for (let q = 0; q < temp_items.length; q++) {
            let item = temp_items[q]
            let ques = item.question
            fullMarks = fullMarks + ques.fullMarks
            totalMarks = totalMarks + ques.totalMarks
        }
    }
    paperBody.SectionCount = _sections.length
    paperBody.QuestionCount = Qc
    paperBody.FullMarks = fullMarks
    paperBody.TotalMarks = totalMarks
    if (_appendixFileContent) {
        paperBody.AppendixFileContent = _appendixFileContent
    }
    return paperBody
}
function getCourseId(Auth, _courseCode, _paper) {
    cy.log('search course by Code: ' + _courseCode)
    cy.request({
        url: Auth._apiUrl + '/admin/api/course/filters',
        method: 'POST',
        auth: { 'bearer': Auth._token },
        headers: {
            Cookie: "TenantId=" + Auth._tenId
        },
        body: {
            isASC: true,
            limit: 5,
            offset: 1,
            searchFields: "name;code",
            searchText: _courseCode,
            sortBy: "code",
            organization: []
        }
    }).then((res) => {
        expect(res.status).to.eq(200)
        let cid = res.body.result[0].id
        cy.log(' >>> Get course: ' + cid)
        newPaperApi(Auth, cid, _paper)
    })
}

function newPaperApi(_auth, _cid, _paper) {
    cy.log('Create Paper: ' + _paper.pName)
    cy.request({
        url: _auth._apiUrl + '/authoring/api/papers',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            status: 2,
            referenceId: _cid,
            name: _paper.pName,
            fullMarks: _paper.FullMarks,
            totalMarks: _paper.TotalMarks,
            randomiseType: 0,
            sections: _paper.Sections
        }
    }).then((res) => {
        expect(res.status).to.eq(201)
        cy.log('>>> Created paper: ' + _paper.pName)
    })
}
function newExamFrom(_examInfo, _paperInfo) {
    cy.visit('/exam')
    cy.waitLoading()
    cy.url().should('include', '/exam')
    cy.contains('Create exam').click()
    cy.log('creating exam: ' + _examInfo.name)
    cy.waitLoading()
    cy.contains('Exam name').as('examNa')
    cy.get('@examNa').next().find('input').clear().type(_examInfo.name, { delay: 10 })
    cy.get('[role="combobox"] input').clear().type(_examInfo.courseCode, { delay: 10 })
        .type('{enter}').wait(600)
    //select start time
    let stime = time2Start(_examInfo.time2Start)
    selectExamTime(true, stime[0], stime[1])
    //select Exam Type
    if (_examInfo.isOpenB) {
        cy.contains('Type').as('type')
        cy.get('@type').next().click({ force: true })
        cy.get('#aui_optionlist_optionlist_2 [aria-label="Open-book"]').click({ force: true })
    } else {
        //Switch Online Video button
        cy.contains('Online video').as('video')
        cy.get('@video').parent().parent().next().find('[role=switch]').click({ force: true })
    }

    cy.contains('Instruction to candidates').as('Instruc')
    cy.get('@Instruc').next().find('textarea').type(_examInfo.instruction)
    cy.get('.foot-panel [aria-label="Save and next"]').click()
    cy.wait(1500)

    //Search Candidate and Enroll him to Exam 
    cy.get('#right-panel .aui-expander-title-template').should('contain', _examInfo.name).wait(500)
    cy.get('.enroll-left-panel').contains('Select all')
        .click({ force: true })
    cy.get('.enroll-middle-panel .cursor-pointer').click({ force: true })

    cy.get('.foot-panel [aria-label="Save and next"]').click()
    cy.wait(1000)
    cy.get('.foot-panel [aria-label="Save and next"]').click()
    cy.wait(1000)

    // Add Papaer from Bank
    cy.get('#right-panel [aria-label="Add paper from bank"]').click().wait(500)
    cy.get('.aui-panel-children [placeholder="Search by paper name"] input').type(_paperInfo).type('{enter}').wait(1500)
    cy.get('#addPaperList .aui-table-row').then(($row) => {
        cy.get($row).eq(0).find('input').check()
        cy.get('.aui-panel-footer-right button[name="Add"]').contains('Add').click()
    })
    cy.wait(1000)

    cy.get('[aria-label="Publish"]').click().wait(500)
    cy.get('.aui-dialog-modal button[name="Publish"]')
        .click().wait(1000)
    cy.waitLoading()
}

function selectExamTime(_isStart, _hh, _mm) {
    let hh_index = '[data-index="' + _hh + '"]'
    let mm_index = '[data-index="' + _mm + '"]'
    let lab = '', pop = ''
    if (_isStart) {
        lab = 'Exam start time'
        pop = '#aui_comboboxshell_popup_1'

    } else {
        lab = 'Exam end time'
        pop = '#aui_comboboxshell_popup_2'
    }
    cy.contains(lab).as("time")
    cy.get("@time").next().click({ force: true }).wait(500)
    cy.get(pop + ' .aui-timepart-hour .aui-optionloop-item-select').parent().find(hh_index).click({ force: true }).wait(500)
    cy.get(pop + ' .aui-timepart-minute .aui-optionloop-item-select').parent().find(mm_index).click({ force: true }).wait(500)
    cy.get(pop + ' button.button').click()
}
function time2Start(_offset) {
    let now = new Date()
    let yy = now.getFullYear()
    let MM = now.getMonth()
    let dd = now.getDate()
    let hh = now.getHours()
    let mm = now.getMinutes()

    cy.log([hh, mm], " add " + _offset)
    let tag = mm + _offset
    if (tag >= 60) {
        mm = mm + _offset - 60
        hh = hh + 1
    } else {
        mm = mm + _offset
    }

    let len = mm.toString().length
    //len == 1 ? (mm = '0' + mm) : mm = mm.toString()
    mm = mm.toString()

    let obj = new Date(yy, MM, dd, hh, mm)
    cy.log(obj.toString())
    return [hh, mm, obj.toString()]
}
Cypress.Commands.add('CreateExamByUI', (_ExamInfo, _paperInfo) => {
    newExamFrom(_ExamInfo, _paperInfo)
})
Cypress.Commands.add('CreateExamByAPI', (_ExamInfo, _paperInfo) => {
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    cy.log(cu_env_string, cu_ten_string)
    let user = env[cu_ten_string].System
    let api_url = env[cu_ten_string].Apiurl
    let password = defaultPassword
    if (user.userid === 'EduTechQA@avepointedutech.onmicrosoft.com' || user.userid === 'AUems@snapmail.cc' || user.userid === 'mos365tenant@v4b3s.onmicrosoft.com') {
        password = modifiedPassword
    }

    cy.log(`get token of ${user.userid}`)
    cy.request({
        url: '/account/ApiLogin',
        method: 'POST',
        form: false,
        headers: {
            'SecurityHeader': 'I0gyMQnLwA',
            'Cookie': "TenantId=" + user.tenantid
        },
        body: {
            userName: user.userid,
            Password: password,
            RegionHost: api_url,
            TenantId: user.tenantid
        }
    }).then((res) => {
        expect(res.status).to.eq(200)
        let token = res.body.accessToken
        let Auth = {
            _token: token,
            _tenId: env[cu_ten_string].System.tenantid,
            _apiUrl: api_url
        }
        if (token != null) {
            cy.wait(800)
            CourseAndNewExamApi(Auth, _ExamInfo, _paperInfo)
        } else {
            cy.log('ERROR!!')
            cy.log(res.body)
        }
    })
})

function CourseAndNewExamApi(_auth, _ExamInfo, _paperInfo) {
    cy.log('search course by Code: ' + _ExamInfo.courseCode)
    cy.request({
        url: _auth._apiUrl + '/admin/api/course/filters',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            isASC: true,
            limit: 5,
            _offset: 1,
            searchFields: "name;code",
            searchText: _ExamInfo.courseCode,
            sortBy: "code",
            organization: []
        }
    }).then((res) => {
        expect(res.status).to.eq(200)
        let cid = res.body.result[0].id
        cy.log(' >>> Got course: ' + cid)
        _ExamInfo.courseId = cid
        newExamApi(_auth, _ExamInfo, _paperInfo)
    })
}

function newExamApi(_auth, _ExamInfo, _paperInfo) {
    let name = `${_ExamInfo.name}@${timeCodeInName()}`
    cy.log(`Creating Exam: ${name}`)
    let newExamApi = _auth._apiUrl + '/schedule/api/exam'

    let _examType = 0
    let enableFacialRecognition = true
    let enableVideoProctoring = true
    let screenRecording = true
    let enableChatBox = true
    if (_ExamInfo.isOpenB) {
        _examType = 1
        enableFacialRecognition = false
        enableVideoProctoring = false
        screenRecording = false
    }
    var exTimeJson = ''
    if (_ExamInfo.deadline) {
        if (_ExamInfo.previewTime) {
            exTimeJson = time2StartEndJSON(_ExamInfo.startOffset, _ExamInfo.duration, _ExamInfo.previewTime, _ExamInfo.deadline)
        }
        else {
            exTimeJson = time2StartEndJSON(_ExamInfo.startOffset, _ExamInfo.duration, 0, _ExamInfo.deadline)
        }
    }
    else {
        if (_ExamInfo.previewTime) {
            exTimeJson = time2StartEndJSON(_ExamInfo.startOffset, _ExamInfo.duration, _ExamInfo.previewTime)
        }
        else {
            exTimeJson = time2StartEndJSON(_ExamInfo.startOffset, _ExamInfo.duration, 0)
        }
    }
    let startTime = exTimeJson.startJson
    let endTime = exTimeJson.endJson

    let _ins = ""
    if (_ExamInfo.instruction) {
        _ins = _ExamInfo.instruction
    }
    let _candiCount = [stu1.name, stu2.name, stu3.name]
    if (_ExamInfo.studentCount) {
        _candiCount = _ExamInfo.studentCount
    }
    let examClassifi = 0
    if (_ExamInfo.examClassification) {
        examClassifi = _ExamInfo.examClassification
    }
    let examAttempts = 1
    if (_ExamInfo.examAttempts) {
        examAttempts = _ExamInfo.examAttempts
    }
    let detection = {}
    if (_ExamInfo.detectionSetting) {
        detection = _ExamInfo.detectionSetting
    }
    let _stuGroupName = ''
    if (_ExamInfo.stuGroupName) {
        _stuGroupName = _ExamInfo.stuGroupName
    }
    let stuChangeInviNumber = ''
    if (_ExamInfo.stuChangeInviNumber) {
        stuChangeInviNumber = _ExamInfo.stuChangeInviNumber
    }
    let keyCode = 0
    if (_ExamInfo.keyCode) {
        keyCode = _ExamInfo.keyCode
    }
    let enteringRestriction = 0
    if (_ExamInfo.enteringRestriction) {
        enteringRestriction = _ExamInfo.enteringRestriction
    }
    if (_ExamInfo.enableChatBox) {
        enableChatBox = _ExamInfo.enableChatBox
    }
    cy.request({
        url: newExamApi,
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            authorisedApplicationsSetting: "2",
            authorisedURLSetting: "2",
            courseId: _ExamInfo.courseId,
            duration: _ExamInfo.duration,
            enableVideoProctoring: enableVideoProctoring,
            enableFacialRecognition: enableFacialRecognition,
            screenRecording: screenRecording,
            startDate: startTime,
            endDate: endTime,
            examMode: 0,
            examType: _examType,
            examName: name,
            previewTime: _ExamInfo.previewTime,
            fileType: "DOC;DOCX;PPTX;PDF;XLS;XLSX;TXT",
            instruction: _ins,
            id: "00000000-0000-0000-0000-000000000000",
            maximumUploadSize: 50,
            examClassification: examClassifi,
            detectionSetting: detection,
            attempts: examAttempts,
            intervalKeyCode: keyCode,
            enteringRestriction: enteringRestriction,
            enableChatBox: enableChatBox
        }
    }).then((res) => {
        expect(res.status).to.eq(201)
        let exid = res.body.id
        cy.log(`>>> exam ${exid} created...`)
        saveStudent(_auth, exid, _candiCount, _stuGroupName)
        if (stuChangeInviNumber) {
            changeInvigilator(_auth, exid, stuChangeInviNumber)
        }
        saveInvigilator(_auth, exid)
        let paper = AssemblePaperBodyInfo(_paperInfo.name, _paperInfo.sections, _paperInfo.appendixFileContent)
        newPaperAndAssign(_auth, _ExamInfo.courseId, exid, paper)
        if (_ExamInfo.isSave2LocalFile) {
            _ExamInfo.name = name
            _ExamInfo.startTime = startTime
            _ExamInfo.endTime = endTime
            _ExamInfo.instruction = _ins
            _ExamInfo.examId = exid
            if (exTimeJson.readJson) {
                _ExamInfo.readTime = exTimeJson.readJson
            }
            if (exTimeJson.openJson) {
                _ExamInfo.openTime = exTimeJson.openJson
            }
            if (examClassifi === 1) {
                _ExamInfo.Classification = 'Flexible time range'
            }
            else {
                _ExamInfo.Classification = 'Fixed time range'
            }
            cy.appendfixtureData(_ExamInfo.filePath, { examInfo: _ExamInfo }, _ExamInfo.isAppend)
        }
    })
}

function saveStudent(_auth, _examId, _stuConts, _stuGroupName) {
    cy.log('getExamStudent of  ' + _examId)
    let addStuListId = []
    let removeStuListId = []
    let allStuListId = []
    cy.request({
        url: _auth._apiUrl + '/schedule/api/invigilator/invigllatorfilter',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            examId: _examId,
            filters: { studentClassName: [], studentGroupName: [], staffName: [] },
            sortBy: "userName",
            isSearchIgnoreCase: false,
            searchFields: "studentName",
            isASC: true,
            Offset: 1
        },
        form: false
    }).then((res) => {
        expect(res.status).to.eq(200)
        cy.log(`Result is ${res.body.result}`)
        for (let i = 0; i < _stuConts.length; i++) {
            for (let y = 0; y < res.body.result.length; y++) {
                if (_stuConts[i] === res.body.result[y].displayName) {
                    let stuId = res.body.result[y].id
                    addStuListId.push(stuId)
                }
            }
        }
        cy.log(`AddStuListId ${addStuListId}`)
        for (let y = 0; y < res.body.result.length; y++) {
            let stuId = res.body.result[y].id
            allStuListId.push(stuId)
        }
        cy.log(`AllStuListId ${allStuListId}`)
        for (let y = 0; y < addStuListId.length; y++) {
            allStuListId = allStuListId.filter(item => item != addStuListId[y])
        }
        removeStuListId = allStuListId
        cy.log(`ReomveStuListId ${removeStuListId}`)
        // cy.log('>>> assign all students id ' + addStuListId)
        removeStudent(_auth, _examId, addStuListId, removeStuListId, _stuGroupName)
    })
}
function removeStudent(_auth, _examId, _addStuListId, _removeStuListId, _stuGroupName) {
    cy.request({
        url: _auth._apiUrl + '/schedule/api/ExamStudent/removecandidates',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            examId: _examId,
            studentIds: _removeStuListId
        },
        form: false
    }).then((res) => {
        expect(res.status).to.eq(201)
        cy.log('>>> remove students success!')
        if (_stuGroupName) {
            createAssignGroup(_auth, _examId, _addStuListId, _stuGroupName)
        }
    })
}

function createAssignGroup(_auth, _examId, _addStuListId, _stuGroupName) {
    cy.log('>>> Create group: ' + _examId)
    let groupListId = []
    for (let i = 0; i < _addStuListId.length; i++) {
        cy.request({
            url: _auth._apiUrl + '/schedule/api/ExamStudent/addoreditgroup',
            method: 'POST',
            auth: { 'bearer': _auth._token },
            headers: {
                Cookie: "TenantId=" + _auth._tenId
            },
            body: {
                examId: _examId,
                groupName: _stuGroupName + i
            }
        }).then((res) => {
            expect(res.status).to.eq(201)
            groupListId.push(res.body.id)
            cy.log(`>>> Create group success: ${groupListId}`)
            assignGroup(_auth, _examId, _addStuListId, groupListId)
        })
    }
};
function assignGroup(_auth, _examId, _addStuListId, _groupListId) {
    cy.log('>>> Assign group: ' + _examId)
    // 学生分组，一组一个学生
    for (let i = 0; i < _groupListId.length; i++) {
        cy.request({
            url: _auth._apiUrl + '/schedule/api/ExamStudent/assigngroup',
            method: 'POST',
            auth: { 'bearer': _auth._token },
            headers: {
                Cookie: "TenantId=" + _auth._tenId
            },
            body: {
                examId: _examId,
                groupId: _groupListId[i],
                studentIds: [_addStuListId[i]]
            }
        }).then((res) => {
            expect(res.status).to.eq(201)
            cy.log(`>>> ${_addStuListId[i]} assign group(${_groupListId[i]}) success !!!`)
        })
    }
};
function changeInvigilator(_auth, _examId, _changeCandiCount) {
    // get invigilator1 id
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    let invigilator1_Id = env[cu_ten_string].Invigilator1.userid
    cy.request({
        url: _auth._apiUrl + '/admin/api/account/stafflistview',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            searchText: invigilator1_Id,
            SearchFields: "staffName;staffId;upn",
            filters: {
                status: [],
                tags: []
            },
            offset: 1,
            limit: 10,
            sortBy: "preSort;staffId;staffName",
            isASC: true
        },
        form: false
    }).then((res) => {
        cy.log(res.status)
        let _invigilatorlist = [res.body.value.result[0].id]
        cy.log(`>>> get invigilator1 id success! ${_invigilatorlist}`)
        getStudentId(_auth, _examId, _changeCandiCount, _invigilatorlist)
    })
};
function getStudentId(_auth, _examId, _changeCandiCount, _invigilatorlist) {
    let _stulist = []
    cy.request({
        url: `${_auth._apiUrl}/schedule/api/examstudent?id=${_examId}&serachText=`,
        method: 'GET',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        form: false
    }).then((res) => {
        cy.log(res.status)
        for (let index = 0; index < res.body.allCandidates.length; index++) {
            let stuId = res.body.allCandidates[index].id
            _stulist.push(stuId)
        }
        cy.log('>>> get student id success!' + _stulist)
        changeInviForStu(_auth, _examId, _changeCandiCount, _invigilatorlist, _stulist)
    })
};
function changeInviForStu(_auth, _examId, _changeCandiCount, _invigilatorlist, _stulist) {
    let stu = _stulist.splice(0, _changeCandiCount)
    cy.request({
        url: _auth._apiUrl + '/schedule/api/invigilator/assigninvigilator',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            examId: _examId,
            staffIds: _invigilatorlist,
            studentIds: stu
        },
        form: false
    }).then((res) => {
        cy.log(res.status)
        cy.log('>>> change invigilator success!')
    })
};
function saveInvigilator(_auth, _examId) {
    cy.log('getInvigilator of  ' + _examId)
    cy.request({
        url: _auth._apiUrl + '/schedule/api/invigilator/invigllatorstepsave',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            examId: _examId,
            enableResubmissionChecked: true
        },
        form: false
    }).then((res) => {
        expect(res.status).to.eq(200)
        cy.log('>>> get exam invigilator success!')
    })
};
function newPaperAndAssign(_auth, _cid, _examId, _paper) {
    let _name = `${_paper.pName}@${timeCodeInName()}`
    cy.log(` ===> Creating ${_name}`)
    cy.log(_examId, _paper.FullMarks, _paper.TotalMarks, _paper.AppendixFileContent)
    cy.request({
        url: _auth._apiUrl + '/authoring/api/papers',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            status: 2,
            referenceId: _cid,
            name: _name,
            fullMarks: _paper.FullMarks,
            totalMarks: _paper.TotalMarks,
            sections: _paper.Sections,
            appendixFileContent: _paper.AppendixFileContent
        }
    }).then((res) => {
        expect(res.status).to.eq(201)
        let pid = res.body.data
        cy.log('>>> Created paper: ' + pid)
        AssignPaperApi(_auth, _examId, pid)
    })
};
function AssignPaperApi(_auth, _examId, _pid) {
    cy.log('AssignPaperApi to exam: ' + _examId)
    cy.request({
        url: _auth._apiUrl + '/schedule/api/exampaper',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            id: _examId,
            isRemove: false,
            items: [
                { id: _pid }
            ]
        }
    }).then((res) => {
        expect(res.status).to.eq(201)
        PublishExamApi(_auth, _examId)
    })
}

function PublishExamApi(_auth, _examId) {
    cy.log(`Publish Exam ${_examId}`)
    cy.request({
        url: _auth._apiUrl + '/schedule/api/Exam/publishexam',
        method: 'PUT',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            ids: [_examId],
            timeFormat: "dd/MM/yyyy HH:mm"
        }
    }).then((res) => {
        expect(res.status).to.eq(201)
    })
}
function timeCodeInName() {
    return moment(new Date()).format('MMDDYYYY-HHmmss')
}
Cypress.Commands.add('ExamTimeCodeName', (_selector, _value) => {
    let name = `${_value}@${timeCodeInName()}`
    cy.get(_selector)
        .clear()
        .type(name, { force: true })

    Cypress.env('tempExamName', name)
    cy.log(Cypress.env('tempExamName'))
})

Cypress.Commands.add('StuEnterExamApi', (_student, _file, _flexible) => {
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    let user = env[cu_ten_string].Candidates[_student]
    let api_url = env[cu_ten_string].Apiurl
    let _examId = ''

    let path = `cypress/fixtures/${_file}`
    cy.readFile(path).then(($data) => {
        _examId = $data.examInfo.examId
        cy.log('ExamID:' + _examId)
    })
    cy.log('============================ get token of : ' + user.userid)
    cy.request({
        url: '/account/ApiLogin',
        method: 'POST',
        form: false,
        headers: {
            'SecurityHeader': 'I0gyMQnLwA'
        },
        body: {
            userName: user.userid,
            Password: defaultPassword,
            RegionHost: api_url,
            TenantId: env[cu_ten_string].System.tenantid,
        }
    }).then((res) => {
        expect(res.status).to.eq(200)
        let token = res.body.accessToken
        let Auth = {
            _token: token,
            _tenId: env[cu_ten_string].System.tenantid,
            _apiUrl: api_url
        }
        if (token != null) {
            cy.wait(800)
            // if (_flexible) {
            updateFlexible_StartTime(Auth, _examId)
            // }
            EnterExam(Auth, _examId)
        } else {
            cy.log('ERROR!!')
            cy.log(res.body)
        }
    })
})

function EnterExam(_auth, _examId) {
    cy.request({
        url: _auth._apiUrl + '/taking/api/examstudentresponseitems/getstudentresponseitems?examId=' + _examId,
        method: 'GET',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        form: false
    }).then((res) => {
        expect(res.status).to.eq(200)
        cy.log(res.body.message)
    })
}
function updateFlexible_StartTime(_auth, _examId) {
    cy.request({
        url: _auth._apiUrl + '/schedule/api/examstudent/changeexamstudentstarttime',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            examId: _examId
        },
        form: false
    }).then((res) => {
        expect(res.status).to.eq(200)
    })
}

Cypress.Commands.add('SubmitExamApi', (_student, _file) => {
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    let user = env[cu_ten_string].Candidates[_student]
    let api_url = env[cu_ten_string].Apiurl
    let _examId = ''

    let path = `cypress/fixtures/${_file}`
    cy.readFile(path).then(($data) => {
        _examId = $data.examInfo.examId
        cy.log('ExamID:' + _examId)
    })

    cy.log(`get token of ${user.userid}`)
    cy.request({
        url: '/account/ApiLogin',
        method: 'POST',
        form: false,
        headers: {
            'SecurityHeader': 'I0gyMQnLwA'
        },
        body: {
            userName: user.userid,
            Password: defaultPassword,
            RegionHost: api_url,
            TenantId: env[cu_ten_string].System.tenantid,
        }
    }).then((res) => {
        expect(res.status).to.eq(200)
        let token = res.body.accessToken
        let Auth = {
            _token: token,
            _tenId: env[cu_ten_string].System.tenantid,
            _apiUrl: api_url
        }
        if (token != null) {
            cy.wait(800)
            SubmitExam(Auth, _examId)
        } else {
            cy.log('ERROR!!')
            cy.log(res.body)
        }
    })
})

function SubmitExam(_auth, _examId) {
    cy.request({
        url: _auth._apiUrl + '/taking/api/examstudentresponseitems/savesubmitstudentresponseitems',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            ExamId: _examId,
            SaveStatus: 2,
            ResponseItems: []
        },
        form: false,
    }).then((res) => {
        expect(res.status).to.eq(200)
        cy.wait(500)
    })
}

Cypress.Commands.add("GetTimeValue", (realtime) => {
    let result
    let dateFormat
    let timeformat
    let Timesettings
    function getDateByFormat(format, date) {
        let array = format.split(/[yMdHhmst]/);
        let r = array.filter(function (s) {
            return s; // 注：IE9(不包含IE9)以下的版本没有trim()方法
        });
        let regExp = new RegExp(`[${Array.from(new Set(r)).join("")}]`)
        let dateArray = date.split(regExp);
        console.log("dateArray " + dateArray)
        let formatArray = format.split(regExp);
        console.log("formatArray " + formatArray)
        let d = new dateFormatter();
        for (let i = 0; i < formatArray.length; i++) {
            let f = formatArray[i];
            let v = dateArray[i];
            switch (f) {
                case "yy":
                    d.year = Number(String(new Date().getFullYear()).substr(0, 2) + v)
                    break;
                case "yyyy":
                    d.year = Number(v)
                    break;
                case "M":
                case "MM":
                    d.month = Number(v)
                    break;
                case "MMM":
                    d.month = getMonthByStr(v)
                    break;
                case "d":
                case "dd":
                    d.day = Number(v)
                    break;
                case "m":
                case "mm":
                    d.minute = Number(v)
                    break;
                case "s":
                case "ss":
                    d.second = Number(v)
                    break;
                case "h":
                case "hh":
                    d.hour = Number(v)
                    break;
                case "H":
                case "HH":
                    d.hour = Number(v) % 12
                    d.isAfternoon = Number(v) >= 12
                    break;
                case "t":
                    if (v == "A") {
                        d.isAfternoon = false;
                    }
                    else if (v == "P") {
                        d.isAfternoon = true;
                    }
                    break;
                case "tt":
                    if (v == "AM") {
                        d.isAfternoon = false;
                    }
                    else if (v == "PM") {
                        d.isAfternoon = true;
                    }
                    break;
                default:
                    console.error(`error date format: ${f}`)
                    throw new Error(`error date format: ${f}`)
            }
        }
        console.log("d " + d.year + " " + d.month + " " + d.day + " " + d.isAfternoon + " " + d.hour + " " + d.minute + " " + d.second + "" + d.milliseconds)
        console.log("d.getDate() " + d.getDate())
        return d.getDate();

    }
    function getMonthByStr(str) {
        switch (str) {
            case "Jan":
                return 1;
            case "Feb":
                return 2;
            case "Mar":
                return 3;
            case "Apr":
                return 4;
            case "May":
                return 5;
            case "Jun":
                return 6;
            case "Jul":
                return 7;
            case "Aug":
                return 8;
            case "Sep":
                return 9;
            case "Oct":
                return 10;
            case "Nov":
                return 11;
            case "Dec":
                return 12;
            default:
                console.error(`error month format: ${str}`)
                throw new Error(`error month format: ${str}`)
        }
    }
    let dateFormatter = function () {
        let self = this;
        this.year = new Date().getFullYear();
        this.month = new Date().getMonth() + 1;
        this.day = new Date().getDate();
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.milliseconds = 0;
        this.isAfternoon = false;
        this.getDate = function () {
            return new Date(`${self.year}-${self.month}-${self.day} ${self.isAfternoon && self.hour != 12 ? self.hour + 12 : self.hour}:${self.minute}:${self.second}:${self.milliseconds}`)
        }
    }
    function getDateValue(Timesettings, realtime) {
        let result = getDateByFormat(Timesettings, realtime)
        return result
        debugger
    }
    cy.window().then(win => {
        dateFormat = win.DefaultDateTimeFormat.Date
        timeformat = win.DefaultDateTimeFormat.Time
        Timesettings = dateFormat + " " + timeformat
        result = getDateValue(Timesettings, realtime)
        // console.log("result "+result)
        return result
    })
})
Cypress.Commands.add("StringSortCheck", (arr) => {
    var str0 = []
    var str2 = []
    cy.get(arr).then((res) => {
        for (var i = 0; i < res.length; i++) {
            str0[i] = res.eq(i).text().toLowerCase();
        }
        const str1 = str0
        console.log('name1 is' + str1)
        cy.get(arr).then((res) => {
            for (var i = 0; i < res.length; i++) {
                str2[i] = res.eq(i).text().toLowerCase();
            }
            const str3 = str2
            console.log('name1 is' + str3)
            str3.sort();
            expect(str1.toString()).to.be.equal(str3.toString())
            console.log('name2 is' + str3);
        })
    })

})
Cypress.Commands.add("TimeSortCheck", (arr) => {
    var str1 = []
    var str2 = []
    cy.get(arr).then((res) => {
        for (var i = 0; i < res.length; i++) {
            str1[i] = res.eq(i).text();
        }
        const str3 = str1
        cy.get(arr).then((res0) => {
            for (var i = 0; i < res0.length; i++) {
                str2[i] = res0.eq(i).text();
            }
            var str4 = str2.sort(function (a, b) {
                cy.GetTimeValue(a).then((a) => {
                    cy.GetTimeValue(b).then((b) => {
                        return a > b ? -1 : 1
                    })
                })
            })
            expect(str3.toString()).to.be.equal(str4.toString())
            console.log('name2 is' + str4);
        })
    })
})

Cypress.Commands.add('UnpublishByApi', (_examId) => {
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    cy.log(cu_env_string, cu_ten_string)
    let user = env[cu_ten_string].System
    let api_url = env[cu_ten_string].Apiurl
    let password = defaultPassword
    if (user.userid === 'EduTechQA@avepointedutech.onmicrosoft.com' || user.userid === 'AUems@snapmail.cc' || user.userid === 'mos365tenant@v4b3s.onmicrosoft.com') {
        password = modifiedPassword
    }

    cy.log(`get token of ${user.userid}`)
    cy.request({
        url: '/account/ApiLogin',
        method: 'POST',
        form: false,
        headers: {
            'SecurityHeader': 'I0gyMQnLwA'
        },
        body: {
            userName: user.userid,
            Password: password,
            RegionHost: api_url,
            TenantId: user.tenantid
        }
    }).then((res) => {
        let token = res.body.accessToken
        let Auth = {
            _token: token,
            _tenId: env[cu_ten_string].System.tenantid,
            _apiUrl: api_url
        }
        if (token != null) {
            cy.wait(800)
            Unpublish(Auth, _examId,)
        } else {
            cy.log('ERROR!!')
            cy.log(res.body)
        }
    })
})
function Unpublish(_auth, _examId) {
    cy.request({
        url: _auth._apiUrl + '/schedule/api/exam/unpublishexam',
        method: 'PUT',
        form: false,
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            Ids: [_examId],
            timeFormat: "d/M/yyyy HH:mm"
        }
    }).then((res) => {
        expect(res.status).to.eq(201)
    })
}
Cypress.Commands.add('DeleteQuesByAPI', (_Qcontent) => {
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    let api_url = env[cu_ten_string].Apiurl
    cy.getCookies()
        .then((cookie) => {
            console.log(cookie)
            let _auth = {
                _cookies: cookie,
                _tenId: env[cu_ten_string].System.tenantid,
                _apiUrl: api_url
            }
            cy.request({
                url: _auth._apiUrl + '/authoring/api/questions/listview',
                method: 'POST',
                headers: {
                    Cookie: _auth._cookies,
                    // 'Content-Type': 'application/json'
                },
                body:
                {
                    "searchText": _Qcontent,
                    "SearchFields": "content",
                    "filters":
                    {
                        "courseCode": [],
                        "questionType": [],
                        "topics": []
                    },
                    "offset": 1,
                    "limit": 100,
                    "sortBy": "modifiedTime",
                    "isASC": false
                },
                form: false,
            }).then((res) => {
                expect(res.status).to.eq(200)
                let qids = []
                let result = res.body.data.value.result
                for (var i = 0; i < result.length; i++) {
                    qids.push(result[i].id)
                }
                cy.request({
                    url: _auth._apiUrl + '/authoring/api/questions',
                    method: 'DELETE',
                    headers: {
                        Cookie: _auth._cookies,
                        // 'Content-Type': 'application/json'
                    },
                    body: {
                        ids: qids,
                    },
                    form: false,
                }).then((res) => {
                    expect(res.status).to.eq(200)
                })
            })

        })
})
Cypress.Commands.add('DeletePaperByAPI', (_Pname) => {
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    let api_url = env[cu_ten_string].Apiurl
    cy.getCookies()
        .then((cookie) => {
            console.log(cookie)
            let _auth = {
                _cookies: cookie,
                _tenId: env[cu_ten_string].System.tenantid,
                _apiUrl: api_url
            }
            cy.request({
                url: _auth._apiUrl + '/authoring/api/papers/bank',
                method: 'POST',
                headers: {
                    Cookie: _auth._cookies,
                    // 'Content-Type': 'application/json'
                },
                body:
                {
                    "searchText": _Pname,
                    "SearchFields": "name",
                    "filters":
                    {
                        "courseCode": []
                    },
                    "offset": 1,
                    "limit": 100,
                    "sortBy": "examName",
                    "isASC": false
                },
                form: false,
            }).then((res) => {
                expect(res.status).to.eq(200)
                let pids = []
                let result = res.body.data.value.result
                for (var i = 0; i < result.length; i++) {
                    pids.push(result[i].id)
                }
                cy.request({
                    url: _auth._apiUrl + '/authoring/api/papers',
                    method: 'DELETE',
                    headers: {
                        Cookie: _auth._cookies,
                        // 'Content-Type': 'application/json'
                    },
                    body: {
                        ids: pids,
                    },
                    form: false,
                }).then((res) => {
                    expect(res.status).to.eq(200)
                })
            })

        })
})
Cypress.Commands.add('DeleteSamplePaperByAPI', (_Pname) => {
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    let api_url = env[cu_ten_string].Apiurl
    cy.getCookies()
        .then((cookie) => {
            console.log(cookie)
            let _auth = {
                _cookies: cookie,
                _tenId: env[cu_ten_string].System.tenantid,
                _apiUrl: api_url
            }
            cy.request({
                url: _auth._apiUrl + '/authoring/api/papers/samplebank',
                method: 'POST',
                headers: {
                    Cookie: _auth._cookies,
                    // 'Content-Type': 'application/json'
                },
                body:
                {
                    "searchText": _Pname,
                    "SearchFields": "name",
                    "filters":
                    {
                        "courseCode": []
                    },
                    "offset": 1,
                    "limit": 100,
                    "sortBy": "examName",
                    "isASC": false
                },
                form: false,
            }).then((res) => {
                expect(res.status).to.eq(200)
                let pids = []
                let result = res.body.data.value.result
                for (var i = 0; i < result.length; i++) {
                    pids.push(result[i].id)
                }
                cy.request({
                    url: _auth._apiUrl + '/authoring/api/papers/deletesamplepaper',
                    method: 'DELETE',
                    headers: {
                        Cookie: _auth._cookies,
                        // 'Content-Type': 'application/json'
                    },
                    body: {
                        ids: pids,
                    },
                    form: false,
                }).then((res) => {
                    expect(res.status).to.eq(200)
                })
            })

        })
})
Cypress.Commands.add('DeleteSkeletonByAPI', (_SkeletonName) => {
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    let api_url = env[cu_ten_string].Apiurl
    cy.getCookies()
        .then((cookie) => {
            console.log(cookie)
            let _auth = {
                _cookies: cookie,
                _tenId: env[cu_ten_string].System.tenantid,
                _apiUrl: api_url
            }
            cy.request({
                url: _auth._apiUrl + '/authoring/api/Skeleton/bank',
                method: 'POST',
                headers: {
                    Cookie: _auth._cookies,
                    // 'Content-Type': 'application/json'
                },
                body:
                {
                    "searchText": _SkeletonName,
                    "SearchFields": "name",
                    "filters": {
                        "mode": [
                            {
                                "name": "Advanced mode",
                                "checked": true,
                                "intValue": 0,
                                "enumIntValue": 0
                            },
                            {
                                "name": "Quick mode",
                                "checked": true,
                                "intValue": 0,
                                "enumIntValue": 1
                            }]
                    },
                    "offset": 1,
                    "limit": 10,
                    "sortBy": "modifiedTime",
                    "isASC": false
                },
                form: false,
            }).then((res) => {
                expect(res.status).to.eq(200)
                let pids = []
                let result = res.body.data.value.result
                for (var i = 0; i < result.length; i++) {
                    pids.push(result[i].id)
                }
                cy.request({
                    url: _auth._apiUrl + '/authoring/api/Skeleton',
                    method: 'DELETE',
                    headers: {
                        Cookie: _auth._cookies,
                        // 'Content-Type': 'application/json'
                    },
                    body: {
                        ids: pids,
                    },
                    form: false,
                }).then((res) => {
                    expect(res.status).to.eq(200)
                })
            })
        })
})
Cypress.Commands.add('PublishExamResult', (_ExamName, _Status, _CandidateList) => {
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    let api_url = env[cu_ten_string].Apiurl
    let studentids = []
    let IsCandidateOfAll = true
    let examId
    cy.getCookies()
        .then((cookie) => {
            console.log(cookie)
            let _auth = {
                _cookies: cookie,
                _tenId: env[cu_ten_string].System.tenantid,
                _apiUrl: api_url
            }
            cy.request({
                url: _auth._apiUrl + '/schedule/api/exam/getallexamsbycurrentuser',
                method: 'POST',
                headers: {
                    Cookie: _auth._cookies,
                    // 'Content-Type': 'application/json'
                },
                body:
                {
                    "searchText": _ExamName,
                    "searchFields": "ExamName",
                    "offset": 1,
                    "limit": 100,
                    "sortBy": "ExamStartDateOffset",
                    "isASC": false,
                    "filters": { courseFilter: [], examPublishStatusDisplay: [], examTypeDisplay: [], examClassificationDisplay: [] }
                },
                form: false,
            }).then((res) => {
                expect(res.status).to.eq(200)
                let result = res.body.result
                examId = result[0].examId
                if (_CandidateList.length) {
                    cy.request({
                        url: _auth._apiUrl + '/marking/api/markinggrading/getcandidates',
                        method: 'POST',
                        headers: {
                            Cookie: _auth._cookies,
                            // 'Content-Type': 'application/json'
                        },
                        body:
                        {
                            "examId": examId,
                            "searchText": "",
                            "searchFields": "candidateName;candidateId;userId",
                            "offset": 1,
                            "limit": 100,
                            "sortBy": "preSort;candidateId;candidateName",
                            "isASC": true,
                            "filters": {
                                // "groupName":[
                                //     {"name":"EditGroup1",
                                //     "checked":true,
                                //     "intValue":0,
                                //     "enumIntValue":null},
                                //     {"name":"Group2",
                                //     "checked":true,
                                //     "intValue":0,
                                //     "enumIntValue":null}
                                // ]
                            }
                        },
                        form: false,
                    }).then((res) => {
                        expect(res.status).to.eq(200)
                        let result = res.body.value.result
                        for (var i = 0; i < _CandidateList.length; i++) {
                            for (let j = 0; j < result.length; j++) {
                                if (result[j].userId == _CandidateList[i])
                                    studentids.push(result[j].id)
                            }

                        }
                    })
                    IsCandidateOfAll = false
                }
                cy.request({
                    url: _auth._apiUrl + '/marking/api/markinggrading/publishExamScore',
                    method: 'POST',
                    headers: {
                        Cookie: _auth._cookies,
                        // 'Content-Type': 'application/json'
                    },
                    body: {
                        "examId": examId,
                        "examPublishStatus": _Status,
                        "studentIds": studentids,
                        "IsCandidateOfAll": IsCandidateOfAll
                    },
                    form: false,
                }).then((res) => {
                    expect(res.status).to.eq(201)
                    expect(res.body.isSuccess).to.eq(true)
                })
            })
        })
})

// Cypress.Commands.add('ScanUser', (_path) => {
//     let cu_env_string = Cypress.env('current_Env')
//     let cu_ten_string = Cypress.env('current_ten')
//     let env = Cypress.env(cu_env_string)
//     let user = env[cu_ten_string].System
//     let api_url = env[cu_ten_string].Apiurl
// let password = defaultPassword
// if (user.userid === 'EduTechQA@avepointedutech.onmicrosoft.com' || user.userid === 'AUems@snapmail.cc'|| user.userid === 'mos365tenant@v4b3s.onmicrosoft.com') {
//     password = modifiedPassword
// }
//     cy.log('============================ get token of : ' + user.userid)

//     cy.request({
//         url: '/account/ApiLogin',
//         method: 'POST',
//         form: false,
//         headers: {
//             'SecurityHeader': 'I0gyMQnLwA'
//         },
//         body: {
//             userName: user.userid,
//             Password: password,
//             RegionHost: api_url,
//             TenantId: env[cu_ten_string].System.tenantid
//         }
//     }).then((res) => {
//         expect(res.status).to.eq(200)
//         let _auth = {
//             _token: res.body.accessToken,
//             _tenId: env[cu_ten_string].System.tenantid,
//             _apiUrl: api_url
//         }
//         EnterExam(_auth)
//     })
// })

// function EnterExam(_auth) {
//     cy.request({
//         url: 'https://dev.sa.rp.aveqa.online/account/api/user/syncuser',
//         method: 'GET',
//         auth: { 'bearer': _auth._token },
//         headers: {
//             Cookie: "TenantId=" + _auth._tenId
//         },
//         form: false
//     }).then((res) => {
//     })
// }

Cypress.Commands.add("compareObjet", (a, b, _bool) => {
    var compareObj = {
        compare: function (oldData, newData) {
            if (oldData === newData) return true;
            if (
                compareObj.isObject(oldData) &&
                compareObj.isObject(newData) &&
                Object.keys(oldData).length === Object.keys(newData).length
            ) {
                for (const key in oldData) {
                    if (oldData.hasOwnProperty(key)) {
                        if (!compareObj.compare(oldData[key], newData[key])) {
                            return false;
                        }
                    }
                }
            }
            else if (
                compareObj.isArray(oldData) &&
                compareObj.isArray(oldData) &&
                oldData.length === newData.length
            ) {
                for (let i = 0, length = oldData.length; i < length; i++) {
                    if (!compareObj.compare(oldData[i], newData[i])) {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
            return true;
        },
        isObject: function (obj) {
            return Object.prototype.toString.call(obj) === "[object Object]";
        },
        isArray: function (arr) {
            return Object.prototype.toString.call(arr) === "[object Array]";
        },
    };
    expect(compareObj.compare(a, b)).to.be.eq(_bool)
});

Cypress.Commands.add('UpadateCourseByApi', (_CourseInfo) => {
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    cy.log(cu_env_string, cu_ten_string)
    let user = env[cu_ten_string].System
    let api_url = env[cu_ten_string].Apiurl
    let password = defaultPassword
    if (user.userid === 'EduTechQA@avepointedutech.onmicrosoft.com' || user.userid === 'AUems@snapmail.cc' || user.userid === 'mos365tenant@v4b3s.onmicrosoft.com') {
        password = modifiedPassword
    }

    cy.log(`get token of ${user.userid}`)
    cy.request({
        url: '/account/ApiLogin',
        method: 'POST',
        form: false,
        headers: {
            'SecurityHeader': 'I0gyMQnLwA'
        },
        body: {
            userName: user.userid,
            Password: password,
            RegionHost: api_url,
            TenantId: user.tenantid
        }
    }).then((res) => {
        expect(res.status).to.eq(200)
        let token = res.body.accessToken
        let Auth = {
            _token: token,
            _tenId: env[cu_ten_string].System.tenantid,
            _apiUrl: api_url
        }
        if (token != null) {
            cy.wait(800)
            GetCourseIdApi(Auth, _CourseInfo)
        } else {
            cy.log('ERROR!!')
            cy.log(res.body)
        }
    })
});

function GetCourseIdApi(_auth, _CourseInfo) {
    cy.log('search course by Code: ' + _CourseInfo.courseCode)
    cy.request({
        url: _auth._apiUrl + '/admin/api/course/filters',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            isASC: true,
            limit: 5,
            _offset: 1,
            searchFields: "name;code",
            searchText: _CourseInfo.courseCode,
            sortBy: "code",
            organization: []
        }
    }).then((res) => {
        expect(res.status).to.eq(200)
        _CourseInfo.courseId = res.body.result[0].id
        cy.log(' >>> Get courseId: ' + _CourseInfo.courseId)
        if (_CourseInfo.className) {
            CreateClass_step1(_auth, _CourseInfo)
        }
    })
};
function CreateClass_step1(_auth, _CourseInfo) {
    cy.log(`>>> Start get staff id success!`)
    cy.request({
        url: _auth._apiUrl + '/admin/api/account/stafflistview',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            searchText: _CourseInfo.staffName,
            SearchFields: "staffName;staffId;upn",
            filters: {
                status: [],
                tags: []
            },
            offset: 1,
            limit: 10,
            sortBy: "preSort;staffId;staffName",
            isASC: true
        },
        form: false
    }).then((res) => {
        cy.log(res.status)
        _CourseInfo.staffId = res.body.value.result[0].id
        cy.log(`>>> get staff id success! ${_CourseInfo.staffId}`)
        cy.log(_CourseInfo)
        CreateClass_step2(_auth, _CourseInfo)
    })
};
function CreateClass_step2(_auth, _CourseInfo) {
    cy.log(`>>> Start create class name is ${_CourseInfo.className}!`)
    cy.request({
        url: _auth._apiUrl + '/admin/api/course/updatecourseclass',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            classOwnerIds: [_CourseInfo.staffId],
            courseId: _CourseInfo.courseId,
            name: _CourseInfo.className
        },
        form: false
    }).then((res) => {
        cy.log(res.status)
        _CourseInfo.classId = res.body
        cy.log(`>>> Create class id is ${_CourseInfo.classId} success!`)
        if (_CourseInfo.addCandidate) {
            addCourseCandidate_step1(_auth, _CourseInfo)
        }
    })
};
function addCourseCandidate_step1(_auth, _CourseInfo) {
    _CourseInfo.candidateIdList = []
    for (let i = 0; i < _CourseInfo.addCandidate.length; i++) {
        cy.request({
            url: _auth._apiUrl + '/admin/api/account/studentlistview',
            method: 'POST',
            auth: { 'bearer': _auth._token },
            headers: {
                Cookie: "TenantId=" + _auth._tenId
            },
            body: {
                searchText: _CourseInfo.addCandidate[i],
                SearchFields: "studentName;studentId;upn",
                filters: {
                    status: [],
                    tags: []
                },
                offset: 1,
                limit: 10,
                sortBy: "preSort;studentId;studentName",
                isASC: true
            },
            form: false
        }).then((res) => {
            cy.log(res.status)
            let candidateId = res.body.value.result[0].id
            _CourseInfo.candidateIdList.push(candidateId)
        })
    }
    addCourseCandidate_step2(_auth, _CourseInfo)
};
function addCourseCandidate_step2(_auth, _CourseInfo) {
    cy.log(_CourseInfo.candidateIdList,)
    cy.log(_CourseInfo.classId)
    cy.log(_CourseInfo.courseId)
    cy.request({
        url: _auth._apiUrl + '/admin/api/course/addclasscandidates',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            candidateIds: _CourseInfo.candidateIdList,
            classId: _CourseInfo.classId,
            courseId: _CourseInfo.courseId
        },
        form: false
    }).then((res) => {
        cy.log(res.status)
    })
}

Cypress.Commands.add('API_Login', () => {
    let cu_env_string = Cypress.env('current_Env')
    let cu_ten_string = Cypress.env('current_ten')
    let env = Cypress.env(cu_env_string)
    cy.log(cu_env_string, cu_ten_string)
    let user = env[cu_ten_string].System
    let api_url = env[cu_ten_string].Apiurl
    let password = defaultPassword
    if (user.userid === 'EduTechQA@avepointedutech.onmicrosoft.com' || user.userid === 'AUems@snapmail.cc' || user.userid === 'mos365tenant@v4b3s.onmicrosoft.com') {
        password = modifiedPassword
    }

    cy.log(`get token of ${user.userid}`)
    return cy.request({
        url: '/account/ApiLogin',
        method: 'POST',
        form: false,
        headers: {
            'SecurityHeader': 'I0gyMQnLwA',
            'Cookie': "TenantId=" + user.tenantid
        },
        body: {
            userName: user.userid,
            Password: password,
            RegionHost: api_url,
            TenantId: user.tenantid
        }
    })
})
Cypress.Commands.add('API_DeleteCourseCandidate', (_auth, _courseInfo) => {
    return cy.request({
        url: _auth._apiUrl + `/admin/api/course/${_courseInfo.courseId}/candidates/delete`,
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: _courseInfo.candidateIdList,
        form: false
    })
});
Cypress.Commands.add('API_GetCourseId', (_auth, _courseCode) => {
    return cy.request({
        url: _auth._apiUrl + '/admin/api/course/filters',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            isASC: true,
            limit: 5,
            _offset: 1,
            searchFields: "name;code",
            searchText: _courseCode,
            sortBy: "code",
            organization: []
        }
    })
});
Cypress.Commands.add('API_GetCandidateId', (_auth, _candidate) => {
    cy.log('API_GetCandidateId ===>>> ' + _candidate)
    return cy.request({
        url: _auth._apiUrl + '/admin/api/account/studentlistview',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            searchText: _candidate,
            SearchFields: "studentName;studentId;upn",
            filters: {
                status: [],
                tags: []
            },
            offset: 1,
            limit: 10,
            sortBy: "preSort;studentId;studentName",
            isASC: true
        },
        form: false
    })
});
Cypress.Commands.add('API_GetStaffId', (_auth, _staff) => {
    return cy.request({
        url: _auth._apiUrl + '/admin/api/account/stafflistview',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            searchText: _staff,
            SearchFields: "staffName;staffId;upn",
            filters: {
                status: [],
                tags: []
            },
            offset: 1,
            limit: 10,
            sortBy: "preSort;staffId;staffName",
            isASC: true
        },
        form: false
    })
});
Cypress.Commands.add('API_UpdateCourseClass', (_auth, _courseInfo) => {
    return cy.request({
        url: _auth._apiUrl + '/admin/api/course/updatecourseclass',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            classOwnerIds: _courseInfo.staffIdList,
            courseId: _courseInfo.courseId,
            name: _courseInfo.className
        },
        form: false
    })
});
Cypress.Commands.add('API_AddCourseCandidate', (_auth, _courseInfo) => {
    cy.log('candidateList ===>>> ' + _courseInfo.candidateIdList)
    cy.log('classId ===>>> ' + _courseInfo.classId)
    cy.log('Course Id ===>>> ' + _courseInfo.courseId)
    return cy.request({
        url: _auth._apiUrl + '/admin/api/course/addclasscandidates',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            candidateIds: _courseInfo.candidateIdList,
            classId: _courseInfo.classId,
            courseId: _courseInfo.courseId
        },
        form: false
    })
});
Cypress.Commands.add('API_DeleteCourseClass', (_auth, _classId, _courseId) => {
    cy.log('classId ===>>> ' + _classId)
    return cy.request({
        url: _auth._apiUrl + '/admin/api/course/deletecourseclass',
        method: 'POST',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        body: {
            classIds: [_classId],
            courseId: _courseId
        },
        form: false
    })
});
Cypress.Commands.add('API_GetCourseClass', (_auth, _courseId) => {
    cy.log('courseId ===>>> ' + _courseId)
    return cy.request({
        url: _auth._apiUrl + `/admin/api/course/courseclass?courseId=${_courseId}`,
        method: 'GET',
        auth: { 'bearer': _auth._token },
        headers: {
            Cookie: "TenantId=" + _auth._tenId
        },
        form: false
    })
});







Cypress.Commands.add('UpdateCourseCandidate_API', (_courseInfo) => {
    // need courseCode， className， classOwner(list)
    cy.API_Login().then((res_auth) => {
        let token = res_auth.body.accessToken
        let auth = {
            _token: token,
            _tenId: env[cu_ten_string].System.tenantid,
            _apiUrl: api_url
        }
        cy.API_GetCourseId(auth, _courseInfo.courseCode).then((res_coursecode) => {
            cy.log('Course code ===>>> ' + res_coursecode.body.result[0].id)
            _courseInfo.courseId = res_coursecode.body.result[0].id
            if (_courseInfo.className) {
                let staffIdList = []
                for (let i = 0; i < _courseInfo.classOwner.length; i++) {
                    cy.API_GetStaffId(auth, _courseInfo.classOwner[i]).then((res_staffId) => {
                        let staffId = res_staffId.body.value.result[0].id
                        cy.log('staffId ===>>> ' + staffId)
                        staffIdList.push(staffId)
                    })
                }
                _courseInfo.staffIdList = staffIdList
                cy.API_UpdateCourseClass(auth, _courseInfo).then((res_classId) => {
                    _courseInfo.classId = res_classId.body
                    cy.log('classId ===>>> ' + _courseInfo.classId)
                })
            }
            let candidateIdList = []
            for (let i = 0; i < _courseInfo.candidateList.length; i++) {
                cy.API_GetCandidateId(auth, _courseInfo.candidateList[i]).then((res_candidateId) => {
                    let candidateId = res_candidateId.body.value.result[0].id
                    cy.log('candidateId ===>>> ' + candidateId)
                    candidateIdList.push(candidateId)
                })
            }
            _courseInfo.candidateIdList = candidateIdList
            cy.API_AddCourseCandidate(auth, _courseInfo)
        })
    })
});
Cypress.Commands.add('DeleteCourseCandidate_ByApi', (_courseInfo) => {
    // need courseCode, candidateList
    cy.API_Login().then((res_auth) => {
        let token = res_auth.body.accessToken
        let auth = {
            _token: token,
            _tenId: env[cu_ten_string].System.tenantid,
            _apiUrl: api_url
        }
        cy.API_GetCourseId(auth, _courseInfo.courseCode).then((res_coursecode) => {
            cy.log('Course code ===>>> ' + res_coursecode.body.result[0].id)
            _courseInfo.courseId = res_coursecode.body.result[0].id
            let candidateIdList = []
            for (let i = 0; i < _courseInfo.candidateList.length; i++) {
                cy.API_GetCandidateId(auth, _courseInfo.candidateList[i]).then((res_candidateId) => {
                    let candidateId = res_candidateId.body.value.result[0].id
                    cy.log('candidateId ===>>> ' + candidateId)
                    candidateIdList.push(candidateId)
                })
            }
            _courseInfo.candidateIdList = candidateIdList
            cy.API_DeleteCourseCandidate(auth, _courseInfo)
        })
    })
});
Cypress.Commands.add('DeleteCourseClass_ByApi', (_courseCode) => {
    // need courseCode, candidateList
    cy.API_Login().then((res_auth) => {
        let token = res_auth.body.accessToken
        let auth = {
            _token: token,
            _tenId: env[cu_ten_string].System.tenantid,
            _apiUrl: api_url
        }
        cy.API_GetCourseId(auth, _courseCode).then((res_courseId) => {
            cy.log('course Id ===>>> ' + res_courseId.body.result[0].id)
            let courseId = res_courseId.body.result[0].id
            cy.API_GetCourseClass(auth, courseId).then((res_classId) => {
                let classObject = []
                classObject = res_classId.body.classes
                cy.log('classObject ===>>> ' + classObject)
                for (let i = 0; i < classObject.length; i++) {
                    let classId = classObject[i].classId
                    cy.API_DeleteCourseClass(auth, classId, courseId)
                }
            })

        })
    })
});
Cypress.Commands.add('CreateAnnouncement_ByApi', (announName, announContent, courseIds) => {
    cy.API_Login().then((res_auth) => {
        let token = res_auth.body.accessToken
        let auth = {
            token: token,
            tenId: env[cu_ten_string].System.tenantid,
            apiUrl: api_url
        }
        return cy.request({
            url: auth.apiUrl + '/admin/api/announcement',
            method: 'POST',
            auth: { 'bearer': auth.token },
            headers: {
                Cookie: "TenantId=" + auth.tenId
            },
            body: {
                "name": announName,
                "details": announContent,
                "publishTo": 2, // TODO : publish to candidates
                "action": 0,
                "configSpecific": 0,
                "courseIds": courseIds,
                "timezoneOffset": -420
            }
        }).should('have.property', 'status', 200)
    })
    cy.log('Announcement created successfully with name' + announName)
})

Cypress.Commands.add('GetAnnouncement_ByApi', (announName) => {
    cy.API_Login().then((res_auth) => {
        let token = res_auth.body.accessToken
        let auth = {
            token: token,
            tenId: env[cu_ten_string].System.tenantid,
            apiUrl: api_url
        }
        return cy.request({
            url: auth.apiUrl + '/admin/api/announcement/filters',
            method: 'POST',
            auth: { 'bearer': auth.token },
            headers: {
                Cookie: "TenantId=" + auth.tenId
            },
            body: {
                "searchText": announName,
                "searchFields": "Name",
                "filters": {
                    "statusStr": [
                        {
                            "name": "Draft",
                            "checked": true,
                            "intValue": 0,
                            "enumIntValue": null
                        },
                        {
                            "name": "Published",
                            "checked": true,
                            "intValue": 0,
                            "enumIntValue": null
                        }
                    ],
                    "announcementSendToStr": [
                        {
                            "name": "Candidates",
                            "checked": true,
                            "intValue": 0,
                            "enumIntValue": null
                        },
                        {
                            "name": "Staff",
                            "checked": true,
                            "intValue": 0,
                            "enumIntValue": null
                        },
                        {
                            "name": "Staff and candidates",
                            "checked": true,
                            "intValue": 0,
                            "enumIntValue": null
                        }
                    ],
                    "hasCourse": [
                        {
                            "name": "No",
                            "checked": true,
                            "intValue": 0,
                            "enumIntValue": null
                        }
                    ]
                },
                "offset": 1,
                "limit": 10,
                "isAsc": false,
                "sortBy": "modifiedTime",
                "timezoneOffset": -420
            }
        })
    })
})
Cypress.Commands.add('GetAnnouncementByID_ByApi', (announId) => {
    cy.API_Login().then((res_auth) => {
        let token = res_auth.body.accessToken
        let auth = {
            token: token,
            tenId: env[cu_ten_string].System.tenantid,
            apiUrl: api_url
        }
        return cy.request({
            url: auth.apiUrl + '/admin/api/announcement/' + announId,
            method: 'GET',
            auth: { 'bearer': auth.token },
            headers: {
                Cookie: "TenantId=" + auth.tenId
            }
        })
    })
})

Cypress.Commands.add('DeleteAnnouncement_ByApi', (announId) => {
    cy.API_Login().then((res_auth) => {
        let token = res_auth.body.accessToken
        let auth = {
            token: token,
            tenId: env[cu_ten_string].System.tenantid,
            apiUrl: api_url
        }
        cy.GetAnnouncementByID_ByApi(announId)
            .then((res_auth) => {
                var status = ''
                status = res_auth.body.statusEnum
                if (status === 0) {
                    cy.UnpublishAnnouncement_ByApi(announId)
                }
            })
        return cy.request({
            url: auth.apiUrl + '/admin/api/announcement',
            method: 'DELETE',
            auth: { 'bearer': auth.token },
            headers: {
                Cookie: "TenantId=" + auth.tenId
            },
            body: {
                "ids": [announId],
                "timezoneOffset": -420
            }
        }).should('have.property', 'status', 200)
    })
    cy.log('delete ' + announId + ' successfully----------------------------------------------------------------')
})
Cypress.Commands.add('UnpublishAnnouncement_ByApi', (announId) => {
    cy.API_Login().then((res_auth) => {
        let token = res_auth.body.accessToken
        let auth = {
            token: token,
            tenId: env[cu_ten_string].System.tenantid,
            apiUrl: api_url
        }
        cy.request({
            url: auth.apiUrl + '/admin/api/announcement/unpublish',
            method: 'POST',
            auth: { 'bearer': auth.token },
            headers: {
                Cookie: "TenantId=" + auth.tenId
            },
            body: {
                "ids": [announId],
                "timezoneOffset": -420
            }
        }).should('have.property', 'status', 200)
        cy.log('unpublish ' + announId + ' successfully----------------------------------------------------------------')
    })
})

Cypress.Commands.add('CreatePaper_byAPI', (courseCode, paperName, section) => {

    cy.API_Login().then((res_auth) => {
        let token = res_auth.body.accessToken
        let auth = {
            token: token,
            tenId: env[cu_ten_string].System.tenantid,
            apiUrl: api_url
        }
        cy.getCourseIdByAPI(auth, courseCode)
            .then((response) => {
                expect(response.status).to.eq(200)
                const courseId = response.body.result[0].id;
                cy.log('Course ID: ' + courseId);
                createPaper(auth, courseId, paperName, section)
            })
    })
})


function getPaperBody(courseId, paperName, sect, appendix) {
    let paperBody = {
        referenceId: courseId,
        timezoneOffset: -420,
        name: paperName,
        fullMarks: 0,
        paperType: 0,
        randomiseType: 0,
        status: 2,
        totalMarks: 0,
        appendixFileContent: '',
        sections: sect
    }
    for (let i = 0; i < sect.length; i++) {

        let sectorQuestionCount = sect[i].questions.length
        cy.log('section question count: ' + sectorQuestionCount)
        for (let j = 0; j < sectorQuestionCount; j++) {
            paperBody.fullMarks += sect[i].questions[j].question.fullMarks
            paperBody.totalMarks += sect[i].questions[j].question.totalMarks
            cy.log('paperBody.fullMarks    :' + paperBody.fullMarks)
            cy.log('paperBody.totalMarks    :' + paperBody.totalMarks)
        }
    }
    if (appendix) {
        paperBody.appendixFileContent = appendix
    }
    return paperBody
}

Cypress.Commands.add('getCourseIdByAPI', (auth, courseCode) => {
    cy.request({
        url: auth.apiUrl + '/admin/api/course/filters',
        method: 'POST',
        auth: { 'bearer': auth.token },
        headers: {
            Cookie: "TenantId=" + auth.tenId
        },
        body: {
            isASC: true,
            limit: 10,
            offset: 1,
            searchFields: "name;code",
            searchText: courseCode,
            sortBy: "code",
        }
    })
})

function createPaper(auth, courseId, paperName, section) {
    let body = getPaperBody(courseId, paperName, section)

    cy.log('body : ' + JSON.stringify(body))
    cy.log('Course ID is: ' + courseId);
    cy.request({
        url: auth.apiUrl + '/authoring/api/papers',
        method: 'POST',
        auth: { 'bearer': auth.token },
        headers: {
            Cookie: "TenantId=" + auth.tenId
        },
        body: body
    }).then((response) => {
        cy.log('Response Body: ' + JSON.stringify(response.body))
        // Check if the response status is 201 (created)
        expect(response.status).to.eq(201)
        cy.log('Create paper successfully for course ' + courseId)
    })
}

Cypress.Commands.add('createExamStep1ByAPI', (courseCode, body) => {
    cy.API_Login().then((res_auth) => {
        let token = res_auth.body.accessToken
        let auth = {
            token: token,
            tenId: env[cu_ten_string].System.tenantid,
            apiUrl: api_url
        }
        cy.getCourseIdByAPI(auth, courseCode).then((response) => {
            expect(response.status).to.eq(200)
            body.courseId = response.body.result[0].id
            
            cy.log('Course ID: ' + body.courseId)
            cy.log('body : ' + JSON.stringify(body))

            cy.request({
                url: auth.apiUrl + '/schedule/api/exam',
                method: 'POST',
                auth: { 'bearer': auth.token },
                headers: {
                    Cookie: "TenantId=" + auth.tenId
                },
                body: body
            }).then((response) => {
                cy.log('Response Body: ' + JSON.stringify(response.body));
                // ACheck if the response status is 201 (created)
                expect(response.status).to.eq(201)
                cy.log('Create exam successfully for course ' +  body.courseId)
            })
        })

    })
})
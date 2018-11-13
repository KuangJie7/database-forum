import Mock from "mockjs"

const Random = Mock.Random;

const userLogin = function(){
    const res = {};
    res.status = 200;
    res.memberid = Random.natural()
    return res
}

const userRegister = function(){
    const res = {};
    res.status = 200;
    res.memberid = Random.natural()
    return res
}

const userInfo = function(){
    const info = {};
    info.status = 200;
    info.membername = Random.cname();
    info.memberinfo = Random.string("大师法法官搜噶搜噶阿克纠纷噶开发gas宫国司法局市房管局", 6, 10);
    return info
}

const getSection = function(){
    const info = [];
    for(let i = 0; i < 3; i++ ){
        const tinfo = {}
        tinfo.sectionname = Random.name();
        tinfo.sectionid = Random.natural();
        tinfo.info = Random.string("大师法法官搜噶搜噶阿克纠纷噶开发gas宫国司法局市房管局", 6, 10);
        info[i] = tinfo;
    }
    return info;
}

const getThreads = function(){
    const info = [];
    // [{ "title", "threadid", "summary", "membername", "time" }]
    for(let i = 0; i < 10; i++){
        const tinfo = {}
        tinfo.title = Random.string("大师法法官搜噶搜噶阿克纠纷噶开发gas宫国司法局市房管局", 6, 10);
        tinfo.threadid = Random.natural();
        tinfo.summary = tinfo.title;
        tinfo.membername = Random.name();
        tinfo.time = Random.date();
        info[i] = tinfo;
    }
    return info;
}

const getThread = function(){
    // {"status","data":"{"threadinfo": { "title" }, "reply": [ {"floor","content", "replyid", "time", "ownerinfo":{"ownername", "ownerid"}} ] }}
         const tinfo = {}
         const reply = new Array();
         tinfo.threadinfo = { title: Random.string("大师法法官搜噶搜噶阿克纠纷噶开发gas宫国司法局市房管局", 6, 10) };
         for(let i = 0; i < 10; i++){
             const tRe = {};
             tRe.floor = i;
             tRe.content = Random.string("大师法法官搜噶搜噶阿克纠纷噶开发gas宫国司法局市房管局", 6, 10);
             tRe.replyid = Random.natural();
             tRe.time = Random.date();
             tRe.ownerinfo = {
                 ownername: Random.name(),
                 ownerid: Random.natural()
             }
             reply[i] = tRe;
         }
         tinfo.reply = reply;
    return tinfo;
}

const addReply = function(){
    const res = {};
    res.status = 200;
    return res;
}

Mock.mock(/\/register/,'post', userRegister)
Mock.mock(/\/login/,'post',userLogin)
Mock.mock(/\/getUserInfo/,'get', userInfo)
Mock.mock(/\/getSection/,'get', getSection)
Mock.mock(/\/getThread\?sectionid/,'get',getThreads)
Mock.mock(/\/getThread\?threadid/,'get',getThread)
Mock.mock(/\/addReply/,'post',addReply)

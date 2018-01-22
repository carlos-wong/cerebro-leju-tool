var moment = require('moment');
const { clipboard, nativeImage } = require('electron');
var lodash = require('lodash');

// console.log('debug moment:',moment);

function ljkeyword_creater(term,keyword,callback){
  if(keyword.indexOf(term) !== -1){
    callback();
  }
}

export const fn = ({ term, display }) => {
  // Put your plugin code here

  ljkeyword_creater(term,'ljchangelog',()=>{
    display({
      title: `Changelog Template`,
      onSelect:()=>{
        clipboard.writeText('Changelog: '+clipboard.readText());

      }
    });
  });

  ljkeyword_creater(term,'ljsat',()=>{
    var list = getStaturdayList(6);
    lodash.map(list,(data,key)=>{
      // console.log('data is:',moment(data).week(),'key is:',key);
      var week_index = moment(data).week();
      var str = data.format('YYYY-MM-DD');
      var newstr = "\n#due "+str+"\n/due "+str+'\n\n日期调整\n @qjx \n';
      // console.log('new str is:%s',newstr);
      display({
        title: `Next W:${week_index} Stat ${str}`,
        onSelect:()=>{
          clipboard.writeText(`${newstr}`);

        }
      });
    });
  });

  ljkeyword_creater(term,'ljplan',()=>{
    display({
      title: `Copy Planed softdev-qa-bot`,
      onSelect:()=>{
        clipboard.writeText(`\/label ~"softdev-in-process"\n\n\/assign @Softdev-QA-bot `);
      }
    });
    display({
      title: `Copy unPlaned softdev-qa-bot`,
      onSelect:()=>{
        clipboard.writeText(`\/unlabel ~"softdev-in-process"\n\n\/assign @carlos `);
      }
    });
    display({
      title: `Assign PM after planed`,
      onSelect:()=>{
        clipboard.writeText(`@qjx 开发工单已经安排完毕\n\n\/assign @qjx `);
      }
    });
  });

  ljkeyword_creater(term,'ljfix',()=>{
    display({
      title: `QA unfixed copy to clipboard`,
      onSelect:()=>{
        clipboard.writeText(`\/unlabel ~"softdev-fixed"\n\n\/assign @Softdev-QA-bot `);
      }
    });
    display({
      title: `issue unfixed copy to clipboard`,
      onSelect:()=>{
        clipboard.writeText(`\/reopen\n\n查看 QA 的测试问题 `);
      }
    });
  });
};

function getStaturdayList(length){
  var now = moment();
  var index = 0;
  var stat_lists = [];
  if(length <= 0){
    return [];
  }
  var tempisoWeekday ;
  while(index < length){
    tempisoWeekday = now.isoWeekday();
    if(tempisoWeekday == 6){
      stat_lists[stat_lists.length] = now.clone();
      index++;
    }
    now =  now.add(1, 'days');
  }
  return stat_lists;
}

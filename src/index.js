var moment = require('moment');
const { clipboard, nativeImage } = require('electron');
var lodash = require('lodash');

// console.log('debug moment:',moment);

export const fn = ({ term, display }) => {
  // Put your plugin code here
  if(term === "sat"){
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
  }
  else if(term === 'plan'){
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
  }
  else if(term == 'fix'){
    display({
      title: `QA unfixed copy to clipboard`,
      onSelect:()=>{
        clipboard.writeText(`\/unlabel ~"softdev-fixed"\n\n\/assign @Softdev-QA-bot `);
      }
    });
    display({
      title: `issue unfixed copy to clipboard`,
      onSelect:()=>{
        clipboard.writeText(`\/reopen\n\n查看QA 的回复 `);
      }
    });
  }
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

var moment = require('moment');
const { clipboard, nativeImage } = require('electron');
var lodash = require('lodash');

// console.log('debug moment:',moment);

export const fn = ({ term, display }) => {
  // Put your plugin code here
  if(term === "sat"){
    var list = getStaturdayList(2);
    lodash.map(list,(data,key)=>{
      // console.log('data is:',data,'key is:',key);
      var str = data.format('YYYY-MM-DD');
      var newstr = "\n#due "+str+"\n/due "+str+'\n\n';
      // console.log('new str is:%s',newstr);
      display({
        title: `Next Stat ${str}`,
        onSelect:()=>{
          clipboard.writeText(`${newstr}`);
        }
      });
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

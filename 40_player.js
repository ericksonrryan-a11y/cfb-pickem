/* ===================== LOCAL PLAYER ===================== */
function getPlayer(){
  var id = null, name = null;
  try { id = localStorage.getItem("cfbpickem_id"); name = localStorage.getItem("cfbpickem_name"); } catch(e){}
  if (!id){ id = uid(); try{ localStorage.setItem("cfbpickem_id", id); }catch(e){} }
  return {id: id, name: name};
}
function savePlayerName(name){
  try{ localStorage.setItem("cfbpickem_name", name); }catch(e){}
}

/* Each device keeps a copy of its own card so a dropped connection or a
   failed write never loses picks the player already made. */
var MY_ENTRY_KEY = "cfbpickem_entry_v2";
function rememberMyEntry(entry, week){
  try{ localStorage.setItem(MY_ENTRY_KEY, JSON.stringify({week: week, entry: entry})); }catch(e){}
}
function recallMyEntry(week){
  try{
    var raw = localStorage.getItem(MY_ENTRY_KEY);
    if (!raw) return null;
    var saved = JSON.parse(raw);
    if (!saved || saved.week !== week || !saved.entry) return null;
    return saved.entry;
  }catch(e){ return null; }
}
function entryIsNewer(mine, theirs){
  if (!mine) return false;
  if (!theirs) return true;
  if (!theirs.updatedAt) return !!mine.updatedAt;
  if (!mine.updatedAt) return false;
  return mine.updatedAt > theirs.updatedAt;
}


const checkName = (req, res, next) => {
  if (req.body.name) {
    next();
    console.log("name is ok");
  } else {
    res.status(400).json({ error: "Name is required!" });
  }
};

const checkBoolean = (req, res, next) => {
  const { is_favorite } = req.body;
  if (is_favorite === "true" || is_favorite === "false" || !is_favorite) {
    next();
  } else {
    res.status(400).json({ error: "is_favorite must be a boolean value!" });
  }
};


const checkSongForm = (req,res,next)=>{
  const {name, artist, album, time, is_favorite } = req.body;
  let ret = [];
  if(!name) ret.push("Name is required!");
  if(!artist) ret.push("Artist is required!");
  if(!album) ret.push("Album is required!");
  if(typeof is_favorite !=="boolean") ret.push("is_favorite must be a boolean value!");
  
  if(ret.length>0){
    res.status(400).json({ error: ret });
  }else{
    next();
  }

}

module.exports = { checkName, checkBoolean, checkSongForm };
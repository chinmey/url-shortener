// used for making a post request to add a url to db

const express=require('express');
const validUrl=require('valid-url');
const shortid=require('shortid');
const config=require('config');

const Url=require('../modals/Url');


const router=express.Router();


// @ route Post /api/url/shorten
// @ desc crete short url

router.post('/shorten', async (req,res)=>{
    const {longUrl}=req.body;
    const baseUrl=config.get('baseUrl');

    if(!validUrl.isUri(baseUrl)){
   return res.status(401).json('invalid base url');
    }
// create url code
const urlCode=shortid.generate();

// check longUrl if it exists already

if(validUrl.isUri(longUrl))
{
    try{
   let url= await Url.findOne({longUrl})  
   if(url){
       res.json(url);
   } 
   else
   {
      const shortUrl=baseUrl+'/'+urlCode;
      
      url=new Url({
          longUrl,shortUrl,urlCode,date:new Date()
      })

      await url.save();
      res.json(url);
   }


    }catch(err){
    console.error(err);
    res.status(500).json('server error');
    }

}

else
{
    res.status(401).json('invalid longUrl');
}



})

module.exports=router;
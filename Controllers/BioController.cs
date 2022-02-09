using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using craps.Models;
using Newtonsoft.Json.Linq;

namespace craps.Controllers
{
    public class BioController : ApiController
    {

        dbEntities3 db = new dbEntities3();
    public object Get()
    {
      using (dbEntities3 db = new dbEntities3())
      {
        return new
        {
          biodata = (from c in db.biodatas orderby c.biodata_id select c).ToList(),
          personal = (from c in db.personals orderby c.personal_id select c).ToList(),
          business = (from c in db.businesses orderby c.business_id select c).ToList()          
        };
      }
    }

    public object Get(int id)
    {
      using (dbEntities3 db = new dbEntities3())
      {
        return new
        {
          biodata = db.biodatas.FirstOrDefault(e => e.biodata_id == id),
          personal = db.personals.FirstOrDefault(e => e.biodata_id == id),
          business = db.businesses.FirstOrDefault(e => e.biodata_id == id),
        };
      }
    }


    [HttpPost]
    public string MyMethod([FromBody] JObject data)
    {

      biodata bd = data["biodata"].ToObject<biodata>();
      personal ps = data["personal"].ToObject<personal>();

      try
      {
        //Save to Biodata records
        db.biodatas.Add(bd);
        db.SaveChanges();

        //store id generated from biodata
        int id = bd.biodata_id;

        //store id to other records
        ps.biodata_id = id;

        // Save to Personal records
        db.personals.Add(ps);
        db.SaveChanges();

        if ((string)data["bschecked"] == "checked")
        {
          business bs = data["business"].ToObject<business>();
          bs.biodata_id = id;
          db.businesses.Add(bs);
          db.SaveChanges();
        }
      }
      catch (Exception ex)
      {
        if (ex.Message != "")
        {
          return "Saving records failed, kindly try again," + ex.Message;
        }        
      }
      return "Record Saved Succefully";
    }
    }
}

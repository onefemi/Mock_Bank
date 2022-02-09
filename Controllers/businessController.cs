using craps.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace craps.Controllers
{
  public class businessController : ApiController
  {

    // GET api/<controller>
    public IEnumerable<business> Get()
    {
      using (dbEntities3 db = new dbEntities3())
      {
        return db.businesses.ToList();
      }
    }

    // GET api/<controller>/5
    public business Get(int id)
    {
      using (dbEntities3 db = new dbEntities3())
      {
        return db.businesses.FirstOrDefault(e => e.business_id == id);
      }
    }

    // POST api/<controller>
    public void Post([FromBody] string value)
    {
    }

    // PUT api/<controller>/5
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<controller>/5
    public void Delete(int id)
    {
    }
  }
}

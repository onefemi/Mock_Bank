using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using craps.Models;

namespace craps.Controllers
{
    public class transactionsController : ApiController
    {
        private dbEntities3 db = new dbEntities3();

        // GET: api/transactions
        public IQueryable<transaction> Gettransactions()
        {
            return db.transactions;
        }

        private bool transactionExists(int id)
        {
            return db.transactions.Count(e => e.tran_id == id) > 0;
        }
    }
}

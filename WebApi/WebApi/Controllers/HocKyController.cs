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
using WebApi.Models;

namespace WebApi.Controllers
{
    public class HocKyController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/HocKy
        public IQueryable<HocKy> GetHocKies()
        {
            return db.HocKies;
        }

        // GET: api/HocKy/5
        [ResponseType(typeof(HocKy))]
        public IHttpActionResult GetHocKy(int id)
        {
            HocKy hocKy = db.HocKies.Find(id);
            if (hocKy == null)
            {
                return NotFound();
            }

            return Ok(hocKy);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HocKyExists(int id)
        {
            return db.HocKies.Count(e => e.MaHocKy == id) > 0;
        }
    }
}
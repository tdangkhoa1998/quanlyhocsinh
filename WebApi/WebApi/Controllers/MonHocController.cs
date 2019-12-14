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
    public class MonHocController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/MonHoc
        public IQueryable<MonHoc> GetMonHocs()
        {
            return db.MonHocs;
        }

        // GET: api/MonHoc/5
        [ResponseType(typeof(MonHoc))]
        public IHttpActionResult GetMonHoc(int id)
        {
            MonHoc monHoc = db.MonHocs.Find(id);
            if (monHoc == null)
            {
                return NotFound();
            }

            return Ok(monHoc);
        }

        // PUT: api/MonHoc/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMonHoc(int id, MonHoc monHoc)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != monHoc.MaMonHoc)
            {
                return BadRequest();
            }

            db.Entry(monHoc).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MonHocExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/MonHoc
        [ResponseType(typeof(MonHoc))]
        public IHttpActionResult PostMonHoc(MonHoc monHoc)
        {
            db.MonHocs.Add(monHoc);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = monHoc.MaMonHoc }, monHoc);
        }

        // DELETE: api/MonHoc/5
        [ResponseType(typeof(MonHoc))]
        public IHttpActionResult DeleteMonHoc(int id)
        {
            MonHoc monHoc = db.MonHocs.Find(id);
            if (monHoc == null)
            {
                return NotFound();
            }

            db.MonHocs.Remove(monHoc);
            db.SaveChanges();

            return Ok(monHoc);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MonHocExists(int id)
        {
            return db.MonHocs.Count(e => e.MaMonHoc == id) > 0;
        }
    }
}
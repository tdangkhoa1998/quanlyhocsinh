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
    public class HocSinhController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/HocSinh
        public System.Object GetHocSinhs()
        {
            var result = (from a in db.HocSinhs

                          select new
                          {
                              a.MaHocSinh,
                              a.HoTen
                          }).ToList();

            return result;
        }

        // GET: api/HocSinh/5
        [ResponseType(typeof(HocSinh))]
        public IHttpActionResult GetHocSinh(int id)
        {
            HocSinh hocSinh = db.HocSinhs.Find(id);
            if (hocSinh == null)
            {
                return NotFound();
            }

            return Ok(hocSinh);
        }

        // PUT: api/HocSinh/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutHocSinh(int id, HocSinh hocSinh)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hocSinh.MaHocSinh)
            {
                return BadRequest();
            }

            db.Entry(hocSinh).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HocSinhExists(id))
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

        // POST: api/HocSinh
        [ResponseType(typeof(HocSinh))]
        public IHttpActionResult PostHocSinh(HocSinh hocSinh)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.HocSinhs.Add(hocSinh);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = hocSinh.MaHocSinh }, hocSinh);
        }

        // DELETE: api/HocSinh/5
        [ResponseType(typeof(HocSinh))]
        public IHttpActionResult DeleteHocSinh(int id)
        {
            HocSinh hocSinh = db.HocSinhs.Find(id);
            if (hocSinh == null)
            {
                return NotFound();
            }

            db.HocSinhs.Remove(hocSinh);
            db.SaveChanges();

            return Ok(hocSinh);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HocSinhExists(int id)
        {
            return db.HocSinhs.Count(e => e.MaHocSinh == id) > 0;
        }
    }
}